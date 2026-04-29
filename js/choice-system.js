/**
 * ChoiceSystem — 管理玩家选择 UI
 */
class ChoiceSystem {
  /**
   * @param {StoryEngine} engine
   * @param {Function} onChoiceSelected - 选择后回调 (choiceId) => void
   */
  constructor(engine, onChoiceSelected) {
    this._engine = engine;
    this._onChoiceSelected = onChoiceSelected || function () {};

    // DOM 引用
    this._choiceArea = document.getElementById('choice-area');
    this._choiceList = document.getElementById('choice-list');

    // 状态
    this._currentChoices = [];
    this._disabled = false;
    this._selectedIndex = -1;

    // 键盘绑定
    this._bindKeyboard();
  }

  // ========== 公共方法 ==========

  /**
   * 渲染选项列表
   * @param {Object[]} choices - 已过滤的可见选项数组
   */
  renderChoices(choices) {
    if (!this._choiceList || !this._choiceArea) return;

    this._currentChoices = choices || [];
    this._disabled = false;
    this._selectedIndex = -1;

    // 清空
    this._choiceList.innerHTML = '';

    if (this._currentChoices.length === 0) {
      this._choiceArea.classList.remove('visible');
      return;
    }

    this._currentChoices.forEach(function (choice, index) {
      var btn = this._createChoiceButton(choice, index);
      this._choiceList.appendChild(btn);
    }.bind(this));

    this._choiceArea.classList.add('visible');
  }

  /**
   * 渲染包含锁定选项的完整列表
   * 获取所有选项（含未满足条件的），已解锁的正常显示，未解锁的以锁定样式显示
   * @param {Object[]} allChoices - 当前节点全部选项
   * @param {Object[]} availableChoices - 已过滤的可见选项
   */
  renderChoicesWithLocked(allChoices, availableChoices) {
    if (!this._choiceList || !this._choiceArea) return;

    this._currentChoices = availableChoices || [];
    this._disabled = false;
    this._selectedIndex = -1;

    this._choiceList.innerHTML = '';

    if (allChoices.length === 0) {
      this._choiceArea.classList.remove('visible');
      return;
    }

    // 构建可用选择 ID 集合
    var availableIds = new Set(availableChoices.map(function (c) { return c.id; }));

    allChoices.forEach(function (choice, index) {
      if (availableIds.has(choice.id)) {
        var btn = this._createChoiceButton(choice, index);
        this._choiceList.appendChild(btn);
      } else if (choice.condition) {
        // 检查是否"接近"满足条件（阈值差 <= 10）
        if (this._isNearCondition(choice.condition)) {
          var lockedBtn = this._renderLockedChoice(choice, index);
          this._choiceList.appendChild(lockedBtn);
        }
        // 否则完全隐藏
      }
    }.bind(this));

    if (this._choiceList.children.length > 0) {
      this._choiceArea.classList.add('visible');
    } else {
      this._choiceArea.classList.remove('visible');
    }
  }

  /**
   * 禁用所有选项（选择后使用）
   */
  disable() {
    this._disabled = true;
    var buttons = this._choiceList.querySelectorAll('.choice-btn');
    buttons.forEach(function (btn) {
      btn.style.pointerEvents = 'none';
    });
  }

  /**
   * 隐藏选择区域
   */
  hide() {
    if (this._choiceArea) {
      this._choiceArea.classList.remove('visible');
    }
  }

  /**
   * 应用选择效果（触发通知等）
   * @param {Object} effects - { stats: {...}, relations: {...} }
   */
  applyEffects(effects) {
    if (!effects) return;

    // 属性效果通知
    if (effects.stats) {
      var statKeys = Object.keys(effects.stats);
      statKeys.forEach(function (key) {
        var delta = effects.stats[key];
        var label = StatsSystem.getLabel(key);
        var sign = delta > 0 ? '+' : '';
        var type = delta > 0 ? 'stat-change' : 'stat-change negative';
        this._showNotification(label + ' ' + sign + delta, type);
      }.bind(this));
    }

    // 关系效果通知
    if (effects.relations) {
      Object.keys(effects.relations).forEach(function (charId) {
        var relChanges = effects.relations[charId];
        var charName = this._engine.characterSystem.getName(charId) || charId;
        if (relChanges.affection !== undefined) {
          var sign = relChanges.affection > 0 ? '+' : '';
          this._showNotification(charName + ' 好感 ' + sign + relChanges.affection, 'stat-change');
        }
        if (relChanges.trust !== undefined) {
          var sign2 = relChanges.trust > 0 ? '+' : '';
          this._showNotification(charName + ' 信任 ' + sign2 + relChanges.trust, 'stat-change');
        }
      }.bind(this));
    }
  }

