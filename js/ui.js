/**
 * GameUI — 中央 UI 控制器
 * 连接所有 UI 元素：侧边栏、通知、章节过渡、历史面板、存档模态框、结局屏幕
 */
class GameUI {
  /**
   * @param {StoryEngine} engine
   */
  constructor(engine) {
    this._engine = engine;

    // 状态
    this._historyOpen = false;
    this._modalOpen = false;
    this._chapterTransitioning = false;

    // 通知队列
    this._notificationQueue = [];
    this._notificationActive = false;

    // 初始化
    this._initSidebar();
    this._bindEvents();
    this._bindTopBarButtons();
    this._bindKeyboard();
    this._bindTouch();
  }

  // ========== 侧边栏 ==========

  _initSidebar() {
    var statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    var statKeys = StatsSystem.getStatKeys();
    var stats = this._engine.statsSystem.getStats();

    statsSection.innerHTML = '<h3>内心</h3>';

    statKeys.forEach(function(key) {
      var value = stats[key];
      var label = StatsSystem.getLabel(key);

      var item = document.createElement('div');
      item.className = 'stat-item';
      item.dataset.stat = key;

      item.innerHTML =
        '<div class="stat-label">' +
          '<span>' + label + '</span>' +
          '<span class="stat-value">' + value + '</span>' +
        '</div>' +
        '<div class="stat-bar">' +
          '<div class="stat-bar-fill stat-' + key + '" style="width: ' + value + '%"></div>' +
        '</div>';

      statsSection.appendChild(item);
    });

    this._initRelationsPanel();
    this._initMobileStatsDrawer(stats, statKeys);
  }

  updateStatsSidebar(stats) {
    if (!stats) stats = this._engine.statsSystem.getStats();

    var statKeys = StatsSystem.getStatKeys();
    statKeys.forEach(function(key) {
      var value = stats[key];

      var item = document.querySelector('#stats-sidebar .stat-item[data-stat="' + key + '"]');
      if (item) {
        var valueEl = item.querySelector('.stat-value');
        var fillEl = item.querySelector('.stat-bar-fill');
        if (valueEl) valueEl.textContent = value;
        if (fillEl) fillEl.style.width = value + '%';
      }

      var mobileItem = document.querySelector('#mobile-stats-drawer .stat-item[data-stat="' + key + '"]');
      if (mobileItem) {
        var mobileValueEl = mobileItem.querySelector('.stat-value');
        var mobileFillEl = mobileItem.querySelector('.stat-bar-fill');
        if (mobileValueEl) mobileValueEl.textContent = value;
        if (mobileFillEl) mobileFillEl.style.width = value + '%';
      }
    });
  }

  _initRelationsPanel() {
    var relationsPanel = document.querySelector('.relations-panel');
    if (!relationsPanel) return;

    var toggle = relationsPanel.querySelector('.relations-toggle');
    var list = relationsPanel.querySelector('.relations-list');
    if (!toggle || !list) return;

    toggle.addEventListener('click', function() {
      var expanded = toggle.classList.toggle('expanded');
      if (expanded) {
        list.classList.add('visible');
      } else {
        list.classList.remove('visible');
      }
    });

    this.updateRelationsPanel();
  }

