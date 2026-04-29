var chapter6 = {
  'ch6_001': {
    id: 'ch6_001',
    speaker: null,
    text: '清晨的光穿过断壁残垣，落在瓦砾与尘土之间。城市的伤疤清晰可见，但有什么东西正在改变——空气里不再是绝望的味道，而是砖石、木料和汗水的气息。重建开始了。',
    type: 'narration',
    chapter: 6,
    choices: [],
    next: 'ch6_002'
  },
  'ch6_002': {
    id: 'ch6_002',
    speaker: null,
    text: '人们从各处汇聚而来。有人扛着工具箱，有人推着手推车，有人只带来了一双手。你站在临时搭建的物资分配点旁，看着一张张疲惫却不再逃避的面孔。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_002_a',
        text: '加入搬运物资的队伍',
        effects: { stats: { respect: 5, witness: 3 }, relations: { youth: { affection: 3 } } },
        next: 'ch6_003',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_002_b',
        text: '去查看伤员的安置情况',
        effects: { stats: { understanding: 5, respect: 3 }, relations: { doctor: { affection: 3 } } },
        next: 'ch6_003',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_002_c',
        text: '安静地站在一旁，观察每一个人',
        effects: { stats: { witness: 5, understanding: 3 } },
        next: 'ch6_003',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_003': {
    id: 'ch6_003',
    speaker: null,
    text: '忙碌中你抬起头，看到了那些熟悉的面孔——他们都在这里。医生在临时医疗站里弯着腰，修女在分发食物，教师在一群孩子中间蹲下身子，僧人搬运着木料，青年在一旁帮忙，神学生抱着几本书站在角落，似乎不知道该做什么。',
    type: 'scene',
    chapter: 6,
    choices: [],
    next: 'ch6_004'
  },
  'ch6_004': {
    id: 'ch6_004',
    speaker: null,
    text: '正午的阳光很烈。你靠着一段断墙坐下，手里握着一瓶水。远处传来锤子敲击的声音——有人已经在修复一面墙了。你忽然意识到，这座城市的重建不只是砖瓦的堆叠，更是人心的重新安放。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_004_a',
        text: '在这片刻的安静中，默默为每个人祈祷',
        effects: { stats: { witness: 4, understanding: 3 }, relations: { nun: { affection: 4 } } },
        next: 'ch6_005',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_004_b',
        text: '回想这些天来每个人的改变',
        effects: { stats: { understanding: 5, respect: 3 } },
        next: 'ch6_005',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_005': {
    id: 'ch6_005',
    speaker: null,
    text: '下午，你经过临时医疗站。里面很安静，最后一批伤员已经好转。医生坐在一张折叠椅上，望着窗外。他的手术刀整齐地排列在桌上，手边放着一杯已经凉透的茶。',
    type: 'narration',
    chapter: 6,
    choices: [],
    next: 'ch6_006'
  },
  'ch6_006': {
    id: 'ch6_006',
    speaker: null,
    text: '他的目光落在你身上，停了一瞬。那目光不再是审视，也不是防备——更像是某种迟来的打量，仿佛第一次想要看清你是什么样的人。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_006_a',
        text: '走过去，坐在他旁边的木箱上',
        effects: { relations: { doctor: { trust: 3 } } },
        next: 'ch6_007',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_006_b',
        text: '点点头致意，继续去忙',
        effects: { stats: { respect: 3 } },
        next: 'ch6_007',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_007': {
    id: 'ch6_007',
    speaker: null,
    text: '医生沉默了一会儿，然后开口了。他的声音比你听过的任何一次都低。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_007_a',
        text: '听他说下去',
        effects: {},
        next: 'ch6_008',
        condition: { relation: { character: 'doctor', field: 'trust', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch6_007_b',
        text: '听他说下去',
        effects: {},
        next: 'ch6_008b',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_008': {
    id: 'ch6_008',
    speaker: 'doctor',
    text: '"我以前也是信教的，你知道吗。"他没有看你，视线停留在窗外远处某个不确定的点。"小时候，我母亲每天跪着祈祷。后来她病了，祈祷没有用。再后来她死了，祈祷也没有用。那时候我十五岁。"他顿了顿。"我恨了很久。后来不恨了，只是不信了。"',
    type: 'dialogue',
    chapter: 6,
    choices: [],
    next: 'ch6_009'
  },
  'ch6_008b': {
    id: 'ch6_008b',
    speaker: 'doctor',
    text: '"你是个好人。"他简短地说。"我见过很多信教的人，大多数只是把信仰当作一面盾牌。你没有。"他停了一会儿，像是要说更多，但最终只是摇了摇头。',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_008b_a',
        text: '"谢谢你。"',
        effects: { stats: { respect: 3 }, relations: { doctor: { affection: 3 } } },
        next: 'ch6_010',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_008b_b',
        text: '安静地坐着，等他继续',
        effects: { stats: { understanding: 3 } },
        next: 'ch6_010',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_009': {
    id: 'ch6_009',
    speaker: 'doctor',
    text: '"但这些年，我一直在想一个问题——如果我母亲祈祷的那位上帝真的不存在，那她跪在那里的时候，支撑她的是什么？"他终于转过头看你。"我在这些废墟里也看到了同样的东西。你们信的人弯腰扶起别人的时候，和你不信的人弯腰的时候，姿势一模一样。"',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_009_a',
        text: '"也许重要的不是信不信，而是愿不愿意弯下腰。"',
        effects: { stats: { understanding: 6, respect: 4 }, relations: { doctor: { affection: 5, trust: 5 } } },
        next: 'ch6_010',
        condition: null,
        setFlag: 'doctor_opened_up'
      },
      {
        id: 'ch6_009_b',
        text: '"你母亲支撑她的，和支撑你站在这里的，也许是同一种东西。"',
        effects: { stats: { witness: 5, understanding: 5 }, relations: { doctor: { affection: 4, trust: 4 } } },
        next: 'ch6_010',
        condition: null,
        setFlag: 'doctor_opened_up'
      },
      {
        id: 'ch6_009_c',
        text: '沉默着，不知道该说什么',
        effects: { stats: { respect: 5 }, relations: { doctor: { trust: 3 } } },
        next: 'ch6_010',
        condition: null,
        setFlag: 'doctor_opened_up'
      }
    ],
    next: null
  },
  'ch6_010': {
    id: 'ch6_010',
    speaker: null,
    text: '傍晚时分，夕阳把废墟染成了琥珀色。你看到教师和修女站在一棵歪斜的梧桐树下，他们的表情都很认真，像是在进行一场已经持续了很久的对话。',
    type: 'narration',
    chapter: 6,
    choices: [],
    next: 'ch6_011'
  },
  'ch6_011': {
    id: 'ch6_011',
    speaker: null,
    text: '修女注意到了你。她朝你点了点头，目光中带着一种你之前没有见过的柔和。教师则侧过身，为你让出了树荫下的一点位置。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_011_a',
        text: '走过去',
        effects: {},
        next: 'ch6_012',
        condition: { relation: { character: 'teacher', field: 'trust', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch6_011_b',
        text: '走过去',
        effects: {},
        next: 'ch6_012b',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_012': {
    id: 'ch6_012',
    speaker: 'teacher',
    text: '"我想问你一个问题。"教师的语气罕见地直接。他看着你的眼睛，目光没有躲闪。"我不信上帝。你知道的。但我一直在这里——照顾孩子，陪伴老人，在瓦砾堆里翻找有用的东西。你觉得这些……有任何意义吗？在你的框架里。"',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_012_a',
        text: '"意义不取决于信不信。你在这里，孩子们就有了家。这就是意义。"',
        effects: { stats: { understanding: 7, respect: 5 }, relations: { teacher: { affection: 5, trust: 5 } } },
        next: 'ch6_013',
        condition: null,
        setFlag: 'teacher_questioned'
      },
      {
        id: 'ch6_012_b',
        text: '"我不确定我的框架能不能回答这个问题。但我知道，你做的事让我看到了某种——超越框架的东西。"',
        effects: { stats: { witness: 5, understanding: 6 }, relations: { teacher: { affection: 4, trust: 6 } } },
        next: 'ch6_013',
        condition: null,
        setFlag: 'teacher_questioned'
      },
      {
        id: 'ch6_012_c',
        text: '"也许上帝的作为比我们以为的更宽。我不知道答案，但我知道你做的是对的。"',
        effects: { stats: { witness: 6, respect: 4 }, relations: { teacher: { affection: 5, trust: 4 } } },
        next: 'ch6_013',
        condition: null,
        setFlag: 'teacher_questioned'
      }
    ],
    next: null
  },
  'ch6_012b': {
    id: 'ch6_012b',
    speaker: 'teacher',
    text: '"我们好像没怎么聊过。"教师平静地说。他的目光平和，但有一种保持距离的礼貌。"不过没关系。一起干活就够了。"他朝你笑了笑，然后弯腰继续搬砖。',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_012b_a',
        text: '和他一起搬砖',
        effects: { stats: { respect: 4 }, relations: { teacher: { trust: 3, affection: 3 } } },
        next: 'ch6_013',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_012b_b',
        text: '"下次我们聊聊吧。"',
        effects: { stats: { understanding: 3 }, relations: { teacher: { affection: 4 } } },
        next: 'ch6_013',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_013': {
    id: 'ch6_013',
    speaker: null,
    text: '修女等教师走后，在树下又站了一会儿。她的手里捏着一串念珠，但没有拨动。风吹动了她的头巾，露出了鬓角的白发。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_013_a',
        text: '走近她',
        effects: {},
        next: 'ch6_014',
        condition: { relation: { character: 'nun', field: 'affection', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch6_013_b',
        text: '走近她',
        effects: {},
        next: 'ch6_014b',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_014': {
    id: 'ch6_014',
    speaker: 'nun',
    text: '"我一直以为，非基督徒是迷途的人——他们需要被引导、被拯救。"她的声音很轻，像是在对自己说。"但在这里……我看到医生那样的人，他从来没有祈祷过一句话，却救了那么多人。我看到僧人合十的双手，比很多教徒的祈祷更加虔诚。"',
    type: 'dialogue',
    chapter: 6,
    choices: [],
    next: 'ch6_015'
  },
  'ch6_015': {
    id: 'ch6_015',
    speaker: 'nun',
    text: '"我想我可能是错了。"她抬起头，眼中有一层薄薄的水光。"告诉我——你觉得上帝在这里做什么？在这些不信他的人中间，在废墟和瓦砾之间？"',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_015_a',
        text: '"也许上帝从来不只在我们以为他在的地方。"',
        effects: { stats: { understanding: 7, witness: 5 }, relations: { nun: { affection: 6, trust: 5 } } },
        next: 'ch6_016',
        condition: null,
        setFlag: 'nun_reconsidered'
      },
      {
        id: 'ch6_015_b',
        text: '"我不知道。但我在这里看到了很多不应该被称为\'偶然\'的事。"',
        effects: { stats: { witness: 6, understanding: 5 }, relations: { nun: { affection: 5, trust: 5 } } },
        next: 'ch6_016',
        condition: null,
        setFlag: 'nun_reconsidered'
      },
      {
        id: 'ch6_015_c',
        text: '"也许答案不重要。重要的是我们都在这里，都在做同样的事。"',
        effects: { stats: { respect: 6, understanding: 4 }, relations: { nun: { affection: 5, trust: 4 } } },
        next: 'ch6_016',
        condition: null,
        setFlag: 'nun_reconsidered'
      }
    ],
    next: null
  },
  'ch6_014b': {
    id: 'ch6_014b',
    speaker: 'nun',
    text: '修女礼貌地朝你点头。"谢谢你这些天的帮助。"她说。语气温暖但克制，像是对一个值得尊重的外人说话。',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_014b_a',
        text: '"我们都在做同样的事。"',
        effects: { stats: { respect: 4 }, relations: { nun: { affection: 3 } } },
        next: 'ch6_016',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_014b_b',
        text: '微笑点头，然后走开',
        effects: { stats: { understanding: 2 } },
        next: 'ch6_016',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_016': {
    id: 'ch6_016',
    speaker: null,
    text: '夜幕降临。工地上挂起了几盏临时灯，橘黄色的光在废墟间投下摇曳的影子。你看到青年正在吃力地搬运一块石板，僧人在不远处默默地锯着木头，神学生终于放下了手里的书，在角落里翻找着什么。',
    type: 'narration',
    chapter: 6,
    choices: [],
    next: 'ch6_017'
  },
  'ch6_017': {
    id: 'ch6_017',
    speaker: null,
    text: '你走近青年。他满头大汗，衣服上全是灰，但他的动作没有停。这一次，他没有抱怨，没有逃避，也没有四下张望寻找夸奖——他只是在做。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_017_a',
        text: '帮他一起抬',
        effects: {},
        next: 'ch6_018',
        condition: { relation: { character: 'youth', field: 'affection', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch6_017_b',
        text: '帮他一起抬',
        effects: {},
        next: 'ch6_018b',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_018': {
    id: 'ch6_018',
    speaker: 'youth',
    text: '石板放下后，青年长出一口气，用手背擦了擦额头。他看着自己满是灰尘的双手，忽然笑了——不是之前那种讨好的笑，而是某种从胸腔深处涌上来的、笨拙而真实的笑。"你知道吗，"他说，"我以前以为服侍就是在教会里帮忙搬搬椅子。"',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_018_a',
        text: '"现在呢？"',
        effects: { stats: { understanding: 5, respect: 4 }, relations: { youth: { affection: 5, trust: 5 } } },
        next: 'ch6_019',
        condition: null,
        setFlag: 'youth_served'
      },
      {
        id: 'ch6_018_b',
        text: '拍拍他的肩膀，不说话',
        effects: { stats: { respect: 5, witness: 3 }, relations: { youth: { affection: 6, trust: 4 } } },
        next: 'ch6_019',
        condition: null,
        setFlag: 'youth_served'
      }
    ],
    next: null
  },
  'ch6_018b': {
    id: 'ch6_018b',
    speaker: 'youth',
    text: '他看了你一眼，点了点头表示谢意，然后继续去搬下一块。没有多余的话。你们之间还隔着一些东西——也许是时间，也许是那些没有建立起来的信任。',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_018b_a',
        text: '继续帮他搬',
        effects: { stats: { respect: 4 }, relations: { youth: { affection: 4, trust: 3 } } },
        next: 'ch6_019',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_018b_b',
        text: '去做别的事',
        effects: {},
        next: 'ch6_019',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_019': {
    id: 'ch6_019',
    speaker: null,
    text: '僧人放下锯子，拍了拍身上的木屑。他在工地的角落里坐了下来，双手合十，闭目片刻。当他睁开眼睛时，你发现他正注视着你，目光清澈而温暖。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_019_a',
        text: '走过去',
        effects: {},
        next: 'ch6_020',
        condition: { relation: { character: 'monk', field: 'trust', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch6_019_b',
        text: '走过去',
        effects: {},
        next: 'ch6_020b',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_020': {
    id: 'ch6_020',
    speaker: 'monk',
    text: '僧人从衣袍内侧取出一个小小的木牌，递到你面前。木牌打磨得很光滑，上面刻着一朵简单的莲花。他的动作郑重而缓慢，像是在完成一个早已准备好的仪式。',
    type: 'dialogue',
    chapter: 6,
    choices: [],
    next: 'ch6_021'
  },
  'ch6_021': {
    id: 'ch6_021',
    speaker: 'monk',
    text: '"你的慈悲不需要名字。"他的中文说得很慢，每一个字都像是经过了深思熟虑。"在你弯腰的时候，在你沉默的时候，在你不知道该说什么却还是留下来的时候——那就是慈悲。它不需要属于任何一个宗教。"',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_021_a',
        text: '接过木牌，双手合十回礼',
        effects: { stats: { understanding: 6, respect: 5 }, relations: { monk: { affection: 5, trust: 5 } } },
        next: 'ch6_022',
        condition: null,
        setFlag: 'monk_gifted'
      },
      {
        id: 'ch6_021_b',
        text: '"我的慈悲有名字。但它感谢你的慈悲。"',
        effects: { stats: { witness: 6, respect: 5 }, relations: { monk: { affection: 4, trust: 6 } } },
        next: 'ch6_022',
        condition: null,
        setFlag: 'monk_gifted'
      }
    ],
    next: null
  },
  'ch6_020b': {
    id: 'ch6_020b',
    speaker: 'monk',
    text: '僧人朝你微微颔首，双手合十。"辛苦了。"他只说了这三个字。但他的目光平和而深远，仿佛在无声地注视着你身上某种你自己都尚未看清的东西。',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_020b_a',
        text: '双手合十回礼',
        effects: { stats: { respect: 4 }, relations: { monk: { affection: 3, trust: 3 } } },
        next: 'ch6_022',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_020b_b',
        text: '点头致意',
        effects: { stats: { understanding: 3 } },
        next: 'ch6_022',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_022': {
    id: 'ch6_022',
    speaker: null,
    text: '你注意到神学生终于动了。他把手里的书放在了一摞砖头上，犹豫了几秒，然后走向工具堆。他拿起一把锤子，试了试重量，又放下，换了一把更小的。他的手指修长白皙，从未沾过粗活。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_022_a',
        text: '走过去教他用锤子',
        effects: {},
        next: 'ch6_023',
        condition: { relation: { character: 'seminarian', field: 'affection', min: 60 } },
        setFlag: null
      },
      {
        id: 'ch6_022_b',
        text: '走过去教他用锤子',
        effects: {},
        next: 'ch6_023b',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_023': {
    id: 'ch6_023',
    speaker: 'seminarian',
    text: '"我一直以为，认识上帝就是认识关于上帝的知识。"他握着锤子，指节发白。"巴特说上帝是\'完全的他者\'，田立克说上帝是\'存在的根据\'——我都能背诵。但这些天……"他的声音颤了一下，"我在瓦砾下面拉出一个人的时候，那些概念一个都想不起来。"',
    type: 'dialogue',
    chapter: 6,
    choices: [],
    next: 'ch6_024'
  },
  'ch6_024': {
    id: 'ch6_024',
    speaker: 'seminarian',
    text: '他举起锤子，笨拙地敲了一颗钉子。钉子歪了。他笑了笑，拔出来重新来过。"也许信仰不是用来想的。"他说，第二锤依然歪了。"是用来活的。"第三锤终于敲正了。他长出了一口气，眼角有光在闪。',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_024_a',
        text: '"书本教会你认识上帝的头，这把锤子正在教会你认识上帝的手。"',
        effects: { stats: { understanding: 6, witness: 5 }, relations: { seminarian: { affection: 6, trust: 5 } } },
        next: 'ch6_025',
        condition: null,
        setFlag: 'seminarian_acted'
      },
      {
        id: 'ch6_024_b',
        text: '什么也不说，接过另一把锤子，和他一起敲',
        effects: { stats: { respect: 6, understanding: 4 }, relations: { seminarian: { affection: 7, trust: 5 } } },
        next: 'ch6_025',
        condition: null,
        setFlag: 'seminarian_acted'
      }
    ],
    next: null
  },
  'ch6_023b': {
    id: 'ch6_023b',
    speaker: 'seminarian',
    text: '他接过你递来的锤子，有些手足无措。"谢谢。"他小声说，然后用力地敲了下去——钉子飞了出去，他涨红了脸。"我……我不太擅长这个。"他弯腰去捡钉子，看起来像是想找个地缝钻进去。',
    type: 'dialogue',
    chapter: 6,
    choices: [
      {
        id: 'ch6_023b_a',
        text: '"没关系，慢慢来。"',
        effects: { stats: { respect: 4 }, relations: { seminarian: { affection: 4, trust: 3 } } },
        next: 'ch6_025',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_023b_b',
        text: '帮他捡钉子，然后示范一次',
        effects: { stats: { understanding: 3, respect: 3 }, relations: { seminarian: { affection: 5 } } },
        next: 'ch6_025',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_025': {
    id: 'ch6_025',
    speaker: null,
    text: '深夜。工地安静下来，临时灯在风中微微晃动。你独自坐在一段断墙上，腿悬在空中，面前是半座城市的废墟和半座城市的轮廓。有人在你身后的黑暗中走近，脚步声很轻——但你认出了那步伐的节奏。是这群人里的某一个。',
    type: 'narration',
    chapter: 6,
    choices: [],
    next: 'ch6_026'
  },
  'ch6_026': {
    id: 'ch6_026',
    speaker: null,
    text: '不管是谁走了过来，又走了，留给你的只有夜风和一个问题——一个从灾难第一天起就悬在空气中的问题，从未被正面回答过：上帝在这场灾难中做了什么？或者，更根本的：在信徒与非信徒共同弯腰的废墟上，恩典究竟有没有偏袒？',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_026_a',
        text: '恩典没有偏袒。上帝在每一个人弯腰的瞬间都在场。',
        effects: { stats: { understanding: 8, witness: 5 }, relations: { doctor: { trust: 3 }, monk: { affection: 3 } } },
        next: 'ch6_027',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_026_b',
        text: '我不知道恩典的边界在哪里。但我知道，爱不需要先确认对方是谁。',
        effects: { stats: { respect: 7, understanding: 5 }, relations: { nun: { affection: 3 }, teacher: { trust: 3 } } },
        next: 'ch6_027',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_026_c',
        text: '也许这个问题本身就是错的。重要的不是恩典偏向谁，而是我们是否回应了面前的需要。',
        effects: { stats: { witness: 6, respect: 5 }, relations: { youth: { trust: 3 }, seminarian: { affection: 3 } } },
        next: 'ch6_027',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_027': {
    id: 'ch6_027',
    speaker: null,
    text: '第二天清晨。重建工作继续。你穿过工地，走过每一张你熟悉的面孔——他们各自忙碌，偶尔抬头看你一眼。每一道目光都不一样，但每一道目光都比第一天时多了一些什么。也许是信任，也许是理解，也许只是一种被共同经历磨出来的默契。',
    type: 'narration',
    chapter: 6,
    choices: [],
    next: 'ch6_028'
  },
  'ch6_028': {
    id: 'ch6_028',
    speaker: null,
    text: '你站在工地中央，四周是渐渐恢复秩序的景象。你知道自己快要离开了。这座城市会继续重建，这些人会继续他们的生活。但在你转身之前，有一个问题始终盘桓在你的心里——也许是整个旅程中最沉重的那个问题。',
    type: 'narration',
    chapter: 6,
    choices: [
      {
        id: 'ch6_028_a',
        text: '一个不信的人活出了信仰的样子，那他算不算"匿名的基督徒"？',
        effects: { stats: { understanding: 7, witness: 5 } },
        next: 'ch6_029',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_028_b',
        text: '如果我的信仰只在教堂里有意义，那它在废墟上算什么？',
        effects: { stats: { witness: 7, respect: 5 } },
        next: 'ch6_029',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch6_028_c',
        text: '真正的同行，是不是意味着放下定义对方的权利？',
        effects: { stats: { understanding: 5, respect: 7 } },
        next: 'ch6_029',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch6_029': {
    id: 'ch6_029',
    speaker: null,
    text: '风从远处吹来，带着泥土和新木的气息。你深吸一口气，最后看了一眼这座正在重生的城市。你知道，这个问题没有标准答案。但你在这里度过的每一天、遇见的每一个人、做出的每一个选择，已经构成了你自己的回答。你不需要把它说出来。你只需要带着它，继续走。',
    type: 'narration',
    chapter: 6,
    choices: [],
    next: 'ch6_030'
  },
  'ch6_030': {
    id: 'ch6_030',
    speaker: null,
    text: '你背起行囊，朝城市边缘走去。身后传来锤子敲击的声音，稳定而有力。你没有回头。但你知道——当你再次面对废墟的时候，你会记得这些人。他们不完美，你也一样。但在那片瓦砾之间，你们曾经同行。这就够了。',
    type: 'narration',
    chapter: 6,
    choices: [],
    next: null
  }
};
