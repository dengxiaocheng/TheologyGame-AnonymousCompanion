/**
 * EndingSystem — 根据最终属性和关系判定结局
 * 5 种结局，优先级：谦卑的见证人 > 沉默的同行者 > 其他
 * 扩展：扩展叙事、尾声段落、属性报告、结局提示、解锁追踪
 */
class EndingSystem {
  constructor() {
    this._endings = [
      {
        id: 'proud_missionary',
        type: '结局一',
        title: '骄傲的传教者',
        statsRequired: 'witness > 65 && respect < 35',
        text: [
          '你带着满腔热忱来到这座城市，也带着满腔热忱离开。你讲了许多关于上帝的信息，引用了大量的经文，在每一个场合都勇敢地为信仰辩护。人们听到了你的声音——但他们记住的不是你的信息，而是你的语气。',
          '医生继续默默地工作着，修女在他的身边学会了不再评判。教师把教室重新粉刷了一遍，孩子们回来了。青年回到了教会，但这次他开始真正地服侍，而不是仅仅背诵答案。',
          '你在回程的路上翻开圣经，看到保罗的话："我若能说万人的方言，并天使的话语，却没有爱，我就成了鸣的锣、响的钹一般。"你合上书，望向车窗外不断后退的风景。',
          '你讲了正确的道理。但也许，你错过了那些沉默中正在发生的事。'
        ],
        reflection: '拥有正确的答案和拥有正确的心，哪个更重要？当见证变成了自我证明，它还算是见证吗？',
        epilogue: '多年后，你成为了一名小有名气的布道家。你的讲章铿锵有力，逻辑严密，每次聚会都座无虚席。但偶尔在深夜，你会想起那个灾区的小城，想起那些你来不及倾听的声音。你安慰自己说——至少你传了福音。但那个"至少"，像一个微小的裂缝，悄悄地留在你的心底。',
        hint: '这个结局在"见证"远高于"尊重"时触发。试着更多倾听他人的故事，用尊重代替说教。'
      },
      {
        id: 'cheap_inclusivist',
        type: '结局二',
        title: '廉价包容者',
        statsRequired: 'understanding > 65 && witness < 35',
        text: [
          '你学会了理解每一个人——医生的疲惫、修女的挣扎、教师的坚持、青年的迷茫、僧人的慈悲、神学生的恐惧。你站在他们每一个人身边，认同他们每一条道路的价值。',
          '但在认同所有人之后，你发现自己说不出什么是自己真正相信的了。"也许所有的信仰都是一样的吧，"你想。这句话听起来很宽容，但说出来的时候，你感到一种奇怪的空洞。',
          '僧人在临别时递给你一个小小的木牌，上面刻着一朵莲花。他说："你有一颗善良的心。但莲花需要根——你的根在哪里？"你收下了礼物，却答不上来这个问题。',
          '你看见了每个人身上的善，却在试图拥抱所有光芒的时候，让自己的那盏灯暗了下去。'
        ],
        reflection: '理解一切是否意味着什么都不坚持？包容与妥协之间的界线在哪里？',
        epilogue: '后来你去了很多地方，学习了不同的宗教和哲学。你成了一个"什么都懂一点"的人，在社交媒体上发着"殊途同归"的鸡汤。朋友们说你"开明"，但你知道——在那些最深的黑夜里，你找不到一个可以跪下来祷告的地方。不是因为你不知道怎么祈祷，而是因为你不确定在向谁祈祷。',
        hint: '这个结局在"理解"远高于"见证"时触发。在理解他人的同时，也要勇敢分享自己的信仰立场。'
      },
      {
        id: 'border_guardian',
        type: '结局三',
        title: '边界守卫者',
        statsRequired: 'prejudice > 65 && understanding < 40',
        text: [
          '你很清楚谁是自己人，谁不是。医生不是信徒，所以他再辛苦也不值得称赞。僧人来自别的宗教，所以他再慈悲也只是"假象"。你守住了信仰的边界，但也把自己困在了墙里。',
          '灾难过后，社区的重建工作继续进行。你看到新闻上那些曾经并肩工作过的人们的照片——他们还在那里，还在帮助别人。你转过了头，告诉自己那不关你的事。',
          '神学生最后来找过你，说他想和你讨论一个神学问题："如果上帝的恩典只在教会里运转，那教会墙外的那些善行是从哪里来的？"你给了他一个标准答案，但他离开时眼中的困惑，让你后来失眠了好几个夜晚。',
          '你守住了纯正，却可能在守住的同时，关上了某扇本该敞开的门。'
        ],
        reflection: '信仰的边界是用来保护真理的，还是用来隔绝恩典的？当你把所有人都推到墙外，墙里面还剩下什么？',
        epilogue: '你回到了自己的教会，继续忠实地服侍。你成立了一个"护教小组"，专门警惕各种"偏离真理"的倾向。你的教会变得很"纯正"——也很安静。那些曾经坐在后排的人慢慢不来了，你告诉自己那是因为他们"不够坚持"。教堂的灯还亮着，但座位上的空洞越来越大。',
        hint: '这个结局在"偏见"高而"理解"低时触发。尝试放下先入为主的判断，去认识那些"圈外"的人。'
      },
      {
        id: 'silent_companion',
        type: '结局四',
        title: '沉默的同行者',
        statsRequired: 'respect > 60 && witness > 45 && understanding > 45 && prejudice < 55',
        text: [
          '你走了一条不容易的路——既没有简单地拥抱一切，也没有轻易地拒绝什么。你学会了在沉默中陪伴，在行动中见证。你的信仰不是用来分类的标签，而是在每一次弯腰帮助他人时默默燃烧的火。',
          '医生最后对你说："我不信你的上帝。但我相信你。"你没有试图纠正他，也没有放弃你的信仰。你只是点了点头，说："那就够了——至少现在够了。"',
          '修女在重建后的教堂里举办了第一次感恩礼拜。她没有邀请你上台分享，而是在祷告中提到了你的名字："为那个不愿意炫耀自己信仰的人感恩——他在我们中间活出了信仰。"',
          '你继续前行，不完美但真实。你还没有找到所有答案，但你知道了一条真理：真正的同行，不需要先定义对方是谁。'
        ],
        reflection: '沉默的陪伴是否也是一种见证？在不确定中保持善良，这本身是否就是一种信仰的表达？',
        epilogue: '你没有写书，没有做见证分享，甚至没有在教会里担任任何显眼的职分。但多年后，在那个灾区小城的重建纪念碑上，刻着你的名字。不是因为你的信仰，而是因为你曾在那里。你偶尔收到医生寄来的明信片，上面只有一句话："你那个上帝——我还在观察。"你笑了。你知道，有些种子需要很长很长的时间。',
        hint: '这个结局需要"尊重"较高，且其他属性相对均衡。保持尊重和善良，但也不要忘记自己的见证。'
      },
      {
        id: 'humble_witness',
        type: '结局五',
        title: '谦卑的见证人',
        statsRequired: 'understanding > 60 && witness > 60 && respect > 60 && prejudice < 40',
        text: [
          '你带着信仰来到这里，但这里发生的事超出了你的框架。你看见了恩典——不是在教会的讲台上，而是在医生的绷带里，在教师守夜的灯光下，在僧人默默递出的一碗热粥中。你开始明白，也许上帝的作为比你能想象的更加宽广。',
          '但这并不意味着你放弃了自己的见证。恰恰相反——正因为你在他人身上看到了善，你更加确信那位赐下善的源头。你不是在稀释福音，而是在用生命诠释它。你不需要先给每个人贴上标签才能爱他们。',
          '神学生在临别时对你说："我以前以为神学是在书本里学的。谢谢你让我看到，神学是在瓦砾堆里活出来的。"你笑了笑——你也没有完全搞懂，但你愿意继续在这条路上走下去。',
          '医生没有皈依。修女没有变得"开明"。教师没有接受信仰。但你和他们一起，在这座废墟上重建了什么东西——也许比任何一个人的信条都更加接近那位无名之人的心意。',
          '你继续前行，谦卑但坚定。你知道自己是谁，也知道恩典的边界比你以为的更加宽广。这就是你的见证——不是一道墙，而是一扇门。'
        ],
        reflection: '如果上帝的恩典真的超越了我们划定的界限，那我们对"谁配得恩典"的判断是否本身就是一种傲慢？真正的见证，是否不在于我们说了什么，而在于我们如何去爱？',
        epilogue: '这个故事没有一个整齐的结尾。你后来去到了很多地方——有些是灾区，有些只是普通的小镇。你学会了一件事：谦卑不是否定自己所信的，而是在坚信的同时，为恩典的宽广留出空间。你的背包里始终放着一本翻旧了的圣经，但你最大的见证，从来都不是从书页里说出来的。',
        hint: '这是最好的结局——需要"理解"、"见证"和"尊重"都较高，且"偏见"较低。在理解他人的同时坚持信仰，在尊重中活出见证。'
      }
    ];

    // 解锁追踪
    this._unlockedEndings = this._loadUnlockedEndings();
  }

