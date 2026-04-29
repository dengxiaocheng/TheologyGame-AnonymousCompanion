/**
 * StoryEngine — 游戏的主要协调器
 * 管理 StatsSystem 和 CharacterSystem，驱动剧情流程
 */
class StoryEngine {
  constructor() {
    this.statsSystem = new StatsSystem();
    this.characterSystem = new CharacterSystem();

    // 剧情数据
    this._storyData = null;
    this._chapters = null;

    // 当前游戏状态
    this._state = {
      currentChapter: 0,
      currentNodeId: null,
      flags: {},
      started: false,
      ended: false
    };

    // 选择历史
    this._choiceHistory = [];

    // 分支追踪
    this._visitedNodes = [];
    this._branchLog = [];

    // 游玩统计
    this._playStats = {
      startTime: null,
      endTime: null,
      totalChoices: 0,
      nodesVisited: 0,
      chaptersReached: [],
      saveCount: 0,
      loadCount: 0
    };

    // 属性趋势快照
    this._statSnapshots = [];

    // 事件监听
    this._listeners = {};
  }

  // ========== 事件系统 ==========

  /**
   * 注册事件监听
   * @param {string} event - 'nodeChanged' | 'chapterChanged' | 'gameEnded'
   * @param {Function} callback
   */
  on(event, callback) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  }

  /**
   * 移除事件监听
   * @param {string} event
   * @param {Function} callback
   */
  off(event, callback) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter(function(cb) { return cb !== callback; });
  }

  /**
   * 发出事件
   * @param {string} event
   * @param {*} data
   */
  _emit(event, data) {
    // 本地监听器
    if (this._listeners[event]) {
      this._listeners[event].forEach(function(cb) {
        try {
          cb(data);
        } catch (e) {
          console.error('[StoryEngine] Event listener error for "' + event + '":', e);
        }
      });
    }

    // 全局事件总线
    if (typeof window !== 'undefined' && window.EventBus) {
      window.EventBus.emit(event, data);
    }
  }

  // ========== 剧情数据加载 ==========

  /**
   * 加载剧情数据
   * @param {Object} data - 完整的剧情数据对象
   */
  loadStoryData(data) {
    if (!data) {
      console.error('[StoryEngine] loadStoryData: no data provided');
      return;
    }

    this._storyData = data;
    this._chapters = data.chapters || [];

    if (!data.nodes || typeof data.nodes !== 'object') {
      console.error('[StoryEngine] loadStoryData: invalid or missing nodes');
      return;
    }

    console.log('[StoryEngine] Loaded ' + Object.keys(data.nodes).length + ' story nodes, ' + this._chapters.length + ' chapters');
  }

  // ========== 游戏流程 ==========

  /**
   * 开始游戏
   * @returns {Object|null} 第一个剧情节点
   */
  startGame() {
    if (!this._storyData || !this._storyData.nodes) {
      console.error('[StoryEngine] Cannot start: no story data loaded');
      return null;
    }

    var firstNodeId = this._findFirstNode();
    if (!firstNodeId) {
      console.error('[StoryEngine] Cannot start: no valid first node found');
      return null;
    }

    this._state = {
      currentChapter: 1,
      currentNodeId: firstNodeId,
      flags: {},
      started: true,
      ended: false
    };

    // 重置追踪数据
    this._choiceHistory = [];
    this._visitedNodes = [firstNodeId];
    this._branchLog = [];
    this._statSnapshots = [];
    this._playStats = {
      startTime: Date.now(),
      endTime: null,
      totalChoices: 0,
      nodesVisited: 1,
      chaptersReached: [1],
      saveCount: 0,
      loadCount: 0
    };

    // 记录初始属性快照
    this._recordStatSnapshot('start');

    var node = this.getCurrentNode();
    if (node) {
      this._emit('nodeChanged', { node: node, isNewChapter: true });
      this._emit('chapterChanged', {
        chapter: 1,
        info: this.getChapterInfo()
      });
    }

    console.log('[StoryEngine] Game started at node: ' + firstNodeId);
    return node;
  }

  /**
   * 找到第一个剧情节点
   * @returns {string|null}
   */
  _findFirstNode() {
    var nodes = this._storyData.nodes;
    var ch1Nodes = Object.keys(nodes)
      .filter(function(id) { return nodes[id].chapter === 1; })
      .sort();

    if (ch1Nodes.length > 0) {
      return ch1Nodes[0];
    }

    var allIds = Object.keys(nodes).sort();
    return allIds.length > 0 ? allIds[0] : null;
  }

  /**
   * 获取当前剧情节点
   * @returns {Object|null}
   */
  getCurrentNode() {
    if (!this._state.currentNodeId || !this._storyData) {
      return null;
    }
    var node = this._storyData.nodes[this._state.currentNodeId];
    if (!node) {
      console.warn('[StoryEngine] Node not found: ' + this._state.currentNodeId);
      return null;
    }
    return Object.assign({}, node);
  }

  /**
   * 推进剧情 — 处理玩家选择
   * @param {string} choiceId - 选择的 ID
   * @returns {Object|null} 新的剧情节点
   */
  advance(choiceId) {
    var currentNode = this.getCurrentNode();
    if (!currentNode) {
      console.error('[StoryEngine] advance: no current node');
      return null;
    }

    var selectedChoice = null;

    if (currentNode.choices && currentNode.choices.length > 0) {
      selectedChoice = currentNode.choices.find(function(c) { return c.id === choiceId; });
      if (!selectedChoice) {
        console.error('[StoryEngine] advance: choice not found: ' + choiceId);
        return null;
      }
    }

    // 记录选择历史
    if (selectedChoice) {
      this._recordChoice(currentNode.id, selectedChoice);
    }

    // 应用选择的效果
    if (selectedChoice) {
      this._applyEffects(selectedChoice.effects);

      if (selectedChoice.setFlag) {
        if (typeof selectedChoice.setFlag === 'string') {
          this.setFlag(selectedChoice.setFlag, true);
        } else if (typeof selectedChoice.setFlag === 'object') {
          var self = this;
          Object.keys(selectedChoice.setFlag).forEach(function(key) {
            self.setFlag(key, selectedChoice.setFlag[key]);
          });
        }
      }
    }

    // 确定下一个节点
    var nextNodeId = null;

    if (selectedChoice && selectedChoice.next) {
      nextNodeId = selectedChoice.next;
    } else if (!selectedChoice && currentNode.next) {
      nextNodeId = currentNode.next;
    }

    // 检查是否到达结局
    if (!nextNodeId) {
      this._state.ended = true;
      this._playStats.endTime = Date.now();
      this._recordStatSnapshot('end');
      this._emit('gameEnded', { finalStats: this.statsSystem.getStats() });
      console.log('[StoryEngine] Game ended');
      return null;
    }

    if (!this._storyData.nodes[nextNodeId]) {
      console.error('[StoryEngine] advance: next node not found: ' + nextNodeId);
      return null;
    }

    // 记录分支
    this._recordBranch(currentNode.id, nextNodeId, choiceId);

    // 更新状态
    var oldChapter = this._state.currentChapter;
    this._state.currentNodeId = nextNodeId;

    var newNode = this._storyData.nodes[nextNodeId];
    var newChapter = newNode.chapter || oldChapter;
    this._state.currentChapter = newChapter;

    // 追踪已访问节点
    if (this._visitedNodes.indexOf(nextNodeId) === -1) {
      this._visitedNodes.push(nextNodeId);
      this._playStats.nodesVisited++;
    }

    // 追踪到达的章节
    if (this._playStats.chaptersReached.indexOf(newChapter) === -1) {
      this._playStats.chaptersReached.push(newChapter);
    }

    // 检查章节变更
    var isNewChapter = newChapter !== oldChapter;
    if (isNewChapter) {
      this._emit('chapterChanged', {
        chapter: newChapter,
        info: this.getChapterInfo()
      });
    }

    // 记录属性快照（每5个节点或章节变更时）
    if (isNewChapter || this._visitedNodes.length % 5 === 0) {
      this._recordStatSnapshot('node_' + nextNodeId);
    }

    this._emit('nodeChanged', { node: this.getCurrentNode(), isNewChapter: isNewChapter });

    return this.getCurrentNode();
  }

  /**
   * 应用选择效果（属性变更 + 关系变更）
   * @param {Object} effects
   */
  _applyEffects(effects) {
    if (!effects) return;

    if (effects.stats) {
      this.statsSystem.modify(effects.stats);
    }

    if (effects.relations) {
      var self = this;
      Object.keys(effects.relations).forEach(function(charId) {
        var relationChanges = effects.relations[charId];
        if (typeof relationChanges === 'object') {
          self.characterSystem.modifyRelation(charId, relationChanges);
        }
      });
    }
  }

  // ========== 选择历史 ==========

  /**
   * 记录玩家选择
   * @param {string} nodeId
   * @param {Object} choice
   */
  _recordChoice(nodeId, choice) {
    var entry = {
      nodeId: nodeId,
      choiceId: choice.id,
      choiceText: choice.text || choice.id,
      timestamp: Date.now(),
      statsBefore: Object.assign({}, this.statsSystem.getStats())
    };

    this._choiceHistory.push(entry);
    this._playStats.totalChoices++;
  }

  /**
   * 获取选择历史
   * @returns {Object[]}
   */
  getChoiceHistory() {
    return this._choiceHistory.slice();
  }

  /**
   * 获取指定章节的选择历史
   * @param {number} chapter
   * @returns {Object[]}
   */
  getChoiceHistoryByChapter(chapter) {
    var self = this;
    if (!this._storyData) return [];

    return this._choiceHistory.filter(function(entry) {
      var node = self._storyData.nodes[entry.nodeId];
      return node && node.chapter === chapter;
    });
  }

  /**
   * 获取选择摘要（每个选择的简短描述）
   * @returns {Object[]}
   */
  getChoiceSummary() {
    return this._choiceHistory.map(function(entry) {
      return {
        nodeId: entry.nodeId,
        choiceText: entry.choiceText
      };
    });
  }

  // ========== 分支追踪 ==========

  /**
   * 记录分支路径
   * @param {string} fromNodeId
   * @param {string} toNodeId
   * @param {string|null} choiceId
   */
  _recordBranch(fromNodeId, toNodeId, choiceId) {
    this._branchLog.push({
      from: fromNodeId,
      to: toNodeId,
      choice: choiceId,
      timestamp: Date.now()
    });
  }

  /**
   * 获取已访问的节点列表
   * @returns {string[]}
   */
  getVisitedNodes() {
    return this._visitedNodes.slice();
  }

  /**
   * 获取分支日志
   * @returns {Object[]}
   */
  getBranchLog() {
    return this._branchLog.slice();
  }

  /**
   * 获取分支路径摘要（节点→节点的路径）
   * @returns {string[]}
   */
  getBranchPath() {
    return this._branchLog.map(function(entry) {
      return entry.from + ' → ' + entry.to;
    });
  }

  /**
   * 检查节点是否已访问
   * @param {string} nodeId
   * @returns {boolean}
   */
  hasVisitedNode(nodeId) {
    return this._visitedNodes.indexOf(nodeId) !== -1;
  }

  /**
   * 获取当前路径深度（已访问节点数）
   * @returns {number}
   */
  getPathDepth() {
    return this._visitedNodes.length;
  }

  // ========== 属性趋势 ==========

  /**
   * 记录属性快照
   * @param {string} label
   */
  _recordStatSnapshot(label) {
    this._statSnapshots.push({
      label: label,
      stats: Object.assign({}, this.statsSystem.getStats()),
      timestamp: Date.now()
    });
  }

  /**
   * 获取属性快照历史
   * @returns {Object[]}
   */
  getStatSnapshots() {
    return this._statSnapshots.slice();
  }

  /**
   * 获取指定属性的趋势数据
   * @param {string} statKey - 属性名称
   * @returns {Object[]} {label, value} 数组
   */
  getStatTrend(statKey) {
    return this._statSnapshots.map(function(snap) {
      return {
        label: snap.label,
        value: snap.stats[statKey] !== undefined ? snap.stats[statKey] : null
      };
    });
  }

  /**
   * 获取属性总变化量
   * @param {string} statKey
   * @returns {number} 正值表示上升，负值表示下降
   */
  getStatChange(statKey) {
    if (this._statSnapshots.length < 2) return 0;
    var first = this._statSnapshots[0].stats[statKey];
    var last = this._statSnapshots[this._statSnapshots.length - 1].stats[statKey];
    if (first === undefined || last === undefined) return 0;
    return last - first;
  }

  // ========== 游玩统计 ==========

  /**
   * 获取游玩统计
   * @returns {Object}
   */
  getPlayStats() {
    var stats = Object.assign({}, this._playStats);
    stats.playTime = this._calculatePlayTime();
    stats.choiceHistoryLength = this._choiceHistory.length;
    stats.nodesVisitedCount = this._visitedNodes.length;
    stats.branchCount = this._branchLog.length;
    return stats;
  }

  /**
   * 计算游玩时间（毫秒）
   * @returns {number}
   */
  _calculatePlayTime() {
    if (!this._playStats.startTime) return 0;
    var end = this._playStats.endTime || Date.now();
    return end - this._playStats.startTime;
  }

  /**
   * 获取游玩时间格式化字符串
   * @returns {string}
   */
  getPlayTimeFormatted() {
    var ms = this._calculatePlayTime();
    var seconds = Math.floor(ms / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return hours + '时' + (minutes % 60) + '分';
    }
    if (minutes > 0) {
      return minutes + '分' + (seconds % 60) + '秒';
    }
    return seconds + '秒';
  }

  /**
   * 增加存档计数
   */
  incrementSaveCount() {
    this._playStats.saveCount++;
  }

  /**
   * 增加读档计数
   */
  incrementLoadCount() {
    this._playStats.loadCount++;
  }

  // ========== 条件系统 ==========

  /**
   * 评估条件是否满足
   * 支持格式:
   *   { stat: 'understanding', min: 60 }
   *   { stat: 'understanding', max: 30 }
   *   { stat: 'understanding', min: 40, max: 80 }
   *   { relation: { character: 'doctor', field: 'affection', min: 60 } }
   *   { flag: 'met_doctor' }
   *   { flag: 'met_doctor', value: true }
   *   { flag: 'met_doctor', value: false }
   *   { all: [cond1, cond2, ...] }   — 所有条件都满足
   *   { any: [cond1, cond2, ...] }   — 任一条件满足
   *   { not: condition }             — 条件取反
   * @param {Object} condition
   * @returns {boolean}
   */
  evaluateCondition(condition) {
    if (!condition) return true;

    var self = this;

    // 复合条件 — 所有子条件必须满足
    if (condition.all && Array.isArray(condition.all)) {
      return condition.all.every(function(sub) { return self.evaluateCondition(sub); });
    }

    // 复合条件 — 任一子条件满足
    if (condition.any && Array.isArray(condition.any)) {
      return condition.any.some(function(sub) { return self.evaluateCondition(sub); });
    }

    // 取反条件
    if (condition.not !== undefined) {
      return !this.evaluateCondition(condition.not);
    }

    // 属性阈值条件
    if (condition.stat) {
      var value = this.statsSystem.getStat(condition.stat);
      if (value === null) return false;

      if (condition.min !== undefined && value < condition.min) return false;
      if (condition.max !== undefined && value > condition.max) return false;
      return true;
    }

    // 关系阈值条件
    if (condition.relation) {
      var rel = condition.relation;
      var character = this.characterSystem.getCharacter(rel.character);
      if (!character) return false;

      var field = rel.field || 'affection';
      var relValue = character[field];
      if (relValue === undefined) return false;

      if (rel.min !== undefined && relValue < rel.min) return false;
      if (rel.max !== undefined && relValue > rel.max) return false;
      return true;
    }

    // 标志条件
    if (condition.flag !== undefined) {
      if (typeof condition.flag === 'object') {
        var keys = Object.keys(condition.flag);
        for (var i = 0; i < keys.length; i++) {
          if (this.getFlag(keys[i]) !== condition.flag[keys[i]]) return false;
        }
        return true;
      }
      var flagKey = condition.flag;
      var expectedValue = condition.value !== undefined ? condition.value : true;
      return this.getFlag(flagKey) === expectedValue;
    }

    // 节点访问条件
    if (condition.visitedNode) {
      return this.hasVisitedNode(condition.visitedNode);
    }

    // 选择历史条件 — 玩家曾做过某个选择
    if (condition.madeChoice) {
      return this._choiceHistory.some(function(entry) {
        return entry.choiceId === condition.madeChoice;
      });
    }

    console.warn('[StoryEngine] Unknown condition type:', condition);
    return true;
  }

  /**
   * 获取当前节点的可用选择（根据条件过滤）
   * @returns {Object[]}
   */
  getAvailableChoices() {
    var node = this.getCurrentNode();
    if (!node || !node.choices || node.choices.length === 0) {
      return [];
    }

    var self = this;
    return node.choices.filter(function(choice) {
      if (!choice.condition) return true;
      return self.evaluateCondition(choice.condition);
    });
  }

  // ========== 标志管理 ==========

  setFlag(key, value) {
    this._state.flags[key] = value;
  }

  getFlag(key) {
    return this._state.flags[key];
  }

  hasFlag(key) {
    return !!this._state.flags[key];
  }

  /**
   * 获取所有标志
   * @returns {Object}
   */
  getAllFlags() {
    return Object.assign({}, this._state.flags);
  }

  // ========== 章节信息 ==========

  getChapterInfo() {
    if (!this._chapters) return null;
    return this._chapters.find(function(ch) { return ch.id === this._state.currentChapter; }.bind(this)) || null;
  }

  getChapterInfoById(chapterId) {
    if (!this._chapters) return null;
    return this._chapters.find(function(ch) { return ch.id === chapterId; }) || null;
  }

  /**
   * 获取所有章节信息
   * @returns {Object[]}
   */
  getAllChapters() {
    return this._chapters ? this._chapters.slice() : [];
  }

  /**
   * 获取章节完成进度
   * @returns {Object} { current, total, percentage }
   */
  getChapterProgress() {
    var total = this._chapters ? this._chapters.length : 0;
    var reached = this._playStats.chaptersReached.length;
    return {
      current: reached,
      total: total,
      percentage: total > 0 ? Math.round((reached / total) * 100) : 0
    };
  }

  // ========== 状态查询 ==========

  getState() {
    return {
      currentChapter: this._state.currentChapter,
      currentNodeId: this._state.currentNodeId,
      flags: Object.assign({}, this._state.flags),
      started: this._state.started,
      ended: this._state.ended
    };
  }

  isStarted() {
    return this._state.started;
  }

  isEnded() {
    return this._state.ended;
  }

  // ========== 序列化 ==========

  toJSON() {
    return {
      state: {
        currentChapter: this._state.currentChapter,
        currentNodeId: this._state.currentNodeId,
        flags: Object.assign({}, this._state.flags),
        started: this._state.started,
        ended: this._state.ended
      },
      stats: this.statsSystem.toJSON(),
      characters: this.characterSystem.toJSON(),
      choiceHistory: this._choiceHistory.slice(),
      visitedNodes: this._visitedNodes.slice(),
      branchLog: this._branchLog.slice(),
      statSnapshots: this._statSnapshots.slice(),
      playStats: Object.assign({}, this._playStats)
    };
  }

  fromJSON(data) {
    if (!data) return;

    if (data.state) {
      this._state = {
        currentChapter: data.state.currentChapter || 0,
        currentNodeId: data.state.currentNodeId || null,
        flags: data.state.flags ? Object.assign({}, data.state.flags) : {},
        started: !!data.state.started,
        ended: !!data.state.ended
      };
    }

    if (data.stats) {
      this.statsSystem.fromJSON(data.stats);
    }

    if (data.characters) {
      this.characterSystem.fromJSON(data.characters);
    }

    if (data.choiceHistory) {
      this._choiceHistory = data.choiceHistory.slice();
    }

    if (data.visitedNodes) {
      this._visitedNodes = data.visitedNodes.slice();
    }

    if (data.branchLog) {
      this._branchLog = data.branchLog.slice();
    }

    if (data.statSnapshots) {
      this._statSnapshots = data.statSnapshots.slice();
    }

    if (data.playStats) {
      this._playStats = Object.assign({}, data.playStats);
    }
  }

  reset() {
    this._state = {
      currentChapter: 0,
      currentNodeId: null,
      flags: {},
      started: false,
      ended: false
    };
    this.statsSystem.reset();
    this.characterSystem.reset();
    this._choiceHistory = [];
    this._visitedNodes = [];
    this._branchLog = [];
    this._statSnapshots = [];
    this._playStats = {
      startTime: null,
      endTime: null,
      totalChoices: 0,
      nodesVisited: 0,
      chaptersReached: [],
      saveCount: 0,
      loadCount: 0
    };
  }
}

// 导出
if (typeof window !== 'undefined') {
  window.StoryEngine = StoryEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoryEngine;
}
