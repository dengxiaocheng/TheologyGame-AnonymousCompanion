/**
 * SaveSystem — localStorage 存档持久化
 * 5 个手动存档 + 1 个自动存档
 */
class SaveSystem {
  constructor() {
    this.SAVE_PREFIX = 'anonymous_companion_save_';
    this.SLOT_COUNT = 6;
    this.VERSION = 2;
    this.QUICK_SAVE_SLOT = 5;

    // 存档统计
    this._stats = {
      totalSaves: 0,
      totalLoads: 0,
      lastSaveTime: null,
      lastLoadTime: null
    };
  }

  // ========== 保存 ==========

  /**
   * 保存到指定槽位
   * @param {number} slotIndex
   * @param {StoryEngine} engine
   * @param {string} [description]
   * @returns {boolean}
   */
  save(slotIndex, engine, description) {
    if (slotIndex < 0 || slotIndex >= this.SLOT_COUNT) {
      console.error('[SaveSystem] Invalid slot index:', slotIndex);
      return false;
    }

    if (!engine || !engine.isStarted()) {
      console.warn('[SaveSystem] Cannot save: game not started');
      return false;
    }

    try {
      var chapterInfo = engine.getChapterInfo();
      var chapterDesc = chapterInfo ? '第' + chapterInfo.id + '章 — ' + chapterInfo.title : '';

      var saveData = {
        version: this.VERSION,
        timestamp: Date.now(),
        description: description || chapterDesc,
        chapter: engine.getState().currentChapter,
        engine: engine.toJSON(),
        dialogueHistory: []
      };

      if (window._dialogueRenderer) {
        var historyData = window._dialogueRenderer.toJSON();
        saveData.dialogueHistory = historyData.history || [];
      }

      var jsonStr = JSON.stringify(saveData);
      localStorage.setItem(this.SAVE_PREFIX + slotIndex, jsonStr);

      this._stats.totalSaves++;
      this._stats.lastSaveTime = Date.now();

      if (typeof engine.incrementSaveCount === 'function') {
        engine.incrementSaveCount();
      }

      console.log('[SaveSystem] Saved to slot ' + slotIndex);
      return true;
    } catch (e) {
      console.error('[SaveSystem] Save failed:', e);
      return false;
    }
  }

  /**
   * 自动存档（槽位 0）
   */
  autoSave(engine) {
    this.save(0, engine);
  }

  /**
   * 快速存档（使用专用槽位）
   */
  quickSave(engine) {
    return this.save(this.QUICK_SAVE_SLOT, engine, '快速存档');
  }

  /**
   * 快速读档
   */
  quickLoad(engine) {
    return this.load(this.QUICK_SAVE_SLOT, engine);
  }

  // ========== 加载 ==========

  /**
   * 从指定槽位加载
   * @param {number} slotIndex
   * @param {StoryEngine} engine
   * @returns {boolean}
   */
  load(slotIndex, engine) {
    if (slotIndex < 0 || slotIndex >= this.SLOT_COUNT) {
      console.error('[SaveSystem] Invalid slot index:', slotIndex);
      return false;
    }

    try {
      var jsonStr = localStorage.getItem(this.SAVE_PREFIX + slotIndex);
      if (!jsonStr) {
        console.warn('[SaveSystem] Slot ' + slotIndex + ' is empty');
        return false;
      }

      var saveData = JSON.parse(jsonStr);

      // 版本迁移
      if (saveData.version !== this.VERSION) {
        saveData = this._migrateSaveData(saveData);
      }

      if (saveData.engine) {
        if (window._storyData) {
          engine.loadStoryData(window._storyData);
        }
        engine.fromJSON(saveData.engine);
      }

      if (saveData.dialogueHistory && window._dialogueRenderer) {
        window._dialogueRenderer.fromJSON({ history: saveData.dialogueHistory });
      }

      this._stats.totalLoads++;
      this._stats.lastLoadTime = Date.now();

      if (typeof engine.incrementLoadCount === 'function') {
        engine.incrementLoadCount();
      }

      console.log('[SaveSystem] Loaded from slot ' + slotIndex);
      return true;
    } catch (e) {
      console.error('[SaveSystem] Load failed:', e);
      return false;
    }
  }