  _initMobileStatsDrawer(stats, statKeys) {
    var drawer = document.getElementById('mobile-stats-drawer');
    if (!drawer) return;

    var content = drawer.querySelector('.mobile-stats-content');
    var toggle = drawer.querySelector('.mobile-stats-toggle');
    if (!content || !toggle) return;

    statKeys.forEach(function(key) {
      var value = stats[key];
      var label = StatsSystem.getLabel(key);

      var item = document.createElement('div');
      item.className = 'stat-item';
      item.dataset.stat = key;

      item.innerHTML =
        '<div class="stat-label">' +
          '<span>' + label + '</span>' +
          '<span class="stat-value">' + value + '</span>' +
        '</div>' +
        '<div class="stat-bar">' +
          '<div class="stat-bar-fill stat-' + key + '" style="width: ' + value + '%"></div>' +
        '</div>';

      content.appendChild(item);
    });

    var characters = this._engine.characterSystem.getAllCharacters();
    characters.forEach(function(char) {
      var relItem = document.createElement('div');
      relItem.className = 'relation-item';
      relItem.dataset.character = char.id;

      relItem.innerHTML =
        '<div class="relation-name">' + char.name + '</div>' +
        '<div class="relation-title">' + char.title + '</div>' +
        '<div class="relation-bars">' +
          '<div class="mini-bar">' +
            '<div class="mini-label">好感</div>' +
            '<div class="mini-bar-track">' +
              '<div class="mini-bar-fill affection" style="width: ' + char.affection + '%"></div>' +
            '</div>' +
          '</div>' +
          '<div class="mini-bar">' +
            '<div class="mini-label">信任</div>' +
            '<div class="mini-bar-track">' +
              '<div class="mini-bar-fill trust" style="width: ' + char.trust + '%"></div>' +
            '</div>' +
          '</div>' +
        '</div>';

      content.appendChild(relItem);
    });

    toggle.addEventListener('click', function() {
      drawer.classList.toggle('expanded');
    });
  }

  updateRelationsPanel() {
    var list = document.querySelector('.relations-list');
    if (!list) return;

    var characters = this._engine.characterSystem.getAllCharacters();
    list.innerHTML = '';

    characters.forEach(function(char) {
      var item = document.createElement('div');
      item.className = 'relation-item';
      item.dataset.character = char.id;

      item.innerHTML =
        '<div class="relation-name">' + char.name + '</div>' +
        '<div class="relation-title">' + char.title + '</div>' +
        '<div class="relation-bars">' +
          '<div class="mini-bar">' +
            '<div class="mini-label">好感</div>' +
            '<div class="mini-bar-track">' +
              '<div class="mini-bar-fill affection" style="width: ' + char.affection + '%"></div>' +
            '</div>' +
          '</div>' +
          '<div class="mini-bar">' +
            '<div class="mini-label">信任</div>' +
            '<div class="mini-bar-track">' +
              '<div class="mini-bar-fill trust" style="width: ' + char.trust + '%"></div>' +
            '</div>' +
          '</div>' +
        '</div>';

      list.appendChild(item);
    });

    // 同步更新移动端抽屉中的关系信息
    var mobileDrawer = document.querySelector('#mobile-stats-drawer .mobile-stats-content');
    if (mobileDrawer) {
      var mobileRelItems = mobileDrawer.querySelectorAll('.relation-item');
      mobileRelItems.forEach(function(relItem) {
        var charId = relItem.dataset.character;
        var match = characters.find(function(c) { return c.id === charId; });
        if (match) {
          var affectionFill = relItem.querySelector('.mini-bar-fill.affection');
          var trustFill = relItem.querySelector('.mini-bar-fill.trust');
          if (affectionFill) affectionFill.style.width = match.affection + '%';
          if (trustFill) trustFill.style.width = match.trust + '%';
        }
      });
    }
  }

  // ========== 通知 ==========

  /**
   * 显示浮动通知（带队列支持）
   */
  showNotification(text, type) {
    this._notificationQueue.push({ text: text, type: type || 'stat-change' });
    if (!this._notificationActive) {
      this._processNotificationQueue();
    }
  }

  /**
   * 处理通知队列
   */
  _processNotificationQueue() {
    if (this._notificationQueue.length === 0) {
      this._notificationActive = false;
      return;
    }

    this._notificationActive = true;
    var item = this._notificationQueue.shift();
    this._renderNotification(item.text, item.type);

    var self = this;
    setTimeout(function() {
      self._processNotificationQueue();
    }, 600);
  }

