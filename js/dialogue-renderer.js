/**
 * DialogueRenderer — 管理故事节点的渲染与打字机效果
 */
class DialogueRenderer {
  /**
   * @param {StoryEngine} engine - 引用 StoryEngine 实例
   */
  constructor(engine) {
    this._engine = engine;

    // DOM 引用
    this._dialogueContent = document.getElementById('dialogue-content');
    this._dialogueArea = document.getElementById('dialogue-area');
    this._continueIndicator = document.getElementById('continue-indicator');
    this._choiceArea = document.getElementById('choice-area');

    // 打字机状态
    this._typing = false;
    this._typingTimeout = null;
    this._currentTextEl = null;
    this._currentFullText = '';
    this._typingSpeed = 40;
    this._typingResolve = null;
    this._typingPaused = false;

    // 对话历史
    this._history = [];

    // 渲染计数
    this._renderCount = 0;

    // 说话者样式映射
    this._speakerColors = {
      doctor: '#4a9eff',
      nun: '#ff6b9d',
      teacher: '#ffd93d',
      youth: '#6bff8a',
      monk: '#c49bff',
      seminarian: '#ff9f43',
      narrator: '#999999'
    };

    // 绑定跳过事件
    this._bindSkipHandlers();
  }

  // ========== 公共方法 ==========

  /**
   * 渲染一个故事节点
   * @param {Object} node - 故事节点数据
   * @returns {Promise} 打字完成后 resolve
   */
  renderNode(node) {
    if (!node || !this._dialogueContent) return Promise.resolve();

    this._hideChoiceAndContinue();

    this._renderCount++;

    var entry = document.createElement('div');
    entry.className = 'dialogue-entry';
    entry.setAttribute('data-node-id', node.id || '');
    entry.setAttribute('data-entry-index', this._renderCount);

    // 添加入场动画类
    entry.classList.add('entry-appear');

    // 说话者标签
    if (node.speaker && node.speaker !== 'narrator') {
      var speakerEl = document.createElement('div');
      speakerEl.className = 'speaker-label';
      var charName = this._engine.characterSystem.getName(node.speaker);
      speakerEl.textContent = charName || node.speaker;

      // 应用说话者颜色
      var color = this._speakerColors[node.speaker];
      if (color) {
        speakerEl.style.borderLeftColor = color;
        speakerEl.style.color = color;
      }

      entry.appendChild(speakerEl);
      this._engine.characterSystem.setMet(node.speaker);
    }

    // 对话文本容器
    var textEl = document.createElement('div');
    textEl.className = 'dialogue-text';

    if (node.type === 'narration') {
      textEl.classList.add('narration');
    } else if (node.type === 'scene') {
      textEl.classList.add('scene-desc');
    }

    entry.appendChild(textEl);
    this._dialogueContent.appendChild(entry);

    // 记录历史
    this._history.push({
      speaker: node.speaker || null,
      text: node.text,
      type: node.type || 'dialogue',
      timestamp: Date.now(),
      nodeId: node.id || null,
      chapter: node.chapter || null
    });

    // 处理内联格式（如果文本包含格式标记则用 innerHTML）
    var formattedText = this._parseInlineFormatting(node.text);
    var hasFormatting = formattedText !== node.text;

    // 执行打字机效果
    var self = this;
    var typeContent = hasFormatting ? node.text : node.text;
    return this._typeText(textEl, typeContent, this._typingSpeed, hasFormatting, formattedText).then(function() {
      self._scrollToBottom();

      // 移除入场动画类（避免重排时重复动画）
      entry.classList.remove('entry-appear');

      if (window.EventBus) {
        window.EventBus.emit('dialogueFinished', { node: node });
      }
    });
  }

  /**
   * 获取对话历史
   * @returns {Array}
   */
  getHistory() {
    return this._history.slice();
  }

  /**
   * 获取指定章节的对话历史
   * @param {number} chapter
   * @returns {Array}
   */
  getHistoryByChapter(chapter) {
    return this._history.filter(function(h) {
      return h.chapter === chapter;
    });
  }

  /**
   * 搜索对话历史
   * @param {string} query
   * @returns {Array}
   */
  searchHistory(query) {
    if (!query) return [];
    var lowerQuery = query.toLowerCase();
    return this._history.filter(function(h) {
      return h.text.toLowerCase().indexOf(lowerQuery) !== -1;
    });
  }

