var chapter1 = {
  'ch1_001': {
    id: 'ch1_001',
    speaker: null,
    text: '暴雨倾盆。你从长途车上下来，皮靴踩进没过脚踝的水洼，冰冷的水立刻灌满了鞋。城市在闪电中忽明忽暗——灰色的楼群像一排沉默的墓碑，街灯在雨幕中化成一团团模糊的光晕。你不知道自己为什么会来到这座小城。或许是因为那张皱巴巴的传单，上面印着"灾后志愿者招募"，字迹被雨水洇开，像一句无人听见的祷告。',
    type: 'narration',
    chapter: 1,
    choices: [
      {
        id: 'ch1_001_a',
        text: '将传单叠好收进口袋，顶着雨向城中心走去。',
        effects: { stats: { witness: 3 } },
        next: 'ch1_002',
        condition: null,
        setFlag: 'kept_flyer'
      },
      {
        id: 'ch1_001_b',
        text: '扔掉传单。反正已经到这儿了。',
        effects: { stats: { understanding: 2 } },
        next: 'ch1_002',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_002': {
    id: 'ch1_002',
    speaker: null,
    text: '水势在上涨。你沿着主街涉水前行，每一步都能感受到脚下暗流的拉扯。沿街的店铺大多关了门，卷帘门上贴着各式各样的告示——停水通知、防汛提示、寻人启事。一只野猫蹲在熄了灯的公交站台上，浑身湿透，用一双琥珀色的眼睛注视着你。远处传来低沉的警报声，像巨兽在黑暗中翻了个身。',
    type: 'scene',
    chapter: 1,
    choices: [],
    next: 'ch1_003'
  },
  'ch1_003': {
    id: 'ch1_003',
    speaker: null,
    text: '你拐过一个街角，看见一栋老旧的社区中心。招牌上"团结社区活动中心"几个红字被雨水冲刷得褪了色，但窗户里透出昏黄的灯光——那是整条街上唯一的光。门廊下挤了几个人，有人裹着毯子缩在角落，有人在打电话，声音被雨声吞没。一个写着"临时避难所"的纸板招牌歪歪斜斜地贴在门框上。',
    type: 'scene',
    chapter: 1,
    choices: [
      {
        id: 'ch1_003_a',
        text: '推门而入。身上的水珠在门厅的地砖上砸出一小片水渍。',
        effects: { stats: { understanding: 3 } },
        next: 'ch1_004',
        condition: null,
        setFlag: 'entered_directly'
      },
      {
        id: 'ch1_003_b',
        text: '先在门口站一会儿，打量里面的情况。',
        effects: { stats: { respect: 3 } },
        next: 'ch1_005',
        condition: null,
        setFlag: 'observed_first'
      },
      {
        id: 'ch1_003_c',
        text: '默默为里面的人祷告片刻，再走进去。',
        effects: { stats: { witness: 5 } },
        next: 'ch1_004',
        condition: null,
        setFlag: 'prayed_before_entering'
      }
    ],
    next: null
  },
  'ch1_004': {
    id: 'ch1_004',
    speaker: null,
    text: '避难所里弥漫着潮湿与消毒水混合的气味。大厅被临时隔成几个区域：靠墙的一排折叠床上坐着老人和孩子，中间的长桌上堆满了矿泉水和方便面，角落里有人用手机给电器充电，屏幕的蓝光映着疲惫的脸。人们的目光偶尔交汇，又迅速闪避，像受惊的鱼。有人在低声说话，但更响的是雨打在铁皮屋顶上的声音，密密匝匝，像千军万马在行军。',
    type: 'scene',
    chapter: 1,
    choices: [],
    next: 'ch1_006'
  },
  'ch1_005': {
    id: 'ch1_005',
    speaker: null,
    text: '你站在门廊下往里看。灯光昏黄，映出大厅里拥挤的人影。一个穿白大褂的中年男人正蹲在一位老太太面前，用听诊器检查她的呼吸。他的动作很轻，但你能看出他眼下的乌青和微微颤抖的手指。靠里的另一张桌旁，一个穿深色衣裙的女人正在整理物资箱，每放好一件物品，她的嘴唇就微微翕动，像在默念什么。你犹豫了片刻，终于推门走了进去。',
    type: 'scene',
    chapter: 1,
    choices: [],
    next: 'ch1_006'
  },
  'ch1_006': {
    id: 'ch1_006',
    speaker: null,
    text: '你找了个靠墙的位置站定。身后的墙面上贴满了旧照片和社区活动的海报，有一张已经被水浸透，画上的笑脸变成了模糊的一团。水从你的衣角滴落，在地板上汇成小小的水洼。一个孩子从折叠床的缝隙间探出头来，用一双黑白分明的眼睛打量着你，又缩了回去。你想起了什么，又似乎什么也没想起。',
    type: 'narration',
    chapter: 1,
    choices: [
      {
        id: 'ch1_006_a',
        text: '走到长桌旁，看看有没有什么能帮忙的。',
        effects: { stats: { understanding: 4, respect: 3 } },
        next: 'ch1_007',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_006_b',
        text: '先安静地观察周围的人和环境。',
        effects: { stats: { respect: 4 } },
        next: 'ch1_007',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_007': {
    id: 'ch1_007',
    speaker: null,
    text: '一道影子从你身旁掠过。那个穿白大褂的男人直起身，朝你的方向走来。他中等身材，肩膀微微佝偻，白大褂上溅了泥点和不知是墨水还是药水的深色痕迹。他没有看你，而是走向门边的一摞毛巾，弯腰拿起一条，抖了抖灰，这才转向你。',
    type: 'narration',
    chapter: 1,
    choices: [],
    next: 'ch1_008'
  },
  'ch1_008': {
    id: 'ch1_008',
    speaker: 'doctor',
    text: '……擦擦吧。地太滑，小心摔倒。',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_008_a',
        text: '接过毛巾，轻声说谢谢。',
        effects: { stats: { respect: 3 }, relations: { doctor: { affection: 4 } } },
        next: 'ch1_009',
        condition: null,
        setFlag: 'met_doctor'
      },
      {
        id: 'ch1_008_b',
        text: '道谢，并问他是不是这里的医生。',
        effects: { stats: { understanding: 3 }, relations: { doctor: { affection: 5, trust: 2 } } },
        next: 'ch1_009',
        condition: null,
        setFlag: 'met_doctor'
      },
      {
        id: 'ch1_008_c',
        text: '点点头接过毛巾，没有开口。',
        effects: { stats: { witness: 2 } },
        next: 'ch1_009',
        condition: null,
        setFlag: 'met_doctor'
      }
    ],
    next: null
  },
  'ch1_009': {
    id: 'ch1_009',
    speaker: 'doctor',
    text: '他递毛巾的手上有一道旧疤，从虎口一直延伸到手腕，像一条干涸的河床。他没有多看你，转身走向另一个角落，那里有个年轻人在低声咳嗽。你用毛巾擦了擦脸上的雨水，毛巾是粗糙的，带着洗衣粉的气味，却意外地温暖。',
    type: 'narration',
    chapter: 1,
    choices: [],
    next: 'ch1_010'
  },
  'ch1_010': {
    id: 'ch1_010',
    speaker: null,
    text: '你观察着那个穿白大褂的男人。他走到每个床铺前，弯腰，查看，有时低声说几句话，有时只是把手搭在对方的肩上。他的动作机械而熟练，像一台运行了太久的机器，每一个齿轮都在转，却发出令人心悸的吱呀声。他从口袋里掏出一支笔，在手腕上记下什么——没有纸，就写在皮肤上。',
    type: 'narration',
    chapter: 1,
    choices: [
      {
        id: 'ch1_010_a',
        text: '走过去，问他需不需要帮忙。',
        effects: { stats: { respect: 4, understanding: 3 }, relations: { doctor: { affection: 4, trust: 3 } } },
        next: 'ch1_011',
        condition: null,
        setFlag: 'offered_help'
      },
      {
        id: 'ch1_010_b',
        text: '远远地看着他，在心中默默为他祷告。',
        effects: { stats: { witness: 5 }, relations: { doctor: { trust: 2 } } },
        next: 'ch1_011',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_010_c',
        text: '注意到他手腕上没有戴十字架，也没有任何信仰的标记——一个不信神的人，却在照顾这些陌生人。',
        effects: { stats: { understanding: 5, prejudice: 4 } },
        next: 'ch1_011',
        condition: null,
        setFlag: 'noticed_no_faith'
      }
    ],
    next: null
  },
  'ch1_011': {
    id: 'ch1_011',
    speaker: 'doctor',
    text: '……你还没走吧？能帮我把那边的水搬过来吗？老年人行动不便。',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_011_a',
        text: '二话不说就去搬水。',
        effects: { stats: { respect: 5 }, relations: { doctor: { affection: 5, trust: 4 } } },
        next: 'ch1_012',
        condition: null,
        setFlag: 'helped_carry_water'
      },
      {
        id: 'ch1_011_b',
        text: '搬水之前，先问清楚哪些人最需要。',
        effects: { stats: { understanding: 5, respect: 3 }, relations: { doctor: { trust: 5 } } },
        next: 'ch1_012',
        condition: null,
        setFlag: 'asked_before_acting'
      }
    ],
    next: null
  },
  'ch1_012': {
    id: 'ch1_012',
    speaker: null,
    text: '你把矿泉水一箱箱搬到各个床铺旁。有些老人接过水时双手在发抖，你便帮他们拧开瓶盖。一个小女孩抱着一只湿透的布偶坐在角落，你递给她一瓶水，她摇摇头，又指了指旁边睡着的老人——她想让奶奶先喝。你把水轻轻放在老人手边。',
    type: 'scene',
    chapter: 1,
    choices: [],
    next: 'ch1_013'
  },
  'ch1_013': {
    id: 'ch1_013',
    speaker: 'doctor',
    text: '谢谢。我在这边干了三天了，今天是头一回有人主动问要不要帮忙。',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_013_a',
        text: '"三天？你一直在这儿？"',
        effects: { stats: { understanding: 4, respect: 3 }, relations: { doctor: { affection: 3, trust: 4 } } },
        next: 'ch1_014',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_013_b',
        text: '"是上帝把我们带到需要帮助的地方。"',
        effects: { stats: { witness: 6, prejudice: 3 }, relations: { doctor: { affection: -2 } } },
        next: 'ch1_014',
        condition: null,
        setFlag: 'witnessed_to_doctor'
      },
      {
        id: 'ch1_013_c',
        text: '微微一笑，没有回答。继续帮他分发物资。',
        effects: { stats: { respect: 4 }, relations: { doctor: { affection: 3 } } },
        next: 'ch1_014',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_014': {
    id: 'ch1_014',
    speaker: 'doctor',
    text: '他停顿了一下，像是在斟酌要不要接话。最终他只是从口袋里摸出一小瓶免洗消毒液递给你。"手消毒一下。洪水泥浆里有各种细菌。"他的语气平淡得像在说天气，但你注意到他自己手上也有几道新添的红痕——大概是搬东西时蹭破的，他没有处理。',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_014_a',
        text: '接过消毒液，也提醒他处理自己的伤口。',
        effects: { stats: { respect: 5, understanding: 3 }, relations: { doctor: { affection: 5, trust: 5 } } },
        next: 'ch1_015',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_014_b',
        text: '道了谢，注意到他的手在微微发抖。三天没合眼的人。',
        effects: { stats: { understanding: 6 }, relations: { doctor: { trust: 4 } } },
        next: 'ch1_015',
        condition: null,
        setFlag: 'noticed_exhaustion'
      }
    ],
    next: null
  },
  'ch1_015': {
    id: 'ch1_015',
    speaker: 'doctor',
    text: '"我不信这些。"他说。你起初以为他在说消毒的事，但他的目光落在你胸前——你不知道什么时候，手指无意识地碰到了项链上的十字架。他的语气没有攻击性，甚至带着一丝疲惫的歉意，像是在为一道反复被问及的题目给出标准答案。"不过，你们能来帮忙，总是好事。"',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_015_a',
        text: '"信仰不是用来说的。你照顾这些人，本身就是一种光。"',
        effects: { stats: { understanding: 6, respect: 5, prejudice: -4 }, relations: { doctor: { affection: 6, trust: 5 } } },
        next: 'ch1_016',
        condition: null,
        setFlag: 'affirmed_doctor'
      },
      {
        id: 'ch1_015_b',
        text: '"没有信仰，你为什么还留在这里？"',
        effects: { stats: { witness: 4, prejudice: 5 }, relations: { doctor: { affection: -3, trust: -2 } } },
        next: 'ch1_016',
        condition: null,
        setFlag: 'challenged_doctor'
      },
      {
        id: 'ch1_015_c',
        text: '沉默片刻，只是点了点头。',
        effects: { stats: { respect: 4, understanding: 3 }, relations: { doctor: { affection: 2 } } },
        next: 'ch1_016',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_016': {
    id: 'ch1_016',
    speaker: 'doctor',
    text: '他没有回答——或许你的话让他沉默了，或许他只是累了。他转身走向物资堆，开始清点剩下的毛毯数量。你注意到他的嘴唇紧抿，像是在忍住什么。窗外的雨势没有减弱的迹象。',
    type: 'dialogue',
    chapter: 1,
    choices: [],
    next: 'ch1_017'
  },
  'ch1_017': {
    id: 'ch1_017',
    speaker: null,
    text: '避难所的另一端传来一阵低柔的声音。你循声望去，看见一个穿深色衣裙的中年女人正跪在一堆物资箱旁，双手合十，嘴唇翕动。她的身旁放着一个用硬纸板写成的牌子："物资登记处——请耐心等候，天主会看顾每一个人。"字迹工整而有力，一笔一划都带着虔诚。',
    type: 'scene',
    chapter: 1,
    choices: [
      {
        id: 'ch1_017_a',
        text: '走过去，安静地等她祷告完毕。',
        effects: { stats: { respect: 4, witness: 3 }, relations: { nun: { affection: 4 } } },
        next: 'ch1_018',
        condition: null,
        setFlag: 'met_nun'
      },
      {
        id: 'ch1_017_b',
        text: '轻声说"阿们"，让她知道这里有同路人。',
        effects: { stats: { witness: 6 }, relations: { nun: { affection: 5, trust: 3 } } },
        next: 'ch1_018',
        condition: null,
        setFlag: 'met_nun'
      },
      {
        id: 'ch1_017_c',
        text: '绕过她，去别处看看。',
        effects: { stats: { understanding: 2 } },
        next: 'ch1_019',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_018': {
    id: 'ch1_018',
    speaker: 'nun',
    text: '她睁开眼，看见你胸前的十字架，脸上浮现出一丝温暖的笑意——那笑容像是冬日里一支快燃尽的蜡烛，微弱却真诚。"愿主与你同在，孩子。你是志愿者吗？"她的声音柔和，但带着一种不容置疑的笃定，像教堂里回荡的钟声。',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_018_a',
        text: '"是的，我想帮忙。"',
        effects: { stats: { respect: 3, witness: 3 }, relations: { nun: { affection: 4, trust: 4 } } },
        next: 'ch1_019',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_018_b',
        text: '"我是基督徒。这里需要什么，我都可以做。"',
        effects: { stats: { witness: 5 }, relations: { nun: { affection: 6, trust: 5 } } },
        next: 'ch1_019',
        condition: null,
        setFlag: 'identified_as_christian'
      }
    ],
    next: null
  },
  'ch1_019': {
    id: 'ch1_019',
    speaker: 'nun',
    text: '"感谢主。"她站起身，拍了拍膝盖上的灰尘。"物资还够撑一晚，但人手不够。"她的目光越过你，落在远处那个穿白大褂的背影上，眉头微微皱起。"那位医生……很努力。只是……"她顿了顿，选择了一个你觉得在她心中已经演练过无数遍的措辞，"他做的一切，没有主的指引，终究是有限的。"',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_019_a',
        text: '"但他确实在救这些人。也许主的指引有我们看不见的方式。"',
        effects: { stats: { understanding: 7, respect: 4, prejudice: -5 }, relations: { nun: { affection: -2, trust: 3 }, doctor: { affection: 4 } } },
        next: 'ch1_020',
        condition: null,
        setFlag: 'defended_doctor'
      },
      {
        id: 'ch1_019_b',
        text: '"您说得对。没有信，一切行为都是空。"',
        effects: { stats: { witness: 5, prejudice: 6 }, relations: { nun: { affection: 5, trust: 6 }, doctor: { affection: -3 } } },
        next: 'ch1_020',
        condition: null,
        setFlag: 'agreed_with_nun'
      },
      {
        id: 'ch1_019_c',
        text: '沉默不语。你不确定该怎么回答。',
        effects: { stats: { understanding: 3, respect: 3 }, relations: { nun: { affection: 1 } } },
        next: 'ch1_020',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_020': {
    id: 'ch1_020',
    speaker: null,
    text: '修女没有再说什么，转身去整理物资。你站在原地，看着这两个人的背影——一个不信神却在救人，一个信神却对不信者心怀微妙的不以为然。空气里有消毒水的气味，有湿衣服的气味，还有一种说不清的、属于人的气味。外面的雨声忽然变得更大了，像是天空被撕开了一道口子。',
    type: 'narration',
    chapter: 1,
    choices: [],
    next: 'ch1_021'
  },
  'ch1_021': {
    id: 'ch1_021',
    speaker: null,
    text: '夜深了。避难所里的大部分人已经沉沉睡去，只剩几盏应急灯发出惨白的光。你坐在墙边的折叠椅上，听见此起彼伏的呼吸声——安稳的、急促的、带着痰音的。那个医生靠在门框上，终于闭上了眼，但他的手里还攥着那支笔。修女在角落里跪着，你不知道她已经跪了多久。',
    type: 'scene',
    chapter: 1,
    choices: [
      {
        id: 'ch1_021_a',
        text: '走到医生身边，把自己的外套轻轻披在他身上。',
        effects: { stats: { respect: 5, understanding: 4 }, relations: { doctor: { affection: 7, trust: 5 } } },
        next: 'ch1_022',
        condition: null,
        setFlag: 'covered_doctor'
      },
      {
        id: 'ch1_021_b',
        text: '走到修女身边，和她一起跪下祷告。',
        effects: { stats: { witness: 7 }, relations: { nun: { affection: 6, trust: 5 } } },
        next: 'ch1_022',
        condition: null,
        setFlag: 'prayed_with_nun'
      },
      {
        id: 'ch1_021_c',
        text: '安静地坐着，什么都不做，只是感受这个夜晚。',
        effects: { stats: { understanding: 5, respect: 3 } },
        next: 'ch1_022',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_022': {
    id: 'ch1_022',
    speaker: null,
    text: '凌晨两点。你被一阵争吵声惊醒——不，你没有睡着，只是半梦半醒之间被拉了回来。声音来自物资堆旁。一个头发花白的老太太抓着一条毯子不放，对面一个中年男人也在拉同一头。两个人都瘦骨嶙峋，脸上写着同一种表情：恐惧。',
    type: 'scene',
    chapter: 1,
    choices: [
      {
        id: 'ch1_022_a',
        text: '走过去，把自己的毯子递给老太太。',
        effects: { stats: { respect: 5, understanding: 4 }, relations: { doctor: { trust: 3 } } },
        next: 'ch1_023',
        condition: null,
        setFlag: 'gave_blanket'
      },
      {
        id: 'ch1_022_b',
        text: '试图调解——让他们把毯子对半分，再找别的办法。',
        effects: { stats: { understanding: 6, respect: 4 }, relations: { doctor: { affection: 3, trust: 4 } } },
        next: 'ch1_023',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_022_c',
        text: '去找修女或医生来处理。这不是你能解决的事。',
        effects: { stats: { witness: 3, respect: 2 }, relations: { nun: { affection: 2 } } },
        next: 'ch1_023',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_023': {
    id: 'ch1_023',
    speaker: null,
    text: '争执很快平息了——不是因为解决了，而是因为双方都筋疲力尽，松了手。医生不知何时走了过来，从箱底翻出一条旧军毯，递给那个男人，然后蹲下身对老太太说了几句什么。你听不清内容，但看到老太太点了点头，攥着毯子的手指慢慢松开了。修女在一旁画了个十字。',
    type: 'narration',
    chapter: 1,
    choices: [],
    next: 'ch1_024'
  },
  'ch1_024': {
    id: 'ch1_024',
    speaker: 'doctor',
    text: '"能再帮个忙吗？隔壁房间还有几个老人，我担心他们着凉。帮我送几条毯子过去。"',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_024_a',
        text: '点头，跟着他去。路上他告诉你他叫什么名字。',
        effects: { stats: { respect: 4, understanding: 3 }, relations: { doctor: { affection: 5, trust: 6 } } },
        next: 'ch1_025',
        condition: null,
        setFlag: 'learned_doctor_name'
      },
      {
        id: 'ch1_024_b',
        text: '"当然可以。不过你也该休息了——你的手一直在抖。"',
        effects: { stats: { understanding: 6, respect: 5 }, relations: { doctor: { affection: 7, trust: 7 } } },
        next: 'ch1_025',
        condition: null,
        setFlag: 'expressed_concern'
      },
      {
        id: 'ch1_024_c',
        text: '接过毯子就去了。不需要多说什么。',
        effects: { stats: { respect: 3 }, relations: { doctor: { trust: 3 } } },
        next: 'ch1_025',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_025': {
    id: 'ch1_025',
    speaker: null,
    text: '你抱着毯子穿过走廊，推开隔壁房间的门。里面更暗，更冷。几张简易床上蜷缩着瘦小的身影。你把毯子一一盖上去，感觉到那些布满皱纹的手在黑暗中摸索着握住你的手指，像是在确认你是一个真实的人，而不是一场梦。有一位老太太用方言说了句什么，你没听懂，但那声音像极了一句祝福。',
    type: 'scene',
    chapter: 1,
    choices: [
      {
        id: 'ch1_025_a',
        text: '在黑暗中为每一位老人默默祷告。',
        effects: { stats: { witness: 6, understanding: 4 } },
        next: 'ch1_026',
        condition: null,
        setFlag: 'prayed_for_elderly'
      },
      {
        id: 'ch1_025_b',
        text: '轻声唱一首赞美诗。在这个时刻，音乐或许比语言更温柔。',
        effects: { stats: { witness: 7, respect: 3 }, relations: { nun: { affection: 4 } } },
        next: 'ch1_026',
        condition: null,
        setFlag: 'sang_hymn'
      },
      {
        id: 'ch1_025_c',
        text: '什么都不说，只是安静地握了握每一只伸出来的手。',
        effects: { stats: { understanding: 6, respect: 5 }, relations: { doctor: { trust: 4 } } },
        next: 'ch1_026',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_026': {
    id: 'ch1_026',
    speaker: null,
    text: '你走回大厅时，一股异样的气氛扑面而来。有人站了起来，有人聚在窗边往外看。一个中年男人举着手机，屏幕上是红色的预警信息。修女站在人群中间，脸色苍白，双手紧紧攥着胸前的十字架。医生的背影映在窗玻璃上，他正看着外面的夜色，一动不动。',
    type: 'scene',
    chapter: 1,
    choices: [],
    next: 'ch1_027'
  },
  'ch1_027': {
    id: 'ch1_027',
    speaker: null,
    text: '防空警报的声音撕裂了夜空——那不是演习，是洪水预警。上游的水库泄洪了。避难所里一阵骚动，有人开始收拾东西，有人抱头痛哭。一个孩子的尖叫声划破空气，像一根针刺入每个人的心脏。修女提高声音喊着什么，但被更大的警报声淹没了。只有医生的声音穿透了混乱——简短、沉稳、不容置疑。',
    type: 'scene',
    chapter: 1,
    choices: [
      {
        id: 'ch1_027_a',
        text: '冲向医生，听他指挥。现在不是犹豫的时候。',
        effects: { stats: { respect: 5, understanding: 3 }, relations: { doctor: { affection: 5, trust: 6 } } },
        next: 'ch1_028',
        condition: null,
        setFlag: 'followed_doctor'
      },
      {
        id: 'ch1_027_b',
        text: '冲向修女，帮助她安抚恐慌的人群。',
        effects: { stats: { witness: 6, respect: 3 }, relations: { nun: { affection: 6, trust: 5 } } },
        next: 'ch1_028',
        condition: null,
        setFlag: 'helped_nun_calm'
      },
      {
        id: 'ch1_027_c',
        text: '立刻去帮那些行动不便的老人转移到高处。',
        effects: { stats: { understanding: 5, respect: 6 }, relations: { doctor: { trust: 5 }, nun: { trust: 3 } } },
        next: 'ch1_028',
        condition: null,
        setFlag: 'helped_elderly_first'
      }
    ],
    next: null
  },
  'ch1_028': {
    id: 'ch1_028',
    speaker: 'doctor',
    text: '"所有人听我说。"他的声音不高，但有一种穿透力，让慌乱的人群安静下来。"社区中心后面有一栋三层教学楼，地势比这里高。老人和孩子先走，年轻人帮忙抬人。不要抢，不要跑，一个一个来。"他转向修女，目光里有一种你无法定义的东西——不是尊敬，也不是轻蔑，更像是两个在废墟上相遇的人之间无声的默契。"修女，物资你带人搬。"',
    type: 'dialogue',
    chapter: 1,
    choices: [
      {
        id: 'ch1_028_a',
        text: '帮助搀扶老人往教学楼转移。',
        effects: { stats: { respect: 6, understanding: 4 }, relations: { doctor: { affection: 4, trust: 5 } } },
        next: 'ch1_029',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_028_b',
        text: '和修女一起搬物资。她需要帮手。',
        effects: { stats: { witness: 4, respect: 4 }, relations: { nun: { affection: 5, trust: 4 } } },
        next: 'ch1_029',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_028_c',
        text: '"你一个人能行吗？让我留下来帮你。"',
        effects: { stats: { understanding: 5, respect: 4 }, relations: { doctor: { affection: 6, trust: 7 } } },
        next: 'ch1_029',
        condition: null,
        setFlag: 'stayed_with_doctor'
      }
    ],
    next: null
  },
  'ch1_029': {
    id: 'ch1_029',
    speaker: null,
    text: '接下来的十五分钟像一场没有彩排的戏剧。有人摔倒了，有人在大声祷告，有人在黑暗中被踩掉了鞋。你看见医生一手搀着老太太一手扛着物资箱，从你身旁跑过，白大褂在混乱中像一面肮脏的旗帜。修女站在教学楼的门口，一一清点进入的人数，嘴唇不停地翕动——在祷告，还是在数数，或者两者兼有。水已经漫过了社区中心的台阶。',
    type: 'scene',
    chapter: 1,
    choices: [
      {
        id: 'ch1_029_a',
        text: '在心中感叹：在这样的时刻，信仰似乎不那么重要了。重要的是谁在伸出手。',
        effects: { stats: { understanding: 8, respect: 5, prejudice: -6 }, relations: { doctor: { affection: 4 } } },
        next: 'ch1_030',
        condition: null,
        setFlag: 'realized_faith_deeds_matter'
      },
      {
        id: 'ch1_029_b',
        text: '在心中祷告：求主保守每一个人，无论他们信与不信。',
        effects: { stats: { witness: 6, understanding: 4, prejudice: -3 }, relations: { nun: { affection: 3 } } },
        next: 'ch1_030',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch1_029_c',
        text: '专注于手头的事，不去想那些。以后再说。',
        effects: { stats: { respect: 5, understanding: 3 } },
        next: 'ch1_030',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch1_030': {
    id: 'ch1_030',
    speaker: null,
    text: '所有人终于转移到了教学楼的二楼。窗外的水位还在上涨，社区中心的一楼已经没入水中，只有屋顶的招牌还露在水面上，红字在黑暗中隐约可辨。大厅里挤满了疲惫而沉默的人，有人在咳，有人在哭，有人已经蜷在角落睡着了。医生坐在楼梯口，终于松了一口气，用袖子擦了擦脸上的汗和雨水。修女在人群中间穿行，给每个人递上最后几瓶矿泉水。你靠在窗边，看着窗外黑沉沉的水面。雨还在下。但你知道——这一夜终将过去。而明天，才是真正的考验。',
    type: 'narration',
    chapter: 1,
    choices: [
      {
        id: 'ch1_030_a',
        text: '走到医生身边坐下来。',
        effects: { stats: { understanding: 4, respect: 3 }, relations: { doctor: { affection: 4, trust: 4 } } },
        next: 'ch2_001',
        condition: null,
        setFlag: 'sat_with_doctor_end'
      },
      {
        id: 'ch1_030_b',
        text: '加入修女，帮她分发剩余的物资。',
        effects: { stats: { witness: 4, respect: 3 }, relations: { nun: { affection: 5, trust: 4 } } },
        next: 'ch2_001',
        condition: null,
        setFlag: 'helped_nun_end'
      },
      {
        id: 'ch1_030_c',
        text: '独自在窗边，等待黎明。',
        effects: { stats: { understanding: 5, respect: 3 } },
        next: 'ch2_001',
        condition: { stat: 'understanding', min: 55 },
        setFlag: 'waited_dawn_alone'
      }
    ],
    next: null
  }
};
