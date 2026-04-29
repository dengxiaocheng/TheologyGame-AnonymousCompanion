/**
 * StatsSystem — 管理 4 个核心属性
 * 理解 (understanding)、见证 (witness)、尊重 (respect)、偏见 (prejudice)
 * 范围 0-100，默认值 50
 */
class StatsSystem {
  constructor() {
    this._stats = {
      understanding: 50,
      witness: 50,
      respect: 50,
      prejudice: 50
    };

    this._listeners = [];
    this._history = [];

    // 属性描述配置
    this._descriptions = {
      understanding: {
        low: '对信仰仍充满疑惑，尚未找到内心的答案',
        mid: '开始理解信仰的意义，但仍有许多困惑',
        high: '对信仰有了深刻的理解，内心逐渐明朗'
      },
      witness: {
        low: '很少关注他人的苦难，世界似乎很远',
        mid: '开始看见身边的痛苦与挣扎',
        high: '深刻见证了人间的苦难与希望'
      },
      respect: {
        low: '对不同的声音缺乏耐心和包容',
        mid: '学会倾听不同的观点，保持开放',
        high: '由衷尊重每一个生命的独特价值'
      },
      prejudice: {
        low: '偏见已消退，以平等的眼光看待世界',
        mid: '心中仍有一些固执的成见',
        high: '被偏见蒙蔽了双眼，难以看清真相'
      }
    };

    // 属性里程碑
    this._milestones = {
      understanding: [
        { threshold: 20, id: 'understanding_20', title: '迷茫者', desc: '理解低于 20' },
        { threshold: 40, id: 'understanding_40', title: '求索者', desc: '理解低于 40' },
        { threshold: 60, id: 'understanding_60', title: '领悟者', desc: '理解超过 60' },
        { threshold: 80, id: 'understanding_80', title: '明悟者', desc: '理解超过 80' },
        { threshold: 95, id: 'understanding_95', title: '通达者', desc: '理解超过 95' }
      ],
      witness: [
        { threshold: 20, id: 'witness_20', title: '漠视者', desc: '见证低于 20' },
        { threshold: 40, id: 'witness_40', title: '旁观者', desc: '见证低于 40' },
        { threshold: 60, id: 'witness_60', title: '关注者', desc: '见证超过 60' },
        { threshold: 80, id: 'witness_80', title: '见证者', desc: '见证超过 80' },
        { threshold: 95, id: 'witness_95', title: '守望者', desc: '见证超过 95' }
      ],
      respect: [
        { threshold: 20, id: 'respect_20', title: '傲慢者', desc: '尊重低于 20' },
        { threshold: 40, id: 'respect_40', title: '挑剔者', desc: '尊重低于 40' },
        { threshold: 60, id: 'respect_60', title: '善意者', desc: '尊重超过 60' },
        { threshold: 80, id: 'respect_80', title: '包容者', desc: '尊重超过 80' },
        { threshold: 95, id: 'respect_95', title: '博爱者', desc: '尊重超过 95' }
      ],
      prejudice: [
        { threshold: 20, id: 'prejudice_20', title: '纯净之心', desc: '偏见低于 20' },
        { threshold: 40, id: 'prejudice_40', title: '开阔之眼', desc: '偏见低于 40' },
        { threshold: 60, id: 'prejudice_60', title: '偏执者', desc: '偏见超过 60' },
        { threshold: 80, id: 'prejudice_80', title: '执念者', desc: '偏见超过 80' },
        { threshold: 95, id: 'prejudice_95', title: '盲目者', desc: '偏见超过 95' }
      ]
    };

    this._unlockedMilestones = [];
  }

  // ========== 回调 ==========

  /**
   * 注册变更回调
   * @param {Function} callback - 接收 {stats, changes} 对象
   */
  onStatsChanged(callback) {
    this._listeners.push(callback);
  }

  /**
   * 移除回调
   * @param {Function} callback
   */
  offStatsChanged(callback) {
    this._listeners = this._listeners.filter(function(cb) {
      return cb !== callback;
    });
  }

  /**
   * 发出 statsChanged 事件
   * @param {Object} changes - 变更内容 {understanding: {from, to, delta}, ...}
   */
  _emitStatsChanged(changes) {
    var snapshot = this.getStats();
    this._listeners.forEach(function(cb) {
      try {
        cb({ stats: snapshot, changes: changes });
      } catch (e) {
        console.error('[StatsSystem] Listener error:', e);
      }
    });
    if (typeof window !== 'undefined' && window.EventBus) {
      window.EventBus.emit('statsChanged', { stats: snapshot, changes: changes });
    }
  }

  // ========== 属性修改 ==========

