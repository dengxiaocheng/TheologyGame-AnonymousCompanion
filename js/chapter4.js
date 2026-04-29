var chapter4 = {
  'ch4_001': {
    id: 'ch4_001',
    speaker: null,
    text: '废墟的缝隙间长出了一棵不知名的野草。你蹲下来看了很久，直到身后传来一阵急促的脚步声——一个人影从临时医疗站的方向跑了出来，踉踉跄跄，像是一只被惊吓到的动物。',
    type: 'scene',
    chapter: 4,
    choices: [
      {
        id: 'ch4_001_a',
        text: '追上去',
        effects: { stats: { witness: 3 }, relations: { youth: { affection: 2 } } },
        next: 'ch4_002',
        condition: null,
        setFlag: 'chased_youth'
      },
      {
        id: 'ch4_001_b',
        text: '在原地等他回来',
        effects: { stats: { understanding: 3 } },
        next: 'ch4_002',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_002': {
    id: 'ch4_002',
    speaker: null,
    text: '他停在了一堵倒塌的墙后面。二十岁出头，穿着一件印有教会营会标语的T恤，袖口沾满了灰尘和干涸的药渍。他双手撑着膝盖，喘得像是要把肺里的什么东西吐出来。',
    type: 'narration',
    chapter: 4,
    choices: [],
    next: 'ch4_003'
  },
  'ch4_003': {
    id: 'ch4_003',
    speaker: 'youth',
    text: '……别看我。我不是逃兵。我只是……我只是需要透透气。你知道吗，在里面——那些人的眼神——我受不了那些眼神。他们看着我，好像我应该有答案。',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_003_a',
        text: '你确实没有跑。你只是走到外面来了。',
        effects: { stats: { understanding: 4 }, relations: { youth: { affection: 3 } } },
        next: 'ch4_004',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_003_b',
        text: '他们看你，也许只是因为你也在看他们。',
        effects: { stats: { witness: 4, respect: 2 } },
        next: 'ch4_004',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_003_c',
        text: '你有答案吗？',
        effects: { stats: { prejudice: 3, respect: -3 }, relations: { youth: { trust: -2 } } },
        next: 'ch4_004',
        condition: null,
        setFlag: 'confronted_youth'
      }
    ],
    next: null
  },
  'ch4_004': {
    id: 'ch4_004',
    speaker: 'youth',
    text: '……我在教会长大的。主日学、青少年团契、神学训练营。我能背罗马书第八章，能讲预定论和自由意志的五种立场。我以为我什么都懂了。我甚至给团契的小弟兄姊妹讲过道——"万事都互相效力"。',
    type: 'dialogue',
    chapter: 4,
    choices: [],
    next: 'ch4_005'
  },
  'ch4_005': {
    id: 'ch4_005',
    speaker: 'youth',
    text: '然后地震了。然后我站在这里，看着一个母亲抱着她死去的孩子，我的脑子突然一片空白。所有的经文、所有的神学框架——像纸糊的房子一样塌了。我张了张嘴，什么都说不出来。',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_005_a',
        text: '也许沉默本身就是一种回应。',
        effects: { stats: { understanding: 5 }, relations: { youth: { affection: 4, trust: 3 } } },
        next: 'ch4_006',
        condition: null,
        setFlag: 'patient_with_youth'
      },
      {
        id: 'ch4_005_b',
        text: '你说的那些经文，你真的信过吗？还是只是在重复？',
        effects: { stats: { witness: 5, prejudice: 3 }, relations: { youth: { trust: -3 } } },
        next: 'ch4_006',
        condition: null,
        setFlag: 'confronted_youth'
      },
      {
        id: 'ch4_005_c',
        text: '（安静地坐在他旁边，不说话）',
        effects: { stats: { respect: 5, understanding: 3 }, relations: { youth: { trust: 5 } } },
        next: 'ch4_006',
        condition: null,
        setFlag: 'patient_with_youth'
      }
    ],
    next: null
  },
  'ch4_006': {
    id: 'ch4_006',
    speaker: 'youth',
    text: '我从小就被教导：苦难是化妆的祝福，凡事有神的美意。可是——你见过那个小女孩吗？七岁，腿断了，没有麻醉药，医生在给她缝合伤口的时候她一直喊妈妈。你告诉我，那也是化妆的祝福？',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_006_a',
        text: '我不知道。我也没有答案。',
        effects: { stats: { witness: 4, respect: 3 }, relations: { youth: { trust: 4 } } },
        next: 'ch4_007',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_006_b',
        text: '你问的是对的。但是你的愤怒不会让那个小女孩更痛。',
        effects: { stats: { understanding: 3, prejudice: -3 }, relations: { youth: { affection: 2 } } },
        next: 'ch4_007',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_007': {
    id: 'ch4_007',
    speaker: 'youth',
    text: '我不敢回去了。不是因为废墟——是因为那些眼神。他们看见我的领子上有十字架项链，就以为我能给他们什么。可我能给什么呢？一套背诵出来的教义？一句"神与你同在"？',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_007_a',
        text: '也许你现在给不了他们答案。但你可以回去给他们一双手。',
        effects: { stats: { witness: 5, understanding: 3 }, relations: { youth: { affection: 5, trust: 3 } } },
        next: 'ch4_008',
        condition: null,
        setFlag: 'patient_with_youth'
      },
      {
        id: 'ch4_007_b',
        text: '如果你不相信你所说的话，那你确实不该回去了。',
        effects: { stats: { prejudice: 5, respect: -4 }, relations: { youth: { trust: -5, affection: -3 } } },
        next: 'ch4_008',
        condition: null,
        setFlag: 'confronted_youth'
      }
    ],
    next: null
  },
  'ch4_008': {
    id: 'ch4_008',
    speaker: 'youth',
    text: '他沉默了很久。远处的发电机嗡嗡作响，像一只疲惫的蜂。他低头看着自己沾满灰尘的双手，那双手上还戴着团契的铭牌手环。"你说的\'一双手\'……是什么样的手？"他的声音很轻，像是问自己。',
    type: 'narration',
    chapter: 4,
    choices: [
      {
        id: 'ch4_008_a',
        text: '是愿意脏的手。',
        effects: { stats: { understanding: 4, witness: 3 }, relations: { youth: { affection: 4 } } },
        next: 'ch4_009',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_008_b',
        text: '是还在发抖，但没有缩回去的手。',
        effects: { stats: { respect: 5, understanding: 3 }, relations: { youth: { trust: 5 } } },
        next: 'ch4_009',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_009': {
    id: 'ch4_009',
    speaker: 'youth',
    text: '他的眼眶红了。他抬起头看着你，第一次不再闪避。"你知道吗……从来没有人跟我说过，\'我不知道\'也可以是一种回答。在教会里，不知道是一种罪。你得有确据，得有见证，得有一套完整的解释。没有人告诉我——可以不知道，然后继续走。',
    type: 'dialogue',
    chapter: 4,
    choices: [],
    next: 'ch4_010'
  },
  'ch4_010': {
    id: 'ch4_010',
    speaker: null,
    text: '他站起来，拍了拍裤子上的灰。他的脚步还有些犹豫，但方向变了——朝着医疗站的方向。你跟在他后面，走进了那片嘈杂的、弥漫着消毒水气味的空间。就在这时，你看见了一个你没有预料到的人。',
    type: 'narration',
    chapter: 4,
    choices: [],
    next: 'ch4_011'
  },
  'ch4_011': {
    id: 'ch4_011',
    speaker: null,
    text: '医疗站的角落里，一个剃着光头的男人正蹲在地上，小心翼翼地为一位老人的手臂更换纱布。他穿着一件灰色的僧袍，袖子卷到手肘，手上沾着碘伏的痕迹。他没有穿白大褂——但他包扎伤口的手法，和旁边的医生一样熟练。',
    type: 'scene',
    chapter: 4,
    choices: [
      {
        id: 'ch4_011_a',
        text: '走过去，看他需不需要帮忙',
        effects: { stats: { witness: 3, understanding: 3 }, relations: { monk: { affection: 4 } } },
        next: 'ch4_012',
        condition: null,
        setFlag: 'met_monk'
      },
      {
        id: 'ch4_011_b',
        text: '先观察一会儿',
        effects: { stats: { witness: 5 }, relations: { monk: { trust: 2 } } },
        next: 'ch4_012',
        condition: null,
        setFlag: 'met_monk'
      }
    ],
    next: null
  },
  'ch4_012': {
    id: 'ch4_012',
    speaker: 'monk',
    text: '他抬起头，看见了你。没有惊讶，没有戒备，只是淡淡地笑了一下。"来了？帮我扶着老伯的手臂，换个角度，我够不到伤口的另一侧。"他的口音带着南方的柔软，像是在说一件再平常不过的事情。',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_012_a',
        text: '照他说的做',
        effects: { stats: { witness: 4, respect: 3 }, relations: { monk: { affection: 5, trust: 3 } } },
        next: 'ch4_013',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_012_b',
        text: '你是……僧人？',
        effects: { stats: { understanding: 2, prejudice: 3 }, relations: { monk: { affection: 2 } } },
        next: 'ch4_013',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_013': {
    id: 'ch4_013',
    speaker: 'monk',
    text: '他没有直接回答你的问题。他只是把纱布缠好，在老人耳边轻声说了几句话——不是佛号，也不是祷告词，只是一句"疼的话就告诉我"。老人点了点头。僧人站起来，在衣服上擦了擦手，转向你。',
    type: 'narration',
    chapter: 4,
    choices: [],
    next: 'ch4_014'
  },
  'ch4_014': {
    id: 'ch4_014',
    speaker: 'monk',
    text: '"我是从邻县来的。那里有一座小庙，地震之后也没了。我师父说——庙可以塌，人不能不救。所以我就来了。"他环顾了一下这个拥挤的医疗站，目光从每一个躺着的病人身上扫过，没有停留，也没有移开。"你们的医生忙不过来，我搭把手。伤口不分信仰，对吗？"',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_014_a',
        text: '你说得对。伤口不分信仰。',
        effects: { stats: { understanding: 5, prejudice: -4 }, relations: { monk: { affection: 5, trust: 4 } } },
        next: 'ch4_015',
        condition: null,
        setFlag: 'challenged_assumptions'
      },
      {
        id: 'ch4_014_b',
        text: '你信佛，来这里帮忙……不觉得矛盾吗？',
        effects: { stats: { prejudice: 5, witness: 2 }, relations: { monk: { trust: -2 } } },
        next: 'ch4_015',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_014_c',
        text: '（点头，开始帮他整理医疗用品）',
        effects: { stats: { witness: 5, respect: 4 }, relations: { monk: { affection: 4, trust: 5 } } },
        next: 'ch4_015',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_015': {
    id: 'ch4_015',
    speaker: 'monk',
    text: '"有一个故事，"他一边撕开新的绷带一边说，语调像在讲一个很久以前的事。"一个人掉进了河里。岸上有三个人看见了他。第一个人说：\'你为什么不早学游泳？\'第二个人说：\'我来为你祈祷。\'第三个人跳下了水。"',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_015_a',
        text: '你想说，你就是第三个人？',
        effects: { stats: { understanding: 3, witness: 3 }, relations: { monk: { affection: 3 } } },
        next: 'ch4_016',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_015_b',
        text: '也许第三个人跳下去之后，也需要前两个人。',
        effects: { stats: { understanding: 6, respect: 4 }, relations: { monk: { affection: 5, trust: 4 } } },
        next: 'ch4_016',
        condition: null,
        setFlag: 'challenged_assumptions'
      },
      {
        id: 'ch4_015_c',
        text: '这和你的信仰有什么关系？',
        effects: { stats: { prejudice: 4 }, relations: { monk: { trust: -2 } } },
        next: 'ch4_016',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_016': {
    id: 'ch4_016',
    speaker: 'monk',
    text: '他笑了，笑得很安静。"我哪有那么大的本事。我只是在想——岸上那三个人，也许心里想的都是同一件事：\'我不想你死。\'只是说出来和做出来的样子不一样。"他把绷带递给你，"有时候，慈悲不需要翻译。"',
    type: 'dialogue',
    chapter: 4,
    choices: [],
    next: 'ch4_017'
  },
  'ch4_017': {
    id: 'ch4_017',
    speaker: null,
    text: '就在这时，青年的声音从身后传来。他显然也看见了僧人，脚步停住了。他的表情复杂——像是困惑、戒备，还有一丝说不清的东西。',
    type: 'narration',
    chapter: 4,
    choices: [
      {
        id: 'ch4_017_a',
        text: '叫青年过来帮忙',
        effects: { stats: { witness: 4, understanding: 3 }, relations: { youth: { affection: 3, trust: 4 }, monk: { affection: 3 } } },
        next: 'ch4_018',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_017_b',
        text: '让青年自己决定要不要靠近',
        effects: { stats: { respect: 5, understanding: 4 }, relations: { youth: { trust: 3 } } },
        next: 'ch4_018',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_018': {
    id: 'ch4_018',
    speaker: 'youth',
    text: '青年慢慢走了过来，眼睛一直在僧人和病人之间来回看。他终于开口了，声音带着一种经过训练的礼貌，但底下的颤抖藏不住："师父，你……为什么要帮我们？我们又不是……"他没有把话说完。',
    type: 'dialogue',
    chapter: 4,
    choices: [],
    next: 'ch4_019'
  },
  'ch4_019': {
    id: 'ch4_019',
    speaker: 'monk',
    text: '僧人没有纠正他的称呼，也没有追问那个没有说完的句子。他只是抬起一只手，指了指躺在简易床上的那个老人。"你问他——我是谁，对他重不重要？"老人微微睁开了眼，浑浊的目光里没有辨认出任何人，只是轻声说了句："疼……"',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_019_a',
        text: '帮老人调整枕头，让他舒服一点',
        effects: { stats: { witness: 5, understanding: 4 }, relations: { monk: { trust: 4 }, youth: { affection: 3 } } },
        next: 'ch4_020',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_019_b',
        text: '看向青年，看他的反应',
        effects: { stats: { witness: 4 }, relations: { youth: { trust: 3 } } },
        next: 'ch4_020',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_020': {
    id: 'ch4_020',
    speaker: 'youth',
    text: '青年的嘴唇动了一下，像是想说什么——一句经文，一段教义，或者一个辩驳。但最终他什么都没说。他只是慢慢地蹲了下来，伸手帮老人按住了被角的另一端。他的动作很笨拙，但他的手没有缩回去。',
    type: 'narration',
    chapter: 4,
    choices: [
      {
        id: 'ch4_020_a',
        text: '这就是你之前问的"什么样的手"。',
        effects: { stats: { understanding: 6, respect: 4 }, relations: { youth: { affection: 5, trust: 5 } } },
        next: 'ch4_021',
        condition: { flag: 'patient_with_youth' },
        setFlag: null
      },
      {
        id: 'ch4_020_b',
        text: '（不说话，只是默默地帮忙）',
        effects: { stats: { witness: 5, respect: 4 }, relations: { youth: { trust: 4 }, monk: { trust: 3 } } },
        next: 'ch4_021',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_021': {
    id: 'ch4_021',
    speaker: null,
    text: '你在医疗站的一角发现了他——一个戴着眼镜的年轻人，手里攥着一个笔记本，站在堆放物资的箱子后面。他在写字，但他的目光一直在病人和志愿者之间游移，像是在寻找什么又害怕找到什么。',
    type: 'scene',
    chapter: 4,
    choices: [
      {
        id: 'ch4_021_a',
        text: '走过去，看看他在写什么',
        effects: { stats: { witness: 4 }, relations: { seminarian: { affection: 2 } } },
        next: 'ch4_022',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_021_b',
        text: '给他递一瓶水',
        effects: { stats: { understanding: 4, respect: 3 }, relations: { seminarian: { affection: 5, trust: 3 } } },
        next: 'ch4_022',
        condition: null,
        setFlag: 'helped_seminarian'
      }
    ],
    next: null
  },
  'ch4_022': {
    id: 'ch4_022',
    speaker: 'seminarian',
    text: '他注意到你走近，本能地把笔记本合上了。"啊……你好。我是——嗯——某某神学院的道学硕士生。我在做田野调查。就是……从实践神学的角度，观察灾难情境中的教牧回应模式。"他的语言精确得像在答辩，但他的手在发抖。',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_022_a',
        text: '"实践神学"——那你现在在实践什么？',
        effects: { stats: { witness: 5, prejudice: 3 }, relations: { seminarian: { trust: -2, affection: -2 } } },
        next: 'ch4_023',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_022_b',
        text: '田野调查？这里不是田野。这里是现场。',
        effects: { stats: { witness: 6, respect: 3 }, relations: { seminarian: { trust: 2, affection: -3 } } },
        next: 'ch4_023',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_022_c',
        text: '写了不少吧？辛苦了。',
        effects: { stats: { understanding: 4, respect: 3 }, relations: { seminarian: { affection: 5, trust: 4 } } },
        next: 'ch4_023',
        condition: null,
        setFlag: 'helped_seminarian'
      }
    ],
    next: null
  },
  'ch4_023': {
    id: 'ch4_023',
    speaker: 'seminarian',
    text: '他的脸涨红了。"我……我知道你在想什么。你觉得我应该去帮忙，而不是站在旁边做笔记。"他推了推眼镜，声音低了下来。"可是你知道吗——我怕。我怕靠近那些人之后，发现我的神学一无是处。写论文至少是安全的。论文不会哭，不会流血，不会问我\'上帝在哪里\'。"',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_023_a',
        text: '至少你对自己诚实了。',
        effects: { stats: { understanding: 5, respect: 4 }, relations: { seminarian: { trust: 5, affection: 4 } } },
        next: 'ch4_024',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_023_b',
        text: '怕就对了。那些人也在怕。但他们没有笔记本可以躲在后面。',
        effects: { stats: { witness: 6, prejudice: 4 }, relations: { seminarian: { affection: -3, trust: 2 } } },
        next: 'ch4_024',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_024': {
    id: 'ch4_024',
    speaker: 'seminarian',
    text: '他沉默了。他的目光越过你，看向医疗站的那头——僧人正在教青年如何给伤口消毒。他盯着看了很久，然后突然开口："那个……光头的人。他是佛教徒？"他的声音里有困惑，也有一丝被冒犯的意思。"他怎么可以——我意思是——他做的那些事，不是应该由我们来做的吗？"',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_024_a',
        text: '也许"我们"的圈子比你以为的大。',
        effects: { stats: { understanding: 6, prejudice: -5 }, relations: { seminarian: { trust: 3 }, monk: { affection: 4 } } },
        next: 'ch4_025',
        condition: null,
        setFlag: 'challenged_assumptions'
      },
      {
        id: 'ch4_024_b',
        text: '你与其问"他怎么可以"，不如问"我们为什么没有"。',
        effects: { stats: { witness: 5, respect: 3 }, relations: { seminarian: { trust: 4, affection: 2 } } },
        next: 'ch4_025',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_024_c',
        text: '你先别管他了。你看到那边那个小孩了吗？他一个人坐在角落里。',
        effects: { stats: { witness: 6, understanding: 3 }, relations: { seminarian: { trust: 3 } } },
        next: 'ch4_025',
        condition: null,
        setFlag: 'helped_seminarian'
      }
    ],
    next: null
  },
  'ch4_025': {
    id: 'ch4_025',
    speaker: 'seminarian',
    text: '他的目光顺着你的指向看过去。那个小孩大概五六岁，抱着膝盖坐在角落，不哭也不闹，只是盯着地面。神学生咽了一下口水。"我……我不会哄小孩。我的专业方向是系统神学，不是教牧关怀。我应该——"他停住了，因为那个小孩抬起了头，茫然地朝这边看了一眼。',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_025_a',
        text: '系统神学救不了这个孩子的今晚。但你可以。',
        effects: { stats: { witness: 7, respect: 3 }, relations: { seminarian: { trust: 4 } } },
        next: 'ch4_026',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_025_b',
        text: '我也不会。但我们可以一起过去。',
        effects: { stats: { understanding: 6, respect: 5 }, relations: { seminarian: { affection: 5, trust: 5 } } },
        next: 'ch4_026',
        condition: null,
        setFlag: 'helped_seminarian'
      }
    ],
    next: null
  },
  'ch4_026': {
    id: 'ch4_026',
    speaker: null,
    text: '他犹豫了很长时间。长到你以为他不会动了。然后他把笔记本塞进了背包里——那个动作像是在给自己做一个决定。他站起来，深吸了一口气，朝那个小孩走了一步。然后又一步。他的脚步像是在穿越一片看不见的旷野。',
    type: 'narration',
    chapter: 4,
    choices: [],
    next: 'ch4_027'
  },
  'ch4_027': {
    id: 'ch4_027',
    speaker: null,
    text: '你转过头，看见僧人和青年肩并肩站在医疗站的门口。青年正笨手笨脚地学着怎么用绷带打结，僧人在旁边看着，没有催促，也没有接管。夕阳从碎裂的屋顶缝隙间漏进来，照在他们身上。你听见僧人说了一句什么，青年笑了一下——那是你今天第一次看到他笑。',
    type: 'scene',
    chapter: 4,
    choices: [
      {
        id: 'ch4_027_a',
        text: '走过去，和他们站在一起',
        effects: { stats: { understanding: 4, respect: 4 }, relations: { monk: { affection: 3, trust: 4 }, youth: { affection: 4, trust: 3 } } },
        next: 'ch4_028',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_027_b',
        text: '多看一会儿。把这个画面记住。',
        effects: { stats: { witness: 6, understanding: 3 }, relations: { monk: { trust: 3 } } },
        next: 'ch4_028',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_028': {
    id: 'ch4_028',
    speaker: 'monk',
    text: '僧人注意到你了。他微微颔首，然后说了一句话，像是对你说的，也像是自言自语。"有人问我：\'你信什么？\'我说：\'我信疼的时候有人来。\'"他停顿了一下，目光落在青年正在练习打结的手上。"至于那个人叫什么名字、信什么经——疼的人不关心这些。',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_028_a',
        text: '也许恩典比我们以为的更宽。',
        effects: { stats: { understanding: 7, prejudice: -6 }, relations: { monk: { affection: 5, trust: 5 } } },
        next: 'ch4_029',
        condition: null,
        setFlag: 'challenged_assumptions'
      },
      {
        id: 'ch4_028_b',
        text: '（点头，然后看向青年和神学生——他们都在各自的路上迈出了一步）',
        effects: { stats: { witness: 5, respect: 5 }, relations: { monk: { trust: 4 }, youth: { affection: 3 }, seminarian: { affection: 3 } } },
        next: 'ch4_029',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_029': {
    id: 'ch4_029',
    speaker: null,
    text: '夜幕降临了。医疗站里亮起了几盏应急灯，光线昏黄，像是某种不牢靠的希望。青年蜷在角落的折叠床上，终于睡着了，手里还攥着那条十字架项链。神学生坐在那个小孩旁边，笔记本摊开在膝盖上，但他没有在写——他在听那个小孩断断续续地说着什么。',
    type: 'scene',
    chapter: 4,
    choices: [],
    next: 'ch4_030'
  },
  'ch4_030': {
    id: 'ch4_030',
    speaker: null,
    text: '僧人走了过来，递给你一杯热水。他也给自己倒了一杯，在一张塑料凳上坐下来。在昏暗的灯光下，他的脸上有一种不属于任何宗教的平静。',
    type: 'narration',
    chapter: 4,
    choices: [
      {
        id: 'ch4_030_a',
        text: '今天辛苦了。',
        effects: { stats: { respect: 3, understanding: 3 }, relations: { monk: { affection: 4, trust: 3 } } },
        next: 'ch4_031',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_030_b',
        text: '你师父说得对——庙可以塌，人不能不救。',
        effects: { stats: { understanding: 5, witness: 3 }, relations: { monk: { affection: 5, trust: 5 } } },
        next: 'ch4_031',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_031': {
    id: 'ch4_031',
    speaker: 'monk',
    text: '"你们有一位叫保罗的人，写过一封信。他说——\'我现在知道的有限，到那时就全知道了。\'"僧人轻声说。"我挺喜欢这句话的。一个那么确信的人，承认自己知道的有限。"他看着你，"也许信仰不是把不知道的事情硬说成知道。是承认不知道，然后继续往前走。"',
    type: 'dialogue',
    chapter: 4,
    choices: [
      {
        id: 'ch4_031_a',
        text: '你一个佛教徒，比我更懂保罗。',
        effects: { stats: { understanding: 5, prejudice: -5 }, relations: { monk: { affection: 4, trust: 5 } } },
        next: 'ch4_032',
        condition: null,
        setFlag: 'challenged_assumptions'
      },
      {
        id: 'ch4_031_b',
        text: '继续往前走……走到哪里？',
        effects: { stats: { witness: 4, understanding: 4 }, relations: { monk: { trust: 3 } } },
        next: 'ch4_032',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_032': {
    id: 'ch4_032',
    speaker: 'monk',
    text: '他没有回答，只是指了指角落里的青年和神学生。一个在睡梦中紧握着信仰的信物，一个在黑暗中倾听一个孩子的声音。"你问我走到哪里？"他轻声说，"走到疼的地方去。路不远的，就在你脚底下。"',
    type: 'dialogue',
    chapter: 4,
    choices: [],
    next: 'ch4_033'
  },
  'ch4_033': {
    id: 'ch4_033',
    speaker: null,
    text: '你低头看着自己的手。这双手今天扶过伤者、递过水、握过绷带。它们不是传道的手，也不是行神迹的手。它们只是——在场的手。而也许，这就够了。',
    type: 'narration',
    chapter: 4,
    choices: [
      {
        id: 'ch4_033_a',
        text: '是的。这就够了。',
        effects: { stats: { understanding: 5, respect: 4, witness: 3 }, relations: { youth: { affection: 3 }, monk: { affection: 3 }, seminarian: { affection: 3 } } },
        next: 'ch4_034',
        condition: null,
        setFlag: null
      },
      {
        id: 'ch4_033_b',
        text: '也许不够。但至少是一个开始。',
        effects: { stats: { witness: 5, understanding: 4, respect: 3 }, relations: { youth: { trust: 4 }, monk: { trust: 4 }, seminarian: { trust: 4 } } },
        next: 'ch4_034',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  },
  'ch4_034': {
    id: 'ch4_034',
    speaker: null,
    text: '远处传来了一阵引擎声——新的救援车队到了。车灯扫过废墟，像是在黑暗中划出一条暂时可行的路。僧人站起来，拍了拍僧袍上的灰。青年被引擎声吵醒了，揉着眼睛坐起来，茫然地看了一圈，然后——你看得很清楚——他自己站了起来，朝医疗站的方向走了一步。神学生合上了笔记本，这一次，他走向门口，不是站在角落。',
    type: 'scene',
    chapter: 4,
    choices: [],
    next: 'ch4_035'
  },
  'ch4_035': {
    id: 'ch4_035',
    speaker: null,
    text: '新的一天即将开始。你不知道它会带来什么——更多的废墟，更多的伤口，还是某个意想不到的瞬间。但你知道一件事：你不再只是旁观者了。你走进了画面，你的手脏了，你的心也打开了。前面的路上还有什么？你不知道。但你的脚步已经迈出去了。',
    type: 'narration',
    chapter: 4,
    choices: [
      {
        id: 'ch4_035_a',
        text: '继续前行',
        effects: { stats: { witness: 3, understanding: 3 } },
        next: 'ch5_001',
        condition: null,
        setFlag: null
      }
    ],
    next: null
  }
};
