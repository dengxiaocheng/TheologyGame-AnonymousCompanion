/**
 * story-data.js — 合并所有章节剧情数据到统一的故事数据对象
 * 依赖：chapter1-6.js 必须在此之前加载
 */
(function () {
  'use strict';

  var chapters = [
    { id: 1, title: '暴风雨之夜', description: '一切的起点' },
    { id: 2, title: '祈祷与行动', description: '洪水退去之后' },
    { id: 3, title: '无声的教室', description: '废墟中的课堂' },
    { id: 4, title: '迷途与回归', description: '信仰的裂痕' },
    { id: 5, title: '慈悲的边界', description: '第二次灾难' },
    { id: 6, title: '同行者', description: '重建与告别' }
  ];

  var nodes = Object.assign({}, chapter1, chapter2, chapter3, chapter4, chapter5, chapter6);

  window.STORY_DATA = {
    chapters: chapters,
    nodes: nodes
  };

  // 验证节点数量
  var nodeCount = Object.keys(nodes).length;
  console.log('[StoryData] Loaded ' + nodeCount + ' nodes across ' + chapters.length + ' chapters');

  // 验证章节完整性
  for (var c = 0; c < chapters.length; c++) {
    var chId = chapters[c].id;
    var chNodes = Object.keys(nodes).filter(function (key) {
      return nodes[key].chapter === chId;
    });
    console.log('[StoryData] Chapter ' + chId + ' (' + chapters[c].title + '): ' + chNodes.length + ' nodes');
  }
})();
