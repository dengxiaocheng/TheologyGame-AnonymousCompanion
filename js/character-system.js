/**
 * CharacterSystem — 管理 6 个 NPC 的关系数据
 * 每个角色包含：id、名称、头衔、描述、好感度 (0-100)、信任度 (0-100)
 * 扩展：背景故事、角色弧线、语录、邂逅摘要、关系里程碑
 */
class CharacterSystem {
  constructor() {
    this._characters = {};
    this._listeners = [];
    this._encounters = {};   // { characterId: [{ chapter, nodeId, summary }] }
    this._milestones = {};   // { characterId: [milestoneId, ...] }
    this._initCharacters();
  }

  /**
   * 初始化所有 6 个角色
   */
  _initCharacters() {
    const characters = [
      {
        id: 'doctor',
        name: '医生',
        title: '不信神的医者',
        description: '不信教，但长期照顾贫困病人。用行动而非言语定义信仰。',
        affection: 50,
        trust: 50,
        met: false,
        backstory: '在成为医生之前，他曾在一所神学院读过两年书。后来他选择了听诊器而非十字架——不是因为他否定了信仰的价值，而是因为他觉得如果上帝存在，上帝更希望他去缝合伤口而不是念祈祷文。妻子的离世让他彻底关上了教堂的门，但他从未停止过开门接诊。',
        arc: [
          { phase: 'initial', description: '冷淡而专业，对信仰话题明显回避' },
          { phase: 'warming', description: '开始愿意谈论自己的过去，偶尔流露出幽默' },
          { phase: 'trusting', description: '坦诚自己的伤痛，承认也许有某些超越理性的东西存在' },
          { phase: 'bonded', description: '尊重你的信仰立场，虽然他自己仍然无法相信' }
        ],
        quotes: [
          '我不需要上帝来告诉我该帮助谁。',
          '你知道吗，祈祷治不好骨折。',
          '也许……有些东西是我这座手术室装不下的。',
          '你信你的，我做我的。我们都在救人，这就够了。'
        ]
      },
      {
        id: 'nun',
        name: '修女',
        title: '祈祷的双手',
        description: '信仰坚定，但一开始对非基督徒缺乏理解。在服侍中学习谦卑。',
        affection: 50,
        trust: 50,
        met: false,
        backstory: '她十七岁进入修道院，至今已经服侍了二十年。她见过贫穷、疾病和死亡，但很少走出教会的框架去理解"外面"的人。她不是不善良——恰恰相反，她的善良太过确定，以至于有时会变成一种无意识的傲慢。灾难逼迫她直面一个问题：上帝的恩典，是否真的只属于教堂里的人？',
        arc: [
          { phase: 'initial', description: '虔诚但有些教条，倾向于用信仰框架评判他人' },
          { phase: 'warming', description: '开始倾听不同的声音，发现善良可以有很多面孔' },
          { phase: 'trusting', description: '质疑自己过去的某些判断，学会在祷告中安静' },
          { phase: 'bonded', description: '信仰更深但更柔软，学会了不以标签定义人' }
        ],
        quotes: [
          '我会为你祷告的。——哪怕你不需要。',
          '上帝的恩典不是我们分的蛋糕。',
          '我祈祷了二十年，最近才学会一件事：闭嘴，然后听。',
          '也许谦卑不是认为自己不够好，而是承认上帝比我想的更大。'
        ]
      },
      {
        id: 'teacher',
        name: '教师',
        title: '无声的守护者',
        description: '自称无神论者，却坚持为弱势儿童服务。行善不问缘由。',
        affection: 50,
        trust: 50,
        met: false,
        backstory: '他从不谈论自己的信仰或没有信仰——他只是做事。在灾难发生之前，他经营着一所面向流动儿童的小型学校。没有经费、没有赞助，只有一间借来的教室和他自己。有人问他为什么要这样做，他说："因为他们在那里。"他是那种让你困惑的人：不信上帝，却活得比很多信徒更像福音书的描述。',
        arc: [
          { phase: 'initial', description: '沉默寡言，用行动代替言语，对信仰话题不感兴趣' },
          { phase: 'warming', description: '偶尔分享自己的想法，对真诚的人展现出温和的一面' },
          { phase: 'trusting', description: '承认善良也许需要一个源头，虽然他不确定那是什么' },
          { phase: 'bonded', description: '接受彼此的不同，认为行动比标签更重要' }
        ],
        quotes: [
          '别问我为什么，问那些孩子需要什么。',
          '信仰？我只知道天亮了该去上课。',
          '如果你们上帝真的存在，我想他不会介意我多做了一点。',
          '我不信教，但我信你。这算不算一种信仰？'
        ]
      },
      {
        id: 'youth',
        name: '青年基督徒',
        title: '迷失的羊',
        description: '熟悉信仰语言，却逃避责任。在灾难中寻找真正的信念。',
        affection: 50,
        trust: 50,
        met: false,
        backstory: '他在教会长大，能背诵整篇罗马书，却在现实生活中找不到立足之地。大学毕业后他漂泊了几年，做过销售、送过外卖、在朋友的创业公司打过杂。灾难发生时他正在逃避家庭的期待——包括成为一个"好基督徒"的期待。他知道所有正确的答案，但他不确定自己是否真的相信其中任何一个。',
        arc: [
          { phase: 'initial', description: '用属灵语言掩饰逃避，表面热忱但内心迷茫' },
          { phase: 'warming', description: '开始诚实面对自己的恐惧和不确定' },
          { phase: 'trusting', description: '放下完美基督徒的面具，承认信仰中的挣扎' },
          { phase: 'bonded', description: '找到一种不完美但真实的信念，开始承担责任' }
        ],
        quotes: [
          '我从小就知道该怎么回答，但从没人教我怎么去相信。',
          '祷告对我来说就像说母语——太熟练了，以至于忘记了它在说什么。',
          '也许上帝不需要我完美，只需要我真实。',
          '我终于明白了：信心不是没有疑问，是带着疑问往前走。'
        ]
      },
      {
        id: 'monk',
        name: '僧人',
        title: '慈悲的行者',
        description: '在灾难中救助陌生人。不同信仰之间，以行动回应苦难。',
        affection: 50,
        trust: 50,
        met: false,
        backstory: '他在一座山间寺庙修行了十五年，地震发生时他正在山下化缘。他没有犹豫就加入了救援——对他来说，救助苦难中的众生是最基本的修行。他从不试图让别人接受他的信仰，但他的存在本身就提出了一个安静的问题：如果慈悲不需要正确答案，那慈悲本身是否就是答案？',
        arc: [
          { phase: 'initial', description: '平静、慈悲，对所有人的苦难一视同仁' },
          { phase: 'warming', description: '开始分享修行中的体悟，对不同信仰展现出深层尊重' },
          { phase: 'trusting', description: '探讨信仰之间的共通之处，承认自己也有困惑' },
          { phase: 'bonded', description: '成为跨越信仰边界的桥梁，证明善良不分宗教' }
        ],
        quotes: [
          '苦难面前，菩萨和上帝都不说话，只有人的手在动。',
          '你的十字架和我的念珠，也许指向同一轮月亮。',
          '真正的慈悲不需要理由，就像真正的信仰不需要证明。',
          '渡人者自渡。也许我们都在同一条河上。'
        ]
      },
      {
        id: 'seminarian',
        name: '神学生',
        title: '书本与恐惧之间',
        description: '懂教义，却害怕真实的人。知识与实践之间的挣扎。',
        affection: 50,
        trust: 50,
        met: false,
        backstory: '他是神学院的高材生，系统神学考试永远是第一名。但当他被派到灾区实习时，他发现自己所有的知识在面对一个哭泣的孩子时毫无用处。他害怕的不是考试，而是那些活生生的人——因为他们会问教科书上没有的问题，会做出教义框架之外的善行，会让他怀疑自己学到的到底是信仰还是只是关于信仰的知识。',
        arc: [
          { phase: 'initial', description: '充满理论知识但手足无措，习惯引用经文代替对话' },
          { phase: 'warming', description: '开始意识到书本之外有更重要的东西，尝试放下安全感' },
          { phase: 'trusting', description: '承认知识的局限，愿意在不完美中行动' },
          { phase: 'bonded', description: '找到学术与活出信仰之间的平衡，成为更有温度的人' }
        ],
        quotes: [
          '我在课堂上学过怎么解释苦难，但没人教我怎么面对它。',
          '也许神学不是用来回答问题的，是用来教我们和问题一起活的。',
          '书本里的上帝很安全，瓦砾堆里的上帝……很吓人。',
          '我终于明白了：知道答案和活出答案，是两件完全不同的事。'
        ]
      }
    ];

    characters.forEach(function (char) {
      this._characters[char.id] = Object.assign({}, char);
    }.bind(this));

    // 初始化邂逅记录和里程碑
    CharacterSystem.getCharacterIds().forEach(function (id) {
      this._encounters[id] = [];
      this._milestones[id] = [];
    }.bind(this));
  }

