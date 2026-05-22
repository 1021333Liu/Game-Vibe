import kaboom from "kaboom";

const MOVE_SPEED = 150;
const ENEMY_SPEED = 85;
const PLAYER_SIZE = 16;
const ENEMY_SIZE = 18;
const DOOR_SIZE = 22;
const BULLET_SIZE = 6;
const BULLET_SPEED = 280;
const SHOT_COOLDOWN = 0.22;

const ROOMS = [
  {
    player: { x: 40, y: 160 },
    door: { x: 430, y: 152 },
    walls: [
      { x: 96, y: 72, w: 24, h: 168 },
      { x: 192, y: 0, w: 24, h: 144 },
      { x: 192, y: 216, w: 24, h: 104 },
      { x: 288, y: 72, w: 24, h: 168 },
      { x: 360, y: 120, w: 24, h: 96 },
    ],
    enemies: [
      { x: 140, y: 40, vx: ENEMY_SPEED, vy: ENEMY_SPEED * 0.6 },
      { x: 244, y: 230, vx: -ENEMY_SPEED * 0.8, vy: ENEMY_SPEED },
      { x: 390, y: 58, vx: -ENEMY_SPEED, vy: ENEMY_SPEED * 0.72 },
    ],
  },
  {
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
    player: { x: 42, y: 272 },
    door: { x: 430, y: 42 },
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
  destroy,
  scene,
  go,
  get,
  dt,
  width,
  height,
  isKeyDown,
} = kaboom({
  width: 480,
  height: 320,
  scale: 2,
  crisp: true,
  global: false,
  background: [30, 31, 42],
});

function isTouchingWall(body) {
  return get("wall").some((wall) => body.isOverlapping(wall));
}

function moveOnAxis(body, dx, dy, bodySize) {
  const previous = body.pos.clone();
  body.move(dx, dy);
  body.pos.x = Math.max(0, Math.min(body.pos.x, width() - bodySize));
  body.pos.y = Math.max(0, Math.min(body.pos.y, height() - bodySize));
  if (isTouchingWall(body)) {
    body.pos = previous;
    return true;
  }
  return false;
}

scene("game", (roomIndex = 0) => {
  const room = ROOMS[roomIndex];

  room.walls.forEach((wall) => {
    add([
      rect(wall.w, wall.h),
      pos(wall.x, wall.y),
      area(),
      color(76, 78, 96),
      outline(2, [40, 42, 56]),
      "wall",
    ]);
  });

  const player = add([
    rect(PLAYER_SIZE, PLAYER_SIZE),
    pos(room.player.x, room.player.y),
    area(),
    color(100, 210, 255),
    "player",
  ]);

  const enemies = room.enemies.map((enemyConfig) => ({
    body: add([
      rect(ENEMY_SIZE, ENEMY_SIZE),
      pos(enemyConfig.x, enemyConfig.y),
      area(),
      color(255, 95, 95),
      "enemy",
    ]),
    velocity: {
      x: enemyConfig.vx,
      y: enemyConfig.vy,
    },
  }));

  add([
    text(`房间 ${roomIndex + 1} / ${ROOMS.length}：方向键射击，清敌开门`, { size: 13 }),
    pos(10, 8),
    color(230, 230, 238),
  ]);

  let ended = false;
  let shotTimer = 0;
  let door = null;
  let enemiesLeft = enemies.length;

  function openDoorIfReady() {
    if (door || enemiesLeft > 0) return;
    door = add([
      rect(DOOR_SIZE, DOOR_SIZE),
      pos(room.door.x, room.door.y),
      area(),
      color(120, 255, 150),
      outline(2, [30, 120, 55]),
      "door",
    ]);
  }

  function shoot(dirX, dirY) {
    if (ended || shotTimer > 0) return;
    shotTimer = SHOT_COOLDOWN;
    const bullet = add([
      rect(BULLET_SIZE, BULLET_SIZE),
      pos(player.pos.x + PLAYER_SIZE / 2 - BULLET_SIZE / 2, player.pos.y + PLAYER_SIZE / 2 - BULLET_SIZE / 2),
      area(),
      color(120, 230, 255),
      "bullet",
    ]);
    bullet.velocity = { x: dirX * BULLET_SPEED, y: dirY * BULLET_SPEED };

    bullet.onCollide("enemy", (enemyBody) => {
      if (!enemyBody.exists()) return;
      enemiesLeft -= 1;
      destroy(enemyBody);
      destroy(bullet);
      openDoorIfReady();
    });

    bullet.onCollide("wall", () => {
      destroy(bullet);
    });
  }

  onKeyDown("left", () => shoot(-1, 0));
  onKeyDown("right", () => shoot(1, 0));
  onKeyDown("up", () => shoot(0, -1));
  onKeyDown("down", () => shoot(0, 1));

  player.onCollide("enemy", () => {
    if (ended) return;
    ended = true;
    go("lose", roomIndex);
  });

  player.onCollide("door", () => {
    if (ended) return;
    ended = true;
    if (roomIndex + 1 >= ROOMS.length) {
      go("complete");
      return;
    }
    go("game", roomIndex + 1);
  });

  onUpdate(() => {
    if (ended) return;
    shotTimer = Math.max(0, shotTimer - dt());

    const sp = MOVE_SPEED;
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
      const hitX = moveOnAxis(enemy.body, enemy.velocity.x, 0, ENEMY_SIZE);
      const hitY = moveOnAxis(enemy.body, 0, enemy.velocity.y, ENEMY_SIZE);
      if (hitX || enemy.body.pos.x <= 0 || enemy.body.pos.x + ENEMY_SIZE >= width()) {
        enemy.velocity.x *= -1;
      }
      if (hitY || enemy.body.pos.y <= 0 || enemy.body.pos.y + ENEMY_SIZE >= height()) {
        enemy.velocity.y *= -1;
      }
    });

    get("bullet").forEach((bullet) => {
      bullet.move(bullet.velocity.x, bullet.velocity.y);
      if (bullet.pos.x < -BULLET_SIZE || bullet.pos.x > width() || bullet.pos.y < -BULLET_SIZE || bullet.pos.y > height()) {
        destroy(bullet);
      }
    });
  });
});

scene("complete", () => {
  add([
    text("全部房间清理完成！按 R 再玩", { size: 18 }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(255, 255, 200),
  ]);
  onKeyDown("r", () => go("game", 0));
});

scene("lose", (roomIndex = 0) => {
  add([
    text("被敌人撞到了，按 R 重试本房间", { size: 18 }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(255, 200, 200),
  ]);
  onKeyDown("r", () => go("game", roomIndex));
});

go("game", 0);
