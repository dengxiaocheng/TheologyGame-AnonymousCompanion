# Legacy Fix Plan — 无名的同行者 (Anonymous Companion)

## Objective
Fix all bugs found in the current codebase without altering gameplay, story content, or adding features. The game must pass all 27 existing tests after fixes are applied.

## Scope
- Bug fixes only — no new features, no refactoring, no content changes
- Maximum 4 files modified
- Maximum 500 net line changes (additions - deletions)
- Write scope: JS files in `js/` only

## Stop Conditions
1. All P1 and P2 bugs are fixed
2. All 27 Playwright tests pass (`node test.mjs`)
3. No new JS console errors on load or during gameplay
4. Mobile touch interaction still works (375x812 viewport)
5. Save/load roundtrip still works
6. No net line delta exceeds 500

## Execution Order
1. **Worker 1**: Fix P1 crash bug (`dialogue-renderer.js`) + P4 code quality (`choice-system.js`) — 2 files, ~5 line delta
2. **Worker 2**: Fix P2 ES6 compatibility (`character-system.js`) — 1 file, ~15 line delta
3. **Worker 3**: Fix P3 stale globals + missing exposure (`main.js`) — 1 file, ~10 line delta
4. **Validation**: Run full test suite, verify mobile viewport, check save/load

## Files Modified (max 4)
| File | Bugs Fixed | Net Delta |
|---|---|---|
| `js/dialogue-renderer.js` | P1: `self` undefined in `restoreFromHistory` | +1 -1 |
| `js/choice-system.js` | P4: duplicate `getChoiceCount()` method | +0 -4 |
| `js/character-system.js` | P2: ES6 syntax (`const`, `for...of`, `Object.values`) | +15 -15 |
| `js/main.js` | P3: stale globals, missing `_endingSystem` | +10 -2 |

**Total estimated net delta: ~20 lines** (well within 500 limit)

## What We Are NOT Doing
- No story content changes (chapter1-6.js, story-data.js)
- No CSS changes (style.css)
- No HTML changes (index.html)
- No new test files
- No refactoring of working code
- No new features or systems
