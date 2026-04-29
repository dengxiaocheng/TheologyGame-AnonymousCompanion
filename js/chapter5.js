var chapter5 = {
  'ch5_001': {
    id: 'ch5_001',
    speaker: null,
    text: '大地在脚底颤抖。不是错觉——是真实的震动，从地壳深处传来，像一头沉睡的巨兽猛然翻身。你手中的杯子跌落在地，碎瓷片和水渍溅满了地板。',
    type: 'scene',
    chapter: 5,
    choices: [
      {
        id: 'ch5_001_a',
        text: '立刻跑向门口',
        effects: { stats: { witness: 3 } },
        next: 'ch5_002',
        condition: null,
        setFlag: 'second_disaster'
      },
      {
        id: 'ch5_001_b',
        text: '蹲下，等震动停止',
        effects: { stats: { understanding: 3 } },
        next: 'ch5_002',
        condition: null,
        setFlag: 'cautious_in_shock'
      }
    ],
    next: null
  },
  'ch5_002': {
    id: 'ch5_002',
    speaker: null,
    text: '余震。比你经历过的任何一次都要猛烈。远处传来建筑物倒塌的闷响，像雷声被埋进了土里。灰尘从天花板缝隙中簌簌落下，空气变得浑浊而呛人。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_003'
  },
  'ch5_003': {
    id: 'ch5_003',
    speaker: null,
    text: '你冲出临时住所。街道上一片混乱——有人尖叫，有人跌倒，有人抱着孩子在废墟间奔跑。你看见社区活动中心的方向升起了浓烟。那是你们所有人最后的庇护所。',
    type: 'scene',
    chapter: 5,
    choices: [
      {
        id: 'ch5_003_a',
        text: '跑向社区活动中心',
        effects: { stats: { witness: 5, respect: 3 } },
        next: 'ch5_004',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_003_b',
        text: '先帮助身边倒地的老人',
        effects: { stats: { understanding: 5, respect: 5 } },
        next: 'ch5_004',
        condition: null,
        setFlag: 'helped_elder'
      }
    ],
    next: null
  },
  'ch5_004': {
    id: 'ch5_004',
    speaker: null,
    text: '社区活动中心的院子已经挤满了人。有人在哭泣，有人在打电话，信号断断续续。你穿过人群，看到了熟悉的身影——所有人都在这里汇合了。灾难不分信仰，恐惧没有围墙。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_005'
  },
  'ch5_005': {
    id: 'ch5_005',
    speaker: 'doctor',
    text: '别站在那里发呆！过来帮我。有几个伤员需要马上处理——有人被碎玻璃划了很深的口子，还有个孩子可能骨折了。',
    type: 'dialogue',
    chapter: 5,
    choices: [
      {
        id: 'ch5_005_a',
        text: '立刻过去帮忙',
        effects: { stats: { respect: 5 }, relations: { doctor: { affection: 8, trust: 5 } } },
        next: 'ch5_006',
        condition: null,
        setFlag: 'trusted_nonbeliever'
      },
      {
        id: 'ch5_005_b',
        text: '先看看其他人怎么样了',
        effects: { stats: { witness: 5, understanding: 3 } },
        next: 'ch5_006',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_005_c',
        text: '去问修女有没有缺人手',
        effects: { stats: { understanding: 3 }, relations: { nun: { affection: 5, trust: 3 } } },
        next: 'ch5_006',
        condition: { relation: { character: 'nun', field: 'affection', min: 55 } },
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_006': {
    id: 'ch5_006',
    speaker: 'teacher',
    text: '孩子们都吓坏了。我把他们集中在角落里，给他们唱歌……可是我的声音在发抖。我不确定自己是在安慰他们，还是在安慰自己。',
    type: 'dialogue',
    chapter: 5,
    choices: [],
    next: 'ch5_007'
  },
  'ch5_007': {
    id: 'ch5_007',
    speaker: null,
    text: '教师蹲在一群瑟瑟发抖的孩子中间，她的嘴唇在动，唱着一首你听不清的歌。她的手在颤抖，却始终没有放开身旁那个最小的孩子。你不禁想——在这个无神论者的身上，你看到了某种比你见过的许多信徒都更纯粹的奉献。',
    type: 'narration',
    chapter: 5,
    choices: [
      {
        id: 'ch5_007_a',
        text: '走过去，在孩子们身边坐下',
        effects: { stats: { understanding: 5, witness: 5 }, relations: { teacher: { affection: 8, trust: 5 } } },
        next: 'ch5_008',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_007_b',
        text: '默默注视着这一幕',
        effects: { stats: { witness: 5, respect: 3 } },
        next: 'ch5_008',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_008': {
    id: 'ch5_008',
    speaker: null,
    text: '突然，一声巨响从活动中心东侧传来。墙壁裂开了一道缝，碎石和灰尘倾泻而下。有人尖叫着指向那个方向——里面还有人。余震没有放过这座建筑，它正在发出最后的呻吟。',
    type: 'scene',
    chapter: 5,
    choices: [],
    next: 'ch5_009'
  },
  'ch5_009': {
    id: 'ch5_009',
    speaker: null,
    text: '你看到僧人已经冲向了那面摇摇欲坠的墙。他没有犹豫，甚至没有回头看一眼。他的身影在尘雾中时隐时现，像一盏灯被风吹得忽明忽暗。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_010'
  },
  'ch5_010': {
    id: 'ch5_010',
    speaker: 'monk',
    text: '里面有人！我能听到声音——你们把外面的人带出去，我去里面找！',
    type: 'dialogue',
    chapter: 5,
    choices: [
      {
        id: 'ch5_010_a',
        text: '跟僧人一起冲进去',
        effects: { stats: { witness: 8, respect: 8 }, relations: { monk: { affection: 10, trust: 8 } } },
        next: 'ch5_011',
        condition: null,
        setFlag: 'witnessed_monk_sacrifice'
      },
      {
        id: 'ch5_010_b',
        text: '听从他的话，帮助外面的人撤离',
        effects: { stats: { understanding: 5, respect: 5 } },
        next: 'ch5_012',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_010_c',
        text: '试图拉住僧人——太危险了',
        effects: { stats: { understanding: 3 }, relations: { monk: { affection: 3, trust: 5 } } },
        next: 'ch5_013',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_011': {
    id: 'ch5_011',
    speaker: null,
    text: '你跟着僧人钻进了坍塌的废墟。空气里弥漫着水泥粉末的味道，呛得你几乎睁不开眼。一根横梁在头顶发出不祥的吱嘎声。僧人已经跪在地上，用双手搬开碎石，他的僧袍被割破，鲜血顺着手臂流下，他却像感觉不到一样。',
    type: 'scene',
    chapter: 5,
    choices: [],
    next: 'ch5_013'
  },
  'ch5_012': {
    id: 'ch5_012',
    speaker: null,
    text: '你帮助人群从活动中心的前门撤离。一个老人走不动了，你背起了他。穿过烟尘，你回头看了一眼——僧人的身影消失在了废墟深处。你不知道他还能不能出来。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_013'
  },
  'ch5_013': {
    id: 'ch5_013',
    speaker: null,
    text: '僧人从废墟中拖出了两个人。一个中年妇女，一个年迈的老人。他的脸上满是灰尘和血迹，双手在发抖，却露出了一个微笑。那不是胜利的笑，也不是英雄的笑——那是一种你无法命名的表情，像是悲悯与释然交织在一起。',
    type: 'narration',
    chapter: 5,
    choices: [
      {
        id: 'ch5_013_a',
        text: '扶住僧人，帮他站稳',
        effects: { stats: { understanding: 8, respect: 5 }, relations: { monk: { affection: 8, trust: 10 } } },
        next: 'ch5_014',
        condition: null,
        setFlag: 'witnessed_monk_sacrifice'
      },
      {
        id: 'ch5_013_b',
        text: '去查看被救出的两人是否还有呼吸',
        effects: { stats: { witness: 5, respect: 5 } },
        next: 'ch5_014',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_013_c',
        text: '问僧人：你不怕死吗？',
        effects: { stats: { understanding: 10 }, relations: { monk: { trust: 5 } } },
        next: 'ch5_014',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_014': {
    id: 'ch5_014',
    speaker: 'monk',
    text: '怕。但是……你听到里面的声音了吗？那是活人的声音。活人在呼救。如果我在外面念经，经文能救他们吗？我不确定。但我的手可以。',
    type: 'dialogue',
    chapter: 5,
    choices: [],
    next: 'ch5_015'
  },
  'ch5_015': {
    id: 'ch5_015',
    speaker: null,
    text: '你看到修女从人群中走了出来。她站在僧人面前，双手合十，不是她习惯的祈祷姿势，而是某种更古老的致意。两个不同信仰的人，在废墟之间，沉默地对视。这一刻，语言是多余的。',
    type: 'narration',
    chapter: 5,
    choices: [
      {
        id: 'ch5_015_a',
        text: '默默看着这一幕',
        effects: { stats: { witness: 8, respect: 5 }, relations: { nun: { affection: 3 }, monk: { affection: 3 } } },
        next: 'ch5_016',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_015_b',
        text: '走上前，为僧人受伤的手做简单包扎',
        effects: { stats: { understanding: 5, respect: 8 }, relations: { monk: { affection: 5, trust: 8 } } },
        next: 'ch5_016',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_016': {
    id: 'ch5_016',
    speaker: 'nun',
    text: '我为你祈祷。不是为了让你皈依——是为了让你平安。你的佛不会介意的，我想。',
    type: 'dialogue',
    chapter: 5,
    choices: [],
    next: 'ch5_017'
  },
  'ch5_017': {
    id: 'ch5_017',
    speaker: null,
    text: '混乱之中，你注意到了一个蜷缩在墙角的人影。神学生。他的脸色苍白如纸，双手死死攥着那本已经被揉皱的圣经，整个人像一根绷紧的弦。有人在叫他——废墟那边还有人在喊救命，需要人手。',
    type: 'scene',
    chapter: 5,
    choices: [],
    next: 'ch5_018'
  },
  'ch5_018': {
    id: 'ch5_018',
    speaker: 'seminarian',
    text: '我……我不行。我知道我应该去。我知道教义说"爱你的邻舍"……可是我的腿动不了。我能背出整段经文，但我连一步都迈不出去。我算什么？',
    type: 'dialogue',
    chapter: 5,
    choices: [
      {
        id: 'ch5_018_a',
        text: '拉住他的手，一步一步带他走',
        effects: { stats: { understanding: 10, respect: 5 }, relations: { seminarian: { affection: 10, trust: 10 } } },
        next: 'ch5_019',
        condition: null,
        setFlag: 'guided_seminarian'
      },
      {
        id: 'ch5_018_b',
        text: '对他说：你不需要现在成为英雄，但你不必一个人待着',
        effects: { stats: { understanding: 8 }, relations: { seminarian: { affection: 8, trust: 5 } } },
        next: 'ch5_019',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_018_c',
        text: '没有时间了，自己先去救人',
        effects: { stats: { witness: 5, respect: 5 } },
        next: 'ch5_020',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_019': {
    id: 'ch5_019',
    speaker: 'seminarian',
    text: '你……你不觉得我是个懦夫吗？我在课堂上讨论殉道者的时候，从来没有想过，当危险真的来临时，我连弯腰捡一块砖头都做不到。',
    type: 'dialogue',
    chapter: 5,
    choices: [
      {
        id: 'ch5_019_a',
        text: '恐惧不是罪。能承认恐惧，本身就是一种勇气',
        effects: { stats: { understanding: 8, respect: 3 }, relations: { seminarian: { affection: 5, trust: 8 } } },
        next: 'ch5_021',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_019_b',
        text: '走吧，跟我在一起。先做力所能及的事',
        effects: { stats: { understanding: 5, witness: 5 }, relations: { seminarian: { affection: 8, trust: 10 } } },
        next: 'ch5_021',
        condition: null,
        setFlag: 'guided_seminarian'
      }
    ],
    next: null
  },
  'ch5_020': {
    id: 'ch5_020',
    speaker: null,
    text: '你冲向废墟方向，搬开了几块碎石，帮助一个被困的居民脱身。当你回来的时候，神学生还蹲在原地。但他的眼睛里多了一点什么——不是释然，而是一种更深的自责。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_021'
  },
  'ch5_021': {
    id: 'ch5_021',
    speaker: null,
    text: '青年基督徒从人群中走了出来。你注意到他的脸上不再有迷茫的表情。他径直走向废墟方向，卷起了袖子。这是你第一次在他身上看到某种确定的东西——不是信仰的确定，而是行动的确定。',
    type: 'narration',
    chapter: 5,
    choices: [
      {
        id: 'ch5_021_a',
        text: '和他一起去搬废墟',
        effects: { stats: { respect: 5, witness: 5 }, relations: { youth: { affection: 8, trust: 5 } } },
        next: 'ch5_022',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_021_b',
        text: '鼓励他：你变了',
        effects: { stats: { understanding: 5 }, relations: { youth: { affection: 5, trust: 8 } } },
        next: 'ch5_022',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_021_c',
        text: '留在原地，照看伤员和孩子们',
        effects: { stats: { understanding: 3, respect: 3 } },
        next: 'ch5_022',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_022': {
    id: 'ch5_022',
    speaker: 'youth',
    text: '以前我总在问——"我信的够不够？"现在我觉得这个问题错了。应该问的是："我现在能做什么？"……也许信仰不是一种感觉，是一个动作。',
    type: 'dialogue',
    chapter: 5,
    choices: [],
    next: 'ch5_023'
  },
  'ch5_023': {
    id: 'ch5_023',
    speaker: null,
    text: '夜幕降临了。余震的频率在降低，但没有人敢松懈。医生在活动中心的走廊里架起了简易救护站，一盏应急灯照着他疲惫到几乎无法站直的身影。他已经连续工作了好几个小时。',
    type: 'scene',
    chapter: 5,
    choices: [
      {
        id: 'ch5_023_a',
        text: '给医生送一杯水',
        effects: { stats: { understanding: 5, respect: 5 }, relations: { doctor: { affection: 8, trust: 5 } } },
        next: 'ch5_024',
        condition: null,
        setFlag: 'trusted_nonbeliever'
      },
      {
        id: 'ch5_023_b',
        text: '去看看僧人和修女的情况',
        effects: { stats: { witness: 5, understanding: 3 }, relations: { monk: { affection: 3 }, nun: { affection: 3 } } },
        next: 'ch5_024',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_023_c',
        text: '去找神学生，看看他现在怎样了',
        effects: { stats: { understanding: 5 }, relations: { seminarian: { affection: 5, trust: 3 } } },
        next: 'ch5_024',
        condition: { relation: { character: 'seminarian', field: 'trust', min: 55 } },
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_024': {
    id: 'ch5_024',
    speaker: null,
    text: '所有人在活动中心的残骸旁围坐。医生、修女、教师、青年、僧人、神学生——六个截然不同的人，被一场灾难推到了同一个空间。没有人争论神学，没有人划分阵营。疲惫抹去了所有的边界，只剩下人与人之间最原始的联结：我们都在这里，我们都活着。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_025'
  },
  'ch5_025': {
    id: 'ch5_025',
    speaker: null,
    text: '沉默了很久之后，修女开口了。她的声音沙哑，像是被烟尘磨过了。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_026'
  },
  'ch5_026': {
    id: 'ch5_026',
    speaker: 'nun',
    text: '我以前总是为别人祈祷，好像祈祷是一件我能给予的东西。但是今天……我看着僧人从废墟里把人拖出来的时候，我第一次觉得，也许祈祷不是我在给予什么，而是我在学习接受——接受恩典可能以我意想不到的方式降临。',
    type: 'dialogue',
    chapter: 5,
    choices: [
      {
        id: 'ch5_026_a',
        text: '恩典不分来路',
        effects: { stats: { understanding: 10, respect: 5 } },
        next: 'ch5_027',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_026_b',
        text: '也许我们都不需要拥有全部的答案',
        effects: { stats: { understanding: 8, witness: 3 } },
        next: 'ch5_027',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_026_c',
        text: '你的祈祷也不白费。只是今天，他的双手更管用',
        effects: { stats: { respect: 8, understanding: 5 }, relations: { nun: { affection: 3 }, monk: { affection: 5 } } },
        next: 'ch5_027',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_027': {
    id: 'ch5_027',
    speaker: 'doctor',
    text: '我不信你们说的那些。但是今天晚上……我在废墟里缝合伤口的时候，我想起了一件事。我之所以成为医生，不是因为我相信什么。是因为我见过太多人死去，我不甘心。也许这不是信仰，但是……它把我带到了这里，带到了你们中间。',
    type: 'dialogue',
    chapter: 5,
    choices: [
      {
        id: 'ch5_027_a',
        text: '不甘心也是一种信念',
        effects: { stats: { understanding: 8, respect: 5 }, relations: { doctor: { affection: 8, trust: 10 } } },
        next: 'ch5_028',
        condition: null,
        setFlag: 'trusted_nonbeliever'
      },
      {
        id: 'ch5_027_b',
        text: '你救了人。这就够了',
        effects: { stats: { respect: 10 }, relations: { doctor: { affection: 5, trust: 8 } } },
        next: 'ch5_028',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_028': {
    id: 'ch5_028',
    speaker: null,
    text: '火光在每个人脸上跳动。你看着这一圈人——他们之间有太多的不同。信神的，不信神的；祈祷的，沉默的；勇敢的，恐惧的。但在今夜的微光中，这些界限像画在沙地上的线，被风轻轻一吹，就模糊了。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_029'
  },
  'ch5_029': {
    id: 'ch5_029',
    speaker: null,
    text: '你感觉到一种奇异的安宁。不是灾难过后的麻木，也不是筋疲力尽的空白。而是一种更深的、更安静的东西——像是在废墟之上，有什么无形的东西正在生长。你想起了所有走到这一刻的路。',
    type: 'narration',
    chapter: 5,
    choices: [
      {
        id: 'ch5_029_a',
        text: '走向医生，在他身边坐下',
        effects: { stats: { understanding: 5, witness: 3 }, relations: { doctor: { affection: 5, trust: 5 } } },
        next: 'ch5_030',
        condition: { relation: { character: 'doctor', field: 'trust', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch5_029_b',
        text: '走向僧人，为他受伤的手换一块纱布',
        effects: { stats: { understanding: 5, respect: 5 }, relations: { monk: { affection: 5, trust: 5 } } },
        next: 'ch5_030',
        condition: { relation: { character: 'monk', field: 'trust', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch5_029_c',
        text: '走向修女，和她一起安静地坐着',
        effects: { stats: { understanding: 5, witness: 5 }, relations: { nun: { affection: 5, trust: 5 } } },
        next: 'ch5_030',
        condition: { relation: { character: 'nun', field: 'trust', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch5_029_d',
        text: '走向教师，和孩子们待在一起',
        effects: { stats: { understanding: 5, respect: 3 }, relations: { teacher: { affection: 5, trust: 5 } } },
        next: 'ch5_030',
        condition: { relation: { character: 'teacher', field: 'trust', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch5_029_e',
        text: '走向神学生，告诉他：今晚你并不丢人',
        effects: { stats: { understanding: 8 }, relations: { seminarian: { affection: 8, trust: 5 } } },
        next: 'ch5_030',
        condition: { relation: { character: 'seminarian', field: 'affection', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch5_029_f',
        text: '谁也不找。你望着天上的星星，它们还在',
        effects: { stats: { witness: 10 } },
        next: 'ch5_030',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_030': {
    id: 'ch5_030',
    speaker: null,
    text: '有人开始轻声哼一首歌。你不知道是谁先开始的——也许是修女，也许是教师，也许只是在场的某个你叫不出名字的人。但很快，所有人都加入了进来。没有排练，没有指挥，甚至没有统一的歌词。但那些声音汇在一起的时候，你在其中听到了一种你从未在教堂里感受过的东西。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_031'
  },
  'ch5_031': {
    id: 'ch5_031',
    speaker: null,
    text: '也许那就是慈悲。不是任何一个宗教的专利，不是经文里的定义，不是讲坛上的宣言。它是一个人伸向另一个人的手——不管那只手属于谁，不管那只手在念什么。',
    type: 'narration',
    chapter: 5,
    choices: [
      {
        id: 'ch5_031_a',
        text: '你终于明白了：慈悲不需要名字',
        effects: { stats: { understanding: 10, respect: 8, prejudice: -10 } },
        next: 'ch5_032',
        condition: { stat: 'understanding', min: 60 },
        setFlag: 'moment_of_grace'
      },
      {
        id: 'ch5_031_b',
        text: '你感受到了某种超越言语的东西',
        effects: { stats: { witness: 8, understanding: 5, respect: 5 } },
        next: 'ch5_032',
        condition: null,
        setFlag: 'moment_of_grace'
      },
      {
        id: 'ch5_031_c',
        text: '你还没有答案，但你知道自己在靠近什么',
        effects: { stats: { understanding: 5, witness: 5 } },
        next: 'ch5_032',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_032': {
    id: 'ch5_032',
    speaker: 'teacher',
    text: '你们知道吗？我不信神。但今晚……我不觉得缺少什么。也许因为"缺少"这个词只在你一个人待着的时候才有意义。而我们现在不是一个人。',
    type: 'dialogue',
    chapter: 5,
    choices: [],
    next: 'ch5_033'
  },
  'ch5_033': {
    id: 'ch5_033',
    speaker: null,
    text: '第一个黎明。光线从活动中心残破的屋顶洒进来，像金色的雨。尘埃在光束中缓缓旋转，像是某种缓慢的、无声的舞蹈。所有人在彼此身边醒来——有些人靠在一起，有些人还握着别人的手。在那一刻，没有人是陌生人。',
    type: 'scene',
    chapter: 5,
    choices: [
      {
        id: 'ch5_033_a',
        text: '这个早晨，你相信慈悲有无数张面孔',
        effects: { stats: { understanding: 10, witness: 8, respect: 5, prejudice: -8 } },
        next: 'ch5_034',
        condition: { stat: 'understanding', min: 55 },
        setFlag: 'moment_of_grace'
      },
      {
        id: 'ch5_033_b',
        text: '你默默地记住了这一刻',
        effects: { stats: { witness: 10, respect: 5 } },
        next: 'ch5_034',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch5_034': {
    id: 'ch5_034',
    speaker: null,
    text: '清理废墟的工作在天亮后开始了。所有人都在动手——没有分工，没有指挥，甚至不需要语言。你递过一块砖，旁边的人接住，传给下一个人。在这个简单的动作里，你感觉到了什么在改变。不是世界——世界还是那个破碎的、残酷的世界。是你在改变。是你在学会一种新的看见。',
    type: 'narration',
    chapter: 5,
    choices: [],
    next: 'ch5_035'
  },
  'ch5_035': {
    id: 'ch5_035',
    speaker: null,
    text: '有人拍了拍你的肩膀。你转过身，看到了一张张疲惫却清晰的脸。他们没有说要走去哪里，但你心里知道——不管接下来会发生什么，你们不再是同行者了。你们已经是同伴。前方的路还没有名字，但名字已经不重要了。',
    type: 'narration',
    chapter: 5,
    choices: [
      {
        id: 'ch5_035_a',
        text: '继续前行',
        effects: { stats: { understanding: 5, witness: 5, respect: 5 } },
        next: 'ch6_001',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_035_b',
        text: '再回头看一眼这片废墟',
        effects: { stats: { witness: 8, understanding: 3 } },
        next: 'ch6_001',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch5_035_c',
        text: '对他们说：谢谢你们',
        effects: { stats: { respect: 8, understanding: 5 } },
        next: 'ch6_001',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  }
};
