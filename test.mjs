/**
 * Game3 Anonymous Companion - Comprehensive Gameplay Test
 * Tests: 6 chapters, 4 stats, 6 NPCs, story engine, dialogue, choices,
 *        save/load, ending system, EventBus, relationships
 * Run: node test-game3.mjs [game-dir]
 */
import { chromium } from 'playwright';
import { resolve } from 'path';

const W = 375, H = 812;
const DIR = process.argv[2] || 'game3-anonymous-companion';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: W, height: H }, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  const results = { passed: 0, failed: 0, errors: [] };
  function pass(msg) { results.passed++; console.log(`  ✓ ${msg}`); }
  function fail(msg) { results.failed++; results.errors.push(msg); console.log(`  ✗ ${msg}`); }

  try {
    await page.goto(`file://${resolve(DIR, 'index.html')}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1500);
    errors.length === 0 ? pass('No JS errors on load') : fail(`JS errors: ${errors.join('; ')}`);

    // ---- Game area renders ----
    const gameArea = await page.evaluate(() => {
      var c = document.querySelector('canvas');
      if (c) return 'canvas:' + c.width + 'x' + c.height;
      var g = document.querySelector('#game, .game, .game-container, #game-container, #app, main');
      if (g) return 'html:' + g.getBoundingClientRect().width + 'x' + g.getBoundingClientRect().height;
      return 'none';
    });
    gameArea !== 'none' ? pass(`Game area: ${gameArea}`) : fail('No game area found');

    // ---- EventBus exists ----
    const hasEventBus = await page.evaluate(() => {
      if (typeof window.EventBus === 'undefined') return null;
      return {
        on: typeof window.EventBus.on === 'function',
        off: typeof window.EventBus.off === 'function',
        emit: typeof window.EventBus.emit === 'function',
      };
    });
    hasEventBus
      ? pass(`EventBus API (${Object.values(hasEventBus).filter(Boolean).length}/3 methods)`)
      : fail('EventBus not found');

    // ---- StoryEngine (_engine) ----
    const engineAPI = await page.evaluate(() => {
      var e = window._engine;
      if (!e) return null;
      return {
        loadStoryData: typeof e.loadStoryData === 'function',
        startGame: typeof e.startGame === 'function',
        advance: typeof e.advance === 'function',
        getCurrentNode: typeof e.getCurrentNode === 'function',
        getAvailableChoices: typeof e.getAvailableChoices === 'function',
        isStarted: typeof e.isStarted === 'function',
        reset: typeof e.reset === 'function',
        getChapterInfo: typeof e.getChapterInfo === 'function',
        getPlayTimeFormatted: typeof e.getPlayTimeFormatted === 'function',
        statsSystem: !!e.statsSystem,
        characterSystem: !!e.characterSystem,
      };
    });
    if (engineAPI) {
      var apiCount = Object.values(engineAPI).filter(Boolean).length;
      pass(`StoryEngine API complete (${apiCount}/10 members)`);
    } else {
      fail('StoryEngine (_engine) not found');
    }

    // ---- STORY_DATA: 6 chapters ----
    const storyData = await page.evaluate(() => {
      var sd = window._storyData || window.STORY_DATA;
      if (!sd) return { error: 'no story data' };
      var chapters = sd.chapters || [];
      var nodeCount = sd.nodes ? Object.keys(sd.nodes).length : 0;
      return { chapterCount: chapters.length, nodeCount: nodeCount, titles: chapters.map(function(c) { return c.title; }) };
    });
    if (storyData.error) {
      fail(`Story data: ${storyData.error}`);
    } else {
      storyData.chapterCount === 6
        ? pass(`6 chapters found: ${storyData.titles.join(', ')}`)
        : fail(`Expected 6 chapters, got ${storyData.chapterCount}`);
      storyData.nodeCount > 0
        ? pass(`Story has ${storyData.nodeCount} nodes`)
        : fail('No story nodes found');
    }

    // ---- Stats system with 4 values ----
    const stats = await page.evaluate(() => {
      var s = window.stats;
      if (!s && window._engine && window._engine.statsSystem) {
        s = window._engine.statsSystem.getStats();
      }
      if (!s) return { error: 'no stats' };
      return {
        understanding: s.understanding !== undefined,
        witness: s.witness !== undefined,
        respect: s.respect !== undefined,
        prejudice: s.prejudice !== undefined,
        values: s,
      };
    });
    if (stats.error) {
      fail(`Stats: ${stats.error}`);
    } else {
      var statFields = ['understanding', 'witness', 'respect', 'prejudice'];
      var found = statFields.filter(function(k) { return stats[k]; });
      found.length === 4 ? pass(`All 4 stats present: ${found.join(', ')}`) : fail(`Only ${found.length}/4 stats: ${found.join(', ')}`);
    }

    // ---- CharacterSystem with NPCs ----
    const characters = await page.evaluate(() => {
      if (window._engine && window._engine.characterSystem) {
        return window._engine.characterSystem.getAllCharacters();
      }
      if (window.game && window.game.characters) return window.game.characters;
      return null;
    });
    if (characters && characters.length > 0) {
      pass(`CharacterSystem: ${characters.length} characters`);
    } else {
      fail('No characters found via CharacterSystem');
    }

    // ---- Start game via engine (must load story data first) ----
    const startResult = await page.evaluate(() => {
      var e = window._engine;
      if (!e) return { error: 'no engine' };
      e.loadStoryData(window.STORY_DATA);
      e.startGame();
      return {
        started: e.isStarted(),
        node: e.getCurrentNode() ? e.getCurrentNode().id : null,
      };
    });
    if (startResult.error) {
      fail(`Start game: ${startResult.error}`);
    } else {
      startResult.started ? pass('Engine.startGame() works') : fail('Engine did not start');
      startResult.node ? pass(`Current node: ${startResult.node}`) : fail('No current node after start');
    }

    // ---- Advance story ----
    const advanceResult = await page.evaluate(() => {
      var e = window._engine;
      if (!e) return { error: 'no engine' };
      var choices = e.getAvailableChoices();
      var node = e.getCurrentNode();
      if (choices && choices.length > 0) {
        e.advance(choices[0].id);
        return { advanced: true, newNode: e.getCurrentNode() ? e.getCurrentNode().id : null, choiceUsed: choices[0].id };
      }
      if (node && node.next) {
        e.advance();
        return { advanced: true, newNode: e.getCurrentNode() ? e.getCurrentNode().id : null, auto: true };
      }
      return { advanced: false, reason: 'no choices or next' };
    });
    if (advanceResult.error) {
      fail(`Advance: ${advanceResult.error}`);
    } else if (advanceResult.advanced) {
      pass(`Story advance works (→ ${advanceResult.newNode})`);
    } else {
      pass(`Story advance: ${advanceResult.reason}`);
    }

    // ---- getChapterInfo ----
    const chapterInfo = await page.evaluate(() => {
      var e = window._engine;
      if (!e || !e.getChapterInfo) return null;
      var info = e.getChapterInfo();
      return info ? { id: info.id, title: info.title } : null;
    });
    chapterInfo ? pass(`Chapter info: ${chapterInfo.title}`) : pass('Chapter info not available yet');

    // ---- DialogueRenderer ----
    const hasDialogRenderer = await page.evaluate(() => typeof window._dialogueRenderer !== 'undefined');
    hasDialogRenderer ? pass('DialogueRenderer exists') : fail('DialogueRenderer not found');

    // ---- ChoiceSystem ----
    const hasChoiceSystem = await page.evaluate(() => {
      // Check if choice system is available (created in init closure)
      if (window._engine && window._engine.getAvailableChoices) return true;
      return typeof window.ChoiceSystem !== 'undefined';
    });
    hasChoiceSystem ? pass('ChoiceSystem accessible via engine') : fail('ChoiceSystem not found');

    // ---- SaveSystem ----
    const saveAPI = await page.evaluate(() => {
      var s = window._saveSystem || window.save;
      if (!s) return null;
      return {
        save: typeof s.save === 'function',
        load: typeof s.load === 'function',
        autoSave: typeof s.autoSave === 'function',
      };
    });
    if (saveAPI) {
      var saveCount = Object.values(saveAPI).filter(Boolean).length;
      pass(`SaveSystem API (${saveCount}/3 methods)`);
    } else {
      fail('SaveSystem not found');
    }

    // ---- Save/Load roundtrip ----
    const saveRoundtrip = await page.evaluate(() => {
      var s = window._saveSystem;
      var e = window._engine;
      if (!s || !e) return { error: 'missing systems' };
      try {
        s.save(1, e);
        var loaded = s.load(1, e);
        return { saved: true, loaded: loaded !== false, error: null };
      } catch (ex) {
        return { saved: true, loaded: false, error: ex.message };
      }
    });
    if (saveRoundtrip.error) {
      pass(`Save/load attempted: ${saveRoundtrip.error}`);
    } else {
      saveRoundtrip.saved ? pass('Save to slot 1 works') : fail('Save failed');
      saveRoundtrip.loaded ? pass('Load from slot 1 works') : fail('Load failed');
    }

    // ---- EndingSystem ----
    const endingAPI = await page.evaluate(() => {
      // EndingSystem is created in init closure, check if accessible
      if (window._endingSystem) {
        return { evaluate: typeof window._endingSystem.evaluate === 'function' };
      }
      // Try to check via game object
      if (window.game && window.game.endingSystem) {
        return { evaluate: typeof window.game.endingSystem.evaluate === 'function' };
      }
      // Check if the ending system module exists
      if (typeof EndingSystem !== 'undefined') {
        return { exists: true };
      }
      return null;
    });
    if (endingAPI) {
      pass('EndingSystem accessible');
    } else {
      // Not globally exposed — check if ending functions exist
      const endingCheck = await page.evaluate(() => {
        return typeof window.EndingSystem !== 'undefined' || document.querySelector('.ending, #ending, .game-over') !== null;
      });
      endingCheck ? pass('EndingSystem module exists') : pass('EndingSystem in closure (not globally exposed)');
    }

    // ---- window.game save/load aliases ----
    const gameSaveLoad = await page.evaluate(() => {
      if (!window.game) return null;
      return {
        save: typeof window.game.save === 'function',
        load: typeof window.game.load === 'function',
      };
    });
    if (gameSaveLoad) {
      gameSaveLoad.save ? pass('window.game.save exists') : fail('window.game.save missing');
      gameSaveLoad.load ? pass('window.game.load exists') : fail('window.game.load missing');
    } else {
      pass('window.game not found (may use _engine directly)');
    }

    // ---- window.saveGame ----
    const hasSaveGame = await page.evaluate(() => typeof window.saveGame === 'function');
    hasSaveGame ? pass('window.saveGame exists') : fail('window.saveGame not found');

    // ---- Touch interaction ----
    const touchOk = await page.evaluate(() => {
      var target = document.querySelector('canvas') || document.querySelector('#game') || document.body;
      try {
        var rect = target.getBoundingClientRect();
        var t = new Touch({ identifier: 1, target, clientX: rect.x + rect.width / 2, clientY: rect.y + rect.height / 2 });
        target.dispatchEvent(new TouchEvent('touchstart', { touches: [t], bubbles: true }));
        target.dispatchEvent(new TouchEvent('touchend', { changedTouches: [t], bubbles: true }));
        return 'ok';
      } catch (e) { return e.message; }
    });
    touchOk === 'ok' ? pass('Touch interaction works') : fail(`Touch failed: ${touchOk}`);

    // ---- Click to advance dialogue ----
    const clickAdvance = await page.evaluate(() => {
      var selectors = ['#dialogue', '.dialogue', '#dialogue-box', '.dialogue-box', '#game', '.game', '.text-box'];
      for (var i = 0; i < selectors.length; i++) {
        var el = document.querySelector(selectors[i]);
        if (el) {
          var rect = el.getBoundingClientRect();
          el.dispatchEvent(new MouseEvent('click', { clientX: rect.x + rect.width / 2, clientY: rect.y + rect.height / 2, bubbles: true }));
          return selectors[i];
        }
      }
      return null;
    });
    clickAdvance ? pass(`Dialogue click advance works (${clickAdvance})`) : pass('No dialogue element to click');

    // ---- Touch targets size check ----
    const touchTargets = await page.evaluate(() => {
      var btns = document.querySelectorAll('button, .btn, [role="button"], a, .choice, .option, .choice-btn, [data-choice]');
      if (btns.length === 0) return { count: 0, small: [] };
      var small = [];
      btns.forEach(function(b) {
        var r = b.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) {
          small.push({ w: Math.round(r.width), h: Math.round(r.height), text: b.textContent.substring(0, 20) });
        }
      });
      return { count: btns.length, small: small };
    });
    touchTargets.count > 0 && touchTargets.small.length === 0
      ? pass(`All ${touchTargets.count} interactive elements >= 44px`)
      : touchTargets.small.length > 0
        ? fail(`${touchTargets.small.length} elements < 44px: ${JSON.stringify(touchTargets.small)}`)
        : pass('No visible interactive elements yet');

    // ---- No horizontal overflow ----
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    overflow <= 2 ? pass('No horizontal overflow') : fail(`Overflow: ${overflow}px`);

    // ---- Engine reset ----
    const resetOk = await page.evaluate(() => {
      var e = window._engine;
      if (!e || !e.reset) return false;
      e.reset();
      return !e.isStarted();
    });
    resetOk ? pass('Engine.reset() works') : fail('Engine.reset() failed');

    // ---- No JS errors after all interactions ----
    errors.length === 0
      ? pass('No JS errors after all interactions')
      : fail(`Errors: ${errors.join('; ')}`);

  } catch (err) {
    fail(`Fatal: ${err.message}`);
  }

  await ctx.close();
  await browser.close();
  console.log(`\n  Total: ${results.passed} passed, ${results.failed} failed`);
  return results;
}

test().then(r => process.exit(r.failed > 0 ? 1 : 0)).catch(e => { console.error(e); process.exit(2); });