  // ========== 槽位信息 ==========

  getSlotInfo(slotIndex) {
    if (slotIndex < 0 || slotIndex >= this.SLOT_COUNT) {
      return { empty: true, timestamp: null, chapter: null, description: null };
    }

    try {
      var jsonStr = localStorage.getItem(this.SAVE_PREFIX + slotIndex);
      if (!jsonStr) {
        return { empty: true, timestamp: null, chapter: null, description: null };
      }

      var saveData = JSON.parse(jsonStr);
      return {
        empty: false,
        timestamp: this._formatTimestamp(saveData.timestamp),
        rawTimestamp: saveData.timestamp || null,
        chapter: saveData.chapter || null,
        description: saveData.description || null,
        version: saveData.version || null
      };
    } catch (e) {
      return { empty: true, timestamp: null, chapter: null, description: null };
    }
  }

  getAllSaves() {
    var saves = [];
    for (var i = 0; i < this.SLOT_COUNT; i++) {
      saves.push({
        slot: i,
        isAuto: (i === 0),
        isQuick: (i === this.QUICK_SAVE_SLOT),
        info: this.getSlotInfo(i)
      });
    }
    return saves;
  }

  /**
   * 获取存档大小估算（字节）
   * @param {number} slotIndex
   * @returns {number}
   */
  getSlotSize(slotIndex) {
    try {
      var jsonStr = localStorage.getItem(this.SAVE_PREFIX + slotIndex);
      return jsonStr ? jsonStr.length * 2 : 0;
    } catch (e) {
      return 0;
    }
  }

  /**
   * 获取存档总大小
   * @returns {number}
   */
  getTotalSize() {
    var total = 0;
    for (var i = 0; i < this.SLOT_COUNT; i++) {
      total += this.getSlotSize(i);
    }
    return total;
  }

  // ========== 删除 ==========

  deleteSave(slotIndex) {
    if (slotIndex < 0 || slotIndex >= this.SLOT_COUNT) return;
    localStorage.removeItem(this.SAVE_PREFIX + slotIndex);
    console.log('[SaveSystem] Deleted slot ' + slotIndex);
  }

  /**
   * 删除所有存档
   */
  deleteAllSaves() {
    for (var i = 0; i < this.SLOT_COUNT; i++) {
      localStorage.removeItem(this.SAVE_PREFIX + i);
    }
    console.log('[SaveSystem] All saves deleted');
  }

  // ========== 章节存档 ==========

  /**
   * 保存章节存档（在章节开始时自动创建）
   * @param {number} chapter
   * @param {StoryEngine} engine
   */
  saveChapterStart(chapter, engine) {
    var key = this.SAVE_PREFIX + 'chapter_' + chapter;
    try {
      var data = {
        version: this.VERSION,
        timestamp: Date.now(),
        chapter: chapter,
        engine: engine.toJSON(),
        dialogueHistory: []
      };

      if (window._dialogueRenderer) {
        var historyData = window._dialogueRenderer.toJSON();
        data.dialogueHistory = historyData.history || [];
      }

      localStorage.setItem(key, JSON.stringify(data));
      console.log('[SaveSystem] Chapter ' + chapter + ' start saved');
    } catch (e) {
      console.error('[SaveSystem] Chapter save failed:', e);
    }
  }

