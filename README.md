# Traumfänger — Young Freud and the Dream Catchers

A Pokémon-style adventure in a single HTML file. Vienna, 1885: young Sigmund
Freud collects wild dreams, conquers patients' nightmares, and descends into
the Unconscious Depths to invent psychoanalysis.

## Run it

No build, no dependencies — open the file in any browser:

```bash
xdg-open index.html        # or just double-click it
```

## Dream Codex

A companion reference page, **`dream-codex.html`**, shows all 15 dreams with
their pixel art, name, type, and description. The title screen links to it.
Both the game and the codex read their species and sprite data from the shared
**`dreams.js`** — the single source of truth — so they never drift apart.

## Controls

| Key | Action |
|-----|--------|
| Arrows / WASD | Move |
| Z / Enter | Talk, confirm, advance text |
| X | Open Dream Journal / back out of battle menus |

On phones and tablets the game shows an on-screen Gameboy-style pad — a
D-pad on the left and **Z** / **X** buttons on the right (same actions as the
keys above). It appears automatically on touch devices; add `?pad=1` to the
URL to force it on for testing on a desktop.

## How to play

1. Talk to **Prof. Brücke** in the plaza to pick a starter dream
   (Wunschling / Schattenpup / Mnemochick).
2. Walk into **violet mists** to encounter wild dreams. Weaken them, then
   capture them with a **Notebook** (or a Leather Journal for better odds)
   from the Satchel menu in battle.
3. Help the three patients — **Bertha** by the clinic, **Herr Lanzer** in the
   eastern woods, **Frau Cäcilie** in the west park — by defeating their
   nightmares.
4. Step on the clinic door (**Berggasse 19**) any time to heal your party and
   restock supplies.
5. With all three patients helped, the gatekeeper opens the north gate to the
   **Unconscious Depths**. Reach the glowing altar and face **Das Unbewusste**.

## Mechanics

- Four dream types in a cycle: **DESIRE > FEAR > MEMORY > SYMBOL > DESIRE**
  (1.5× / 0.67× effectiveness).
- 15 dream species with level-up learnsets, classic damage formula, crits,
  accuracy, speed-based turn order, switching, and insight (XP) with level-ups.
- Party of up to 6; losing all dreams returns you to the clinic, fully healed.

## Testing

A headless smoke test extracts the game script from `index.html` and drives
the real game logic (starter flow, wild battle, boss fight, gate unlock,
final boss, blackout/respawn) through `handleKey`:

```bash
node test/smoke.js
```