  /**
   * 获取当前选项数量
   * @returns {number}
   */
  getChoiceCount() {
    return this._currentChoices.length;
  }

  /**
   * 获取当前选项数量
   * @returns {number}
   */
  getChoiceCount() {
    return this._currentChoices.length;
  }

  // ========== 选择摘要 ==========

  /**
   * 构建选项摘要文本（用于子标签预览）
   * @param {Object} choice - 选项对象
   * @returns {string} 摘要文本
   */
  _buildChoiceSummary(choice) {
    if (!choice) return '';

    var parts = [];

    // 效果预览
    if (choice.effects) {
      if (choice.effects.stats) {
        var statKeys = Object.keys(choice.effects.stats);
        for (var i = 0; i < statKeys.length; i++) {
          var key = statKeys[i];
          var delta = choice.effects.stats[key];
          var label = StatsSystem.getLabel(key);
          var sign = delta > 0 ? '+' : '';
          var direction = '';
          if (key === 'prejudice') {
            direction = delta > 0 ? ' (负面)' : ' (正面)';
          }
          parts.push(label + sign + delta + direction);
        }
      }

      if (choice.effects.relations) {
        var charIds = Object.keys(choice.effects.relations);
        for (var j = 0; j < charIds.length; j++) {
          var charId = charIds[j];
          var relChanges = choice.effects.relations[charId];
          var charName = this._engine.characterSystem.getName(charId) || charId;
          if (relChanges.affection !== undefined) {
            parts.push(charName + '好感' + (relChanges.affection > 0 ? '+' : '') + relChanges.affection);
          }
          if (relChanges.trust !== undefined) {
            parts.push(charName + '信任' + (relChanges.trust > 0 ? '+' : '') + relChanges.trust);
          }
        }
      }
    }

    // 条件提示
    if (choice.condition) {
      var condText = this._buildConditionHint(choice.condition);
      if (condText) {
        parts.push('⚠ ' + condText);
      }
    }

    return parts.join(' · ');
  }

  // ========== 私有方法 ==========

  /**
   * 创建选项按钮
   */
  _createChoiceButton(choice, index) {
    var btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.dataset.choiceId = choice.id;
    btn.dataset.index = index;

    // 错开淡入动画
    btn.style.opacity = '0';
    btn.style.transition = 'opacity 0.3s ease ' + (index * 100) + 'ms';
    setTimeout(function () {
      btn.style.opacity = '1';
    }, 10);

    // 序号
    var indexSpan = document.createElement('span');
    indexSpan.className = 'choice-index';
    indexSpan.textContent = (index + 1) + '.';

    btn.appendChild(indexSpan);
    btn.appendChild(document.createTextNode(choice.text));

    // 子标签：选择摘要预览
    var summaryText = this._buildChoiceSummary(choice);
    if (summaryText) {
      var subLabel = document.createElement('div');
      subLabel.className = 'choice-sub-label';
      subLabel.textContent = summaryText;
      subLabel.style.fontSize = '0.7rem';
      subLabel.style.color = 'var(--text-muted)';
      subLabel.style.marginTop = '0.2rem';
      subLabel.style.fontStyle = 'italic';
      btn.appendChild(subLabel);
    }

    // 效果预览（title 属性）
    if (choice.effects) {
      var preview = this._buildEffectPreview(choice.effects);
      if (preview) {
        btn.title = preview;
      }
    }

    // 点击事件
    var self = this;
    btn.addEventListener('click', function () {
      if (self._disabled) return;
      self._handleSelection(choice, btn);
    });

    return btn;
  }

  /**
   * 渲染一个锁定选项
   */
  _renderLockedChoice(choice, index) {
    var btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.dataset.choiceId = choice.id;
    btn.dataset.locked = 'true';

    btn.style.opacity = '0';
    btn.style.transition = 'opacity 0.3s ease ' + (index * 100) + 'ms';
    setTimeout(function () {
      btn.style.opacity = '1';
    }, 10);

    // 锁定样式
    btn.style.borderColor = 'var(--bg-primary)';
    btn.style.color = 'var(--text-muted)';
    btn.style.cursor = 'not-allowed';
    btn.style.pointerEvents = 'none';

    var indexSpan = document.createElement('span');
    indexSpan.className = 'choice-index';
    indexSpan.textContent = (index + 1) + '.';

    btn.appendChild(indexSpan);
    btn.appendChild(document.createTextNode(choice.text));

    // 条件提示
    var hint = document.createElement('div');
    hint.style.fontSize = '0.7rem';
    hint.style.color = 'var(--text-muted)';
    hint.style.marginTop = '0.3rem';
    hint.style.fontStyle = 'italic';
    hint.textContent = this._buildConditionHint(choice.condition);
    btn.appendChild(hint);

    return btn;
  }