  /**
   * 根据最终属性和关系判定结局
   * @param {Object} stats - { understanding, witness, respect, prejudice }
   * @param {Object[]} characters - 角色数组
   * @returns {Object} 匹配的结局对象
   */
  evaluate(stats, characters) {
    // 优先级：谦卑的见证人 > 沉默的同行者 > 其他

    // 1. 谦卑的见证人（最佳结局）
    if (stats.understanding > 60 && stats.witness > 60 && stats.respect > 60 && stats.prejudice < 40) {
      return this._buildResult('humble_witness', stats, characters);
    }

    // 2. 沉默的同行者
    if (stats.respect > 60 && stats.witness > 45 && stats.understanding > 45 && stats.prejudice < 55) {
      return this._buildResult('silent_companion', stats, characters);
    }

    // 3. 其余三个按分数匹配
    var scores = this._computeEndingScores(stats);

    // 找最高分
    var bestId = null;
    var bestScore = -Infinity;
    var keys = Object.keys(scores);
    for (var i = 0; i < keys.length; i++) {
      if (scores[keys[i]] > bestScore) {
        bestScore = scores[keys[i]];
        bestId = keys[i];
      }
    }

    var ending = this.getEndingById(bestId);
    if (!ending) {
      // 默认回退到沉默的同行者
      ending = this.getEndingById('silent_companion');
    }

    return this._buildResult(ending.id, stats, characters);
  }

