# Order Roll Finalizer V2

## Diagnosis

- `.firebaserc` and `firebase-config.js` point to the same Firebase project: `at-thohiriyah-board-game`.
- `firebase.json` points to `database.rules.json`.
- The uploaded rules already contain the member whole-room update clause from the previous rules patch.
- The remaining weak point is in `game.js`: every subscribed browser schedules `finalizeStartingOrderRoll()`, and the old finalizer performs a transaction on the entire room.

## Changes

Only starting-order resolution and frontend cache version were changed.

1. Each starting-order roll stores `orderRoll/activeRollId` and `orderRoll/activeSeat`.
2. Resolution is locked with a transaction only on `orderRoll`, not the entire room.
3. `status`, `currentSeat`, `isRolling`, and `turnOrder` are then applied with a targeted idempotent update.
4. A second browser that loses the transaction can apply the already-locked outcome as recovery.
5. `index.html` loads `game.js?v=order-roll-finalizer-v2` to avoid stale browser cache.

No changes were made to normal roulette, jail, cards, money, properties, Free Parking, presence, room browser, or voice chat.

## Files to replace

- `game.js`
- `index.html`

The existing `database.rules.json` can remain as-is.
