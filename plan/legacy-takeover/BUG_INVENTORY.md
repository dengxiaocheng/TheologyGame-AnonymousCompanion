# Bug Inventory — 无名的同行者

## P1 — Crash Bugs

### BUG-001: `self` undefined in `dialogue-renderer.js:restoreFromHistory()`
- **File**: `js/dialogue-renderer.js`, line 220
- **Symptom**: `ReferenceError: self is not defined` when restoring dialogue history after loading a save
- **Root cause**: Method uses `self._parseInlineFormatting(h.text)` but `self` was never defined in that method's scope. Other methods in the class use `this` directly. Should be `this._parseInlineFormatting(h.text)`.
- **Repro**: Save game during dialogue, load that save, the history restoration throws
- **Evidence**: Code inspection — all other methods in the class use `this`, not `self`
- **Fix**: Replace `self._parseInlineFormatting(h.text)` with `this._parseInlineFormatting(h.text)` on line 220
- **Risk**: Low — single-word replacement, no logic change
- **Test coverage**: Save/load roundtrip test (test.mjs) covers save+load but does not verify history restoration after load

## P2 — Compatibility Bugs

### BUG-002: ES6 syntax in `character-system.js`
- **File**: `js/character-system.js`
- **Lines**: 19 (`const`), 154, 159, 260, 540, 565 (`for...of` loops), 260 (`Object.values()`)
- **Symptom**: Syntax errors in ES5-only browsers or strict ES5 environments
- **Root cause**: Code uses `const`, `for...of` loops, and `Object.values()` which are ES6+. Project requires ES5 compatibility (all other files use `var`, `for` loops, `Object.keys()`)
- **Repro**: Load game in an ES5-only environment (e.g., older mobile browsers)
- **Evidence**: All other 7 JS files consistently use `var`, traditional `for` loops, and `Object.keys()`
- **Fix**: Replace `const` → `var`, `for...of` → `for` with index, `Object.values()` → `Object.keys().map()`
- **Risk**: Low — mechanical transformations, no logic change
- **Affected lines**:
  - Line 19: `const` → `var`
  - Lines 154, 159: `for (var item of arr)` → indexed `for` loop
  - Line 260: `Object.values()` + `for...of` → `Object.keys()` + indexed loop
  - Lines 540, 565: `for...of` → indexed `for` loop

## P3 — Data Correctness Issues

### BUG-003: Stale global aliases in `main.js`
- **File**: `js/main.js`, lines 75-82
- **Symptom**: `window.stats` and `window.game.characters` contain initial values from init time, never updated
- **Root cause**: These are set once in `init()` and never refreshed. `window.stats` captures the initial stat object, `window.game.characters` captures the initial character array. After gameplay changes stats/relationships, the globals are stale.
- **Repro**: Check `window.stats` after making choices that change stats — values are still the originals
- **Evidence**: Test at line 104-107 reads `window.stats` but the test starts the game fresh so it gets initial values; the staleness doesn't cause test failures but is a correctness issue
- **Fix**: Replace static assignment with getter functions or update in event handlers
- **Risk**: Low — changes how globals are accessed but test assertions use initial values anyway
- **Note**: Tests pass despite this because they check initial state

### BUG-004: `window._endingSystem` not exposed
- **File**: `js/main.js`, line 67
- **Symptom**: Test for EndingSystem (test.mjs lines 237-260) hits fallback path, never finds `window._endingSystem`
- **Root cause**: `endingSystem` variable is local to the IIFE. `window._endingSystem` is never assigned, unlike `window._engine`, `window._dialogueRenderer`, `window._saveSystem` which are all exposed.
- **Repro**: `window._endingSystem === undefined` in browser console
- **Evidence**: Test code checks `window._endingSystem` first, then falls back to checking `EndingSystem` class and DOM
- **Fix**: Add `window._endingSystem = endingSystem;` after line 67
- **Risk**: Very low — adds a single global reference, no logic change

## P4 — Code Quality

### BUG-005: Duplicate `getChoiceCount()` method in `choice-system.js`
- **File**: `js/choice-system.js`, lines 159-162 and 167-169
- **Symptom**: No runtime error (second definition overwrites first), but indicates copy-paste error
- **Root cause**: Same method defined twice with identical implementation
- **Evidence**: Code inspection — both methods have identical JSDoc and body
- **Fix**: Remove the duplicate definition (lines 163-170 including blank line and JSDoc)
- **Risk**: Very low — removing dead code

## Bug Summary

| ID | Severity | File | Lines | Fix Complexity |
|---|---|---|---|---|
| BUG-001 | P1 (crash) | dialogue-renderer.js | 1 line | Trivial |
| BUG-002 | P2 (compat) | character-system.js | ~15 lines | Mechanical |
| BUG-003 | P3 (data) | main.js | ~5 lines | Simple |
| BUG-004 | P3 (test) | main.js | 1 line | Trivial |
| BUG-005 | P4 (quality) | choice-system.js | -4 lines | Trivial |

**Total: 5 bugs across 4 files, ~20 net line changes**