  /**
   * 渲染单个通知元素
   */
  _renderNotification(text, type) {
    var notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = text;

    if (GameUI.isMobile()) {
      notification.style.left = '50%';
      notification.style.transform = 'translateX(-50%)';
      notification.style.top = '60px';
    } else {
      var sidebar = document.getElementById('stats-sidebar');
      if (sidebar) {
        var rect = sidebar.getBoundingClientRect();
        notification.style.left = (rect.right + 10) + 'px';
        notification.style.top = (rect.top + 20) + 'px';
      } else {
        notification.style.left = '240px';
        notification.style.top = '80px';
      }
    }

    document.body.appendChild(notification);

    setTimeout(function() {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 2100);
  }

  // ========== 章节过渡 ==========

  showChapterTransition(chapterNum, title) {
    return new Promise(function(resolve) {
      var overlay = document.getElementById('chapter-overlay');
      if (!overlay) { resolve(); return; }

      var numEl = overlay.querySelector('.chapter-number');
      var titleEl = overlay.querySelector('.chapter-title');

      if (numEl) numEl.textContent = '第' + chapterNum + '章';
      if (titleEl) titleEl.textContent = title;

      overlay.classList.add('visible');
      this._chapterTransitioning = true;

      setTimeout(function() {
        overlay.classList.remove('visible');
        this._chapterTransitioning = false;

        if (window.EventBus) {
          window.EventBus.emit('chapterTransitionDone', { chapter: chapterNum });
        }
        resolve();
      }.bind(this), 3000);
    }.bind(this));
  }

  // ========== 历史面板 ==========

  toggleHistory() {
    var panel = document.getElementById('history-panel');
    if (!panel) return;

    this._historyOpen = !this._historyOpen;

    if (this._historyOpen) {
      this._populateHistory();
      panel.classList.add('visible');
    } else {
      panel.classList.remove('visible');
    }
  }

  _populateHistory() {
    var listEl = document.getElementById('history-list');
    if (!listEl) return;

    var history = [];
    if (window._dialogueRenderer) {
      history = window._dialogueRenderer.getHistory();
    }

    listEl.innerHTML = '';

    if (history.length === 0) {
      listEl.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">暂无历史记录</div>';
      return;
    }

    history.forEach(function(entry) {
      var div = document.createElement('div');
      div.className = 'history-entry';

      if (entry.speaker) {
        var speakerDiv = document.createElement('div');
        speakerDiv.className = 'history-speaker';
        var charName = null;
        if (window._engine) {
          charName = window._engine.characterSystem.getName(entry.speaker);
        }
        speakerDiv.textContent = charName || entry.speaker;
        div.appendChild(speakerDiv);
      }

      var textDiv = document.createElement('div');
      textDiv.className = 'history-text';
      textDiv.textContent = entry.text;
      div.appendChild(textDiv);

      listEl.appendChild(div);
    });

    listEl.scrollTop = listEl.scrollHeight;
  }

  // ========== 存档/读档模态框 ==========

  showSaveModal(saveSystem) {
    this._showModal('存档', saveSystem, 'save');
  }

  showLoadModal(saveSystem) {
    this._showModal('读档', saveSystem, 'load');
  }

  _showModal(title, saveSystem, mode) {
    var overlay = document.getElementById('modal-overlay');
    var titleEl = document.getElementById('modal-title');
    var bodyEl = document.getElementById('modal-body');
    if (!overlay || !bodyEl) return;

    if (titleEl) titleEl.textContent = title;
    this._modalOpen = true;

    bodyEl.innerHTML = '';
    var self = this;

    for (var i = 0; i <= 5; i++) {
      var slotInfo = saveSystem.getSlotInfo(i);
      var slot = document.createElement('div');
      slot.className = 'save-slot' + (slotInfo.empty ? ' empty' : '');

      var isAuto = (i === 0);
      var slotLabel = isAuto ? '自动存档' : '存档 ' + i;

      var headerDiv = document.createElement('div');
      headerDiv.className = 'slot-header';

      var numberSpan = document.createElement('span');
      numberSpan.className = 'slot-number';
      numberSpan.textContent = slotLabel;

      if (isAuto) {
        var badge = document.createElement('span');
        badge.className = 'auto-badge';
        badge.textContent = '自动';
        numberSpan.appendChild(badge);
      }

      headerDiv.appendChild(numberSpan);

      if (!slotInfo.empty) {
        var timeSpan = document.createElement('span');
        timeSpan.className = 'slot-time';
        timeSpan.textContent = slotInfo.timestamp || '';
        headerDiv.appendChild(timeSpan);
      }

      slot.appendChild(headerDiv);

      var infoDiv = document.createElement('div');
      infoDiv.className = 'slot-info';
      infoDiv.textContent = slotInfo.empty ? '空' : (slotInfo.description || '第' + slotInfo.chapter + '章');
      slot.appendChild(infoDiv);

      (function(slotIndex, info) {
        slot.addEventListener('click', function() {
          if (mode === 'save') {
            saveSystem.save(slotIndex, self._engine);
            self._closeModal();
            self.showNotification('存档成功', 'stat-change');
          } else if (mode === 'load' && !info.empty) {
            saveSystem.load(slotIndex, self._engine);
            self._closeModal();
            if (window.EventBus) {
              window.EventBus.emit('gameLoaded', {});
            }
          }
        });
      })(i, slotInfo);

      bodyEl.appendChild(slot);
    }

    overlay.classList.add('visible');
  }

  _closeModal() {
    var overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.classList.remove('visible');
    }
    this._modalOpen = false;
  }

