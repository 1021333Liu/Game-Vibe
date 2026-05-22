import kaboom from "kaboom";

// 课堂首调参数：玩家移动速度（像素/秒）。改大 = 跑得更快。
const MOVE_SPEED = 140;
const HAZARD_SPEED = 95;

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

  const hazard = add([
    rect(20, 20),
    pos(width() / 2 - 10, height() / 2 - 10),
    area(),
    color(255, 95, 95),
    "hazard",
  ]);
  const hazardVelocity = {
    x: HAZARD_SPEED,
    y: HAZARD_SPEED * 0.72,
  };

  add([
    text("躲红块，去绿块", { size: 12 }),
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

    hazard.move(hazardVelocity.x, hazardVelocity.y);
    if (hazard.pos.x <= 0 || hazard.pos.x + 20 >= width()) {
      hazardVelocity.x *= -1;
    }
    if (hazard.pos.y <= 0 || hazard.pos.y + 20 >= height() - 12) {
      hazardVelocity.y *= -1;
    }
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
