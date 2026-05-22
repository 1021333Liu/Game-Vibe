import kaboom from "kaboom";

// 课堂首调参数：玩家移动速度（像素/秒）。改大 = 跑得更快。
const MOVE_SPEED = 140;

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

scene("game", () => {
  // 底边“墙”，仅占位视觉
  add([
    rect(width(), 12),
    pos(0, height() - 12),
    area(),
    color(55, 58, 72),
    "wall",
  ]);

  const player = add([
    rect(16, 16),
    pos(32, height() / 2 - 8),
    area(),
    color(100, 210, 255),
    "player",
  ]);

  add([
    rect(22, 22),
    pos(width() - 48, height() / 2 - 11),
    area(),
    color(130, 255, 150),
    outline(2, [40, 120, 60]),
    "goal",
  ]);

  // 可选失败：碰到红色障碍即输（保持极简）
  add([
    rect(20, 20),
    pos(width() / 2 - 10, height() / 2 - 10),
    area(),
    color(255, 95, 95),
    "hazard",
  ]);

  add([
    text("WASD / 方向键 → 绿块", { size: 12 }),
    pos(8, 6),
    color(220, 220, 230),
  ]);

  let ended = false;

  player.onCollide("goal", () => {
    if (ended) return;
    ended = true;
    go("win");
  });

  player.onCollide("hazard", () => {
    if (ended) return;
    ended = true;
    go("lose");
  });

  onUpdate(() => {
    if (ended) return;
    const sp = MOVE_SPEED;
    if (isKeyDown("left") || isKeyDown("a")) player.move(-sp, 0);
    if (isKeyDown("right") || isKeyDown("d")) player.move(sp, 0);
    if (isKeyDown("up") || isKeyDown("w")) player.move(0, -sp);
    if (isKeyDown("down") || isKeyDown("s")) player.move(0, sp);
  });
});

scene("win", () => {
  add([
    text("胜利！按 R 重来", { size: 14 }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(255, 255, 200),
  ]);
  onKeyDown("r", () => go("game"));
});

scene("lose", () => {
  add([
    text("碰到红块了，按 R 重来", { size: 14 }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(255, 200, 200),
  ]);
  onKeyDown("r", () => go("game"));
});

go("game");
