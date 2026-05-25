import kaboom from "kaboom";

const MOVE_SPEED = 150;
const ENEMY_SPEED = 85;
const PLAYER_SIZE = 16;
const ENEMY_SIZE = 18;
const DOOR_SIZE = 22;
const BULLET_SIZE = 6;
const BULLET_SPEED = 9000;
const SHOT_COOLDOWN = 0.035;
const BULLET_STEP = 6;
const BULLET_LIFETIME = 4;
const PLAYER_MAX_HEALTH = 3;
const ENTRY_SAFE_TIME = 1;
const PLAYER_INVINCIBLE_TIME = 1.1;
const PLAYER_KNOCKBACK = 26;
const LOW_HEALTH_PULSE_SPEED = 5;
const ROOM_INTRO_DURATION = 1.6;
const ROOM_INTRO_FADE_TIME = 0.55;
const HIT_SPARK_LIFETIME = 0.28;
const BONE_TRACKING_STRENGTH = 18;
const SAND_DRIFT_STRENGTH = 24;
const ENEMY_TRAIL_INTERVAL = 0.16;
const PLAYER_HIT_FLASH_LIFETIME = 0.32;
const ROOM_CUE_LIFETIME = 1.25;
const QUICKSAND_SPEED_SCALE = 0.58;
const FLAME_WARNING_TIME = 1.05;
const FLAME_ACTIVE_TIME = 0.72;
const FLAME_REST_TIME = 2.15;
const BONE_AFTERIMAGE_LIFETIME = 0.9;
const BEST_TIME_KEY = "game-vibe-best-time";

const ROOMS = [
  {
    name: "火焰山",
    enemySprite: "flameDemon",
    background: [48, 28, 24],
    wallColor: [110, 56, 42],
    wallOutline: [48, 24, 20],
    statusColor: [255, 196, 126],
    introColor: [255, 174, 92],
    introSubtitle: "烈焰翻涌，妖影逼近",
    mechanicHint: "机制：注意火焰预警 / P 暂停",
    enemyBehavior: "flameRush",
    enemySpeedScale: 1.12,
    player: { x: 40, y: 160 },
    door: { x: 430, y: 152 },
    flameZones: [
      { x: 150, y: 142, w: 42, h: 36, phase: 0 },
      { x: 248, y: 26, w: 42, h: 38, phase: 1.25 },
      { x: 248, y: 256, w: 42, h: 38, phase: 2.45 },
      { x: 374, y: 112, w: 38, h: 42, phase: 3.1 },
    ],
    walls: [
      { x: 112, y: 0, w: 24, h: 132 },
      { x: 112, y: 212, w: 24, h: 108 },
      { x: 216, y: 64, w: 24, h: 180 },
      { x: 320, y: 0, w: 24, h: 116 },
      { x: 320, y: 196, w: 24, h: 124 },
    ],
    enemies: [
      { x: 140, y: 40, vx: ENEMY_SPEED, vy: ENEMY_SPEED * 0.6 },
      { x: 244, y: 230, vx: -ENEMY_SPEED * 0.8, vy: ENEMY_SPEED },
      { x: 390, y: 58, vx: -ENEMY_SPEED, vy: ENEMY_SPEED * 0.72 },
    ],
  },
  {
    name: "白骨洞",
    enemySprite: "boneDemon",
    background: [28, 28, 40],
    wallColor: [92, 88, 104],
    wallOutline: [44, 42, 54],
    statusColor: [216, 214, 232],
    introColor: [190, 218, 255],
    introSubtitle: "阴风入骨，白影游移",
    mechanicHint: "机制：击破后有骨影 / P 暂停",
    enemyBehavior: "boneTrack",
    enemyAfterimage: "bone",
    player: { x: 42, y: 42 },
    door: { x: 430, y: 272 },
    walls: [
      { x: 72, y: 96, w: 264, h: 24 },
      { x: 144, y: 168, w: 264, h: 24 },
      { x: 72, y: 240, w: 264, h: 24 },
      { x: 360, y: 72, w: 24, h: 192 },
    ],
    enemies: [
      { x: 110, y: 140, vx: ENEMY_SPEED * 1.05, vy: ENEMY_SPEED * 0.82 },
      { x: 238, y: 48, vx: -ENEMY_SPEED, vy: ENEMY_SPEED },
      { x: 405, y: 116, vx: -ENEMY_SPEED * 1.16, vy: -ENEMY_SPEED * 0.72 },
      { x: 190, y: 274, vx: ENEMY_SPEED * 0.86, vy: -ENEMY_SPEED },
    ],
  },
  {
    name: "流沙河",
    enemySprite: "sandDemon",
    background: [38, 34, 28],
    wallColor: [122, 94, 54],
    wallOutline: [58, 43, 24],
    statusColor: [235, 204, 142],
    introColor: [245, 210, 132],
    introSubtitle: "黄沙压境，水路难行",
    mechanicHint: "机制：流沙会减速 / P 暂停",
    enemyBehavior: "sandDrift",
    player: { x: 42, y: 272 },
    door: { x: 430, y: 42 },
    slowZones: [
      { x: 96, y: 18, w: 42, h: 44 },
      { x: 170, y: 222, w: 40, h: 58 },
      { x: 314, y: 118, w: 40, h: 72 },
      { x: 390, y: 194, w: 48, h: 54 },
    ],
    walls: [
      { x: 72, y: 72, w: 24, h: 216 },
      { x: 144, y: 48, w: 24, h: 192 },
      { x: 216, y: 96, w: 24, h: 224 },
      { x: 288, y: 0, w: 24, h: 216 },
      { x: 360, y: 72, w: 24, h: 248 },
    ],
    enemies: [
      { x: 106, y: 42, vx: ENEMY_SPEED, vy: ENEMY_SPEED * 1.12 },
      { x: 178, y: 252, vx: -ENEMY_SPEED * 0.92, vy: -ENEMY_SPEED },
      { x: 250, y: 58, vx: ENEMY_SPEED * 1.14, vy: ENEMY_SPEED * 0.74 },
      { x: 322, y: 238, vx: -ENEMY_SPEED * 1.2, vy: -ENEMY_SPEED * 0.86 },
      { x: 406, y: 154, vx: -ENEMY_SPEED, vy: ENEMY_SPEED },
    ],
  },
];