  /**
   * 修改属性值
   * @param {Object} changes - 增量对象，如 {understanding: +5, prejudice: -3}
   */
  modify(changes) {
    if (!changes || typeof changes !== 'object') {
      console.warn('[StatsSystem] modify() received invalid changes:', changes);
      return;
    }

    var appliedChanges = {};
    var self = this;
    var keys = Object.keys(changes);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!(key in this._stats)) {
        console.warn('[StatsSystem] Unknown stat: ' + key);
        continue;
      }

      var delta = Number(changes[key]);
      if (isNaN(delta)) {
        console.warn('[StatsSystem] Invalid delta for ' + key + ':', changes[key]);
        continue;
      }

      var oldValue = this._stats[key];
      var newValue = oldValue + delta;

      // 限制范围 0-100
      newValue = Math.max(0, Math.min(100, newValue));
      newValue = Math.round(newValue);

      if (newValue !== oldValue) {
        this._stats[key] = newValue;
        appliedChanges[key] = { from: oldValue, to: newValue, delta: delta };
      }
    }

    var appliedKeys = Object.keys(appliedChanges);
    if (appliedKeys.length > 0) {
      // 记录历史
      this._history.push({
        timestamp: Date.now(),
        changes: appliedChanges
      });

      // 检查里程碑
      this._checkMilestones(appliedChanges);

      this._emitStatsChanged(appliedChanges);
    }
  }

  /**
   * 预览属性变更（不实际修改）
   * @param {Object} changes - 增量对象
   * @returns {Object} 预览结果，如 {understanding: {from: 50, to: 55, delta: 5}}
   */
  previewChange(changes) {
    if (!changes || typeof changes !== 'object') return {};

    var preview = {};
    var keys = Object.keys(changes);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!(key in this._stats)) continue;

      var delta = Number(changes[key]);
      if (isNaN(delta)) continue;

      var oldValue = this._stats[key];
      var newValue = Math.max(0, Math.min(100, Math.round(oldValue + delta)));

      preview[key] = { from: oldValue, to: newValue, delta: delta };
    }

    return preview;
  }

  // ========== 属性查询 ==========

  /**
   * 获取所有属性的快照
   * @returns {Object} 属性值的副本
   */
  getStats() {
    return {
      understanding: this._stats.understanding,
      witness: this._stats.witness,
      respect: this._stats.respect,
      prejudice: this._stats.prejudice
    };
  }

  /**
   * 获取单个属性值
   * @param {string} key - 属性名
   * @returns {number|null}
   */
  getStat(key) {
    if (key in this._stats) {
      return this._stats[key];
    }
    console.warn('[StatsSystem] Unknown stat: ' + key);
    return null;
  }

  /**
   * 直接设置某个属性值（用于存档恢复等场景）
   * @param {string} key - 属性名
   * @param {number} value - 目标值
   */
  setStat(key, value) {
    if (!(key in this._stats)) {
      console.warn('[StatsSystem] Unknown stat: ' + key);
      return;
    }
    var clamped = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
    this._stats[key] = clamped;
  }

  /**
   * 获取属性的叙事描述
   * @param {string} key - 属性名
   * @returns {string}
   */
  getDescription(key) {
    if (!this._descriptions[key]) return '';
    var value = this._stats[key];
    var desc = this._descriptions[key];

    // 偏见是反向的：低值=好，高值=坏
    if (key === 'prejudice') {
      if (value >= 60) return desc.high;
      if (value >= 40) return desc.mid;
      return desc.low;
    }

    if (value >= 60) return desc.high;
    if (value >= 40) return desc.mid;
    return desc.low;
  }

  /**
   * 获取所有属性的叙事描述
   * @returns {Object}
   */
  getAllDescriptions() {
    var result = {};
    var self = this;
    StatsSystem.getStatKeys().forEach(function(key) {
      result[key] = self.getDescription(key);
    });
    return result;
  }

  // ========== 历史记录 ==========

  /**
   * 获取变更历史
   * @returns {Array}
   */
  getHistory() {
    return this._history.slice();
  }

  /**
   * 获取指定属性的历史变更
   * @param {string} key - 属性名
   * @returns {Array}
   */
  getHistoryForStat(key) {
    return this._history.filter(function(h) {
      return h.changes && h.changes[key];
    }).map(function(h) {
      return {
        timestamp: h.timestamp,
        change: h.changes[key]
      };
    });
  }

  /**
   * 获取最近的 N 条变更记录
   * @param {number} count
   * @returns {Array}
   */
  getRecentHistory(count) {
    if (typeof count !== 'number' || count <= 0) count = 5;
    return this._history.slice(-count);
  }

  // ========== 里程碑 ==========

  /**
   * 检查并触发里程碑
   * @param {Object} appliedChanges
   */
  _checkMilestones(appliedChanges) {
    var self = this;
    var keys = Object.keys(appliedChanges);

    keys.forEach(function(key) {
      var milestones = self._milestones[key];
      if (!milestones) return;

      var value = self._stats[key];

      milestones.forEach(function(ms) {
        if (self._unlockedMilestones.indexOf(ms.id) !== -1) return;

        var triggered = false;

        // 偏见属性：低值触发好里程碑，高值触发坏里程碑
        if (key === 'prejudice') {
          if (ms.threshold <= 40 && value <= ms.threshold) triggered = true;
          if (ms.threshold >= 60 && value >= ms.threshold) triggered = true;
        } else {
          if (ms.threshold >= 60 && value >= ms.threshold) triggered = true;
          if (ms.threshold <= 40 && value <= ms.threshold) triggered = true;
        }

        if (triggered) {
          self._unlockedMilestones.push(ms.id);
          if (window.EventBus) {
            window.EventBus.emit('milestoneReached', {
              id: ms.id,
              stat: key,
              title: ms.title,
              desc: ms.desc,
              value: value
            });
          }
        }
      });
    });
  }

  /**
   * 获取已解锁的里程碑列表
   * @returns {Array}
   */
  getUnlockedMilestones() {
    return this._unlockedMilestones.slice();
  }

  /**
   * 获取所有里程碑定义
   * @returns {Object}
   */
  getAllMilestones() {
    var result = {};
    var self = this;
    StatsSystem.getStatKeys().forEach(function(key) {
      result[key] = (self._milestones[key] || []).map(function(ms) {
        return {
          id: ms.id,
          title: ms.title,
          desc: ms.desc,
          threshold: ms.threshold,
          unlocked: self._unlockedMilestones.indexOf(ms.id) !== -1
        };
      });
    });
    return result;
  }

  // ========== 平衡分析 ==========

  /**
   * 检查属性平衡状况
   * @returns {Object} {balanced: boolean, spread: number, dominant: string|null, weak: string|null}
   */
  checkBalance() {
    var keys = StatsSystem.getStatKeys();
    var values = keys.map(function(key) { return this._stats[key]; }.bind(this));

    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);
    var spread = max - min;
    var avg = values.reduce(function(sum, v) { return sum + v; }, 0) / values.length;

    var dominant = null;
    var weak = null;

    keys.forEach(function(key) {
      if (this._stats[key] === max) dominant = key;
      if (this._stats[key] === min) weak = key;
    }.bind(this));

    return {
      balanced: spread <= 25,
      spread: spread,
      average: Math.round(avg),
      dominant: dominant,
      weak: weak
    };
  }

  /**
   * 获取属性倾向分析
   * @returns {Object} 倾向描述
   */
  getTendency() {
    var balance = this.checkBalance();
    var stats = this.getStats();

    // 判断整体倾向
    var positive = (stats.understanding + stats.witness + stats.respect) / 3;
    var negative = stats.prejudice;

    if (positive >= 65 && negative <= 35) {
      return { type: 'enlightened', label: '觉悟之路', desc: '你的心灵正在走向光明与理解' };
    }
    if (negative >= 65 && positive <= 35) {
      return { type: 'darkened', label: '阴影之路', desc: '偏见蒙蔽了你的双眼，难以看到真相' };
    }
    if (balance.balanced) {
      return { type: 'balanced', label: '中庸之道', desc: '你在各种力量之间保持着微妙的平衡' };
    }
    if (stats.understanding >= 70) {
      return { type: 'seeker', label: '求索之路', desc: '你执着于寻找真理和理解' };
    }
    if (stats.witness >= 70) {
      return { type: 'witness', label: '见证之路', desc: '你选择用眼睛去看这个世界的真实' };
    }
    if (stats.respect >= 70) {
      return { type: 'compassionate', label: '慈悲之路', desc: '你以尊重和善意对待每一个灵魂' };
    }

    return { type: 'wandering', label: '徘徊之路', desc: '你仍在摸索自己的方向' };
  }

  // ========== 静态方法 ==========

  /**
   * 获取属性的中文标签映射
   * @param {string} key
   * @returns {string}
   */
  static getLabel(key) {
    var labels = {
      understanding: '理解',
      witness: '见证',
      respect: '尊重',
      prejudice: '偏见'
    };
    return labels[key] || key;
  }

  /**
   * 获取所有属性名列表
   * @returns {string[]}
   */
  static getStatKeys() {
    return ['understanding', 'witness', 'respect', 'prejudice'];
  }

  // ========== 变更摘要 ==========

  /**
   * 获取最近的属性变更摘要（人类可读）
   * @param {number} count - 获取最近几条，默认 5
   * @returns {Object[]} [{ time, description }] 摘要列表
   */
  getRecentChangeSummary(count) {
    if (typeof count !== 'number' || count <= 0) count = 5;
    var recent = this._history.slice(-count);
    var summaries = [];

    for (var i = 0; i < recent.length; i++) {
      var record = recent[i];
      var parts = [];
      var changeKeys = Object.keys(record.changes);

      for (var j = 0; j < changeKeys.length; j++) {
        var key = changeKeys[j];
        var change = record.changes[key];
        var label = StatsSystem.getLabel(key);
        var sign = change.delta > 0 ? '+' : '';
        parts.push(label + ' ' + sign + change.delta + ' (' + change.from + '→' + change.to + ')');
      }

      var timeAgo = this._formatTimeAgo(record.timestamp);
      summaries.push({
        time: timeAgo,
        description: parts.join('，'),
        changes: record.changes
      });
    }

    return summaries;
  }

  /**
   * 格式化时间差为可读文本
   * @param {number} timestamp
   * @returns {string}
   */
  _formatTimeAgo(timestamp) {
    var diff = Date.now() - timestamp;
    var seconds = Math.floor(diff / 1000);

    if (seconds < 60) return '刚刚';
    var minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + ' 分钟前';
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' 小时前';
    var days = Math.floor(hours / 24);
    return days + ' 天前';
  }

  /**
   * 获取里程碑解锁摘要
   * @returns {Object[]} [{ id, title, desc, stat, unlocked }]
   */
  getMilestoneSummary() {
    var result = [];
    var keys = StatsSystem.getStatKeys();

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var milestones = this._milestones[key];
      if (!milestones) continue;

      for (var j = 0; j < milestones.length; j++) {
        var ms = milestones[j];
        var unlocked = this._unlockedMilestones.indexOf(ms.id) !== -1;
        result.push({
          id: ms.id,
          title: ms.title,
          desc: ms.desc,
          stat: key,
          statLabel: StatsSystem.getLabel(key),
          threshold: ms.threshold,
          unlocked: unlocked,
          currentValue: this._stats[key]
        });
      }
    }

    return result;
  }

  // ========== 序列化 ==========

  /**
   * 序列化为 JSON 兼容对象
   * @returns {Object}
   */
  toJSON() {
    var historyCopy = this._history.map(function(h) {
      var changesCopy = {};
      var keys = Object.keys(h.changes);
      for (var i = 0; i < keys.length; i++) {
        changesCopy[keys[i]] = {
          from: h.changes[keys[i]].from,
          to: h.changes[keys[i]].to,
          delta: h.changes[keys[i]].delta
        };
      }
      return { timestamp: h.timestamp, changes: changesCopy };
    });

    return {
      stats: {
        understanding: this._stats.understanding,
        witness: this._stats.witness,
        respect: this._stats.respect,
        prejudice: this._stats.prejudice
      },
      history: historyCopy,
      unlockedMilestones: this._unlockedMilestones.slice()
    };
  }

  /**
   * 从序列化数据恢复
   * @param {Object} data - toJSON() 的输出
   */
  fromJSON(data) {
    if (!data) return;

    if (data.stats) {
      var keys = Object.keys(data.stats);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key in this._stats) {
          this._stats[key] = Math.max(0, Math.min(100, Math.round(data.stats[key])));
        }
      }
    }

    if (data.history) {
      this._history = data.history.map(function(h) {
        var changesCopy = {};
        if (h.changes) {
          var changeKeys = Object.keys(h.changes);
          for (var j = 0; j < changeKeys.length; j++) {
            var ck = changeKeys[j];
            changesCopy[ck] = {
              from: h.changes[ck].from,
              to: h.changes[ck].to,
              delta: h.changes[ck].delta
            };
          }
        }
        return { timestamp: h.timestamp || Date.now(), changes: changesCopy };
      });
    }

    if (data.unlockedMilestones) {
      this._unlockedMilestones = data.unlockedMilestones.slice();
    }
  }

  /**
   * 重置所有属性到默认值
   */
  reset() {
    this._stats = {
      understanding: 50,
      witness: 50,
      respect: 50,
      prejudice: 50
    };
    this._history = [];
    this._unlockedMilestones = [];
  }
}

// 导出（全局 + AMD/CommonJS 兼容）
if (typeof window !== 'undefined') {
  window.StatsSystem = StatsSystem;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StatsSystem;
}
