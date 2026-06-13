Traumfänger — Young Freud and the Dream Catchers is a single-file, zero-dependency
  Pokémon clone set in Vienna, 1885:

  - The retheme: You play young Freud. Wild dreams roam violet mists instead of tall
  grass; you weaken them in battle and capture them by sketching them into Notebooks
  (Leather Journals are the "great ball" tier). Prof. Brücke gives you one of three
  starters — Wunschling (Desire), Schattenpup (Fear), or Mnemochick (Memory). Berggasse
  19's clinic door heals your party and restocks supplies, with Martha at the desk.
  - The roster: 15 dream species (Anxitoad, Iddra, Superegon, Oedipuff, Egolem,
  Nachtmahr…) across four types in an effectiveness cycle — Desire > Fear > Memory >
  Symbol > Desire — with level-up learnsets of themed moves like Free Association,
  Repressed Urge, Uncanny Stare, and Manifest Content.
  - The story: Three patients (nods to Anna O., the Rat Man, and Frau Cäcilie) need their
  nightmares confronted as boss battles. Helping all three convinces the gatekeeper to
  open the Unconscious Depths, where you face Das Unbewusste at a glowing altar. Beating
  it rolls the ending: 1899, The Interpretation of Dreams is published, psychoanalysis is
  born.
  - Mechanics: classic damage formula with crits, accuracy, and speed-based turn order;
  XP ("insight") with level-ups and move learning; party of 6 with in-battle switching;
  flee/items/capture; blackout respawns you healed at the clinic.

  Per your feedback, everything was verified with scripts and file tools only — no
  interactive commands, no sed. The repo includes test/smoke.js, a headless Node test
  that extracts the game code from the HTML itself and plays through every flow (starter
  selection, a wild battle, the Bertha boss fight with reward checks, gate unlock, the
  final boss to the ending screen, and the losing/blackout path) by feeding keys to the
  real input handler. It passed 20/20 randomized runs, plus 25 earlier runs during
  development. I also saved your no-interactive-commands/no-sed preference to memory so
  it sticks for future sessions.