let activeWalls = [];
let runHealth = PLAYER_MAX_HEALTH;
let runStats = {
  defeats: 0,
  hitsTaken: 0,
  time: 0,
};
let audioContext = null;
let isMuted = false;

const {
  add,
  rect,
  sprite,
  pos,
  area,
  color,
  text,
  anchor,
  outline,
  opacity,
  z,
  onUpdate,
  onKeyDown,
  onKeyPress,
  destroy,
  scene,
  go,
  get,
  dt,
  width,
  height,
  isKeyDown,
  loadSprite,
} = kaboom({
  width: 480,
  height: 320,
  scale: 2,
  crisp: true,
  global: false,
  background: [30, 31, 42],
});

loadSprite("wukong", "/sprites/wukong.svg");
loadSprite("demon", "/sprites/demon.svg");
loadSprite("flameDemon", "/sprites/flame-demon.svg");
loadSprite("boneDemon", "/sprites/bone-demon.svg");
loadSprite("sandDemon", "/sprites/sand-demon.svg");
loadSprite("staff", "/sprites/staff.svg");
loadSprite("portal", "/sprites/portal.svg");

function getAudioContext() {
  if (audioContext) return audioContext;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
    return audioContext;
  } catch {
    return null;
  }
}

function playTone(frequency, duration = 0.06, volume = 0.025, type = "square") {
  if (isMuted) return;
  try {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startTime = context.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  } catch {
    // Audio feedback is optional; gameplay should never fail if audio is blocked.
  }
}

function playToneSequence(notes) {
  if (isMuted) return;
  try {
    notes.forEach((note, index) => {
      window.setTimeout(() => playTone(note.frequency, note.duration, note.volume, note.type), index * 70);
    });
  } catch {
    // Ignore unavailable timer/audio environments.
  }
}

function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.w
    && a.x + a.w > b.x
    && a.y < b.y + b.h
    && a.y + a.h > b.y
  );
}

function bulletOverlapsTarget(bullet, target, targetSize) {
  return rectsOverlap(
    { x: bullet.pos.x, y: bullet.pos.y, w: bullet.hitSize.w, h: bullet.hitSize.h },
    { x: target.pos.x, y: target.pos.y, w: targetSize, h: targetSize },
  );
}

function wallContainsBullet(bullet) {
  return activeWalls.some((wall) => rectsOverlap(
    { x: bullet.pos.x, y: bullet.pos.y, w: bullet.hitSize.w, h: bullet.hitSize.h },
    wall,
  ));
}

