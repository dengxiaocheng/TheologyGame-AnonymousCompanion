# Risk Register — 无名的同行者 Legacy Fix

## Escalation Items (Require Manager Decision)

### RISK-001: Test Coverage Gap for BUG-001
- **Bug**: `restoreFromHistory()` crash (BUG-001)
- **Risk**: The existing test suite does not verify dialogue history restoration after save/load. The fix is trivial (1 word) but we cannot automatically verify it doesn't regress.
- **Impact**: Medium — the bug will crash the game when a player loads a save and the game tries to render previously-seen dialogue
- **Mitigation**: Fix is `self` → `this`, identical to every other method in the same class. Virtually zero chance of regression.
- **Recommendation**: Proceed with fix. Optional: add a test step that saves, loads, then checks for JS errors.

### RISK-002: ES5 Browser Compatibility Untested
- **Bug**: ES6 syntax in character-system.js (BUG-002)
- **Risk**: We have no ES5-only browser in CI. After fixing ES6 syntax, we can only verify by code inspection.
- **Impact**: Low — all modern mobile browsers support ES6. The ES5 requirement is defensive.
- **Mitigation**: Grep verification (`grep -rn 'const \|let \|for.*of \|Object\.values' js/character-system.js`) confirms zero ES6 after fix.
- **Recommendation**: Proceed. The grep check is sufficient.

## Blocking Issues (Would Stop Execution)

None identified. All fixes are self-contained and low-risk.

## Warnings (Non-Blocking)

### WARN-001: Stale Globals Are Cosmetic
- **Bug**: BUG-003 (stale `window.stats` / `window.game.characters`)
- **Note**: The test suite reads these globals but only checks initial values, so the staleness doesn't cause test failures. The fix improves correctness but no test will behave differently.
- **Action**: Fix anyway — it's the right thing to do and costs ~8 lines.

### WARN-002: `for...of` Conversion May Miss Edge Cases
- **Bug**: BUG-002 (ES6 syntax)
- **Note**: Converting `for...of` to indexed `for` loops is mechanical but requires checking whether the loop variable is used inside the loop body. In all 5 cases in character-system.js, the loop variable is used directly, so the conversion is straightforward.
- **Action**: Worker should read the full context around each `for...of` to ensure correct conversion.

### WARN-003: No Integration Test for Full Playthrough
- **Note**: Tests verify system APIs and basic interactions but do not simulate a full 6-chapter playthrough. Some bugs (e.g., specific node transitions, conditional branches) could exist in story content that tests don't cover.
- **Action**: Not in scope for this fix cycle. Note for future work.

## Assumptions

1. The 27 existing tests are the acceptance gate — if they pass, the fix is valid.
2. `node test.mjs` uses Playwright with Chromium headless — no real mobile device testing.
3. Chapter content files (chapter1-6.js, story-data.js) are out of scope and contain no bugs we need to fix.
4. CSS (style.css) and HTML (index.html) are out of scope.
5. The game is single-player, client-side only — no server/network risks.
