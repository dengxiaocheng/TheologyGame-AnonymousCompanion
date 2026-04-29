var chapter3 = {
  'ch3_001': {
    id: 'ch3_001',
    speaker: null,
    text: '你穿过几条坍塌的巷道，来到城市的另一面。这里的建筑更加残破，墙上的裂缝像干涸的河床，爬满了时间的伤痕。一阵读书声从废墟深处传来——细弱、断续，却执拗地不肯停歇。',
    type: 'scene',
    chapter: 3,
    choices: [
      {
        id: 'ch3_001_a',
        text: '循声而去',
        effects: { stats: { understanding: 3 } },
        next: 'ch3_002',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_001_b',
        text: '先观察周围的环境',
        effects: { stats: { witness: 3 } },
        next: 'ch3_002',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_002': {
    id: 'ch3_002',
    speaker: null,
    text: '一栋半毁的教学楼矗立在瓦砾之间。二楼的窗户用塑料布糊着，风一吹便鼓胀起来，像一只疲倦的肺。门口用碎石堆出了简易台阶，台阶两侧摆着几盆枯死的绿萝——有人曾试图让这地方活过来。',
    type: 'narration',
    chapter: 3,
    choices: [],
    next: 'ch3_003'
  },
  'ch3_003': {
    id: 'ch3_003',
    speaker: null,
    text: '你踏上台阶，推开半掩的铁门。走廊里弥漫着粉笔灰与霉味，地面上散落着课本和练习册，纸页被水泡得发皱。一只猫从教室里窜出，惊起一阵灰尘。黑板上残留着半道算术题，粉笔字歪歪扭扭。',
    type: 'scene',
    chapter: 3,
    choices: [
      {
        id: 'ch3_003_a',
        text: '捡起地上的一本课本翻看',
        effects: { stats: { understanding: 4 } },
        next: 'ch3_004',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_003_b',
        text: '继续往里走',
        effects: { stats: { witness: 3 } },
        next: 'ch3_004',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_004': {
    id: 'ch3_004',
    speaker: null,
    text: '课本的扉页上写着一个名字，被水渍晕开了大半。旁边画了一颗歪歪扭扭的星星，下面写着："我要当科学家。"你合上课本，把它放回桌上。读书声从走廊尽头传来，比刚才清晰了一些。',
    type: 'narration',
    chapter: 3,
    choices: [],
    next: 'ch3_005'
  },
  'ch3_005': {
    id: 'ch3_005',
    speaker: null,
    text: '你循声走到最大的那间教室。门口挂着一块手写的牌子："临时学校——请勿打扰。"透过门缝，你看见十几个孩子围坐在地上，面前是一个用木板搭成的讲台。讲台旁边，一个人正蹲在地上，用粉笔在水泥地板上写字。',
    type: 'scene',
    chapter: 3,
    choices: [],
    next: 'ch3_006'
  },
  'ch3_006': {
    id: 'ch3_006',
    speaker: null,
    text: '那个人大约四十岁，头发灰白，眼镜的一只腿用胶带缠着。他的衬衫皱巴巴的，袖口磨出了毛边。他写字的样子很专注，仿佛整个世界只剩下了脚下那片灰色的地面和白色的粉笔迹。孩子们安静地看着他，眼睛里有光。',
    type: 'narration',
    chapter: 3,
    choices: [
      {
        id: 'ch3_006_a',
        text: '轻轻敲门，等他注意到你',
        effects: { stats: { respect: 5 }, relations: { teacher: { trust: 5 } } },
        next: 'ch3_007',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_006_b',
        text: '安静地站在门口旁听',
        effects: { stats: { understanding: 4 } },
        next: 'ch3_007',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_007': {
    id: 'ch3_007',
    speaker: 'teacher',
    text: '他抬起头，看见了你。眼镜后面的目光并不警惕，只是带着几分疲倦的好奇。"……来看孩子的？"他放下粉笔，在裤子上擦了擦手，"随便坐。地上干净——我今天刚扫过。"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_007_a',
        text: '"你在这里教课？"',
        effects: { stats: { understanding: 3 }, relations: { teacher: { affection: 4 } } },
        next: 'ch3_008',
        condition: null,
        setFlag: 'met_teacher'
      },
      {
        id: 'ch3_007_b',
        text: '"这些孩子……都是失去家的人？"',
        effects: { stats: { respect: 4 }, relations: { teacher: { affection: 3 } } },
        next: 'ch3_008',
        condition: null,
        setFlag: 'met_teacher'
      }
    ],
    next: null
  },
  'ch3_008': {
    id: 'ch3_008',
    speaker: 'teacher',
    text: '"失去家、失去父母、失去名字——什么都失去了的孩子。"他看了一眼那些学生，声音沉了下去，"但没失去想读书的心。所以我在这里。只要你愿意学，我就愿意教。这很公平。"',
    type: 'dialogue',
    chapter: 3,
    choices: [],
    next: 'ch3_009'
  },
  'ch3_009': {
    id: 'ch3_009',
    speaker: null,
    text: '下课后，孩子们三三两两地散去。教师开始收拢散落的粉笔头，把它们一根根放进一个铁盒里。他的动作很仔细，像是收集什么珍贵的东西。你注意到教室角落有一张破旧的行军床，上面叠着一条薄毯。墙边放着几箱方便面和一桶水。',
    type: 'scene',
    chapter: 3,
    choices: [
      {
        id: 'ch3_009_a',
        text: '"你就住在这里？"',
        effects: { stats: { respect: 5 }, relations: { teacher: { trust: 3 } } },
        next: 'ch3_010',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_009_b',
        text: '帮他一起收拾教室',
        effects: { stats: { understanding: 4, respect: 3 }, relations: { teacher: { trust: 6 } } },
        next: 'ch3_010',
        condition: null,
        setFlag: 'helped_in_classroom'
      }
    ],
    next: null
  },
  'ch3_010': {
    id: 'ch3_010',
    speaker: 'teacher',
    text: '"住在这里比较方便。早上六点有些孩子就来敲门——他们比我还勤快。"他笑了笑，皱纹在脸上挤成一团，"而且我也没别的地方可去。房子在地震里塌了，倒是这学校，歪歪斜斜的，反而撑住了。你说怪不怪？"',
    type: 'dialogue',
    chapter: 3,
    choices: [],
    next: 'ch3_011'
  },
  'ch3_011': {
    id: 'ch3_011',
    speaker: 'teacher',
    text: '他把铁盒盖好，放在讲台下面。然后转过身来，认真地看了你一眼。"你不是这里的人吧？我见过教会来的志愿者，也见过红十字会的人。你——是哪种？"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_011_a',
        text: '"我是基督徒，来这里服侍的。"',
        effects: { stats: { witness: 5 }, relations: { teacher: { affection: 3 } } },
        next: 'ch3_012',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_011_b',
        text: '"我只是路过，看到这里的孩子就进来了。"',
        effects: { stats: { understanding: 4 }, relations: { teacher: { trust: 5 } } },
        next: 'ch3_012',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_011_c',
        text: '"这重要吗？"',
        effects: { stats: { respect: 3 }, relations: { teacher: { affection: 5 } } },
        next: 'ch3_012',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_012': {
    id: 'ch3_012',
    speaker: 'teacher',
    text: '他靠在讲台边，双手抱在胸前。"不重要。来的人都有一套说法。\u2018上帝指引我来的\u2019、\u2018组织派我来的\u2019、\u2018我只是想帮忙\u2019——听着都挺好。但你知道这里最缺什么吗？不是说法，是明天还会来的人。"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_012_a',
        text: '"你似乎对信仰有意见？"',
        effects: { stats: { prejudice: 5, understanding: -3 } },
        next: 'ch3_013',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_012_b',
        text: '"你说得对。持续的陪伴比一次性的热情更重要。"',
        effects: { stats: { understanding: 6, respect: 4 }, relations: { teacher: { trust: 5 } } },
        next: 'ch3_013',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_013': {
    id: 'ch3_013',
    speaker: 'teacher',
    text: '"不是对信仰有意见。是对拿信仰当挡箭牌有意见。"他从地上捡起一块碎石，在手里转了转，"灾难刚来那几天，来了好多人，扛着旗帜，唱着歌，拍着照。然后呢？一周以后就走了。孩子们问我：他们还会回来吗？我说不知道。这是第三次我说不知道了。"',
    type: 'dialogue',
    chapter: 3,
    choices: [],
    next: 'ch3_014'
  },
  'ch3_014': {
    id: 'ch3_014',
    speaker: 'teacher',
    text: '他把碎石放回地上，拍了拍手上的灰。"我不信上帝。这你知道了。但我信一件事——人应该做对的事，不是因为天上有人在看，而是因为地上有人在等。"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_014_a',
        text: '"但如果上帝存在，你做的事恰恰印证了他的教导。"',
        effects: { stats: { witness: 6, understanding: -3 }, relations: { teacher: { affection: -4 } } },
        next: 'ch3_015',
        condition: null,
        setFlag: 'preached_to_teacher'
      },
      {
        id: 'ch3_014_b',
        text: '"没有上帝，你凭什么判断什么是对的事？"',
        effects: { stats: { witness: 4, understanding: -3 }, relations: { teacher: { trust: -3, affection: -2 } } },
        next: 'ch3_015',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_014_c',
        text: '"我理解。你的行动本身就是一种信念。"',
        effects: { stats: { understanding: 7, respect: 5 }, relations: { teacher: { trust: 6, affection: 5 } } },
        next: 'ch3_015',
        condition: null,
        setFlag: 'engaged_teacher_philosophy'
      }
    ],
    next: null
  },
  'ch3_015': {
    id: 'ch3_015',
    speaker: 'teacher',
    text: '他沉默了一会儿，目光落在教室后面那面歪斜的黑板上。"我以前是教哲学的，你知道。在大学里。学生问我：老师，人生的意义是什么？我说：你先活一活，活完了再告诉我。后来地震来了。我活下来了，那些学生——不知道。现在我教加减乘除。这些更实在。"',
    type: 'dialogue',
    chapter: 3,
    choices: [],
    next: 'ch3_016'
  },
  'ch3_016': {
    id: 'ch3_016',
    speaker: 'teacher',
    text: '"你知道最让我难过的是什么吗？不是房子塌了，不是书没了。是有一次，一个孩子问我：\u2018老师，为什么上帝让我们的家没了？\u2019我看着她的眼睛，什么也说不出来。我是无神论者，我连\u2018上帝有他的旨意\u2019这种话都说不出口。我只能帮她把书包补好。"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_016_a',
        text: '"苦难不是上帝的旨意，但安慰可以透过人来传递。你就在做这件事。"',
        effects: { stats: { witness: 5, understanding: 4 }, relations: { teacher: { affection: 5, trust: 4 } } },
        next: 'ch3_017',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_016_b',
        text: '"你不需要回答所有问题。修补书包就够了。"',
        effects: { stats: { understanding: 5, respect: 4 }, relations: { teacher: { trust: 6 } } },
        next: 'ch3_017',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_017': {
    id: 'ch3_017',
    speaker: 'teacher',
    text: '他点了点头，嘴角浮现一丝苦涩的笑意。"也许吧。我只是一个教书匠，教不了孩子怎么面对世界的不公。但我能教他们认字、算数——至少让他们将来能看懂不公的条款，算清该拿的赔偿。这算不算意义？"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_017_a',
        text: '"这当然算。意义不是从天而降的，是在这些小事里长出来的。"',
        effects: { stats: { understanding: 6, respect: 4 }, relations: { teacher: { affection: 5 } } },
        next: 'ch3_018',
        condition: null,
        setFlag: 'engaged_teacher_philosophy'
      },
      {
        id: 'ch3_017_b',
        text: '"但人活着不只需要面包和算术，也需要灵魂的喂养。"',
        effects: { stats: { witness: 5, understanding: -3 }, relations: { teacher: { affection: -3 } } },
        next: 'ch3_018',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_018': {
    id: 'ch3_018',
    speaker: null,
    text: '正说着，教室门口传来一阵脚步声。一个年轻人探头进来，手里拿着一本翻旧了的圣经。他穿着一件印有教会标志的T恤，头发梳得整整齐齐，运动鞋白得几乎发光——和这间满是灰尘的教室格格不入。',
    type: 'scene',
    chapter: 3,
    choices: [],
    next: 'ch3_019'
  },
  'ch3_019': {
    id: 'ch3_019',
    speaker: 'youth',
    text: '"咳咳——大家好，我是教会派来的志愿者。"他的声音有一种经过排练的圆润，像是在做见证而不是打招呼，"哥林多后书九章七节说：\u2018各人要随本心所酌定的，不要作难，不要勉强。\u2019我今天来这里，就是随本心。"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_019_a',
        text: '点头示意，表示欢迎',
        effects: { stats: { understanding: 3 }, relations: { youth: { affection: 4 } } },
        next: 'ch3_020',
        condition: null,
        setFlag: 'met_youth'
      },
      {
        id: 'ch3_019_b',
        text: '注意到他手上连一粒灰尘都没有',
        effects: { stats: { witness: 4, prejudice: 3 } },
        next: 'ch3_020',
        condition: null,
        setFlag: 'met_youth'
      }
    ],
    next: null
  },
  'ch3_020': {
    id: 'ch3_020',
    speaker: null,
    text: '教师看了他一眼，没有说话，只是指了指教室角落一堆等待整理的教材。年轻人顺着手指看过去，脸上闪过一丝犹豫。他握紧了圣经，朝那堆教材走了两步，然后又停下来，转向教师。',
    type: 'narration',
    chapter: 3,
    choices: [],
    next: 'ch3_021'
  },
  'ch3_021': {
    id: 'ch3_021',
    speaker: 'youth',
    text: '"那个……这些书都受潮了吧？搬了也没法用了。"他退后一步，"我觉得比起整理这些，不如先给孩子们做一次心灵的关怀。你知道吗，很多人在灾难后都会有心理创伤，而最好的疗愈——"他举起圣经，"是神的话语。"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_021_a',
        text: '"神的话语当然重要，但这些孩子现在更需要干净的课本。我们一起整理吧。"',
        effects: { stats: { understanding: 5, respect: 3 }, relations: { youth: { trust: 3 }, teacher: { trust: 4 } } },
        next: 'ch3_022',
        condition: null,
        setFlag: 'challenged_youth'
      },
      {
        id: 'ch3_021_b',
        text: '"他说得也有道理，教师。也许可以先听听孩子的想法。"',
        effects: { stats: { witness: 3, understanding: -3 }, relations: { youth: { affection: 5 }, teacher: { trust: -3 } } },
        next: 'ch3_022',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_021_c',
        text: '不说话，自己走过去开始整理教材',
        effects: { stats: { respect: 5 }, relations: { teacher: { trust: 6, affection: 4 } } },
        next: 'ch3_022',
        condition: null,
        setFlag: 'helped_in_classroom'
      }
    ],
    next: null
  },
  'ch3_022': {
    id: 'ch3_022',
    speaker: 'teacher',
    text: '教师的声音很平静，像水面下有暗流。"课本确实受潮了。但那一页一页翻开、晾干、展平的过程，恰好可以教会孩子一件事——坏了的东西，值得修。这不是你那本书里说的吗？修补，挽回，不放弃？"',
    type: 'dialogue',
    chapter: 3,
    choices: [],
    next: 'ch3_023'
  },
  'ch3_023': {
    id: 'ch3_023',
    speaker: 'youth',
    text: '年轻人的脸涨红了。"你……你这是在曲解经文！我不跟你争论神学问题。"他抱着圣经退到窗边，"我是来传福音的，不是来搬砖的。教会安排我做关怀工作，关怀灵魂的工作——这比搬书本重要一百倍。"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_023_a',
        text: '"灵魂和身体都需要关怀。耶稣也是先给人吃饱了才讲道的。"',
        effects: { stats: { understanding: 5, witness: 4 }, relations: { youth: { affection: 4, trust: 3 } } },
        next: 'ch3_024',
        condition: null,
        setFlag: 'challenged_youth'
      },
      {
        id: 'ch3_023_b',
        text: '"弟兄，他不是在攻击你。他在告诉你这里真正需要什么。"',
        effects: { stats: { respect: 5, understanding: 3 }, relations: { youth: { trust: -2, affection: 3 }, teacher: { trust: 5 } } },
        next: 'ch3_024',
        condition: null,
        setFlag: 'challenged_youth'
      },
      {
        id: 'ch3_023_c',
        text: '对年轻人的尴尬感到一丝理解——传福音的热情是真的',
        effects: { stats: { witness: 5, prejudice: -4 }, relations: { youth: { affection: 6, trust: 5 } } },
        next: 'ch3_024',
        condition: null,
        setFlag: 'encouraged_youth'
      }
    ],
    next: null
  },
  'ch3_024': {
    id: 'ch3_024',
    speaker: null,
    text: '教室里安静了几秒。阳光从塑料布窗户里透进来，把尘埃照成一道道金色的光柱。教师没有再说话，只是弯下腰，从那堆受潮的教材里抽出一本，小心地翻开。年轻人站在窗边，手指无意识地翻着圣经的书页，翻到又合上，合上又翻开。',
    type: 'scene',
    chapter: 3,
    choices: [],
    next: 'ch3_025'
  },
  'ch3_025': {
    id: 'ch3_025',
    speaker: 'youth',
    text: '年轻人的声音低了下来，带着一种自己也不确定的困惑。"我……我只是不知道该怎么做。在教会里，大家说要去服侍，要去见证。但到了这里——"他环顾四周，声音里第一次褪去了那种排练过的光滑，"我什么都不会。"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_025_a',
        text: '"不会就学。现在就可以从整理这些课本开始。"',
        effects: { stats: { understanding: 4, respect: 3 }, relations: { youth: { trust: 5 }, teacher: { trust: 3 } } },
        next: 'ch3_026',
        condition: null,
        setFlag: 'encouraged_youth'
      },
      {
        id: 'ch3_025_b',
        text: '"你的坦诚比刚才引用的经文有力量多了。"',
        effects: { stats: { understanding: 6, witness: 3 }, relations: { youth: { affection: 6, trust: 4 } } },
        next: 'ch3_026',
        condition: null,
        setFlag: 'encouraged_youth'
      },
      {
        id: 'ch3_025_c',
        text: '"祈祷吧。求上帝告诉你该怎么做。"',
        effects: { stats: { witness: 6, understanding: -3 }, relations: { youth: { affection: 5, trust: 3 }, teacher: { trust: -2 } } },
        next: 'ch3_026',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_026': {
    id: 'ch3_026',
    speaker: 'teacher',
    text: '教师直起身来，看了年轻人一眼。他的目光里没有嘲讽，只有一种疲倦的温和。"什么都不会没关系。坐在地上，翻开一本书，哪怕你只是在旁边看着——对这些孩子来说，有人在，就够了。"他顿了顿，"你不是来解决问题的。你是来在场的。"',
    type: 'dialogue',
    chapter: 3,
    choices: [],
    next: 'ch3_027'
  },
  'ch3_027': {
    id: 'ch3_027',
    speaker: null,
    text: '傍晚的光线变得柔和。年轻人最终坐了下来，笨拙地开始整理教材，动作生疏但态度认真了许多。教师在一旁指导他如何区分可以晾干挽救的书和彻底报废的。你站在窗边，看着这一幕，心里涌起一些复杂的感受。',
    type: 'narration',
    chapter: 3,
    choices: [
      {
        id: 'ch3_027_a',
        text: '对教师说："你的话很有智慧。但你有没有想过，这智慧可能也是一种恩赐？"',
        effects: { stats: { witness: 5, understanding: 3 }, relations: { teacher: { affection: 4 } } },
        next: 'ch3_028',
        condition: null,
        setFlag: 'preached_to_teacher'
      },
      {
        id: 'ch3_027_b',
        text: '在心里默默祈祷，为这位不信者，也为那个迷茫的年轻弟兄',
        effects: { stats: { witness: 4 }, relations: { teacher: { affection: 2 }, youth: { affection: 2 } } },
        next: 'ch3_028',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_027_c',
        text: '加入他们，一起整理课本，在沉默中陪伴',
        effects: { stats: { understanding: 4, respect: 5 }, relations: { teacher: { trust: 6 }, youth: { trust: 4 } } },
        next: 'ch3_028',
        condition: null,
        setFlag: 'helped_in_classroom'
      }
    ],
    next: null
  },
  'ch3_028': {
    id: 'ch3_028',
    speaker: 'teacher',
    text: '教师停下手里的活，抬起头看你。夕阳把他的侧脸照出一个模糊的轮廓。"我跟你讲个事。上周有个孩子画了一幅画——太阳、房子、一家人。她把画送给我，说：\u2018老师，这是你的家。\u2019"他的声音有些沙哑，"我没有家了。但在那张画里，我有。你说，这是恩赐，还是别的什么？"',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_028_a',
        text: '"这就是恩典。它不一定来自你认可的地方，但它确实降临在你身上了。"',
        effects: { stats: { witness: 6, understanding: 4 }, relations: { teacher: { affection: 5, trust: 4 } } },
        next: 'ch3_029',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_028_b',
        text: '"这是人与人之间的善意。不需要超自然的解释。你值得那份善意。"',
        effects: { stats: { understanding: 7, respect: 5 }, relations: { teacher: { trust: 7, affection: 4 } } },
        next: 'ch3_029',
        condition: null,
        setFlag: 'engaged_teacher_philosophy'
      }
    ],
    next: null
  },
  'ch3_029': {
    id: 'ch3_029',
    speaker: 'youth',
    text: '年轻人抬起头来，手里还攥着一本晾了一半的课本。他的表情比下午松弛了一些。"你们在聊什么？恩典？善意？"他挠了挠头，"我以前总觉得，只有信了才配谈这些。但是……"他看向教师，欲言又止。',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_029_a',
        text: '"信仰不是拥有真理的证书，而是追寻真理的勇气。教师有这份勇气。"',
        effects: { stats: { understanding: 6, witness: 3 }, relations: { youth: { affection: 4, trust: 5 }, teacher: { affection: 4 } } },
        next: 'ch3_030',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_029_b',
        text: '"恩典是给所有人的。但认识恩典的来源，会让一切不同。"',
        effects: { stats: { witness: 7, understanding: -3 }, relations: { youth: { affection: 5, trust: 4 }, teacher: { affection: -3 } } },
        next: 'ch3_030',
        condition: null,
        setFlag: 'preached_to_teacher'
      },
      {
        id: 'ch3_029_c',
        text: '"你下午说了实话。这比引用十节经文都难得。继续保持。"',
        effects: { stats: { respect: 5, understanding: 3 }, relations: { youth: { affection: 6, trust: 5 } } },
        next: 'ch3_030',
        condition: null,
        setFlag: 'encouraged_youth'
      }
    ],
    next: null
  },
  'ch3_030': {
    id: 'ch3_030',
    speaker: null,
    text: '天色渐暗。教师点起一盏用罐头做的油灯，微弱的火光在教室里摇晃。孩子们的课本已经被整理出了一大半，摞在墙边，像一道矮矮的希望之墙。年轻人坐在一旁，翻着一本绘本，表情安静。',
    type: 'scene',
    chapter: 3,
    choices: [],
    next: 'ch3_031'
  },
  'ch3_031': {
    id: 'ch3_031',
    speaker: 'teacher',
    text: '"今天谢谢你。"教师把油灯放在讲台上，火光照亮了他眼角的纹路，"不管是哪种来的——来的就好。明天你还会来吗？"他问这话的时候语气很轻，像是怕听到不想听的答案。',
    type: 'dialogue',
    chapter: 3,
    choices: [
      {
        id: 'ch3_031_a',
        text: '"我会来的。不只是明天。"',
        effects: { stats: { respect: 5, understanding: 4 }, relations: { teacher: { trust: 8, affection: 5 } } },
        next: 'ch3_032',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_031_b',
        text: '"我不知道明天的事。但今天我在这里，这是确定的。"',
        effects: { stats: { understanding: 5, respect: 6 }, relations: { teacher: { trust: 6, affection: 4 } } },
        next: 'ch3_032',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_031_c',
        text: '"上帝安排我来的，我就会继续来。"',
        effects: { stats: { witness: 5, understanding: -3 }, relations: { teacher: { trust: -3, affection: 2 } } },
        next: 'ch3_032',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_032': {
    id: 'ch3_032',
    speaker: null,
    text: '你走出教室，夜风迎面吹来，带着废墟特有的灰土气息。身后传来年轻人的声音——他在和教师告别，语气比白天多了些犹豫和真诚。你抬头看向天空，星光稀疏，像是被尘雾遮住了大半。',
    type: 'narration',
    chapter: 3,
    choices: [
      {
        id: 'ch3_032_a',
        text: '在心里回味今天的一切——不信者的善行，信者的挣扎',
        effects: { stats: { understanding: 5, respect: 4 } },
        next: 'ch3_033',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_032_b',
        text: '为教师祷告——他不知道自己在彰显谁的形象',
        effects: { stats: { witness: 6 }, relations: { teacher: { affection: 3 } } },
        next: 'ch3_033',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_033': {
    id: 'ch3_033',
    speaker: null,
    text: '第二天一早，你回到学校。教师已经在打扫教室了，动作熟练而安静。年轻人也来了，这次没穿那件白净的运动鞋——换了一双旧拖鞋，手里没有拿圣经，而是拎着一袋面包。他看见你，有些不好意思地笑了笑。',
    type: 'scene',
    chapter: 3,
    choices: [
      {
        id: 'ch3_033_a',
        text: '"看来你昨晚想通了一些事。"',
        effects: { stats: { understanding: 4 }, relations: { youth: { affection: 5, trust: 4 } } },
        next: 'ch3_034',
        condition: null,
        setFlag: 'encouraged_youth'
      },
      {
        id: 'ch3_033_b',
        text: '"面包比经文受欢迎——开个玩笑。"',
        effects: { stats: { respect: 3, understanding: 3 }, relations: { youth: { affection: 6, trust: 5 }, teacher: { affection: 3 } } },
        next: 'ch3_034',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_034': {
    id: 'ch3_034',
    speaker: null,
    text: '教师接过面包，分给了陆续到来的孩子们。他没说谢谢，但拍了拍年轻人的肩膀——那一下很轻，却似乎比任何话语都有分量。你站在教室门口，看着这一幕，忽然意识到：在这个残破的空间里，三个信与不信的人，正做着一模一样的事——为了一些孩子，选择留下来。',
    type: 'narration',
    chapter: 3,
    choices: [
      {
        id: 'ch3_034_a',
        text: '这让你重新思考什么是真正的服侍',
        effects: { stats: { understanding: 6, respect: 5, witness: -3 } },
        next: 'ch3_035',
        condition: null,
        setFlag: 'engaged_teacher_philosophy'
      },
      {
        id: 'ch3_034_b',
        text: '你在这种平凡的善意中看到了上帝工作的痕迹',
        effects: { stats: { witness: 7, understanding: 4 } },
        next: 'ch3_035',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch3_034_c',
        text: '你决定不再用标签评判人——信的、不信的，行动才是真实的信仰语言',
        effects: { stats: { understanding: 7, respect: 6, prejudice: -6 } },
        next: 'ch3_035',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch3_035': {
    id: 'ch3_035',
    speaker: null,
    text: '上课铃响了——其实是一只旧铁桶被敲响的声音，清脆而古怪。孩子们嘻嘻哈哈地跑回座位。教师走上讲台，拿起粉笔，又开始了新的一天。年轻人在后排坐下，翻开一本课本——这一次，他不是在引用里面的文字，而是在试着读懂它。你深吸一口气。教室里的空气很浑浊，但某种东西比外面的废墟更加坚固。',
    type: 'scene',
    chapter: 3,
    choices: [
      {
        id: 'ch3_035_a',
        text: '在这个无声的教室里，继续你的旅程',
        effects: { stats: { understanding: 3 } },
        next: 'ch4_001',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  }
};