function limitVelocity(velocity, maxSpeed) {
  const speed = Math.hypot(velocity.x, velocity.y);
  if (speed <= maxSpeed || speed === 0) return;
  velocity.x = (velocity.x / speed) * maxSpeed;
  velocity.y = (velocity.y / speed) * maxSpeed;
}

function moveOnAxis(body, dx, dy, bodySize) {
  return moveByAmount(body, dx * dt(), dy * dt(), bodySize);
}

function moveByAmount(body, amountX, amountY, bodySize) {
  const nextX = Math.max(0, Math.min(body.pos.x + amountX, width() - bodySize));
  const nextY = Math.max(0, Math.min(body.pos.y + amountY, height() - bodySize));
  const nextRect = { x: nextX, y: nextY, w: bodySize, h: bodySize };
  if (activeWalls.some((wall) => rectsOverlap(nextRect, wall))) {
    return true;
  }
  body.pos.x = nextX;
  body.pos.y = nextY;
  return false;
}

function addMonkeyHero(x, y) {
  return add([
    sprite("wukong", { width: PLAYER_SIZE, height: PLAYER_SIZE }),
    pos(x, y),
    area(),
    opacity(1),
    "player",
  ]);
}

function addDemonEnemy(x, y, spriteName) {
  return add([
    sprite(spriteName, { width: ENEMY_SIZE, height: ENEMY_SIZE }),
    pos(x, y),
    area(),
    "enemy",
  ]);
}

function addStaffBullet(x, y, dirX, dirY) {
  const horizontal = dirX !== 0;
  const body = add([
    sprite("staff", {
      width: horizontal ? 16 : 6,
      height: horizontal ? 6 : 16,
      flipX: dirX < 0,
      flipY: dirY < 0,
    }),
    pos(x, y),
    area(),
    "bullet",
  ]);
  body.velocity = { x: dirX * BULLET_SPEED, y: dirY * BULLET_SPEED };
  body.life = 0;
  body.hitSize = horizontal ? { w: 16, h: 6 } : { w: 6, h: 16 };
  return body;
}

function addHitSpark(x, y, velocity, sparkColor, size = 4) {
  const spark = add([
    rect(size, size),
    pos(x - size / 2, y - size / 2),
    color(...sparkColor),
    opacity(1),
    "hitSpark",
  ]);
  spark.velocity = velocity;
  spark.life = 0;
  spark.maxLife = HIT_SPARK_LIFETIME;
  return spark;
}

function addHitBurst(x, y, sparkColor) {
  addHitSpark(x, y, { x: 0, y: 0 }, [255, 248, 205], 12);
  [
    { x: 68, y: 0 },
    { x: -68, y: 0 },
    { x: 0, y: 68 },
    { x: 0, y: -68 },
    { x: 48, y: 48 },
    { x: -48, y: -48 },
  ].forEach((velocity) => addHitSpark(x, y, velocity, sparkColor));
}

function addEnemyMotionCue(enemy, room) {
  const centerX = enemy.body.pos.x + ENEMY_SIZE / 2;
  const centerY = enemy.body.pos.y + ENEMY_SIZE / 2;
  if (room.enemyBehavior === "flameRush") {
    addHitSpark(centerX - enemy.velocity.x * 0.035, centerY - enemy.velocity.y * 0.035, { x: 0, y: -8 }, [255, 116, 58], 5);
    return;
  }
  if (room.enemyBehavior === "boneTrack") {
    addHitSpark(centerX, centerY - 11, { x: 0, y: -16 }, [166, 218, 255], 3);
    return;
  }
  if (room.enemyBehavior === "sandDrift") {
    addHitSpark(centerX - 9, centerY + Math.sin(enemy.phase) * 4, { x: -18, y: 4 }, [210, 176, 104], 4);
    addHitSpark(centerX + 9, centerY - Math.sin(enemy.phase) * 4, { x: 18, y: -4 }, [236, 204, 130], 3);
  }
}

function addBoneAfterimage(x, y) {
  const ghost = add([
    sprite("boneDemon", { width: ENEMY_SIZE, height: ENEMY_SIZE }),
    pos(x, y),
    opacity(0.44),
    "boneAfterimage",
  ]);
  ghost.life = 0;
  ghost.maxLife = BONE_AFTERIMAGE_LIFETIME;
}