  // ========== 关系变更 ==========

  /**
   * 注册关系变更回调
   * @param {Function} callback - 接收 {characterId, changes, character} 对象
   */
  onRelationChanged(callback) {
    this._listeners.push(callback);
  }

  /**
   * 移除回调
   * @param {Function} callback
   */
  offRelationChanged(callback) {
    this._listeners = this._listeners.filter(function (cb) { return cb !== callback; });
  }

  /**
   * 发出 relationChanged 事件
   */
  _emitRelationChanged(characterId, appliedChanges) {
    var character = this.getCharacter(characterId);
    this._listeners.forEach(function (cb) {
      try {
        cb({ characterId: characterId, changes: appliedChanges, character: character });
      } catch (e) {
        console.error('[CharacterSystem] Listener error:', e);
      }
    });
    if (typeof window !== 'undefined' && window.EventBus) {
      window.EventBus.emit('relationChanged', { characterId: characterId, changes: appliedChanges, character: character });
    }
  }

  /**
   * 修改单个角色的关系值
   * @param {string} characterId
   * @param {Object} changes - {affection: +5, trust: +3}
   */
  modifyRelation(characterId, changes) {
    var character = this._characters[characterId];
    if (!character) {
      console.warn('[CharacterSystem] Unknown character: ' + characterId);
      return;
    }

    if (!changes || typeof changes !== 'object') {
      console.warn('[CharacterSystem] modifyRelation() received invalid changes:', changes);
      return;
    }

    var appliedChanges = {};
    var relationFields = ['affection', 'trust'];

    relationFields.forEach(function (field) {
      if (!(field in changes)) return;

      var delta = Number(changes[field]);
      if (isNaN(delta)) {
        console.warn('[CharacterSystem] Invalid delta for ' + field + ':', changes[field]);
        return;
      }

      var oldValue = character[field];
      var newValue = Math.max(0, Math.min(100, Math.round(oldValue + delta)));

      if (newValue !== oldValue) {
        character[field] = newValue;
        appliedChanges[field] = { from: oldValue, to: newValue, delta: delta };
      }
    });

    if (Object.keys(appliedChanges).length > 0) {
      // 检查里程碑
      this._checkMilestones(characterId, appliedChanges);
      this._emitRelationChanged(characterId, appliedChanges);
    }
  }