  /**
   * 构建完整的结局结果对象
   * @param {string} endingId
   * @param {Object} stats
   * @param {Object[]} characters
   * @returns {Object}
   */
  _buildResult(endingId, stats, characters) {
    var ending = this.getEndingById(endingId);
    if (!ending) return { type: '', title: '', text: [], reflection: '' };

    // 记录解锁
    this._unlockEnding(endingId);

    return {
      id: ending.id,
      type: ending.type,
      title: ending.title,
      text: ending.text,
      reflection: ending.reflection,
      epilogue: ending.epilogue || '',
      hint: ending.hint || '',
      statsReport: this._buildStatsReport(stats),
      relationHighlights: this._buildRelationHighlights(characters)
    };
  }

  /**
   * 计算各结局的匹配分数
   * @param {Object} stats
   * @returns {Object} { ending_id: score }
   */
  _computeEndingScores(stats) {
    return {
      border_guardian: this._scoreBorderGuardian(stats),
      cheap_inclusivist: this._scoreCheapInclusivist(stats),
      proud_missionary: this._scoreProudMissionary(stats)
    };
  }

  _scoreBorderGuardian(stats) {
    var score = 0;
    if (stats.prejudice > 65) score += 3;
    else if (stats.prejudice > 50) score += 1;
    if (stats.understanding < 40) score += 3;
    else if (stats.understanding < 50) score += 1;
    score += (stats.prejudice - stats.understanding) * 0.05;
    return score;
  }

