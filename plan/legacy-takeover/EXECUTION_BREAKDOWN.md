# Execution Breakdown — Worker Packets

## Overview
3 execution workers, each fixing specific bugs. Workers may run in any order since they modify different files. Total: 4 files modified, ~20 net line delta.

---

## Worker 1: dialogue-renderer.js + choice-system.js

### Read Scope
- `js/dialogue-renderer.js` (full file)
- `js/choice-system.js` (full file)
- `test.mjs` (for test validation)

### Write Scope
- `js/dialogue-renderer.js` — fix BUG-001
- `js/choice-system.js` — fix BUG-005

### Tasks

#### Fix BUG-001: `self` undefined in `restoreFromHistory()`
**Target**: `js/dialogue-renderer.js`, line ~220
**Change**:
```diff
- self._parseInlineFormatting(h.text)
+ this._parseInlineFormatting(h.text)
```

#### Fix BUG-005: Duplicate `getChoiceCount()` method
**Target**: `js/choice-system.js`, lines 163-170 (the second occurrence including JSDoc)
**Change**: Remove the duplicate definition entirely:
```diff
-  /**
-   * 获取当前选项数量
-   * @returns {number}
-   */
-  getChoiceCount() {
-    return this._currentChoices.length;
-  }
```
Keep only the first definition at lines 159-162.

### Acceptance Criteria
- `node test.mjs` passes all 27 tests
- No new JS console errors
- Save → Load → check dialogue history does not throw ReferenceError
- `self` is not referenced in `restoreFromHistory()` scope

### File/Delta Budget
- Files: 2
- Net lines: +1, -5 = -4

---

## Worker 2: character-system.js

### Read Scope
- `js/character-system.js` (full file)

### Write Scope
- `js/character-system.js` — fix BUG-002

### Tasks

#### Fix BUG-002: ES6 syntax replacements
Replace all ES6 syntax with ES5 equivalents:

1. **Line 19**: `const` → `var`
2. **Lines 154, 159**: Convert `for...of` loops to indexed `for` loops
3. **Line 260**: Replace `Object.values()` + `for...of` with `Object.keys()` + indexed loop
4. **Lines 540, 565**: Convert `for...of` loops to indexed `for` loops

**Pattern for for...of conversion**:
```diff
- for (var item of array) {
+ for (var i = 0; i < array.length; i++) {
+   var item = array[i];
```

**Pattern for Object.values() conversion**:
```diff
- Object.values(obj)
+ Object.keys(obj).map(function(k) { return obj[k]; })
```

### Acceptance Criteria
- `node test.mjs` passes all 27 tests
- Zero occurrences of `const`, `for...of`, or `Object.values()` in `character-system.js`
- No `let` or arrow functions introduced
- `grep -n 'const \|for.*of \|Object\.values' js/character-system.js` returns empty

### File/Delta Budget
- Files: 1
- Net lines: +15, -15 = 0

---

## Worker 3: main.js

### Read Scope
- `js/main.js` (full file)

### Write Scope
- `js/main.js` — fix BUG-003 and BUG-004

### Tasks

#### Fix BUG-004: Expose `window._endingSystem`
**Target**: `js/main.js`, after line 67 (where `endingSystem` is created)
**Change**: Add global exposure:
```diff
  // 创建结局系统
  endingSystem = new EndingSystem();
+ window._endingSystem = endingSystem;
```

#### Fix BUG-003: Stale global aliases
**Target**: `js/main.js`, lines 75-82
**Change**: Replace static assignments with dynamic getters or add update calls in event handlers.

**Option A (minimal)**: Add `window.stats = engine.statsSystem.getStats();` to the `dialogueFinished` event handler and `nodeChanged` handler. Add `window.game.characters = engine.characterSystem.getAllCharacters();` similarly.

**Option B (lazy getter)**: Replace with:
```javascript
window.game = {
  characters: function() { return engine.characterSystem ? engine.characterSystem.getAllCharacters() : []; },
  save: function(slot) { saveSystem.save(slot, engine); },
  load: function(slot) { saveSystem.load(slot, engine); }
};
Object.defineProperty(window, 'stats', {
  get: function() { return engine.statsSystem ? engine.statsSystem.getStats() : {}; }
});
```

**Recommended**: Option A — simpler, fewer lines, less risk. Add stat refresh to `dialogueFinished` handler since that's when stats change after choices.

### Acceptance Criteria
- `node test.mjs` passes all 27 tests
- `window._endingSystem` is defined and has `evaluate` method
- `window.stats` reflects current stat values after gameplay (not just initial)
- `window.game.characters` reflects current character data
- EndingSystem test (lines 237-260) finds `window._endingSystem` directly

### File/Delta Budget
- Files: 1
- Net lines: +10, -2 = +8

---

## Validation (Post-Execution)

After all 3 workers complete:

1. Run `node test.mjs` — expect 27 passed, 0 failed
2. Run `grep -rn 'const \|let \|for.*of \|Object\.values\|=>' js/` — expect no ES6 syntax
3. Check total line count delta across all files — must be < 500
4. Verify no JS errors on page load in 375x812 viewport
5. Verify save/load roundtrip works
