// Headless smoke test for Traumfänger.
// Extracts the game script straight from index.html and drives the real
// game logic (handleKey) through every major flow. Run: node test/smoke.js
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const start = html.indexOf('<script>') + '<script>'.length;
const end = html.lastIndexOf('</script>');
if (start < '<script>'.length || end < 0) throw new Error('could not extract <script> from index.html');
const src = html.slice(start, end);

// --- browser stubs ---
const stub = new Proxy(function(){}, {
  get: (t, k) => (k === 'width' ? 10 : stub),
  apply: () => stub,
  set: () => true,
});
global.document = { getElementById: () => ({ getContext: () => stub, width: 640, height: 480 }) };
global.window = { addEventListener: () => {} };
global.requestAnimationFrame = () => {};

const test = `
;(() => {
  const assert = (cond, msg) => { if (!cond) throw new Error('FAIL: ' + msg); };
  const spamZ = (limit, desc) => {
    for (let i = 0; i < limit; i++) {
      if (state !== 'battle') return;
      handleKey('z');
    }
    throw new Error('FAIL: battle never ended (' + desc + ')');
  };

  // map integrity
  assert(map.length === MH && map.every(r => r.length === MW), 'map dimensions');
  assert(isWalkable(player.x, player.y + 1) || isWalkable(player.x + 1, player.y), 'start area walkable');
  for (const n of NPCS) {
    const c = map[n.y][n.x];
    assert(!SOLID[c], 'NPC ' + n.id + ' not inside a solid tile (' + c + ')');
  }
  assert(map[2][17] === 'a' && map[8][17] === 'G', 'altar and gate placed');

  // species / moves consistency
  for (const k in SPECIES) {
    const m = makeMon(k, 12);
    assert(m.stats.maxhp > 0 && m.moves.length >= 1 && m.moves.length <= 4, 'mon ' + k);
    m.moves.forEach(mv => assert(MOVES[mv], 'move ' + mv + ' of ' + k + ' exists'));
    SPECIES[k].moves.forEach(([, mv]) => assert(MOVES[mv], 'learnset move ' + mv + ' of ' + k));
  }

  // title -> intro -> starter flow
  assert(state === 'title', 'starts on title');
  handleKey('enter');
  assert(state === 'dialog', 'intro dialog');
  while (state === 'dialog') handleKey('z');
  talkTo(NPCS.find(n => n.id === 'brucke'));
  while (state === 'dialog') handleKey('z');
  assert(state === 'starter', 'starter screen');
  handleKey('arrowright');
  handleKey('z');
  while (state === 'dialog') handleKey('z');
  assert(party.length === 1 && party[0].sp === 'schattenpup', 'starter chosen');

  // wild battle: spam z = pick first menu option (Analyze) + first move
  party[0] = makeMon('schattenpup', 10);
  startWildBattle('m');
  assert(state === 'battle', 'wild battle started');
  spamZ(3000, 'wild');
  assert(party[0].xp >= 0, 'xp sane');

  // patient boss battle -> flag + reward dialog
  party[0] = makeMon('schattenpup', 20);
  const bertha = NPCS.find(n => n.id === 'bertha');
  const nbBefore = items.notebook;
  startPatientBattle(bertha);
  spamZ(3000, 'bertha');
  while (state === 'dialog') handleKey('z');
  assert(flags.bertha, 'bertha helped');
  assert(items.notebook === nbBefore + 3, 'bertha reward granted');

  // gate logic
  flags.lanzer = true; flags.cacilie = true;
  const guard = NPCS.find(n => n.id === 'guard');
  talkTo(guard);
  while (state === 'dialog') handleKey('z');
  assert(flags.gateOpen && map[8][17] === '.', 'gate opened');
  assert(isWalkable(17, 8), 'gate tile walkable');

  // final boss -> ending
  party[0] = makeMon('schattenpup', 25);
  startFinalBattle();
  spamZ(3000, 'final boss');
  assert(state === 'ending' && flags.boss, 'ending reached');
  handleKey('enter');
  assert(state === 'world', 'back to world after ending');

  // blackout path: weak party loses a depths fight
  party.length = 0;
  party.push(makeMon('reverie', 1));
  startWildBattle('M');
  spamZ(3000, 'blackout');
  while (state === 'dialog') handleKey('z');
  assert(party[0].hp === party[0].stats.maxhp, 'blackout healed party');
  assert(player.x === 14 && player.y === 20, 'blackout respawn at clinic');

  console.log('SMOKE OK — all flows passed');
})();
`;

(0, eval)(src + test);