  // ========== 结局屏幕 ==========

  showEnding(endingType, endingTitle, endingText, stats) {
    var screen = document.getElementById('ending-screen');
    if (!screen) return;

    var typeEl = screen.querySelector('.ending-type');
    var titleEl = screen.querySelector('.ending-title');
    var textEl = screen.querySelector('.ending-text');
    var statsEl = screen.querySelector('.ending-stats');

    if (typeEl) typeEl.textContent = endingType || '';
    if (titleEl) titleEl.textContent = endingTitle || '';
    if (textEl) {
      textEl.textContent = '';
      // 分段渲染结局文本
      var paragraphs = (endingText || '').split('\n\n');
      paragraphs.forEach(function(para) {
        var p = document.createElement('p');
        p.className = 'ending-paragraph';
        p.textContent = para;
        textEl.appendChild(p);
      });
    }

    if (statsEl && stats) {
      statsEl.innerHTML = '';
      var statKeys = StatsSystem.getStatKeys();
      statKeys.forEach(function(key) {
        var statDiv = document.createElement('div');
        statDiv.className = 'ending-stat';
        statDiv.innerHTML =
          '<div class="ending-stat-label">' + StatsSystem.getLabel(key) + '</div>' +
          '<div class="ending-stat-value">' + (stats[key] || 0) + '</div>';
        statsEl.appendChild(statDiv);
      });

      // 添加游玩时间
      if (typeof this._engine.getPlayTimeFormatted === 'function') {
        var timeDiv = document.createElement('div');
        timeDiv.className = 'ending-stat ending-stat-time';
        timeDiv.innerHTML =
          '<div class="ending-stat-label">游玩时间</div>' +
          '<div class="ending-stat-value">' + this._engine.getPlayTimeFormatted() + '</div>';
        statsEl.appendChild(timeDiv);
      }

      // 添加选择次数
      if (typeof this._engine.getPlayStats === 'function') {
        var playStats = this._engine.getPlayStats();
        var choicesDiv = document.createElement('div');
        choicesDiv.className = 'ending-stat';
        choicesDiv.innerHTML =
          '<div class="ending-stat-label">抉择次数</div>' +
          '<div class="ending-stat-value">' + playStats.totalChoices + '</div>';
        statsEl.appendChild(choicesDiv);
      }
    }

    screen.classList.add('visible');
  }

  hideEnding() {
    var screen = document.getElementById('ending-screen');
    if (screen) {
      screen.classList.remove('visible');
    }
  }

  // ========== 章节指示器 ==========

  updateChapterIndicator(chapterNum, title) {
    var indicator = document.getElementById('chapter-indicator');
    if (indicator) {
      indicator.textContent = '第' + chapterNum + '章 — ' + (title || '');
    }
  }

  // ========== 事件绑定 ==========

  _bindEvents() {
    var self = this;

    this._engine.statsSystem.onStatsChanged(function(data) {
      self.updateStatsSidebar(data.stats);
    });

    this._engine.characterSystem.onRelationChanged(function() {
      self.updateRelationsPanel();
    });

    if (window.EventBus) {
      window.EventBus.on('showNotification', function(data) {
        self.showNotification(data.text, data.className);
      });

      window.EventBus.on('showDetailedStats', function() {
        self._showDetailedStatsModal();
      });
    }
  }