  // ========== 数据访问 ==========

  /**
   * 获取单个角色数据（返回副本）
   */
  getCharacter(id) {
    var char = this._characters[id];
    if (!char) return null;
    return Object.assign({}, char);
  }

  /**
   * 获取所有角色数据
   */
  getAllCharacters() {
    return Object.values(this._characters).map(function (char) { return Object.assign({}, char); });
  }

  /**
   * 标记角色为已遇见
   */
  setMet(characterId) {
    var char = this._characters[characterId];
    if (char) {
      char.met = true;
    }
  }

  /**
   * 检查角色是否已遇见
   */
  hasMet(characterId) {
    var char = this._characters[characterId];
    return char ? char.met : false;
  }

  /**
   * 获取关系等级描述
   */
  static getRelationLevel(value) {
    if (value >= 90) return '深厚羁绊';
    if (value >= 75) return '信任';
    if (value >= 60) return '友好';
    if (value >= 45) return '中立';
    if (value >= 30) return '冷淡';
    if (value >= 15) return '疏远';
    return '敌意';
  }

  /**
   * 获取角色名称
   */
  getName(characterId) {
    var char = this._characters[characterId];
    return char ? char.name : null;
  }

  /**
   * 获取所有角色ID列表
   */
  static getCharacterIds() {
    return ['doctor', 'nun', 'teacher', 'youth', 'monk', 'seminarian'];
  }