  /**
   * 获取指定说话者的对话历史
   * @param {string} speaker
   * @returns {Array}
   */
  getHistoryBySpeaker(speaker) {
    return this._history.filter(function(h) {
      return h.speaker === speaker;
    });
  }

  /**
   * 清除所有对话条目（用于新游戏/读档）
   */
  clear() {
    if (this._dialogueContent) {
      this._dialogueContent.innerHTML = '';
    }
    this._history = [];
    this._renderCount = 0;
    this._hideChoiceAndContinue();
    this._cancelTyping();
  }

  /**
   * 重新渲染历史（从历史记录恢复对话界面）
   */
  restoreFromHistory() {
    if (!this._dialogueContent) return;

    this._dialogueContent.innerHTML = '';
    var count = 0;

    for (var i = 0; i < this._history.length; i++) {
      var h = this._history[i];
      var entry = document.createElement('div');
      entry.className = 'dialogue-entry';
      entry.setAttribute('data-restored', 'true');

      // 说话者标签
      if (h.speaker && h.speaker !== 'narrator') {
        var speakerEl = document.createElement('div');
        speakerEl.className = 'speaker-label';
        var charName = this._engine.characterSystem.getName(h.speaker);
        speakerEl.textContent = charName || h.speaker;
        var color = this._speakerColors[h.speaker];
        if (color) {
          speakerEl.style.borderLeftColor = color;
          speakerEl.style.color = color;
        }
        entry.appendChild(speakerEl);
      }

      var textEl = document.createElement('div');
      textEl.className = 'dialogue-text';
      if (h.type === 'narration') textEl.classList.add('narration');
      if (h.type === 'scene') textEl.classList.add('scene-desc');
      textEl.textContent = h.text;
      // 应用内联格式（恢复历史时也需格式化）
      var formatted = self._parseInlineFormatting(h.text);
      if (formatted !== h.text) {
        textEl.innerHTML = formatted;
      }

      entry.appendChild(textEl);
      this._dialogueContent.appendChild(entry);
      count++;
    }

    this._renderCount = count;
    this._scrollToBottom();
  }

  showContinue() {
    if (this._continueIndicator) {
      this._continueIndicator.classList.add('visible');
    }
  }

  hideContinue() {
    if (this._continueIndicator) {
      this._continueIndicator.classList.remove('visible');
    }
  }

  isTyping() {
    return this._typing;
  }

  /**
   * 跳过当前打字动画，立即显示完整文本
   */
  skip() {
    if (!this._typing) return;

    this._cancelTyping();

    if (this._currentTextEl && this._currentFullText) {
      this._currentTextEl.textContent = this._currentFullText;
      var cursor = this._currentTextEl.querySelector('.typing-cursor');
      if (cursor) cursor.remove();
    }

    this._typing = false;
    this._currentTextEl = null;
    this._currentFullText = '';

    if (this._typingResolve) {
      this._typingResolve();
      this._typingResolve = null;
    }

    this._scrollToBottom();
  }

  /**
   * 暂停打字
   */
  pauseTyping() {
    if (this._typing && !this._typingPaused) {
      this._typingPaused = true;
      this._cancelTyping();
    }
  }

  /**
   * 恢复打字
   */
  resumeTyping() {
    if (this._typing && this._typingPaused) {
      this._typingPaused = false;
      this._resumeTypeText();
    }
  }

  setTypingSpeed(speed) {
    this._typingSpeed = Math.max(10, Math.min(200, speed));
  }

  /**
   * 获取渲染统计
   * @returns {Object}
   */
  getRenderStats() {
    var speakers = {};
    this._history.forEach(function(h) {
      var key = h.speaker || 'narrator';
      speakers[key] = (speakers[key] || 0) + 1;
    });

    return {
      totalEntries: this._history.length,
      renderCount: this._renderCount,
      speakers: speakers
    };
  }

  // ========== 内联格式解析 ==========