  /**
   * 加载章节存档
   * @param {number} chapter
   * @param {StoryEngine} engine
   * @returns {boolean}
   */
  loadChapterStart(chapter, engine) {
    var key = this.SAVE_PREFIX + 'chapter_' + chapter;
    try {
      var jsonStr = localStorage.getItem(key);
      if (!jsonStr) return false;

      var data = JSON.parse(jsonStr);
      if (data.engine) {
        if (window._storyData) {
          engine.loadStoryData(window._storyData);
        }
        engine.fromJSON(data.engine);
      }

      if (data.dialogueHistory && window._dialogueRenderer) {
        window._dialogueRenderer.fromJSON({ history: data.dialogueHistory });
      }

      console.log('[SaveSystem] Loaded chapter ' + chapter + ' start');
      return true;
    } catch (e) {
      console.error('[SaveSystem] Chapter load failed:', e);
      return false;
    }
  }

  /**
   * 检查章节存档是否存在
   * @param {number} chapter
   * @returns {boolean}
   */
  hasChapterSave(chapter) {
    var key = this.SAVE_PREFIX + 'chapter_' + chapter;
    return localStorage.getItem(key) !== null;
  }

  // ========== 导入/导出 ==========

  exportSave(engine) {
    try {
      var data = {
        version: this.VERSION,
        exportedAt: Date.now(),
        engine: engine.toJSON(),
        dialogueHistory: []
      };

      if (window._dialogueRenderer) {
        var historyData = window._dialogueRenderer.toJSON();
        data.dialogueHistory = historyData.history || [];
      }

      return JSON.stringify(data);
    } catch (e) {
      console.error('[SaveSystem] Export failed:', e);
      return null;
    }
  }

  importSave(jsonString, engine) {
    try {
      var data = JSON.parse(jsonString);

      if (!data.engine) {
        console.error('[SaveSystem] Import: no engine data');
        return false;
      }

      // 版本迁移
      if (data.version !== this.VERSION) {
        data = this._migrateSaveData(data);
      }

      if (window._storyData) {
        engine.loadStoryData(window._storyData);
      }

      engine.fromJSON(data.engine);

      if (data.dialogueHistory && window._dialogueRenderer) {
        window._dialogueRenderer.fromJSON({ history: data.dialogueHistory });
      }

      console.log('[SaveSystem] Import successful');
      return true;
    } catch (e) {
      console.error('[SaveSystem] Import failed:', e);
      return false;
    }
  }

  // ========== 迁移 ==========

  /**
   * 迁移旧版本存档数据
   * @param {Object} saveData
   * @returns {Object}
   */
  _migrateSaveData(saveData) {
    if (!saveData) return saveData;

    var version = saveData.version || 1;

    // V1 → V2: 添加 choiceHistory, visitedNodes 等新字段
    if (version < 2 && saveData.engine) {
      if (!saveData.engine.choiceHistory) {
        saveData.engine.choiceHistory = [];
      }
      if (!saveData.engine.visitedNodes) {
        saveData.engine.visitedNodes = [];
      }
      if (!saveData.engine.branchLog) {
        saveData.engine.branchLog = [];
      }
      if (!saveData.engine.statSnapshots) {
        saveData.engine.statSnapshots = [];
      }
      if (!saveData.engine.playStats) {
        saveData.engine.playStats = {
          startTime: saveData.timestamp || Date.now(),
          endTime: null,
          totalChoices: 0,
          nodesVisited: 0,
          chaptersReached: saveData.chapter ? [saveData.chapter] : [],
          saveCount: 0,
          loadCount: 0
        };
      }
    }

    saveData.version = this.VERSION;
    return saveData;
  }

  // ========== 统计 ==========

  /**
   * 获取存档统计
   * @returns {Object}
   */
  getStats() {
    return {
      totalSaves: this._stats.totalSaves,
      totalLoads: this._stats.totalLoads,
      lastSaveTime: this._stats.lastSaveTime,
      lastLoadTime: this._stats.lastLoadTime,
      totalSize: this.getTotalSize(),
      slotCount: this.SLOT_COUNT
    };
  }

  // ========== 工具方法 ==========

  _formatTimestamp(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    var pad = function(n) { return n < 10 ? '0' + n : '' + n; };
    return d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate()) +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
}

// 导出
if (typeof window !== 'undefined') {
  window.SaveSystem = SaveSystem;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SaveSystem;
}