  // ========== 背景与弧线 ==========

  /**
   * 获取角色背景故事
   * @param {string} characterId
   * @returns {string|null}
   */
  getBackstory(characterId) {
    var char = this._characters[characterId];
    return char ? (char.backstory || null) : null;
  }

  /**
   * 获取角色当前弧线阶段
   * @param {string} characterId
   * @returns {Object|null} { phase, description }
   */
  getArcPhase(characterId) {
    var char = this._characters[characterId];
    if (!char || !char.arc || char.arc.length === 0) return null;

    // 基于平均关系值确定弧线阶段
    var avgRelation = (char.affection + char.trust) / 2;
    var phaseIndex = 0;
    if (avgRelation >= 80) phaseIndex = 3;
    else if (avgRelation >= 65) phaseIndex = 2;
    else if (avgRelation >= 55) phaseIndex = 1;

    var arc = char.arc[Math.min(phaseIndex, char.arc.length - 1)];
    return { phase: arc.phase, description: arc.description, index: phaseIndex };
  }

  /**
   * 获取角色的所有弧线阶段
   * @param {string} characterId
   * @returns {Array}
   */
  getFullArc(characterId) {
    var char = this._characters[characterId];
    if (!char || !char.arc) return [];
    return char.arc.slice();
  }

  /**
   * 获取角色语录
   * @param {string} characterId
   * @param {number} [index] - 指定第几条语录（基于关系等级），不传则返回当前阶段的
   * @returns {string|null}
   */
  getQuote(characterId, index) {
    var char = this._characters[characterId];
    if (!char || !char.quotes || char.quotes.length === 0) return null;

    if (index !== undefined) {
      return char.quotes[Math.min(index, char.quotes.length - 1)] || null;
    }

    // 基于弧线阶段返回对应语录
    var phase = this.getArcPhase(characterId);
    var quoteIndex = phase ? Math.min(phase.index, char.quotes.length - 1) : 0;
    return char.quotes[quoteIndex];
  }

  /**
   * 获取角色所有语录
   */
  getAllQuotes(characterId) {
    var char = this._characters[characterId];
    if (!char || !char.quotes) return [];
    return char.quotes.slice();
  }

  // ========== 邂逅记录 ==========

  /**
   * 记录与角色的邂逅
   * @param {string} characterId
   * @param {Object} encounter - { chapter, nodeId, summary }
   */
  recordEncounter(characterId, encounter) {
    if (!this._encounters[characterId]) {
      this._encounters[characterId] = [];
    }
    this._encounters[characterId].push({
      chapter: encounter.chapter || 0,
      nodeId: encounter.nodeId || '',
      summary: encounter.summary || '',
      timestamp: Date.now()
    });
  }

  /**
   * 获取与某角色的所有邂逅记录
   * @param {string} characterId
   * @returns {Array}
   */
  getEncounters(characterId) {
    return this._encounters[characterId] ? this._encounters[characterId].slice() : [];
  }

  /**
   * 获取邂逅摘要（角色有多少次互动，在哪些章节）
   * @param {string} characterId
   * @returns {Object} { count, chapters: [1, 2, ...] }
   */
  getEncounterSummary(characterId) {
    var encounters = this._encounters[characterId] || [];
    var chapterSet = {};
    encounters.forEach(function (e) {
      if (e.chapter) chapterSet[e.chapter] = true;
    });
    return {
      count: encounters.length,
      chapters: Object.keys(chapterSet).map(Number).sort()
    };
  }

  // ========== 关系里程碑 ==========

