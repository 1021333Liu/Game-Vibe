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

const ROOMS = [
  {
    name: "火焰山",
    enemySprite: "flameDemon",
    background: [48, 28, 24],
    wallColor: [110, 56, 42],
    wallOutline: [48, 24, 20],
    statusColor: [255, 196, 126],
    player: { x: 40, y: 160 },
    door: { x: 430, y: 152 },
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

let activeWalls = [];

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

function moveOnAxis(body, dx, dy, bodySize) {
  const nextX = Math.max(0, Math.min(body.pos.x + dx * dt(), width() - bodySize));
  const nextY = Math.max(0, Math.min(body.pos.y + dy * dt(), height() - bodySize));
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

scene("game", (roomIndex = 0) => {
  const room = ROOMS[roomIndex];
  activeWalls = room.walls;

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

  const player = addMonkeyHero(room.player.x, room.player.y);

  const enemies = room.enemies.map((enemyConfig) => ({
    body: addDemonEnemy(enemyConfig.x, enemyConfig.y, room.enemySprite),
    velocity: {
      x: enemyConfig.vx,
      y: enemyConfig.vy,
    },
  }));

  add([
    text(`${room.name} ${roomIndex + 1} / ${ROOMS.length}：方向键射击，清敌开门`, { size: 13 }),
    pos(10, 8),
    color(230, 230, 238),
  ]);

  const statusText = add([
    text(`敌人 ${enemies.length} / 门未开启`, { size: 12 }),
    pos(10, 26),
    color(...room.statusColor),
  ]);

  let ended = false;
  let shotTimer = 0;
  let door = null;
  let enemiesLeft = enemies.length;

  function openDoorIfReady() {
    if (door || enemiesLeft > 0) return;
    door = add([
      sprite("portal", { width: DOOR_SIZE, height: DOOR_SIZE }),
      pos(room.door.x, room.door.y),
      area(),
      "door",
    ]);
    statusText.text = "敌人 0 / 门已开启";
  }

  function shoot(dirX, dirY) {
    if (ended || shotTimer > 0) return;
    shotTimer = SHOT_COOLDOWN;
    addStaffBullet(
      player.pos.x + PLAYER_SIZE / 2 - BULLET_SIZE / 2,
      player.pos.y + PLAYER_SIZE / 2 - BULLET_SIZE / 2,
      dirX,
      dirY,
    );
  }

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

    if (isKeyDown("left")) shoot(-1, 0);
    if (isKeyDown("right")) shoot(1, 0);
    if (isKeyDown("up")) shoot(0, -1);
    if (isKeyDown("down")) shoot(0, 1);

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
      const distance = Math.hypot(bullet.velocity.x, bullet.velocity.y) * dt();
      const steps = Math.max(1, Math.ceil(distance / BULLET_STEP));
      const stepX = bullet.velocity.x * dt() / steps;
      const stepY = bullet.velocity.y * dt() / steps;

      for (let i = 0; i < steps; i += 1) {
        if (!bullet.exists()) break;
        bullet.move(stepX, stepY);

        const enemy = get("enemy").find((enemyBody) => bulletOverlapsTarget(bullet, enemyBody, ENEMY_SIZE));
        if (enemy) {
          enemiesLeft -= 1;
          destroy(enemy);
          destroy(bullet);
          statusText.text = `敌人 ${enemiesLeft} / 门未开启`;
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
