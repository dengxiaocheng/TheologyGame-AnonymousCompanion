var chapter2 = {
  'ch2_001': {
    id: 'ch2_001',
    speaker: null,
    text: '洪水退去后的第三天。泥水在街道上留下弯曲的痕迹，像是一道道无法愈合的伤口。社区活动中心变成了临时的赈灾站点——这里曾经举办过婚礼和生日聚会，现在堆满了捐赠的毛毯和方便面。',
    type: 'scene',
    chapter: 2,
    choices: [],
    next: 'ch2_002'
  },
  'ch2_002': {
    id: 'ch2_002',
    speaker: null,
    text: '你走进活动中心的大门。空气里弥漫着消毒水和潮湿衣物的混合气味。志愿者们在人群中穿行，有人分发食物，有人安抚哭泣的孩子。在角落里，一个穿着白大褂的人正在给一位老人的手臂上缠绷带。',
    type: 'narration',
    chapter: 2,
    choices: [
      {
        id: 'ch2_002_a',
        text: '走近那个穿白大褂的人',
        effects: { stats: { respect: 4 }, relations: { doctor: { affection: 3 } } },
        next: 'ch2_003',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_002_b',
        text: '先去帮忙分发食物',
        effects: { stats: { understanding: 4 } },
        next: 'ch2_004',
        condition: null,
        setFlag: 'prioritized_action'
      },
      {
        id: 'ch2_002_c',
        text: '在门口观察一会儿',
        effects: { stats: { witness: 3 } },
        next: 'ch2_004',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_003': {
    id: 'ch2_003',
    speaker: 'doctor',
    text: '……是你。那晚避难所的。他抬起头看了你一眼，手上没有停。把那箱纱布递过来，上面第二层。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_003_a',
        text: '递过纱布，问："你一直在这里忙吗？"',
        effects: { stats: { respect: 3 }, relations: { doctor: { affection: 4, trust: 3 } } },
        next: 'ch2_005',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_003_b',
        text: '默默递过纱布，没有多问',
        effects: { stats: { witness: 4 }, relations: { doctor: { trust: 5 } } },
        next: 'ch2_005',
        condition: null,
        setFlag: 'silent_first'
      }
    ],
    next: null
  },
  'ch2_004': {
    id: 'ch2_004',
    speaker: null,
    text: '你融入了志愿者的队伍。搬运物资、登记名单、清理积水。在忙碌的间隙，你注意到角落里的医生——他的白大褂已经染上了泥渍，但手上的动作依旧沉稳。你不禁想知道他是什么时候开始、又什么时候结束。',
    type: 'narration',
    chapter: 2,
    choices: [],
    next: 'ch2_005'
  },
  'ch2_005': {
    id: 'ch2_005',
    speaker: null,
    text: '活动中心的另一头，一位修女正在组织祈祷。她跪在一排排折叠床之间，双手合十，声音不高不低，刚好能被周围的人听见。几个灾民自发地围拢过来，闭上眼睛跟着她念。',
    type: 'scene',
    chapter: 2,
    choices: [
      {
        id: 'ch2_005_a',
        text: '走过去加入祈祷',
        effects: { stats: { witness: 5 }, relations: { nun: { affection: 5 } } },
        next: 'ch2_006',
        condition: null,
        setFlag: 'prioritized_prayer'
      },
      {
        id: 'ch2_005_b',
        text: '继续手头的工作',
        effects: { stats: { understanding: 4 }, relations: { doctor: { trust: 3 } } },
        next: 'ch2_007',
        condition: null,
        setFlag: 'prioritized_action'
      },
      {
        id: 'ch2_005_c',
        text: '站在远处安静地看着',
        effects: { stats: { witness: 3, understanding: 3 } },
        next: 'ch2_007',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_006': {
    id: 'ch2_006',
    speaker: 'nun',
    text: '她睁开眼看到你，露出温和的笑容。谢谢你愿意和我们一起。在这样的时刻，祈祷是我们能为彼此做的最真诚的事。她的声音里有一种不属于这个混乱空间的宁静。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_006_a',
        text: '"我也觉得现在需要一些平静。"',
        effects: { stats: { witness: 4 }, relations: { nun: { trust: 4, affection: 3 } } },
        next: 'ch2_008',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_006_b',
        text: '"其实我不太会祈祷，但我想待在这里。"',
        effects: { stats: { understanding: 5 }, relations: { nun: { affection: 4 } } },
        next: 'ch2_008',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_007': {
    id: 'ch2_007',
    speaker: null,
    text: '你的余光里，修女带领的祈祷圈逐渐散去。她起身，拍了拍膝盖上的灰尘，开始帮忙整理物资。她的动作不像医生那样利落，但每一样东西她都会多看一眼，仿佛在确认它们是否会被真正需要。',
    type: 'narration',
    chapter: 2,
    choices: [],
    next: 'ch2_008'
  },
  'ch2_008': {
    id: 'ch2_008',
    speaker: null,
    text: '傍晚时分，活动中心安静下来。外面的天空呈现出一种被洗过的灰蓝色。你坐在折叠椅上休息，手里握着一杯已经变凉的茶。医生在角落里整理药品，修女在不远处擦拭一张张折叠桌。他们之间隔着整个大厅，却似乎都没有注意到对方。',
    type: 'scene',
    chapter: 2,
    choices: [],
    next: 'ch2_009'
  },
  'ch2_009': {
    id: 'ch2_009',
    speaker: null,
    text: '一个年轻的母亲抱着发烧的婴儿匆匆走进来，脸上写满了恐惧。修女第一个迎了上去，双手在胸前画了一个十字，轻声说：让我看看。但医生已经放下了手中的药箱，快步走了过来。他们在那个母亲面前相遇了。',
    type: 'narration',
    chapter: 2,
    choices: [
      {
        id: 'ch2_009_a',
        text: '跟着医生走过去',
        effects: { stats: { understanding: 3 }, relations: { doctor: { trust: 3 } } },
        next: 'ch2_010',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_009_b',
        text: '跟着修女走过去',
        effects: { stats: { witness: 3 }, relations: { nun: { trust: 3 } } },
        next: 'ch2_010',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_009_c',
        text: '站在原地，让他们自行处理',
        effects: { stats: { witness: 2, understanding: 2 } },
        next: 'ch2_010',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_010': {
    id: 'ch2_010',
    speaker: 'doctor',
    text: '体温三十八度七。没有大碍，物理降温，多喂水。他递过一支体温计，声音平淡得像在播报天气。旁边的修女默默让出位置，却始终没有走远，一只手搭在年轻母亲的肩膀上。医生瞥了她一眼，什么也没说。',
    type: 'dialogue',
    chapter: 2,
    choices: [],
    next: 'ch2_011'
  },
  'ch2_011': {
    id: 'ch2_011',
    speaker: null,
    text: '深夜。活动中心只剩下微弱的应急灯光。大多数灾民已经睡去，偶尔传来几声咳嗽和婴儿的啼哭。你看到修女独自坐在窗边，月光在她脸上投下清晰的轮廓。她的嘴唇微微翕动，似乎在念着什么。',
    type: 'scene',
    chapter: 2,
    choices: [
      {
        id: 'ch2_011_a',
        text: '走过去坐在她身边',
        effects: { stats: { understanding: 3, witness: 3 }, relations: { nun: { affection: 4 } } },
        next: 'ch2_012',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_011_b',
        text: '不想打扰她，转身去查看其他灾民',
        effects: { stats: { respect: 4 }, relations: { nun: { trust: 3 } } },
        next: 'ch2_013',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_012': {
    id: 'ch2_012',
    speaker: 'nun',
    text: '她转过头，眼眶有些发红。啊……是你。抱歉，我没有注意到你。她的声音比白天低了许多，像一根绷得太紧的琴弦在微微颤动。你坐下来就好。有时候……沉默也是一种祈祷。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_012_a',
        text: '"你看起来不太好了。发生了什么？"',
        effects: { stats: { understanding: 5 }, relations: { nun: { trust: 4 } } },
        next: 'ch2_014',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_012_b',
        text: '什么都不说，只是安静地坐着',
        effects: { stats: { witness: 5, respect: 3 }, relations: { nun: { affection: 5 } } },
        next: 'ch2_014',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_013': {
    id: 'ch2_013',
    speaker: null,
    text: '你在昏暗的灯光下巡视了一圈。一个老人在梦中呢喃，一个小男孩抱着书包睡得很沉。路过窗边时，你无意中与修女四目相对。她轻轻点了点头，似乎在说：没关系。你继续走你的路。',
    type: 'narration',
    chapter: 2,
    choices: [],
    next: 'ch2_014'
  },
  'ch2_014': {
    id: 'ch2_014',
    speaker: 'nun',
    text: '她沉默了很久，终于开口。我不知道该怎么祈祷了。以前我总以为，祈祷就是向上帝倾诉，相信他会听见的。可是现在……那些失去家园的人、那个发烧的婴儿……我念了很多遍经文，但那些话像石头一样沉在胸口，升不上去。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_014_a',
        text: '"也许上帝不一定要用祈祷来回应。你今天做的事情——安慰那个母亲，分发物资——那不也是一种回答吗？"',
        effects: { stats: { understanding: 7 }, relations: { nun: { affection: 5, trust: 4 } } },
        next: 'ch2_015',
        condition: null,
        setFlag: 'comforted_nun'
      },
      {
        id: 'ch2_014_b',
        text: '"你的困惑本身就说明你的信仰是真实的。机械的祈祷才不会有这种痛。"',
        effects: { stats: { witness: 7 }, relations: { nun: { trust: 6, affection: 3 } } },
        next: 'ch2_015',
        condition: null,
        setFlag: 'comforted_nun'
      },
      {
        id: 'ch2_014_c',
        text: '"我也不知道该怎么回答你。但我觉得你不需要现在就有答案。"',
        effects: { stats: { understanding: 4, witness: 4 }, relations: { nun: { affection: 5, trust: 5 } } },
        next: 'ch2_015',
        condition: null,
        setFlag: 'comforted_nun'
      }
    ],
    next: null
  },
  'ch2_015': {
    id: 'ch2_015',
    speaker: 'nun',
    text: '她低下头，双手攥着十字架。你知道吗？今天下午那个医生给婴儿看病的时候……他甚至没有犹豫一秒。他不信上帝，可他做的事情比我那些祈祷有用得多。她的声音变得很轻，像是在跟自己说话。我在想……上帝会不会通过一个不信他的人在做事？',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_015_a',
        text: '"也许恩典不认识宗教的边界。"',
        effects: { stats: { understanding: 8 }, relations: { nun: { affection: 4 } } },
        next: 'ch2_016',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_015_b',
        text: '"他的善良和你的信仰不一定是对立的。你们今天同时出现在那个婴儿身边，这不就是一种回答吗？"',
        effects: { stats: { respect: 6, understanding: 5 }, relations: { nun: { trust: 5 }, doctor: { affection: 3 } } },
        next: 'ch2_016',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_015_c',
        text: '"也许他只是在自己的能力范围内做了该做的事。不一定需要用信仰来解释。"',
        effects: { stats: { understanding: 5, prejudice: 4 }, relations: { doctor: { affection: 4 } } },
        next: 'ch2_016',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_016': {
    id: 'ch2_016',
    speaker: 'nun',
    text: '她沉思着点了点头。你说的有道理。可是……她犹豫了一下，如果上帝可以通过不信的人来行善，那我们这些祈祷的人算什么？我们日复一日地跪下来，叩拜、祈求、感恩——如果这些都没有意义，那我这一生……她的声音没有断，但剩下的句子像雾一样散开了。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_016_a',
        text: '"你的祈祷也许不是给上帝的，而是给你身边那些人的。你给了他们平静和希望。"',
        effects: { stats: { understanding: 6, witness: 4 }, relations: { nun: { affection: 6, trust: 4 } } },
        next: 'ch2_017',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_016_b',
        text: '"意义不是非此即彼的。他的行动和你的祈祷，也许各自照亮不同的黑暗。"',
        effects: { stats: { respect: 6, understanding: 5 }, relations: { nun: { trust: 5 }, doctor: { trust: 3 } } },
        next: 'ch2_017',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_016_c',
        text: '"这个问题值得你继续想下去。但现在有人需要你明天的精力。"',
        effects: { stats: { respect: 5, witness: 3 }, relations: { nun: { trust: 4 } } },
        next: 'ch2_017',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_017': {
    id: 'ch2_017',
    speaker: null,
    text: '修女用袖口擦了擦眼角。她没有再说话，但你感觉到她内心的风暴稍微平息了一些。窗外的月亮被一片薄云遮住了，活动中心又暗了几分。远处，角落里传来药品包装袋被撕开的声音——医生还没有休息。',
    type: 'narration',
    chapter: 2,
    choices: [],
    next: 'ch2_018'
  },
  'ch2_018': {
    id: 'ch2_018',
    speaker: null,
    text: '第二天清晨。阳光从破碎的窗户照进来，在地板上画出歪斜的光柱。你被一阵低沉的争吵声惊醒。修女站在医生的临时诊台前，脸色有些苍白。',
    type: 'scene',
    chapter: 2,
    choices: [],
    next: 'ch2_019'
  },
  'ch2_019': {
    id: 'ch2_019',
    speaker: 'nun',
    text: '我想为那些受伤的人祈祷。只需要几分钟。她看着医生，语气坚定但带着恳求。他拒绝了她。不需要。他们需要的是换药和休息，不是你站在那里念经。他的声音不响，但每个字都砸得很实。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_019_a',
        text: '站出来为医生说话："他说的有道理，现在时间紧，先处理伤口。"',
        effects: { stats: { understanding: 5, prejudice: 3 }, relations: { doctor: { affection: 5, trust: 4 }, nun: { affection: -3 } } },
        next: 'ch2_020',
        condition: null,
        setFlag: 'defended_doctor'
      },
      {
        id: 'ch2_019_b',
        text: '温和地调解："也许可以等换完药之后？给他们一个安静的时刻。"',
        effects: { stats: { understanding: 5, respect: 4 }, relations: { nun: { trust: 5, affection: 3 }, doctor: { trust: 3 } } },
        next: 'ch2_020',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_019_c',
        text: '对修女说："他们的痛苦不比你的祈祷轻。但你的祈祷也不比他们的痛苦轻。"',
        effects: { stats: { witness: 6, understanding: 5 }, relations: { nun: { affection: 5, trust: 5 } } },
        next: 'ch2_020',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_020': {
    id: 'ch2_020',
    speaker: 'doctor',
    text: '他停下手里的动作，看了你一眼。目光里没有感激，也没有不满，只是一种疲倦的计算。行。他最终说。你爱怎么祈祷就怎么祈祷。但别碰我的药品，别挡我的路。他低下头继续工作，仿佛这场对话从未发生过。修女抿着嘴唇退后了一步。',
    type: 'dialogue',
    chapter: 2,
    choices: [],
    next: 'ch2_021'
  },
  'ch2_021': {
    id: 'ch2_021',
    speaker: null,
    text: '上午。活动中心里人声嘈杂。修女在一侧给灾民分发早餐，同时低声为每一个人祈祷祝福。医生在另一侧连续处理了三个伤患，动作快而精确，像一个不疲倦的机器。你站在中间，能同时看到他们两个。',
    type: 'scene',
    chapter: 2,
    choices: [
      {
        id: 'ch2_021_a',
        text: '去帮修女分发早餐',
        effects: { stats: { witness: 4 }, relations: { nun: { affection: 4, trust: 3 } } },
        next: 'ch2_022',
        condition: null,
        setFlag: 'prioritized_prayer'
      },
      {
        id: 'ch2_021_b',
        text: '去给医生打下手',
        effects: { stats: { understanding: 4, respect: 3 }, relations: { doctor: { affection: 4, trust: 4 } } },
        next: 'ch2_023',
        condition: null,
        setFlag: 'prioritized_action'
      },
      {
        id: 'ch2_021_c',
        text: '两边轮流帮忙',
        effects: { stats: { understanding: 3, witness: 3, respect: 3 }, relations: { doctor: { affection: 2 }, nun: { affection: 2 } } },
        next: 'ch2_024',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_022': {
    id: 'ch2_022',
    speaker: 'nun',
    text: '她递给你一盒牛奶，又多拿了一盒。这盒给那边的医生吧。他的手不方便拿东西。她说得很自然，好像昨天的不快没有发生过。你注意到她看向医生的方向时，目光比以往多了一层你读不懂的东西——不是怨恨，更像是困惑。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_022_a',
        text: '把牛奶送给医生，告诉他这是修女准备的',
        effects: { stats: { understanding: 5, respect: 4 }, relations: { doctor: { affection: 4 }, nun: { trust: 4 } } },
        next: 'ch2_024',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_022_b',
        text: '把牛奶送给医生，但不提修女',
        effects: { stats: { understanding: 3 }, relations: { doctor: { affection: 3 } } },
        next: 'ch2_024',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_023': {
    id: 'ch2_023',
    speaker: 'doctor',
    text: '他接过你递来的碘伏，头也不抬地说。你的手还算稳。再来一个，绷带缠三圈，不要太紧。在忙碌的间隙，他的目光偶尔掠过修女的方向，然后迅速收回来，像碰到什么烫手的东西。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_023_a',
        text: '"修女那边也挺忙的。你们需要协调一下吗？"',
        effects: { stats: { understanding: 5, respect: 4 }, relations: { doctor: { trust: 3 }, nun: { trust: 3 } } },
        next: 'ch2_024',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_023_b',
        text: '什么都不问，继续帮忙',
        effects: { stats: { respect: 5 }, relations: { doctor: { trust: 5 } } },
        next: 'ch2_024',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_024': {
    id: 'ch2_024',
    speaker: null,
    text: '午后。一个消息在灾民中传开：上游又有一座桥塌了，救援物资可能要延迟两天。恐惧像墨水一样在人群里扩散。有人开始哭泣，有人开始抱怨，有人沉默地攥紧了拳头。',
    type: 'narration',
    chapter: 2,
    choices: [],
    next: 'ch2_025'
  },
  'ch2_025': {
    id: 'ch2_025',
    speaker: 'nun',
    text: '修女立刻走向人群最密集的地方，举起双手。请大家跟我一起祈祷。她的声音穿越了嘈杂，带着一种不容置疑的温柔。天父啊，我们在苦难中呼求你……然而这一次，跟上来的人比昨天少了许多。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_025_a',
        text: '走过去站在修女身边，和她一起面对人群',
        effects: { stats: { witness: 6 }, relations: { nun: { affection: 6, trust: 5 } } },
        next: 'ch2_026',
        condition: null,
        setFlag: 'prioritized_prayer'
      },
      {
        id: 'ch2_025_b',
        text: '转身去找医生，看看有没有什么实际能做的',
        effects: { stats: { understanding: 5, respect: 4 }, relations: { doctor: { affection: 5, trust: 4 } } },
        next: 'ch2_026',
        condition: null,
        setFlag: 'prioritized_action'
      },
      {
        id: 'ch2_025_c',
        text: '走到哭泣的人群中间，挨个安慰他们',
        effects: { stats: { understanding: 6, witness: 3 }, relations: { nun: { affection: 3 }, doctor: { trust: 3 } } },
        next: 'ch2_026',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_026': {
    id: 'ch2_026',
    speaker: null,
    text: '接下来的几个小时，活动中心被一种沉重的氛围笼罩。修女不再组织集体的祈祷，而是走到每一个沉默的灾民面前，蹲下来，握住他们的手，轻声说几句话。医生则在物资堆里翻找，把所有能用的东西重新归类、登记、列出清单。他们各自以自己的方式对抗着恐惧。',
    type: 'narration',
    chapter: 2,
    choices: [],
    next: 'ch2_027'
  },
  'ch2_027': {
    id: 'ch2_027',
    speaker: null,
    text: '天色再次暗下来。你疲惫地靠在墙上。突然，你发现医生不在他的角落里。白大褂挂在椅背上，药品整齐地码放着。你不记得他什么时候离开的。',
    type: 'narration',
    chapter: 2,
    choices: [
      {
        id: 'ch2_027_a',
        text: '出去找他',
        effects: { stats: { understanding: 4, witness: 4 }, relations: { doctor: { affection: 4, trust: 3 } } },
        next: 'ch2_028',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_027_b',
        text: '也许他只是去休息了，不去打扰',
        effects: { stats: { respect: 3 }, relations: { doctor: { trust: 4 } } },
        next: 'ch2_029',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_028': {
    id: 'ch2_028',
    speaker: null,
    text: '你穿过走廊，推开活动中心后面一扇虚掩的铁门。一个小小的天井出现在眼前——杂草从水泥裂缝里长出来，积水映着星光。然后你看到了他。医生独自站在天井中央，双手合十，低着头。他的嘴唇在动。',
    type: 'scene',
    chapter: 2,
    choices: [],
    next: 'ch2_029'
  },
  'ch2_029': {
    id: 'ch2_029',
    speaker: null,
    text: '你屏住呼吸。那个姿势——双手合十，低垂着头——你见过无数次。那是祈祷的姿势。这个说自己不信上帝的人，此刻正在用最古老的姿态与某个看不见的存在对话。你不确定他是在祈祷还是在哀悼，或者两者兼有。',
    type: 'narration',
    chapter: 2,
    choices: [
      {
        id: 'ch2_029_a',
        text: '悄悄退开，不让他知道你看到了',
        effects: { stats: { respect: 7, witness: 5 }, relations: { doctor: { trust: 5 } } },
        next: 'ch2_030',
        condition: null,
        setFlag: 'saw_doctor_pray'
      },
      {
        id: 'ch2_029_b',
        text: '轻声说："你还好吗？"假装没有注意到他的姿势',
        effects: { stats: { understanding: 6 }, relations: { doctor: { affection: 5, trust: 4 } } },
        next: 'ch2_030',
        condition: null,
        setFlag: 'saw_doctor_pray'
      },
      {
        id: 'ch2_029_c',
        text: '走过去，什么都不说，站在他身边',
        effects: { stats: { understanding: 5, respect: 5, witness: 3 }, relations: { doctor: { affection: 6, trust: 6 } } },
        next: 'ch2_030',
        condition: null,
        setFlag: 'saw_doctor_pray'
      }
    ],
    next: null
  },
  'ch2_030': {
    id: 'ch2_030',
    speaker: 'doctor',
    text: '无论你做了什么选择，他最终察觉到了你的存在。他迅速放下双手，转过身来。他的表情没有你预想中的尴尬——只有一种裸露的疲倦，像是被拆穿了什么，但已经没有力气去遮掩。你看到了吗。他说。不是问句。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_030_a',
        text: '"看到了。但我不确定那是什么。"',
        effects: { stats: { understanding: 7 }, relations: { doctor: { trust: 5 } } },
        next: 'ch2_031',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_030_b',
        text: '"每个人都有需要独处的时刻。我不会告诉任何人。"',
        effects: { stats: { respect: 6, witness: 4 }, relations: { doctor: { affection: 6, trust: 7 } } },
        next: 'ch2_031',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_030_c',
        text: '"你不用解释什么。你不是欠谁一个答案的人。"',
        effects: { stats: { understanding: 5, respect: 5 }, relations: { doctor: { affection: 5, trust: 5 } } },
        next: 'ch2_031',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_031': {
    id: 'ch2_031',
    speaker: 'doctor',
    text: '他沉默了很久。不是习惯。他终于说，声音比你听过的任何一次都低。我妈信。小时候每天晚上她都逼我跪下来，感谢上帝给的一切。我恨透了那些祈祷。后来她生病了，祈祷没有救她。我就再也不信了。他的目光落在天井里的积水上。可是有时候……站在这里的时候，手还是自己合起来了。这不是祈祷。这只是……习惯。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_031_a',
        text: '"也许那不叫习惯。也许那是你身体比你的脑子更诚实的部分。"',
        effects: { stats: { understanding: 8, witness: 5 }, relations: { doctor: { affection: 6, trust: 5 } } },
        next: 'ch2_032',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_031_b',
        text: '"不管它叫什么，它没有伤害任何人。"',
        effects: { stats: { respect: 6, understanding: 4 }, relations: { doctor: { trust: 5 } } },
        next: 'ch2_032',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_032': {
    id: 'ch2_032',
    speaker: null,
    text: '他没有回应。你们在沉默中站了一会儿，头顶的星星被云层一片一片地遮住。最后他直起身子，用习惯性的平淡语气说：该回去了。明天还有很多人要处理。他走向铁门，经过你身边时停了一瞬。谢谢。两个字，比任何话都重。',
    type: 'narration',
    chapter: 2,
    choices: [],
    next: 'ch2_033'
  },
  'ch2_033': {
    id: 'ch2_033',
    speaker: null,
    text: '你跟在他后面走回大厅。修女正在门口等你。她的目光在你们两个之间来回，似乎察觉到了什么。但她什么都没有问。只是轻声说：物资清点完了，够用两天。然后她转身，走了几步，又回过头来。',
    type: 'scene',
    chapter: 2,
    choices: [],
    next: 'ch2_034'
  },
  'ch2_034': {
    id: 'ch2_034',
    speaker: 'nun',
    text: '她的目光越过你的肩膀，看向医生离去的方向。你说……一个人可以用自己不相信的方式去爱人吗？她的问题像一根细针，轻轻刺入空气。不等你的回答，她已经转身走开了。她的背影在昏暗的走廊里渐渐变小，但你隐约看到——她在胸口画了一个十字。',
    type: 'dialogue',
    chapter: 2,
    choices: [
      {
        id: 'ch2_034_a',
        text: '"也许可以。也许那才最接近信仰的本质。"',
        effects: { stats: { understanding: 6, witness: 5 }, relations: { nun: { trust: 5, affection: 4 }, doctor: { affection: 3 } } },
        next: 'ch2_035',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_034_b',
        text: '"我不知道。但我知道今天的你们，都做了一件正确的事。"',
        effects: { stats: { respect: 5, understanding: 4 }, relations: { nun: { affection: 4 }, doctor: { trust: 3 } } },
        next: 'ch2_035',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch2_034_c',
        text: '沉默地看着她走远。有些问题不需要答案。',
        effects: { stats: { witness: 6, understanding: 4 }, relations: { nun: { trust: 5 } } },
        next: 'ch2_035',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch2_035': {
    id: 'ch2_035',
    speaker: null,
    text: '第二天清晨，一辆军用卡车出现在活动中心门口。士兵们跳下车，开始卸下成箱的物资。一个军官走进来，宣布：道路已经打通，外界的救援正在路上。人群中爆发出压抑已久的哭声和笑声。医生已经在整理转诊名单，修女在帮助人们收拾随身物品。你站在他们之间，忽然觉得——祈祷和行动，也许从来就不是两件事。而这一章的故事，才刚刚开始。',
    type: 'narration',
    chapter: 2,
    choices: [
      {
        id: 'ch2_035_a',
        text: '继续前行',
        effects: { stats: { understanding: 3, witness: 3, respect: 3 } },
        next: 'ch3_001',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  }
};