  /**
   * 检查并记录里程碑
   */
  _checkMilestones(characterId, changes) {
    var char = this._characters[characterId];
    if (!char) return;

    var milestones = this._milestones[characterId] || [];

    // 好感度里程碑
    if (char.affection >= 75 && milestones.indexOf('affection_high') === -1) {
      milestones.push('affection_high');
      this._emitMilestone(characterId, 'affection_high', '好感度达到75');
    }
    if (char.affection >= 90 && milestones.indexOf('affection_max') === -1) {
      milestones.push('affection_max');
      this._emitMilestone(characterId, 'affection_max', '好感度达到90');
    }
    if (char.affection <= 25 && milestones.indexOf('affection_low') === -1) {
      milestones.push('affection_low');
      this._emitMilestone(characterId, 'affection_low', '好感度降至25以下');
    }

    // 信任度里程碑
    if (char.trust >= 75 && milestones.indexOf('trust_high') === -1) {
      milestones.push('trust_high');
      this._emitMilestone(characterId, 'trust_high', '信任度达到75');
    }
    if (char.trust >= 90 && milestones.indexOf('trust_max') === -1) {
      milestones.push('trust_max');
      this._emitMilestone(characterId, 'trust_max', '信任度达到90');
    }
    if (char.trust <= 25 && milestones.indexOf('trust_low') === -1) {
      milestones.push('trust_low');
      this._emitMilestone(characterId, 'trust_low', '信任度降至25以下');
    }

    // 双高里程碑
    if (char.affection >= 70 && char.trust >= 70 && milestones.indexOf('bonded') === -1) {
      milestones.push('bonded');
      this._emitMilestone(characterId, 'bonded', '建立了深厚羁绊');
    }

    this._milestones[characterId] = milestones;
  }

  /**
   * 发出里程碑事件
   */
  _emitMilestone(characterId, milestoneId, description) {
    var charName = this.getName(characterId);
    if (typeof window !== 'undefined' && window.EventBus) {
      window.EventBus.emit('relationMilestone', {
        characterId: characterId,
        characterName: charName,
        milestoneId: milestoneId,
        description: description
      });
    }
  }

  /**
   * 获取角色的已达成里程碑
   * @param {string} characterId
   * @returns {string[]}
   */
  getMilestones(characterId) {
    return (this._milestones[characterId] || []).slice();
  }

  /**
   * 获取所有角色的里程碑汇总
   * @returns {Object} { characterId: [milestoneId, ...] }
   */
  getAllMilestones() {
    var result = {};
    var self = this;
    CharacterSystem.getCharacterIds().forEach(function (id) {
      result[id] = self._milestones[id] ? self._milestones[id].slice() : [];
    });
    return result;
  }

  /**
   * 获取角色之间的关系状态描述
   * @param {string} characterId
   * @returns {string}
   */
  getRelationshipSummary(characterId) {
    var char = this._characters[characterId];
    if (!char) return '';

    var affectionLevel = CharacterSystem.getRelationLevel(char.affection);
    var trustLevel = CharacterSystem.getRelationLevel(char.trust);
    var phase = this.getArcPhase(characterId);
    var encounterSummary = this.getEncounterSummary(characterId);

    return char.name + ' — ' + char.title + '\n' +
      '好感: ' + char.affection + ' (' + affectionLevel + ')\n' +
      '信任: ' + char.trust + ' (' + trustLevel + ')\n' +
      '互动次数: ' + encounterSummary.count + '\n' +
      '当前阶段: ' + (phase ? phase.description : '尚未建立关系');
  }

  // ========== 序列化 ==========

  /**
   * 序列化为 JSON 兼容对象
   */
  toJSON() {
    var characters = {};
    var self = this;
    for (var id of Object.keys(this._characters)) {
      var c = this._characters[id];
      characters[id] = {
        id: c.id,
        name: c.name,
        title: c.title,
        description: c.description,
        affection: c.affection,
        trust: c.trust,
        met: c.met
      };
    }
    return {
      characters: characters,
      encounters: self._encounters,
      milestones: self._milestones
    };
  }

  /**
   * 从序列化数据恢复
   */
  fromJSON(data) {
    if (!data || !data.characters) return;

    for (var id of Object.keys(data.characters)) {
      if (this._characters[id]) {
        var saved = data.characters[id];
        this._characters[id].affection = Math.max(0, Math.min(100, Math.round(saved.affection || 50)));
        this._characters[id].trust = Math.max(0, Math.min(100, Math.round(saved.trust || 50)));
        this._characters[id].met = !!saved.met;
      }
    }

    if (data.encounters) {
      this._encounters = data.encounters;
    }
    if (data.milestones) {
      this._milestones = data.milestones;
    }
  }

  /**
   * 重置所有关系到默认值
   */
  reset() {
    this._initCharacters();
  }
}

// 导出
if (typeof window !== 'undefined') {
  window.CharacterSystem = CharacterSystem;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CharacterSystem;
}