  _scoreCheapInclusivist(stats) {
    var score = 0;
    if (stats.understanding > 65) score += 3;
    else if (stats.understanding > 50) score += 1;
    if (stats.witness < 35) score += 3;
    else if (stats.witness < 45) score += 1;
    score += (stats.understanding - stats.witness) * 0.05;
    return score;
  }

  _scoreProudMissionary(stats) {
    var score = 0;
    if (stats.witness > 65) score += 3;
    else if (stats.witness > 50) score += 1;
    if (stats.respect < 35) score += 3;
    else if (stats.respect < 45) score += 1;
    score += (stats.witness - stats.respect) * 0.05;
    return score;
  }

  /**
   * 按 ID 查找结局
   * @param {string} id
   * @returns {Object|null}
   */
  getEndingById(id) {
    for (var i = 0; i < this._endings.length; i++) {
      if (this._endings[i].id === id) {
        return this._endings[i];
      }
    }
    return null;
  }

  /**
   * 获取所有结局
   * @returns {Object[]}
   */
  getAllEndings() {
    return this._endings.slice();
  }

  // ========== 属性报告 ==========

  /**
   * 构建属性报告
   * @param {Object} stats
   * @returns {Object} { dominant, balance, descriptions[] }
   */
  _buildStatsReport(stats) {
    var keys = StatsSystem.getStatKeys();
    var descriptions = [];
    var maxKey = keys[0];
    var maxValue = stats[maxKey];
    var minKey = keys[0];
    var minValue = stats[minKey];

    keys.forEach(function (key) {
      var value = stats[key];
      var label = StatsSystem.getLabel(key);
      var desc = this._describeStat(key, value);
      descriptions.push({ key: key, label: label, value: value, description: desc });

      if (value > maxValue) { maxValue = value; maxKey = key; }
      if (value < minValue) { minValue = value; minKey = key; }
    }.bind(this));

    var balance = this._computeBalance(stats);
    var dominant = StatsSystem.getLabel(maxKey);

    return {
      dominant: dominant,
      balance: balance,
      descriptions: descriptions,
      summary: '你的旅程由' + dominant + '主导。' + this._balanceMessage(balance)
    };
  }

  /**
   * 描述单个属性值
   * @param {string} key
   * @param {number} value
   * @returns {string}
   */
  _describeStat(key, value) {
    if (key === 'understanding') {
      if (value >= 75) return '你深刻地理解了每个人的处境和选择';
      if (value >= 55) return '你努力尝试理解不同的声音';
      if (value >= 35) return '你对某些人保持了开放，对另一些人则心存疑虑';
      return '你很少去理解那些与你不同的人';
    }
    if (key === 'witness') {
      if (value >= 75) return '你在每一个场合都勇敢地分享了自己的信仰';
      if (value >= 55) return '你在适当的时候表达了自己的信仰立场';
      if (value >= 35) return '你偶尔提到自己的信仰，但更多时候选择沉默';
      return '你几乎从未提及自己的信仰';
    }
    if (key === 'respect') {
      if (value >= 75) return '你对每个人都保持了真诚的尊重';
      if (value >= 55) return '你尊重了大多数人的选择和道路';
      if (value >= 35) return '你尊重了一些人，但对另一些人持有保留';
      return '你很少展现出对他人选择真正的尊重';
    }
    if (key === 'prejudice') {
      if (value >= 75) return '你的偏见筑成了一道高墙';
      if (value >= 55) return '你对某些人群持有明显的成见';
      if (value >= 35) return '你偶尔会被先入为主的判断所影响';
      return '你成功地放下了大部分偏见';
    }
    return '';
  }