function addScreenFlash(flashColor, maxLife) {
  const flash = add([
    rect(width(), height()),
    pos(0, 0),
    color(...flashColor),
    opacity(0.28),
    "screenFlash",
  ]);
  flash.life = 0;
  flash.maxLife = maxLife;
}

function addRoomCue(cueText, x, y, cueColor, maxLife = ROOM_CUE_LIFETIME) {
  const cue = add([
    text(cueText, { size: 12 }),
    pos(x, y),
    anchor("center"),
    color(...cueColor),
    opacity(1),
    "roomCue",
  ]);
  cue.life = 0;
  cue.maxLife = maxLife;
}

function fadeAndDestroy(entity, startOpacity) {
  entity.life += dt();
  entity.opacity = Math.max(0, startOpacity * (1 - entity.life / entity.maxLife));
  if (entity.life >= entity.maxLife) {
    destroy(entity);
  }
}

function getHealthLabel(health) {
  return `${"心".repeat(health)}${"空".repeat(PLAYER_MAX_HEALTH - health)}`;
}

function resetRunStats() {
  runStats = {
    defeats: 0,
    hitsTaken: 0,
    time: 0,
  };
}

function formatRunTime(seconds) {
  return `${Math.floor(seconds)} 秒`;
}

function readBestTime() {
  try {
    const saved = window.localStorage?.getItem(BEST_TIME_KEY);
    const parsed = Number(saved);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function saveBestTime(seconds) {
  try {
    window.localStorage?.setItem(BEST_TIME_KEY, String(seconds));
  } catch {
    // Best-time storage is optional; gameplay should continue if blocked.
  }
}

function updateBestTime(seconds) {
  const bestTime = readBestTime();
  if (bestTime === null || seconds < bestTime) {
    saveBestTime(seconds);
    return { bestTime: seconds, isNewBest: true };
  }
  return { bestTime, isNewBest: false };
}

scene("game", (roomIndex = 0, shouldResetRun = false) => {
  const room = ROOMS[roomIndex];
  activeWalls = room.walls;
  if (shouldResetRun) {
    resetRunStats();
    runHealth = PLAYER_MAX_HEALTH;
  }

  add([
    rect(width(), height()),
    pos(0, 0),
    color(...room.background),
  ]);

  room.walls.forEach((wall) => {
    add([
      rect(wall.w, wall.h),
      pos(wall.x, wall.y),
      area(),
      color(...room.wallColor),
      outline(2, room.wallOutline),
      "wall",
    ]);
  });

  (room.slowZones ?? []).forEach((zone) => {
    add([
      rect(zone.w, zone.h),
      pos(zone.x, zone.y),
      color(166, 130, 72),
      opacity(0.46),
      outline(1, [226, 192, 112]),
      "slowZone",
    ]);
  });

  const flameHazards = (room.flameZones ?? []).map((zone) => {
    const warningMarker = add([
      rect(zone.w, zone.h),
      pos(zone.x, zone.y),
      color(255, 210, 92),
      opacity(0),
      outline(1, [255, 116, 58]),
      "flameHazard",
    ]);
    const fireMarker = add([
      rect(zone.w, zone.h),
      pos(zone.x, zone.y),
      color(255, 84, 40),
      opacity(0),
      outline(1, [255, 210, 92]),
      "flameHazard",
    ]);
    return {
      ...zone,
      warningMarker,
      fireMarker,
      timer: zone.phase,
      active: false,
    };
  });

  const player = addMonkeyHero(room.player.x, room.player.y);

  const speedScale = room.enemySpeedScale ?? 1;
  const enemies = room.enemies.map((enemyConfig) => ({
    body: addDemonEnemy(enemyConfig.x, enemyConfig.y, room.enemySprite),
    velocity: {
      x: enemyConfig.vx * speedScale,
      y: enemyConfig.vy * speedScale,
    },
    phase: (enemyConfig.x + enemyConfig.y) * 0.03,
    trailTimer: (enemyConfig.x % 3) * 0.04,
  }));

  add([
    text(`${room.name} ${roomIndex + 1} / ${ROOMS.length}：方向键射击，清敌开门`, { size: 13 }),
    pos(10, 8),
    color(230, 230, 238),
  ]);

  const statusText = add([
    text(`生命 ${getHealthLabel(runHealth)} / 敌人 ${enemies.length} / 门未开启`, { size: 12 }),
    pos(10, 26),
    color(...room.statusColor),
  ]);

  add([
    text(room.mechanicHint, { size: 10 }),
    pos(10, 44),
    color(214, 210, 198),
  ]);

  const muteText = add([
    text("", { size: 10 }),
    pos(width() - 10, 44),
    anchor("topright"),
    color(214, 210, 198),
  ]);

  const feedbackText = add([
    text("入场安全", { size: 12 }),
    pos(10, 58),
    color(255, 220, 160),
  ]);

  const lowHealthOverlay = add([
    rect(width(), height()),
    pos(0, 0),
    color(88, 8, 16),
    opacity(0),
  ]);

  const lowHealthText = add([
    text("危险：生命仅剩 1", { size: 11 }),
    pos(width() - 10, 26),
    anchor("topright"),
    color(255, 150, 140),
    opacity(0),
  ]);

  const roomIntroTitle = add([
    text(room.name, { size: 24 }),
    pos(width() / 2, 78),
    anchor("center"),
    color(...room.introColor),
    opacity(1),
  ]);

  const roomIntroSubtitle = add([
    text(room.introSubtitle, { size: 12 }),
    pos(width() / 2, 106),
    anchor("center"),
    color(238, 232, 218),
    opacity(1),
  ]);

  const pauseOverlay = add([
    rect(width(), height()),
    pos(0, 0),
    color(8, 9, 14),
    opacity(0),
    z(1000),
  ]);

  const pauseTitle = add([
    text("暂停", { size: 22 }),
    pos(width() / 2, 108),
    anchor("center"),
    color(255, 235, 190),
    opacity(0),
    z(1001),
  ]);

  const pauseHelp = add([
    text("WASD 移动 / 方向键射击\nP 继续 / R 重开本局 / M 静音", { size: 12 }),
    pos(width() / 2, 150),
    anchor("center"),
    color(230, 230, 238),
    opacity(0),
    z(1001),
  ]);

  let ended = false;
  let paused = false;
  let shotTimer = 0;
  let entrySafeTimer = ENTRY_SAFE_TIME;
  let invincibleTimer = 0;
  let feedbackTimer = 0;
  let lowHealthPulseTimer = 0;
  let roomIntroTimer = ROOM_INTRO_DURATION;
  let door = null;
  let enemiesLeft = enemies.length;

  function updateStatusText() {
    const doorStatus = door ? "门已开启" : "门未开启";
    statusText.text = `生命 ${getHealthLabel(runHealth)} / 敌人 ${enemiesLeft} / ${doorStatus}`;
  }

  function updateMuteText() {
    muteText.text = isMuted ? "M 音效开" : "M 静音";
  }

  function updatePauseOverlay() {
    pauseOverlay.opacity = paused ? 0.62 : 0;
    pauseTitle.opacity = paused ? 1 : 0;
    pauseHelp.opacity = paused ? 1 : 0;
  }

  updateMuteText();

  function openDoorIfReady() {
    if (door || enemiesLeft > 0) return;
    door = add([
      sprite("portal", { width: DOOR_SIZE, height: DOOR_SIZE }),
      pos(room.door.x, room.door.y),
      area(),
      "door",
    ]);
    feedbackText.text = "传送门已开启";
    feedbackTimer = 1.2;
    addRoomCue("门已开启，去传送门", room.door.x + DOOR_SIZE / 2, Math.max(58, room.door.y - 14), [120, 255, 150]);
    addHitBurst(room.door.x + DOOR_SIZE / 2, room.door.y + DOOR_SIZE / 2, [118, 255, 142]);
    playTone(660, 0.12, 0.022, "triangle");
    updateStatusText();
  }

  function shoot(dirX, dirY) {
    if (ended || shotTimer > 0) return;
    shotTimer = SHOT_COOLDOWN;
    playTone(520, 0.035, 0.018, "square");
    addStaffBullet(
      player.pos.x + PLAYER_SIZE / 2 - BULLET_SIZE / 2,
      player.pos.y + PLAYER_SIZE / 2 - BULLET_SIZE / 2,
      dirX,
      dirY,
    );
  }

  function hurtPlayer(sourceX, sourceY, message = "-1 生命") {
    if (ended || paused || entrySafeTimer > 0 || invincibleTimer > 0) return false;

    runHealth -= 1;
    runStats.hitsTaken += 1;
    updateStatusText();
    addScreenFlash([190, 32, 32], PLAYER_HIT_FLASH_LIFETIME);
    addRoomCue(message, player.pos.x + PLAYER_SIZE / 2, Math.max(56, player.pos.y - 12), [255, 168, 150], 0.75);
    playTone(150, 0.13, 0.03, "sawtooth");

    const playerCenter = {
      x: player.pos.x + PLAYER_SIZE / 2,
      y: player.pos.y + PLAYER_SIZE / 2,
    };
    const awayX = playerCenter.x - sourceX;
    const awayY = playerCenter.y - sourceY;
    const length = Math.max(1, Math.hypot(awayX, awayY));
    moveByAmount(player, (awayX / length) * PLAYER_KNOCKBACK, 0, PLAYER_SIZE);
    moveByAmount(player, 0, (awayY / length) * PLAYER_KNOCKBACK, PLAYER_SIZE);

    if (runHealth <= 0) {
      ended = true;
      go("lose", roomIndex);
      return true;
    }

    invincibleTimer = PLAYER_INVINCIBLE_TIME;
    feedbackText.text = "受击！短暂无敌";
    feedbackTimer = PLAYER_INVINCIBLE_TIME;
    return true;
  }

  player.onCollide("enemy", (enemy) => {
    if (ended || paused || invincibleTimer > 0) return;
    const enemyCenter = {
      x: enemy.pos.x + ENEMY_SIZE / 2,
      y: enemy.pos.y + ENEMY_SIZE / 2,
    };
    hurtPlayer(enemyCenter.x, enemyCenter.y);
  });

  player.onCollide("door", () => {
    if (ended || paused) return;
    ended = true;
    if (roomIndex + 1 >= ROOMS.length) {
      go("complete");
      return;
    }
    go("game", roomIndex + 1, false);
  });

  onKeyPress("p", () => {
    if (ended) return;
    paused = !paused;
    updatePauseOverlay();
  });

  onKeyPress("m", () => {
    isMuted = !isMuted;
    updateMuteText();
  });

  onKeyPress("r", () => {
    if (ended) return;
    go("game", roomIndex, true);
  });

  onUpdate(() => {
    if (ended) return;
    if (paused) return;
    shotTimer = Math.max(0, shotTimer - dt());
    entrySafeTimer = Math.max(0, entrySafeTimer - dt());
    invincibleTimer = Math.max(0, invincibleTimer - dt());
    feedbackTimer = Math.max(0, feedbackTimer - dt());
    lowHealthPulseTimer += dt();
    roomIntroTimer = Math.max(0, roomIntroTimer - dt());
    runStats.time += dt();
    const introAlpha = Math.min(1, roomIntroTimer / ROOM_INTRO_FADE_TIME);
    roomIntroTitle.opacity = introAlpha;
    roomIntroSubtitle.opacity = introAlpha;
    if (entrySafeTimer > 0) {
      feedbackText.text = "入场安全";
    } else if (feedbackTimer <= 0) {
      feedbackText.text = "";
    }
    if (entrySafeTimer > 0) {
      player.opacity = Math.floor(entrySafeTimer * 12) % 2 === 0 ? 0.58 : 1;
    } else if (invincibleTimer > 0) {
      player.opacity = Math.floor(invincibleTimer * 12) % 2 === 0 ? 0.45 : 1;
    } else {
      player.opacity = 1;
    }

    if (runHealth === 1) {
      const pulse = (Math.sin(lowHealthPulseTimer * LOW_HEALTH_PULSE_SPEED) + 1) / 2;
      lowHealthOverlay.opacity = 0.04 + pulse * 0.035;
      lowHealthText.opacity = 0.62 + pulse * 0.38;
    } else {
      lowHealthOverlay.opacity = 0;
      lowHealthText.opacity = 0;
    }

    get("hitSpark").forEach((spark) => {
      spark.move(spark.velocity.x * dt(), spark.velocity.y * dt());
      fadeAndDestroy(spark, 1);
    });

    get("screenFlash").forEach((flash) => {
      fadeAndDestroy(flash, 0.28);
    });

    get("roomCue").forEach((cue) => {
      cue.pos.y -= 12 * dt();
      fadeAndDestroy(cue, 1);
    });

    get("boneAfterimage").forEach((ghost) => {
      fadeAndDestroy(ghost, 0.44);
    });

    if (isKeyDown("left")) shoot(-1, 0);
    if (isKeyDown("right")) shoot(1, 0);
    if (isKeyDown("up")) shoot(0, -1);
    if (isKeyDown("down")) shoot(0, 1);

    const playerRect = { x: player.pos.x, y: player.pos.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
    flameHazards.forEach((hazard) => {
      const cycleLength = FLAME_WARNING_TIME + FLAME_ACTIVE_TIME + FLAME_REST_TIME;
      hazard.timer = (hazard.timer + dt()) % cycleLength;
      hazard.active = hazard.timer >= FLAME_WARNING_TIME && hazard.timer < FLAME_WARNING_TIME + FLAME_ACTIVE_TIME;
      if (hazard.timer < FLAME_WARNING_TIME) {
        hazard.warningMarker.opacity = 0.18 + Math.floor(hazard.timer * 8) % 2 * 0.18;
        hazard.fireMarker.opacity = 0;
      } else if (hazard.active) {
        hazard.warningMarker.opacity = 0;
        hazard.fireMarker.opacity = 0.64;
        if (rectsOverlap(playerRect, hazard)) {
          hurtPlayer(hazard.x + hazard.w / 2, hazard.y + hazard.h / 2, "灼伤 -1");
        }
      } else {
        hazard.warningMarker.opacity = 0;
        hazard.fireMarker.opacity = 0;
      }
    });
    if (ended) return;

    const inSlowZone = (room.slowZones ?? []).some((zone) => rectsOverlap(playerRect, zone));
    const sp = inSlowZone ? MOVE_SPEED * QUICKSAND_SPEED_SCALE : MOVE_SPEED;
    let dx = 0;
    let dy = 0;
    if (isKeyDown("a")) dx -= sp;
    if (isKeyDown("d")) dx += sp;
    if (isKeyDown("w")) dy -= sp;
    if (isKeyDown("s")) dy += sp;
    if (dx !== 0) moveOnAxis(player, dx, 0, PLAYER_SIZE);
    if (dy !== 0) moveOnAxis(player, 0, dy, PLAYER_SIZE);

    enemies.forEach((enemy) => {
      if (!enemy.body.exists()) return;
      enemy.trailTimer = Math.max(0, enemy.trailTimer - dt());
      let moveX = enemy.velocity.x;
      let moveY = enemy.velocity.y;

      if (room.enemyBehavior === "boneTrack") {
        const targetX = player.pos.x - enemy.body.pos.x;
        const targetY = player.pos.y - enemy.body.pos.y;
        const distance = Math.max(1, Math.hypot(targetX, targetY));
        enemy.velocity.x += (targetX / distance) * BONE_TRACKING_STRENGTH * dt();
        enemy.velocity.y += (targetY / distance) * BONE_TRACKING_STRENGTH * dt();
        limitVelocity(enemy.velocity, ENEMY_SPEED * 1.18);
        moveX = enemy.velocity.x;
        moveY = enemy.velocity.y;
      }

      if (room.enemyBehavior === "sandDrift") {
        enemy.phase += dt() * 2.1;
        moveX += Math.sin(enemy.phase) * SAND_DRIFT_STRENGTH;
        moveY += Math.cos(enemy.phase * 0.8) * SAND_DRIFT_STRENGTH;
      }

      const hitX = moveOnAxis(enemy.body, moveX, 0, ENEMY_SIZE);
      const hitY = moveOnAxis(enemy.body, 0, moveY, ENEMY_SIZE);
      if (hitX || enemy.body.pos.x <= 0 || enemy.body.pos.x + ENEMY_SIZE >= width()) {
        enemy.velocity.x *= -1;
      }
      if (hitY || enemy.body.pos.y <= 0 || enemy.body.pos.y + ENEMY_SIZE >= height()) {
        enemy.velocity.y *= -1;
      }
      if (enemy.trailTimer <= 0) {
        addEnemyMotionCue(enemy, room);
        enemy.trailTimer = ENEMY_TRAIL_INTERVAL;
      }
    });

    get("bullet").forEach((bullet) => {
      const distance = Math.hypot(bullet.velocity.x, bullet.velocity.y) * dt();
      const steps = Math.max(1, Math.ceil(distance / BULLET_STEP));
      const stepX = bullet.velocity.x * dt() / steps;
      const stepY = bullet.velocity.y * dt() / steps;

      for (let i = 0; i < steps; i += 1) {
        if (!bullet.exists()) break;
        bullet.move(stepX, stepY);

        const enemy = get("enemy").find((enemyBody) => bulletOverlapsTarget(bullet, enemyBody, ENEMY_SIZE));
        if (enemy) {
          addHitBurst(enemy.pos.x + ENEMY_SIZE / 2, enemy.pos.y + ENEMY_SIZE / 2, room.introColor);
          if (room.enemyAfterimage === "bone") {
            addBoneAfterimage(enemy.pos.x, enemy.pos.y);
          }
          enemiesLeft -= 1;
          runStats.defeats += 1;
          playTone(760, 0.055, 0.024, "triangle");
          destroy(enemy);
          destroy(bullet);
          feedbackText.text = "妖怪已击破";
          feedbackTimer = 0.45;
          updateStatusText();
          openDoorIfReady();
          break;
        }

        bullet.life += dt() / steps;
        if (
          bullet.life >= BULLET_LIFETIME
          || wallContainsBullet(bullet)
          || bullet.pos.x < -BULLET_SIZE
          || bullet.pos.x > width()
          || bullet.pos.y < -BULLET_SIZE
          || bullet.pos.y > height()
        ) {
          destroy(bullet);
          break;
        }
      }
    });
  });
});

function addResultScreen({ title, subtitle, hint, accentColor, backgroundColor }) {
  add([
    rect(width(), height()),
    pos(0, 0),
    color(...backgroundColor),
  ]);
  add([
    rect(330, 130),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(24, 25, 34),
    outline(3, accentColor),
  ]);
  add([
    text(title, { size: 22 }),
    pos(width() / 2, 112),
    anchor("center"),
    color(...accentColor),
  ]);
  add([
    text(subtitle, { size: 12 }),
    pos(width() / 2, 146),
    anchor("center"),
    color(230, 230, 238),
  ]);
  add([
    text(hint, { size: 12 }),
    pos(width() / 2, 178),
    anchor("center"),
    color(255, 235, 190),
  ]);
}

scene("complete", () => {
  const bestResult = updateBestTime(runStats.time);
  const bestLabel = bestResult.bestTime === null ? "暂无记录" : formatRunTime(bestResult.bestTime);
  const bestPrefix = bestResult.isNewBest ? "新最快" : "最快";
  playToneSequence([
    { frequency: 520, duration: 0.08, volume: 0.022, type: "triangle" },
    { frequency: 660, duration: 0.08, volume: 0.022, type: "triangle" },
    { frequency: 880, duration: 0.12, volume: 0.024, type: "triangle" },
  ]);
  addResultScreen({
    title: "三关已净",
    subtitle: "火焰山、白骨洞、流沙河都被清理完成",
    hint: "按 R 开始新一轮取经",
    accentColor: [255, 232, 150],
    backgroundColor: [32, 38, 30],
  });
  add([
    text("传送门光芒稳定，妖气暂退。", { size: 11 }),
    pos(width() / 2, 216),
    anchor("center"),
    color(190, 216, 190),
  ]);
  add([
    text(`用时 ${formatRunTime(runStats.time)} / 击败 ${runStats.defeats} / 受伤 ${runStats.hitsTaken}`, { size: 11 }),
    pos(width() / 2, 232),
    anchor("center"),
    color(230, 226, 194),
  ]);
  add([
    text(`${bestPrefix} ${bestLabel}`, { size: 11 }),
    pos(width() / 2, 250),
    anchor("center"),
    color(255, 232, 150),
  ]);
  onKeyDown("r", () => go("game", 0, true));
});

scene("lose", (roomIndex = 0) => {
  const roomName = ROOMS[roomIndex]?.name ?? "当前房间";
  addResultScreen({
    title: "取经受阻",
    subtitle: `${roomName} 的妖气仍未散尽`,
    hint: "按 R 满血重试本房间",
    accentColor: [255, 156, 132],
    backgroundColor: [44, 30, 34],
  });
  add([
    text(`当前进度：第 ${roomIndex + 1} / ${ROOMS.length} 间`, { size: 11 }),
    pos(width() / 2, 210),
    anchor("center"),
    color(236, 204, 198),
  ]);
  add([
    text(`用时 ${formatRunTime(runStats.time)} / 击败 ${runStats.defeats} / 受伤 ${runStats.hitsTaken}`, { size: 11 }),
    pos(width() / 2, 230),
    anchor("center"),
    color(228, 214, 206),
  ]);
  onKeyDown("r", () => go("game", roomIndex, true));
});

go("game", 0, true);