  /**
   * 处理选择
   */
  _handleSelection(choice, btnEl) {
    // 标记选中
    btnEl.classList.add('selected');

    // 禁用所有按钮
    this.disable();

    // 应用效果通知
    this.applyEffects(choice.effects);

    var self = this;
    setTimeout(function () {
      self.hide();
      self._onChoiceSelected(choice.id);
    }, 300);
  }

  /**
   * 构建效果预览文本
   */
  _buildEffectPreview(effects) {
    var parts = [];

    if (effects.stats) {
      Object.keys(effects.stats).forEach(function (key) {
        var delta = effects.stats[key];
        var label = StatsSystem.getLabel(key);
        parts.push(label + (delta > 0 ? '+' : '') + delta);
      });
    }

    if (effects.relations) {
      Object.keys(effects.relations).forEach(function (charId) {
        var relChanges = effects.relations[charId];
        var charName = this._engine.characterSystem.getName(charId) || charId;
        if (relChanges.affection !== undefined) {
          parts.push(charName + '好感' + (relChanges.affection > 0 ? '+' : '') + relChanges.affection);
        }
        if (relChanges.trust !== undefined) {
          parts.push(charName + '信任' + (relChanges.trust > 0 ? '+' : '') + relChanges.trust);
        }
      }.bind(this));
    }

    return parts.join(', ') || null;
  }

  /**
   * 构建条件提示文本
   */
  _buildConditionHint(condition) {
    if (!condition) return '';

    if (condition.stat) {
      var label = StatsSystem.getLabel(condition.stat);
      if (condition.min !== undefined) {
        return '需要 ' + label + ' > ' + condition.min;
      }
      if (condition.max !== undefined) {
        return '需要 ' + label + ' < ' + condition.max;
      }
    }

    if (condition.flag) {
      return '需要满足特定条件';
    }

    if (condition.relation) {
      var charName = this._engine.characterSystem.getName(condition.relation.character) || '';
      var field = condition.relation.field === 'trust' ? '信任' : '好感';
      if (condition.relation.min !== undefined) {
        return '需要 ' + charName + field + ' > ' + condition.relation.min;
      }
    }

    return '';
  }

  /**
   * 检查条件是否"接近"满足（阈值差 <= 10）
   */
  _isNearCondition(condition) {
    if (!condition) return false;

    if (condition.stat) {
      var value = this._engine.statsSystem.getStat(condition.stat);
      if (value === null) return false;
      if (condition.min !== undefined && value >= condition.min - 10 && value < condition.min) return true;
      if (condition.max !== undefined && value <= condition.max + 10 && value > condition.max) return true;
    }

    if (condition.relation) {
      var char = this._engine.characterSystem.getCharacter(condition.relation.character);
      if (!char) return false;
      var fieldValue = char[condition.relation.field || 'affection'];
      if (condition.relation.min !== undefined && fieldValue >= condition.relation.min - 10 && fieldValue < condition.relation.min) return true;
    }

    return false;
  }

  /**
   * 显示浮动通知
   */
  _showNotification(text, className) {
    if (!window.EventBus) return;
    window.EventBus.emit('showNotification', { text: text, className: className });
  }

  /**
   * 绑定键盘快捷键
   */
  _bindKeyboard() {
    var self = this;

    document.addEventListener('keydown', function (e) {
      if (self._disabled) return;
      if (!self._choiceArea || !self._choiceArea.classList.contains('visible')) return;

      // 数字键 1-9 选择对应选项
      var num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9 && num <= self._currentChoices.length) {
        e.preventDefault();
        var btnIndex = num - 1;
        var buttons = self._choiceList.querySelectorAll('.choice-btn:not([data-locked])');
        if (buttons[btnIndex]) {
          var choiceId = buttons[btnIndex].dataset.choiceId;
          var choice = self._currentChoices.find(function (c) { return c.id === choiceId; });
          if (choice) {
            self._handleSelection(choice, buttons[btnIndex]);
          }
        }
      }
    });
  }
}

// 导出
if (typeof window !== 'undefined') {
  window.ChoiceSystem = ChoiceSystem;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChoiceSystem;
}
