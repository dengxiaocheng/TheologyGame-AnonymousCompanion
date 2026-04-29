/**
 * main.js — 游戏入口点
 * 创建系统实例，初始化事件总线，协调标题屏幕过渡
 */
(function () {
  'use strict';

  // ========== 全局事件总线 ==========
  window.EventBus = {
    _listeners: {},

    on: function (event, callback) {
      if (!this._listeners[event]) {
        this._listeners[event] = [];
      }
      this._listeners[event].push(callback);
    },

    off: function (event, callback) {
      if (!this._listeners[event]) return;
      this._listeners[event] = this._listeners[event].filter(function (cb) { return cb !== callback; });
    },

    emit: function (event, data) {
      if (!this._listeners[event]) return;
      this._listeners[event].forEach(function (cb) {
        try {
          cb(data);
        } catch (e) {
          console.error('[EventBus] Error in listener for "' + event + '":', e);
        }
      });
    }
  };

  // ========== 系统实例 ==========
  var engine = null;
  var dialogueRenderer = null;
  var choiceSystem = null;
  var gameUI = null;
  var saveSystem = null;
  var endingSystem = null;

  // ========== 初始化 ==========
  function init() {
    console.log('[Game] Initializing...');

    // 创建引擎
    engine = new StoryEngine();

    // 创建渲染器
    dialogueRenderer = new DialogueRenderer(engine);

    // 创建选择系统
    choiceSystem = new ChoiceSystem(engine, function (choiceId) {
      handleChoice(choiceId);
    });

    // 创建 UI 控制器
    gameUI = new GameUI(engine);

    // 创建存档系统
    saveSystem = new SaveSystem();

    // 创建结局系统
    endingSystem = new EndingSystem();

    // 暴露全局引用（供 UI 和存档系统使用）
    window._engine = engine;
    window._dialogueRenderer = dialogueRenderer;
    window._saveSystem = saveSystem;
    window._storyData = window.STORY_DATA;

    // 全局别名（供测试和外部集成使用）
    window.game = {
      characters: engine.characterSystem ? engine.characterSystem.getAllCharacters() : [],
      save: function (slot) { saveSystem.save(slot, engine); },
      load: function (slot) { saveSystem.load(slot, engine); }
    };
    window.stats = engine.statsSystem ? engine.statsSystem.getStats() : {};
    window.saveGame = function (slot) { saveSystem.save(slot || 1, engine); };
    window.save = saveSystem;

    // 绑定事件
    bindEvents();

    // 绑定标题屏幕按钮
    var startBtn = document.querySelector('.btn-start');
    if (startBtn) {
      startBtn.addEventListener('click', startGame);
    }

    console.log('[Game] All systems initialized');
    console.log('[Game] StatsSystem:', typeof StatsSystem !== 'undefined' ? 'OK' : 'MISSING');
    console.log('[Game] CharacterSystem:', typeof CharacterSystem !== 'undefined' ? 'OK' : 'MISSING');
    console.log('[Game] StoryEngine:', typeof StoryEngine !== 'undefined' ? 'OK' : 'MISSING');
    console.log('[Game] DialogueRenderer:', typeof DialogueRenderer !== 'undefined' ? 'OK' : 'MISSING');
    console.log('[Game] ChoiceSystem:', typeof ChoiceSystem !== 'undefined' ? 'OK' : 'MISSING');
    console.log('[Game] GameUI:', typeof GameUI !== 'undefined' ? 'OK' : 'MISSING');
    console.log('[Game] SaveSystem:', typeof SaveSystem !== 'undefined' ? 'OK' : 'MISSING');
  }

  // ========== 事件绑定 ==========
  function bindEvents() {
    // 节点变更 → 渲染对话
    engine.on('nodeChanged', function (data) {
      processNode(data.node);
    });

    // 章节变更 → 显示章节过渡
    engine.on('chapterChanged', function (data) {
      if (data.info) {
        gameUI.updateChapterIndicator(data.chapter, data.info.title);
        gameUI.showChapterTransition(data.chapter, data.info.title);
      }

      // 章节开始时自动存档
      if (saveSystem && engine.isStarted()) {
        saveSystem.autoSave(engine);
      }

      // 记录章节遭遇
      _recordEncounter('chapter_start', {
        chapter: data.chapter,
        title: data.info ? data.info.title : '',
        timestamp: Date.now()
      });
    });

    // 游戏结束 → 评估结局并显示
    engine.on('gameEnded', function () {
      _onGameEnded();
    });

    // 继续指示器点击
    var continueIndicator = document.getElementById('continue-indicator');
    if (continueIndicator) {
      continueIndicator.addEventListener('click', function () {
        var node = engine.getCurrentNode();
        if (node && node.next) {
          dialogueRenderer.hideContinue();
          engine.advance(null);
        }
      });
    }

    // 对话完成 → 显示选择或继续
    if (window.EventBus) {
      window.EventBus.on('dialogueFinished', function () {
        var node = engine.getCurrentNode();
        if (!node) return;

        var availableChoices = engine.getAvailableChoices();
        if (availableChoices.length > 0) {
          choiceSystem.renderChoicesWithLocked(node.choices || [], availableChoices);
        } else if (node.next) {
          dialogueRenderer.showContinue();
        } else {
          // Final node reached — trigger game ending
          setTimeout(function () {
            engine.advance(null);
          }, 1500);
        }

        // 自动存档
        if (engine.isStarted()) {
          saveSystem.autoSave(engine);
        }
      });
    }

    // 读档事件
    if (window.EventBus) {
      window.EventBus.on('gameLoaded', function () {
        dialogueRenderer.clear();
        gameUI.updateStatsSidebar();
        gameUI.updateRelationsPanel();

        var chapterInfo = engine.getChapterInfo();
        if (chapterInfo) {
          gameUI.updateChapterIndicator(chapterInfo.id, chapterInfo.title);
        }

        var node = engine.getCurrentNode();
        if (node) {
          processNode(node);
        }
      });
    }

    // 重新开始
    if (window.EventBus) {
      window.EventBus.on('restartGame', function () {
        engine.reset();
        dialogueRenderer.clear();
        startGame();
      });
    }
  }

  // ========== 遭遇记录 ==========

  var _encounterLog = [];

  /**
   * 记录游戏遭遇事件
   * @param {string} type - 遭遇类型
   * @param {Object} data - 附加数据
   */
  function _recordEncounter(type, data) {
    _encounterLog.push({
      type: type,
      data: data || {},
      timestamp: Date.now()
    });

    // 限制日志大小
    if (_encounterLog.length > 200) {
      _encounterLog = _encounterLog.slice(-100);
    }

    if (window.EventBus) {
      window.EventBus.emit('encounterRecorded', { type: type, data: data });
    }
  }

  // ========== 游戏结束处理 ==========

  /**
   * 游戏结束的统一处理入口
   * 收集所有数据、触发结局、记录遭遇
   */
  function _onGameEnded() {
    var stats = engine.statsSystem.getStats();
    var characters = engine.characterSystem ? engine.characterSystem.getAllCharacters() : [];

    // 记录游戏结束遭遇
    _recordEncounter('game_ended', {
      stats: stats,
      playTime: engine.getPlayTimeFormatted ? engine.getPlayTimeFormatted() : 'unknown'
    });

    // 评估结局
    var ending = endingSystem.evaluate(stats, characters);

    // 生成扩展内容
    var epilogueHTML = endingSystem._buildEpilogueHTML(ending.id, stats, characters);
    var relationSummary = endingSystem._buildRelationSummary(characters);
    var statNarrative = endingSystem._buildStatNarrative(stats);

    // 触发结局展示
    gameUI.showEnding(ending.type, ending.title, ending.text.join('\n\n'), stats);

    // 通过事件总线发送扩展数据（供其他模块使用）
    if (window.EventBus) {
      window.EventBus.emit('endingDataReady', {
        ending: ending,
        epilogueHTML: epilogueHTML,
        relationSummary: relationSummary,
        statNarrative: statNarrative
      });
    }
  }

  // ========== 游戏启动 ==========
  function startGame() {
    console.log('[Game] Starting game...');

    // 加载剧情数据
    engine.loadStoryData(window.STORY_DATA);

    // 隐藏标题屏幕
    var titleScreen = document.getElementById('title-screen');
    if (titleScreen) {
      titleScreen.classList.add('hidden');
      setTimeout(function () {
        titleScreen.style.display = 'none';
      }, 800);
    }

    // 显示游戏容器
    var gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.classList.add('active');
    }

    // 开始游戏
    engine.startGame();
  }

  // ========== 节点处理 ==========

  /**
   * 处理故事节点：渲染对话文本
   */
  function processNode(node) {
    if (!node) return;
    dialogueRenderer.renderNode(node);
  }

  /**
   * 处理玩家选择
   */
  function handleChoice(choiceId) {
    // 记录选择遭遇
    _recordEncounter('choice_made', {
      choiceId: choiceId,
      nodeId: engine.getCurrentNode() ? engine.getCurrentNode().id : null,
      timestamp: Date.now()
    });
    engine.advance(choiceId);
  }

  // ========== DOM Ready ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