  /**
   * 计算属性平衡度
   * @param {Object} stats
   * @returns {number} 0-100，越高越平衡
   */
  _computeBalance(stats) {
    var keys = StatsSystem.getStatKeys();
    var values = keys.map(function (k) { return stats[k]; });
    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values);
    var spread = max - min;
    return Math.round(Math.max(0, 100 - spread));
  }

  /**
   * 生成平衡度描述
   * @param {number} balance
   * @returns {string}
   */
  _balanceMessage(balance) {
    if (balance >= 85) return '你的内心保持着难得的平衡。';
    if (balance >= 65) return '你的选择展现了一定的倾向性。';
    if (balance >= 45) return '你的旅程有着鲜明的方向，但也付出了代价。';
    return '你的选择极度偏向一个方向——也许需要更多反思。';
  }

  // ========== 关系亮点 ==========

  /**
   * 构建关系亮点
   * @param {Object[]} characters
   * @returns {Object[]}
   */
  _buildRelationHighlights(characters) {
    if (!characters || characters.length === 0) return [];

    var highlights = [];

    characters.forEach(function (char) {
      var avg = (char.affection + char.trust) / 2;
      var highlight = {
        id: char.id,
        name: char.name,
        title: char.title,
        affection: char.affection,
        trust: char.trust,
        bond: CharacterSystem.getRelationLevel(avg),
        summary: ''
      };

      if (avg >= 80) {
        highlight.summary = '你们之间建立了深厚的羁绊。';
      } else if (avg >= 65) {
        highlight.summary = '你们之间有着温暖的友谊。';
      } else if (avg >= 45) {
        highlight.summary = '你们保持着礼貌的距离。';
      } else if (avg >= 25) {
        highlight.summary = '你们之间存在一些隔阂。';
      } else {
        highlight.summary = '你们几乎没有建立起任何联系。';
      }

      highlights.push(highlight);
    });

    return highlights;
  }

  // ========== 解锁追踪 ==========

  /**
   * 记录结局解锁
   * @param {string} endingId
   */
  _unlockEnding(endingId) {
    if (this._unlockedEndings.indexOf(endingId) === -1) {
      this._unlockedEndings.push(endingId);
      this._saveUnlockedEndings();
    }
  }

  /**
   * 获取已解锁的结局列表
   * @returns {string[]}
   */
  getUnlockedEndings() {
    return this._unlockedEndings.slice();
  }

  /**
   * 检查某个结局是否已解锁
   * @param {string} endingId
   * @returns {boolean}
   */
  isEndingUnlocked(endingId) {
    return this._unlockedEndings.indexOf(endingId) !== -1;
  }

  /**
   * 获取所有结局的解锁状态
   * @returns {Array} [{ id, title, unlocked }]
   */
  getEndingUnlockStatus() {
    return this._endings.map(function (e) {
      return {
        id: e.id,
        title: e.title,
        type: e.type,
        unlocked: this._unlockedEndings.indexOf(e.id) !== -1
      };
    }.bind(this));
  }

  /**
   * 从 localStorage 加载解锁记录
   * @returns {string[]}
   */
  _loadUnlockedEndings() {
    try {
      var data = localStorage.getItem('anonymous_companion_endings');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      // ignore
    }
    return [];
  }

  /**
   * 保存解锁记录到 localStorage
   */
  _saveUnlockedEndings() {
    try {
      localStorage.setItem('anonymous_companion_endings', JSON.stringify(this._unlockedEndings));
    } catch (e) {
      // ignore
    }
  }

  // ========== 尾声 HTML 生成 ==========

  /**
   * 生成扩展尾声 HTML（角色逐一道别）
   * @param {string} endingId
   * @param {Object} stats
   * @param {Object[]} characters
   * @returns {string} HTML 字符串
   */
  _buildEpilogueHTML(endingId, stats, characters) {
    var ending = this.getEndingById(endingId);
    var parts = [];

    // 标题段落
    parts.push('<div class="epilogue-title">尾声</div>');

    // 主尾声文本
    if (ending && ending.epilogue) {
      parts.push('<div class="epilogue-text">' + ending.epilogue + '</div>');
    }

    // 角色道别段落
    if (characters && characters.length > 0) {
      parts.push('<div class="epilogue-farewells">');

      // 按好感度排序，最高好感度的角色先出现
      var sorted = characters.slice().sort(function(a, b) {
        return (b.affection + b.trust) - (a.affection + a.trust);
      });

      sorted.forEach(function(char) {
        var avg = (char.affection + char.trust) / 2;
        var farewell = this._getCharacterFarewell(char, avg, endingId);
        parts.push(
          '<div class="farewell-entry">' +
            '<div class="farewell-name">' + char.name + ' — ' + char.title + '</div>' +
            '<div class="farewell-text">' + farewell + '</div>' +
          '</div>'
        );
      }.bind(this));

      parts.push('</div>');
    }

    // 反思段落
    if (ending && ending.reflection) {
      parts.push(
        '<div class="epilogue-reflection">' +
          '<div class="reflection-label">反思</div>' +
          '<div class="reflection-text">' + ending.reflection + '</div>' +
        '</div>'
      );
    }

    return parts.join('');
  }

  /**
   * 获取单个角色的道别文本
   * @param {Object} char
   * @param {number} avg - 平均关系值
   * @param {string} endingId
   * @returns {string}
   */
  _getCharacterFarewell(char, avg, endingId) {
    var charId = char.id;
    if (avg >= 75) {
      return this._warmFarewell(charId, char.name);
    }
    if (avg >= 50) {
      return this._neutralFarewell(charId, char.name);
    }
    return this._distantFarewell(charId, char.name);
  }

  _warmFarewell(charId, name) {
    var texts = {
      doctor: name + '在临别时拍了拍你的肩膀："记得我说的——你那个上帝，我还在观察。"他笑了一下，你看到他眼角的皱纹比初见时深了许多。',
      nun: name + '最后一次为你祈祷。她没有说什么华丽的辞藻，只是轻轻地按着你的手背："愿主与你同在——无论你去往哪里。"',
      teacher: name + '送给你一支粉笔："我在废墟里找到的，居然没碎。希望你也能像它一样——看起来普通，但写出来的字不会消失。"',
      youth: name + '红着眼眶站在路边，想说什么又说不出口。最后他深吸一口气，大声喊道："谢谢你——谢谢你愿意听我说话！"',
      monk: name + '双手合十，微微鞠躬："缘起缘灭，都是菩提。愿你慈悲常在。"他从袖中取出一个小小的香囊递给你。',
      seminarian: name + '紧紧握着你的手："我以前以为信仰只在书本里。谢谢你让我看到——它是活的。"'
    };
    return texts[charId] || name + '向你挥手告别。你们之间有许多无法用语言表达的默契。';
  }

  _neutralFarewell(charId, name) {
    var texts = {
      doctor: name + '点了点头算是告别。你们之间的距离不算远，但也不算近。',
      nun: name + '微笑着祝福你。她的笑容里有温暖，也有一丝若有若无的遗憾。',
      teacher: name + '从教室窗口向你招了招手，然后继续回到孩子们身边。',
      youth: name + '有些不好意思地挠了挠头："嗯……保重。"他的青涩让你想起自己年轻时的样子。',
      monk: name + '微微颔首，眼神平静如水："一切有为法，如梦幻泡影。"',
      seminarian: name + '认真地说："我会继续学习的。"你知道他是真心的。'
    };
    return texts[charId] || name + '礼貌地向你道别。也许在另一个时空，你们能走得更近。';
  }

  _distantFarewell(charId, name) {
    var texts = {
      doctor: name + '没有回头。他还有太多病人需要照顾——或者，你们之间确实没有什么好说的。',
      nun: name + '在远处看了你一眼，然后转身回到了教堂。你们之间的沉默比任何言语都沉重。',
      teacher: name + '正在忙于整理教室，几乎没有注意到你的离开。',
      youth: name + '躲在人群后面，犹豫了一下，最终没有上前。你们之间的距离不是物理上的。',
      monk: name + '已经回到了他的禅修之中。你们各自走在自己的路上。',
      seminarian: name + '低着头翻着圣经，没有抬头。也许他也在思考你们之间错过了什么。'
    };
    return texts[charId] || name + '在你的记忆中渐渐模糊。你们像是两条平行线，短暂地交汇，又各自远去。';
  }

  // ========== 关系叙事摘要 ==========

  /**
   * 生成与每个角色的旅程叙事摘要
   * @param {Object[]} characters
   * @returns {Object[]} [{ id, name, paragraphs[] }]
   */
  _buildRelationSummary(characters) {
    if (!characters || characters.length === 0) return [];

    var summaries = [];

    characters.forEach(function(char) {
      var avg = (char.affection + char.trust) / 2;
      var trustLevel = char.trust;
      var affectionLevel = char.affection;
      var paragraphs = [];

      // 开篇：初遇印象
      paragraphs.push(this._relationOpening(char, avg));

      // 中段：关系发展
      if (trustLevel >= 60 && affectionLevel >= 60) {
        paragraphs.push('你们之间的信任是双向的——' + char.name + '向你敞开了心扉，而你也以真诚回报。');
      } else if (trustLevel >= 40 && affectionLevel >= 40) {
        paragraphs.push('你们之间建立了一定的信任，但彼此都保留了一些东西。');
      } else if (trustLevel < 30) {
        paragraphs.push('信任是你和' + char.name + '之间最大的障碍。也许是你没有给出足够的理由让他相信你。');
      } else {
        paragraphs.push('你和' + char.name + '之间始终隔着一层看不见的薄膜，彼此能看到对方，却无法真正靠近。');
      }

      // 结尾：关系评价
      paragraphs.push(this._relationClosing(char, avg));

      summaries.push({
        id: char.id,
        name: char.name,
        title: char.title,
        paragraphs: paragraphs
      });
    }.bind(this));

    return summaries;
  }

  _relationOpening(char, avg) {
    if (avg >= 70) {
      return '当你回想起来时的路，' + char.name + '的面孔总是第一个浮现在脑海中。你们的相遇并不特别——但在那片废墟之上，每一次对视都成了某种默契的开始。';
    }
    if (avg >= 45) {
      return '关于' + char.name + '，你记得一些片段——几句对话，几个眼神。你们之间有过交集，但也许不够深。';
    }
    return '你试着回忆和' + char.name + '的互动，却发现记忆模糊得像雨后的倒影。你们共处一隅，却从未真正走进彼此的世界。';
  }

  _relationClosing(char, avg) {
    if (avg >= 75) {
      return '无论前路如何，你知道' + char.name + '会记得你。正如你会记得他一样。有些羁绊不需要言语来定义——它就在那里，安静但坚固。';
    }
    if (avg >= 50) {
      return '也许有一天你会在某个路口再次遇见' + char.name + '。到那时，也许你们会有更多的话要说。';
    }
    return '你与' + char.name + '的故事就这样结束了——像一本翻了几页就合上的书，你永远不知道后面的章节写了什么。';
  }

  // ========== 属性变化叙事 ==========

  /**
   * 生成属性从起点到终点的故事化叙事
   * @param {Object} finalStats - 最终属性值
   * @returns {string} 叙事文本
   */
  _buildStatNarrative(finalStats) {
    var keys = StatsSystem.getStatKeys();
    var narrative = [];
    var dominant = null;
    var dominantValue = -1;

    // 找出主导属性
    keys.forEach(function(key) {
      if (finalStats[key] > dominantValue) {
        dominantValue = finalStats[key];
        dominant = key;
      }
    });

    // 开篇：旅程起点
    narrative.push('你的旅程从一片空白开始——五十、五十、五十、五十。像一张尚未动笔的画布，等待着你用选择来着色。');

    // 各属性叙事
    keys.forEach(function(key) {
      var value = finalStats[key];
      var label = StatsSystem.getLabel(key);
      var change = value - 50;
      var direction = change > 0 ? '增长' : (change < 0 ? '消退' : '始终如一');
      var absChange = Math.abs(change);

      if (absChange >= 25) {
        if (key === dominant) {
          narrative.push(label + '成为了你旅程的主旋律——从最初的五十，到最终的' + value + '。这是一条明显的轨迹，每一次选择都在这条路上留下了深刻的印记。');
        } else {
          narrative.push(label + '在你的旅途中' + direction + '了——从五十到' + value + '，' + (absChange >= 15 ? '变化的幅度不小。' : '虽然变化不算剧烈，但足以被感知。'));
        }
      } else if (absChange >= 10) {
        narrative.push(label + '在你的旅途中轻微地' + direction + '了，从五十变为' + value + '。不多，但每一分都承载着你的某个选择。');
      } else {
        narrative.push(label + '几乎未变——始终停留在' + value + '附近。也许你在这一点上保持了初心，又也许你从未真正面对过相关的考验。');
      }
    });

    // 结尾：总结
    var balance = this._computeBalance(finalStats);
    if (balance >= 80) {
      narrative.push('整体来看，你的内心保持着一种难得的平衡。没有哪一个方面压倒性地主导了你的旅程——这在一条充满极端选择的道路上，本身就是一种成就。');
    } else if (balance >= 50) {
      narrative.push('你的旅程有着明确的方向感——某些力量在你的内心中占据了上风。这不是坏事，但也许值得回头想想：那些被忽略的声音，是否也有值得倾听的故事。');
    } else {
      narrative.push('你的旅程被一种强烈的力量所驱动，以至于其他的声音几乎被淹没了。也许这正是你选择的道路——但每一条偏激的路，都有它需要面对的代价。');
    }

    return narrative.join('\n\n');
  }

  // ========== 结局提示系统 ==========

  /**
   * 基于当前属性给出接近哪个结局的提示
   * @param {Object} stats
   * @returns {Object} { closest, distance, hints[] }
   */
  getEndingHints(stats) {
    var endingChecks = [
      {
        id: 'humble_witness',
        conditions: [
          { key: 'understanding', required: 60, direction: 'above' },
          { key: 'witness', required: 60, direction: 'above' },
          { key: 'respect', required: 60, direction: 'above' },
          { key: 'prejudice', required: 40, direction: 'below' }
        ]
      },
      {
        id: 'silent_companion',
        conditions: [
          { key: 'respect', required: 60, direction: 'above' },
          { key: 'witness', required: 45, direction: 'above' },
          { key: 'understanding', required: 45, direction: 'above' },
          { key: 'prejudice', required: 55, direction: 'below' }
        ]
      },
      {
        id: 'proud_missionary',
        conditions: [
          { key: 'witness', required: 65, direction: 'above' },
          { key: 'respect', required: 35, direction: 'below' }
        ]
      },
      {
        id: 'cheap_inclusivist',
        conditions: [
          { key: 'understanding', required: 65, direction: 'above' },
          { key: 'witness', required: 35, direction: 'below' }
        ]
      },
      {
        id: 'border_guardian',
        conditions: [
          { key: 'prejudice', required: 65, direction: 'above' },
          { key: 'understanding', required: 40, direction: 'below' }
        ]
      }
    ];

    var closest = null;
    var closestDistance = Infinity;
    var hints = [];

    endingChecks.forEach(function (check) {
      var met = 0;
      var total = check.conditions.length;
      var distance = 0;

      check.conditions.forEach(function (cond) {
        var value = stats[cond.key];
        var label = StatsSystem.getLabel(cond.key);
        var diff = 0;

        if (cond.direction === 'above') {
          diff = Math.max(0, cond.required - value);
          if (value >= cond.required) met++;
        } else {
          diff = Math.max(0, value - cond.required);
          if (value <= cond.required) met++;
        }

        distance += diff;
      });

      var ending = this.getEndingById(check.id);
      if (ending) {
        var status = met === total ? 'close' : (met >= total / 2 ? 'partial' : 'far');
        hints.push({
          id: check.id,
          title: ending.title,
          met: met,
          total: total,
          status: status,
          distance: distance
        });

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = check.id;
        }
      }
    }.bind(this));

    return {
      closest: closest,
      distance: closestDistance,
      hints: hints
    };
  }
}

// 导出
if (typeof window !== 'undefined') {
  window.EndingSystem = EndingSystem;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EndingSystem;
}