  _bindTopBarButtons() {
    var self = this;

    var btnHistory = document.getElementById('btn-history');
    if (btnHistory) {
      btnHistory.addEventListener('click', function() {
        self.toggleHistory();
      });
    }

    var btnHistoryIcon = document.getElementById('btn-history-icon');
    if (btnHistoryIcon) {
      btnHistoryIcon.addEventListener('click', function() {
        self.toggleHistory();
      });
    }

    var btnCloseHistory = document.getElementById('btn-close-history');
    if (btnCloseHistory) {
      btnCloseHistory.addEventListener('click', function() {
        self._historyOpen = false;
        var panel = document.getElementById('history-panel');
        if (panel) panel.classList.remove('visible');
      });
    }

    var btnSave = document.getElementById('btn-save');
    if (btnSave) {
      btnSave.addEventListener('click', function() {
        if (window._saveSystem) {
          self.showSaveModal(window._saveSystem);
        }
      });
    }

    var btnLoad = document.getElementById('btn-load');
    if (btnLoad) {
      btnLoad.addEventListener('click', function() {
        if (window._saveSystem) {
          self.showLoadModal(window._saveSystem);
        }
      });
    }

    var modalCloseBtns = document.querySelectorAll('#modal-overlay .modal-close');
    modalCloseBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        self._closeModal();
      });
    });

    var modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
          self._closeModal();
        }
      });
    }

    var btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', function() {
        self.hideEnding();
        if (window.EventBus) {
          window.EventBus.emit('restartGame', {});
        }
      });
    }

    var btnEndingStats = document.getElementById('btn-ending-stats');
    if (btnEndingStats) {
      btnEndingStats.addEventListener('click', function() {
        if (window.EventBus) {
          window.EventBus.emit('showDetailedStats', {});
        }
      });
    }
  }

  _bindKeyboard() {
    var self = this;

    document.addEventListener('keydown', function(e) {
      if (e.key === 'h' || e.key === 'H') {
        if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
        self.toggleHistory();
      }

      if (e.key === 'Escape') {
        if (self._modalOpen) {
          self._closeModal();
        } else if (self._historyOpen) {
          self._historyOpen = false;
          var panel = document.getElementById('history-panel');
          if (panel) panel.classList.remove('visible');
        }
      }
    });
  }

  _bindTouch() {
    var buttons = document.querySelectorAll('.top-btn, .modal-close, .ending-btn, .btn-start');
    buttons.forEach(function(btn) {
      btn.addEventListener('touchstart', function() {
        btn.classList.add('touch-active');
      }, { passive: true });
      btn.addEventListener('touchend', function() {
        btn.classList.remove('touch-active');
      }, { passive: true });
    });

    var continueIndicator = document.getElementById('continue-indicator');
    if (continueIndicator) {
      continueIndicator.addEventListener('touchstart', function(e) {
        if (e.target === continueIndicator) {
          e.preventDefault();
          continueIndicator.click();
        }
      });
    }
  }

  // ========== 详细属性模态框 ==========

  /**
   * 显示详细的属性分析模态框
   * 包含属性条、里程碑进度和叙事描述
   */
  _showDetailedStatsModal() {
    var overlay = document.getElementById('modal-overlay');
    var titleEl = document.getElementById('modal-title');
    var bodyEl = document.getElementById('modal-body');
    if (!overlay || !bodyEl) return;

    if (titleEl) titleEl.textContent = '内心旅程';
    this._modalOpen = true;
    bodyEl.innerHTML = '';

    var stats = this._engine.statsSystem.getStats();
    var statKeys = StatsSystem.getStatKeys();
    var self = this;

    // 属性条区域
    var statsContainer = document.createElement('div');
    statsContainer.className = 'detailed-stats-container';

    statKeys.forEach(function(key) {
      var value = stats[key];
      var label = StatsSystem.getLabel(key);
      var desc = self._engine.statsSystem.getDescription(key);
      var barHTML = self._renderStatBar(key, value);

      var section = document.createElement('div');
      section.className = 'detailed-stat-section';
      section.innerHTML =
        '<div class="detailed-stat-header">' +
          '<span class="detailed-stat-label">' + label + '</span>' +
          '<span class="detailed-stat-value">' + value + '</span>' +
        '</div>' +
        barHTML +
        '<div class="detailed-stat-desc">' + desc + '</div>';

      // 里程碑进度
      var milestoneData = self._engine.statsSystem.getMilestoneSummary();
      var relevantMilestones = milestoneData.filter(function(m) { return m.stat === key; });
      if (relevantMilestones.length > 0) {
        section.innerHTML += self._renderMilestoneProgress(key, relevantMilestones);
      }

      statsContainer.appendChild(section);
    });

    bodyEl.appendChild(statsContainer);

    // 倾向分析
    var tendency = this._engine.statsSystem.getTendency();
    var tendencyDiv = document.createElement('div');
    tendencyDiv.className = 'detailed-tendency';
    tendencyDiv.innerHTML =
      '<div class="tendency-label">' + tendency.label + '</div>' +
      '<div class="tendency-desc">' + tendency.desc + '</div>';
    bodyEl.appendChild(tendencyDiv);

    // 平衡分析
    var balance = this._engine.statsSystem.checkBalance();
    var balanceDiv = document.createElement('div');
    balanceDiv.className = 'detailed-balance';
    var balanceLabel = balance.balanced ? '平衡' : '失衡';
    balanceDiv.innerHTML =
      '<div class="balance-label">属性' + balanceLabel + '</div>' +
      '<div class="balance-desc">差距: ' + balance.spread + ' | 平均: ' + balance.average +
      (balance.dominant ? ' | 主导: ' + StatsSystem.getLabel(balance.dominant) : '') +
      (balance.weak ? ' | 弱项: ' + StatsSystem.getLabel(balance.weak) : '') + '</div>';
    bodyEl.appendChild(balanceDiv);

    // 最近变更摘要
    var recentChanges = this._engine.statsSystem.getRecentChangeSummary(3);
    if (recentChanges.length > 0) {
      var changesDiv = document.createElement('div');
      changesDiv.className = 'detailed-recent-changes';
      changesDiv.innerHTML = '<div class="changes-title">最近变化</div>';
      recentChanges.forEach(function(change) {
        var changeItem = document.createElement('div');
        changeItem.className = 'change-item';
        changeItem.innerHTML =
          '<span class="change-time">' + change.time + '</span>' +
          '<span class="change-desc">' + change.description + '</span>';
        changesDiv.appendChild(changeItem);
      });
      bodyEl.appendChild(changesDiv);
    }

    overlay.classList.add('visible');
  }

  /**
   * 渲染单个属性进度条 HTML
   * @param {string} key - 属性名
   * @param {number} value - 当前值
   * @returns {string} HTML 字符串
   */
  _renderStatBar(key, value) {
    var fillClass = 'stat-bar-fill stat-' + key;
    // 判断颜色倾向
    var colorStyle = '';
    if (key === 'prejudice') {
      if (value >= 70) colorStyle = 'background: #ff4444;';
      else if (value >= 50) colorStyle = 'background: #ff9944;';
      else colorStyle = 'background: #44bb44;';
    } else {
      if (value >= 70) colorStyle = 'background: #44bb44;';
      else if (value >= 40) colorStyle = 'background: #4a9eff;';
      else colorStyle = 'background: #ff9944;';
    }

    return '<div class="stat-bar detailed-bar">' +
      '<div class="' + fillClass + '" style="width: ' + value + '%; ' + colorStyle + '"></div>' +
    '</div>';
  }

  /**
   * 渲染里程碑进度点
   * @param {string} key - 属性名
   * @param {Object[]} milestones - 里程碑数据
   * @returns {string} HTML 字符串
   */
  _renderMilestoneProgress(key, milestones) {
    var dots = '<div class="milestone-progress">';
    dots += '<span class="milestone-progress-label">里程碑：</span>';

    milestones.forEach(function(ms) {
      var dotClass = 'milestone-dot';
      if (ms.unlocked) dotClass += ' unlocked';
      var title = ms.title + ' (' + ms.desc + ')';
      dots += '<span class="' + dotClass + '" title="' + title + '">●</span>';
    });

    dots += '</div>';
    return dots;
  }

  // ========== 响应式 ==========

  static isMobile() {
    return window.innerWidth <= 768;
  }
}

// 导出
if (typeof window !== 'undefined') {
  window.GameUI = GameUI;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameUI;
}