  /**
   * 解析内联文本格式标记，返回 HTML 字符串
   * 支持：*斜体*、**粗体**、_下划线_
   * @param {string} text - 原始文本
   * @returns {string} 带 HTML 标签的文本
   */
  _parseInlineFormatting(text) {
    if (!text || typeof text !== 'string') return text || '';

    var result = text;

    // 先处理 **粗体**（必须在 *斜体* 之前，避免冲突）
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // 再处理 *斜体*
    result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 最后处理 _下划线_（只匹配成对的下划线，且不跨越词边界）
    result = result.replace(/(^|\s)_(.+?)_(\s|$|[，。！？、；：])/g, function(match, pre, content, post) {
      return pre + '<u>' + content + '</u>' + post;
    });

    return result;
  }

  // ========== 序列化 ==========

  toJSON() {
    return {
      history: this._history.map(function(h) {
        return {
          speaker: h.speaker,
          text: h.text,
          type: h.type,
          timestamp: h.timestamp,
          nodeId: h.nodeId,
          chapter: h.chapter
        };
      }),
      renderCount: this._renderCount
    };
  }

  fromJSON(data) {
    if (!data || !data.history) return;
    this._history = data.history.slice();
    this._renderCount = data.renderCount || this._history.length;
  }

  // ========== 私有方法 ==========

  /**
   * 打字机效果
   */
  _typeText(element, text, speed, hasFormatting, formattedText) {
    return new Promise(function(resolve) {
      this._typing = true;
      this._typingPaused = false;
      this._currentTextEl = element;
      this._currentFullText = text;
      this._typingResolve = resolve;
      this._typeIndex = 0;
      this._hasFormatting = hasFormatting || false;
      this._formattedText = formattedText || text;

      var cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      this._typingCursor = cursor;

      this._typeStep(element, text, speed, cursor, resolve);
    }.bind(this));
  }

  /**
   * 执行单个打字步骤
   */
  _typeStep(element, text, speed, cursor, resolve) {
    if (!this._typing || this._typingPaused) return;

    if (this._typeIndex < text.length) {
      element.textContent = text.substring(0, this._typeIndex + 1);
      element.appendChild(cursor);
      this._typeIndex++;
      this._scrollToBottom();
      this._typingTimeout = setTimeout(function() {
        this._typeStep(element, text, speed, cursor, resolve);
      }.bind(this), speed);
    } else {
      // 打字完成后应用内联格式（如有）
      if (this._hasFormatting && this._formattedText) {
        element.innerHTML = this._formattedText;
      }
      if (cursor.parentNode) cursor.remove();
      this._typing = false;
      this._currentTextEl = null;
      this._currentFullText = '';
      this._typingResolve = null;
      this._typingCursor = null;
      resolve();
    }
  }

  /**
   * 恢复打字
   */
  _resumeTypeText() {
    if (!this._currentTextEl || !this._currentFullText) return;

    var element = this._currentTextEl;
    var text = this._currentFullText;
    var speed = this._typingSpeed;
    var cursor = this._typingCursor;
    var resolve = this._typingResolve;

    this._typeStep(element, text, speed, cursor, resolve);
  }

  _cancelTyping() {
    if (this._typingTimeout) {
      clearTimeout(this._typingTimeout);
      this._typingTimeout = null;
    }
  }

  _hideChoiceAndContinue() {
    if (this._choiceArea) {
      this._choiceArea.classList.remove('visible');
    }
    this.hideContinue();
  }

  /**
   * 平滑滚动对话区域到底部
   */
  _scrollToBottom() {
    if (!this._dialogueArea) return;

    var area = this._dialogueArea;
    if (typeof area.scrollTo === 'function') {
      area.scrollTo({
        top: area.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      area.scrollTop = area.scrollHeight;
    }
  }

  /**
   * 绑定跳过打字机的事件
   */
  _bindSkipHandlers() {
    var self = this;

    if (this._dialogueArea) {
      this._dialogueArea.addEventListener('click', function() {
        if (self._typing) {
          self.skip();
        }
      });

      this._dialogueArea.addEventListener('touchend', function(e) {
        if (self._typing) {
          e.preventDefault();
          self.skip();
        }
      });
    }

    document.addEventListener('keydown', function(e) {
      if (!self._typing) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        self.skip();
      }
    });

    if (window.EventBus) {
      window.EventBus.on('skipDialogue', function() {
        if (self._typing) {
          self.skip();
        }
      });
    }
  }
}

// 导出
if (typeof window !== 'undefined') {
  window.DialogueRenderer = DialogueRenderer;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DialogueRenderer;
}
