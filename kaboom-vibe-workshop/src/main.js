import kaboom from "kaboom";

// 课堂首调参数：玩家移动速度（像素/秒）。改大 = 跑得更快。
const MOVE_SPEED = 140;
const HAZARD_SPEED = 95;
const PLAYER_SIZE = 16;
const HAZARD_SIZE = 18;
const FLOOR_HEIGHT = 12;
const LEVELS = [
  {
    player: { x: 32, y: 92 },
    goal: { x: 272, y: 89 },
    hazards: [
      { x: 148, y: 36, vx: HAZARD_SPEED, vy: HAZARD_SPEED * 0.72 },
      { x: 126, y: 130, vx: -HAZARD_SPEED * 0.84, vy: HAZARD_SPEED * 0.92 },
    ],
  },
  {
    player: { x: 28, y: 152 },
    goal: { x: 270, y: 34 },
    hazards: [
      { x: 86, y: 54, vx: HAZARD_SPEED * 1.1, vy: HAZARD_SPEED * 0.62 },
      { x: 164, y: 132, vx: -HAZARD_SPEED * 0.92, vy: HAZARD_SPEED },
      { x: 228, y: 84, vx: -HAZARD_SPEED * 1.18, vy: -HAZARD_SPEED * 0.76 },
    ],
  },
  {
    player: { x: 30, y: 34 },
    goal: { x: 270, y: 148 },
    hazards: [
      { x: 82, y: 92, vx: HAZARD_SPEED * 1.18, vy: HAZARD_SPEED * 0.88 },
      { x: 132, y: 32, vx: -HAZARD_SPEED, vy: HAZARD_SPEED * 1.05 },
      { x: 210, y: 130, vx: HAZARD_SPEED * 0.92, vy: -HAZARD_SPEED * 1.16 },
      { x: 246, y: 58, vx: -HAZARD_SPEED * 1.26, vy: -HAZARD_SPEED * 0.74 },
    ],
  },
];

const {
  add,
  rect,
  pos,
  area,
  color,
  text,
  anchor,
  outline,
  onUpdate,
  onKeyDown,
  scene,
  go,
  width,
  height,
  isKeyDown,
} = kaboom({
  width: 320,
  height: 200,
  scale: 3,
  crisp: true,
  global: false,
  background: [34, 36, 48],
});

scene("game", (levelIndex = 0) => {
  const level = LEVELS[levelIndex];

  // 底边“墙”，仅占位视觉
  add([
    rect(width(), FLOOR_HEIGHT),
    pos(0, height() - FLOOR_HEIGHT),
    area(),
    color(55, 58, 72),
    "wall",
  ]);

  const player = add([
    rect(PLAYER_SIZE, PLAYER_SIZE),
    pos(level.player.x, level.player.y),
    area(),
    color(100, 210, 255),
    "player",
  ]);

  add([
    rect(22, 22),
    pos(level.goal.x, level.goal.y),
    area(),
    color(130, 255, 150),
    outline(2, [40, 120, 60]),
    "goal",
  ]);

  const hazards = level.hazards.map((hazardConfig) => ({
    body: add([
      rect(HAZARD_SIZE, HAZARD_SIZE),
      pos(hazardConfig.x, hazardConfig.y),
      area(),
      color(255, 95, 95),
      "hazard",
    ]),
    velocity: {
      x: hazardConfig.vx,
      y: hazardConfig.vy,
    },
  }));

  add([
    text(`第 ${levelIndex + 1} / ${LEVELS.length} 关：躲红块，去绿块`, { size: 12 }),
    pos(8, 6),
    color(220, 220, 230),
  ]);

  let ended = false;

  player.onCollide("goal", () => {
    if (ended) return;
    ended = true;
    if (levelIndex + 1 >= LEVELS.length) {
      go("complete");
      return;
    }
    go("game", levelIndex + 1);
  });

  player.onCollide("hazard", () => {
    if (ended) return;
    ended = true;
    go("lose", levelIndex);
  });

  onUpdate(() => {
    if (ended) return;
    const sp = MOVE_SPEED;
    if (isKeyDown("left") || isKeyDown("a")) player.move(-sp, 0);
    if (isKeyDown("right") || isKeyDown("d")) player.move(sp, 0);
    if (isKeyDown("up") || isKeyDown("w")) player.move(0, -sp);
    if (isKeyDown("down") || isKeyDown("s")) player.move(0, sp);

    player.pos.x = Math.max(0, Math.min(player.pos.x, width() - PLAYER_SIZE));
    player.pos.y = Math.max(0, Math.min(player.pos.y, height() - FLOOR_HEIGHT - PLAYER_SIZE));

    hazards.forEach((hazard) => {
      hazard.body.move(hazard.velocity.x, hazard.velocity.y);
      if (hazard.body.pos.x <= 0 || hazard.body.pos.x + HAZARD_SIZE >= width()) {
        hazard.velocity.x *= -1;
      }
      if (hazard.body.pos.y <= 0 || hazard.body.pos.y + HAZARD_SIZE >= height() - FLOOR_HEIGHT) {
        hazard.velocity.y *= -1;
      }
    });
  });
});

scene("complete", () => {
  add([
    text("全部通关！按 R 再玩", { size: 14 }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(255, 255, 200),
  ]);
  onKeyDown("r", () => go("game", 0));
});

scene("lose", (levelIndex = 0) => {
  add([
    text("碰到红块了，按 R 重试本关", { size: 14 }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(255, 200, 200),
  ]);
  onKeyDown("r", () => go("game", levelIndex));
});

go("game", 0);
