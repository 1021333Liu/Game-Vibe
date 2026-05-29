import kaboom from "kaboom";
import { gsap } from "gsap";

const MOVE_SPEED = 220;
const ENEMY_SPEED = 120;
const PLAYER_SIZE = 24;
const ENEMY_SIZE = 26;
const ELITE_SIZE = 40;
const DOOR_SIZE = 34;
const HEAL_PEACH_SIZE = 24;
const ATTACK_ITEM_SIZE = 24;
const ELITE_HEALTH_TICK_WIDTH = 7;
const ELITE_HEALTH_TICK_HEIGHT = 4;
const ELITE_HEALTH_TICK_GAP = 3;
const BULLET_SIZE = 8;
const STAFF_BULLET_LONG = 24;
const STAFF_BULLET_SHORT = 8;
const BULLET_SPEED = 9000;
const SHOT_COOLDOWN = 0.75;
const SHOT_BLOCKED_CUE_COOLDOWN = 0.32;
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
const ROOM_OBJECTIVE_LIFETIME = 2.4;
const BONE_TRACKING_STRENGTH = 18;
const SAND_DRIFT_STRENGTH = 24;
const ENEMY_TRAIL_INTERVAL = 0.16;
const SAND_DRIFT_TRAIL_INTERVAL = 0.34;
const ELITE_ROAR_INTERVAL = 3.4;
const ELITE_ROAR_WARN_TIME = 0.55;
const ELITE_ROAR_RUSH_TIME = 0.95;
const ELITE_ROAR_SPEED_SCALE = 1.28;
const PLAYER_HIT_FLASH_LIFETIME = 0.32;
const ROOM_CUE_LIFETIME = 1.25;
const QUICKSAND_SPEED_SCALE = 0.58;
const ENEMY_BIND_TIME = 0.42;
const ENEMY_BIND_SPEED_SCALE = 0.24;
const ENEMY_BIND_SPARK_INTERVAL = 0.18;
const SEALED_DOOR_HINT_DISTANCE = 42;
const SEALED_DOOR_HINT_COOLDOWN = 0.9;
const SEALED_DOOR_FADE_TIME = 0.55;
const REMAINING_ENEMY_CUE_COOLDOWN = 0.28;
const FLAME_WARNING_TIME = 1.05;
const FLAME_ACTIVE_TIME = 0.72;
const FLAME_REST_TIME = 2.15;
const BONE_AFTERIMAGE_LIFETIME = 0.9;
const PLAYER_GUARD_RING_PADDING = 7;
const ENEMY_CORNER_TURN_ANGLE = 0.65;
const BEST_TIME_KEY = "game-vibe-best-time";
const TEMPLATE_WIDTH = 480;
const TEMPLATE_HEIGHT = 320;
const SCREEN_WIDTH = 960;
const SCREEN_HEIGHT = 540;
const ROOM_SCALE_X = SCREEN_WIDTH / TEMPLATE_WIDTH;
const ROOM_SCALE_Y = SCREEN_HEIGHT / TEMPLATE_HEIGHT;
const START_ROOM_ID = "flame-mountain";
const HUD_Z = 900;
const HUD_TEXT_Z = HUD_Z + 1;
const HUD_MARGIN = 8;
const HUD_PANEL_OPACITY = 0.46;
const HUD_LEFT_PANEL = { x: 14, y: 12, w: 420, h: 92 };
const HUD_RIGHT_PANEL = { x: SCREEN_WIDTH - 182, y: 12, w: 168, h: 136 };
const HUD_OBJECTIVE_PANEL = { x: 14, y: 112, w: 420, h: 48 };
const HUD_FEEDBACK_PANEL = { x: 276, y: SCREEN_HEIGHT - 38, w: 408, h: 28 };
const DOOR_LABEL_FONT_SIZE = 11;
const DOOR_LABEL_BOX_WIDTH = 106;
const DOOR_LABEL_BOX_HEIGHT = 34;
const ATTACK_CHARGE_TICKS = 6;
const PICKUP_MAGNET_DISTANCE = 34;
const WIDESCREEN_PRESSURE_ENEMY_SIZE = ENEMY_SIZE;
const ROUTE_ELITE_AFFIX_AMBUSH_SIZE = ELITE_SIZE - 4;

const RUN_ITEM_INFO = {
  cloneHair: {
    name: "分身毫毛",
    hud: "分身毫毛 / 双发",
    cue: "双发开启",
    pickup: "拾取分身毫毛：双发",
    color: [230, 235, 255],
    effect: "double",
    sprite: "cloneHair",
  },
  plantainFan: {
    name: "芭蕉扇",
    hud: "芭蕉扇 / 扇形三发",
    cue: "扇形弹幕开启",
    pickup: "拾取芭蕉扇：扇形三发",
    color: [170, 238, 190],
    effect: "fan",
    sprite: "plantainFan",
  },
  windPearl: {
    name: "定风珠",
    hud: "定风珠 / 抵挡一次",
    cue: "护身一次",
    pickup: "拾取定风珠：抵挡一次伤害",
    color: [152, 220, 255],
    effect: "shield",
    sprite: "windPearl",
  },
  dragonScale: {
    name: "龙鳞甲",
    hud: "龙鳞甲 / 抵挡一次",
    cue: "龙鳞护体",
    pickup: "拾取龙鳞甲：抵挡一次伤害",
    color: [120, 210, 255],
    effect: "shield",
    sprite: "windPearl",
  },
  lotusLamp: {
    name: "莲花灯",
    hud: "莲花灯 / 抵挡一次",
    cue: "莲光护身",
    pickup: "拾取莲花灯：抵挡一次伤害",
    color: [255, 176, 224],
    effect: "shield",
    sprite: "windPearl",
  },
  cassockGuard: {
    name: "锦襕袈裟",
    hud: "锦襕袈裟 / 抵挡一次",
    cue: "袈裟护身",
    pickup: "拾取锦襕袈裟：抵挡一次伤害",
    color: [255, 216, 132],
    effect: "shield",
    sprite: "windPearl",
  },
  goldenBell: {
    name: "护身金铃",
    hud: "护身金铃 / 抵挡一次",
    cue: "金铃护体",
    pickup: "拾取护身金铃：抵挡一次伤害",
    color: [255, 226, 116],
    effect: "shield",
    sprite: "windPearl",
  },
  cloudBoots: {
    name: "踏云履",
    hud: "踏云履 / 移速提升",
    cue: "步履生云",
    pickup: "拾取踏云履：移动更快",
    color: [182, 232, 255],
    effect: "speed",
    sprite: "windPearl",
  },
  moonMirror: {
    name: "照妖镜",
    hud: "照妖镜 / 抵挡一次",
    cue: "镜光护身",
    pickup: "拾取照妖镜：抵挡一次伤害",
    color: [202, 220, 255],
    effect: "shield",
    sprite: "windPearl",
  },
  jadeToken: {
    name: "通关文牒",
    hud: "通关文牒 / 抵挡一次",
    cue: "文牒护身",
    pickup: "拾取通关文牒：抵挡一次伤害",
    color: [196, 238, 180],
    effect: "shield",
    sprite: "windPearl",
  },
  thunderSeal: {
    name: "雷部符",
    hud: "雷部符 / 双发",
    cue: "雷符分击",
    pickup: "拾取雷部符：双发",
    color: [210, 226, 255],
    effect: "double",
    sprite: "cloneHair",
  },
  sixEarEcho: {
    name: "六耳回声",
    hud: "六耳回声 / 双发",
    cue: "回声双发",
    pickup: "拾取六耳回声：双发",
    color: [220, 204, 255],
    effect: "double",
    sprite: "cloneHair",
  },
  starSand: {
    name: "星砂",
    hud: "星砂 / 双发",
    cue: "星砂分光",
    pickup: "拾取星砂：双发",
    color: [245, 235, 170],
    effect: "double",
    sprite: "cloneHair",
  },
  pearlTear: {
    name: "鲛人泪",
    hud: "鲛人泪 / 双发",
    cue: "水光双发",
    pickup: "拾取鲛人泪：双发",
    color: [152, 232, 244],
    effect: "double",
    sprite: "cloneHair",
  },
  whiteBoneDust: {
    name: "白骨尘",
    hud: "白骨尘 / 双发",
    cue: "骨影双发",
    pickup: "拾取白骨尘：双发",
    color: [224, 224, 214],
    effect: "double",
    sprite: "cloneHair",
  },
  spiderSilk: {
    name: "蛛丝结",
    hud: "蛛丝结 / 双发",
    cue: "蛛丝双发",
    pickup: "拾取蛛丝结：双发",
    color: [184, 218, 240],
    effect: "double",
    sprite: "cloneHair",
  },
  tigerTally: {
    name: "虎符",
    hud: "虎符 / 双发",
    cue: "虎符双发",
    pickup: "拾取虎符：双发",
    color: [255, 188, 126],
    effect: "double",
    sprite: "cloneHair",
  },
  incenseAsh: {
    name: "灵山香灰",
    hud: "灵山香灰 / 双发",
    cue: "香灰分光",
    pickup: "拾取灵山香灰：双发",
    color: [238, 226, 204],
    effect: "double",
    sprite: "cloneHair",
  },
  bananaLeaf: {
    name: "小芭蕉叶",
    hud: "小芭蕉叶 / 扇形三发",
    cue: "小扇展开",
    pickup: "拾取小芭蕉叶：扇形三发",
    color: [152, 230, 162],
    effect: "fan",
    sprite: "plantainFan",
  },
  fireFan: {
    name: "火云扇",
    hud: "火云扇 / 扇形三发",
    cue: "火云扇开",
    pickup: "拾取火云扇：扇形三发",
    color: [255, 142, 92],
    effect: "fan",
    sprite: "plantainFan",
  },
  riverFan: {
    name: "流沙扇",
    hud: "流沙扇 / 扇形三发",
    cue: "流沙扇开",
    pickup: "拾取流沙扇：扇形三发",
    color: [226, 196, 126],
    effect: "fan",
    sprite: "plantainFan",
  },
  frostFan: {
    name: "寒河扇",
    hud: "寒河扇 / 扇形三发",
    cue: "寒河扇开",
    pickup: "拾取寒河扇：扇形三发",
    color: [162, 226, 255],
    effect: "fan",
    sprite: "plantainFan",
  },
  peacockFan: {
    name: "孔雀羽扇",
    hud: "孔雀羽扇 / 扇形三发",
    cue: "孔雀扇开",
    pickup: "拾取孔雀羽扇：扇形三发",
    color: [152, 238, 214],
    effect: "fan",
    sprite: "plantainFan",
  },
  goldenHoop: {
    name: "金箍碎光",
    hud: "金箍碎光 / 扇形三发",
    cue: "金光散射",
    pickup: "拾取金箍碎光：扇形三发",
    color: [255, 232, 126],
    effect: "fan",
    sprite: "plantainFan",
  },
  thunderFan: {
    name: "雷音扇",
    hud: "雷音扇 / 扇形三发",
    cue: "雷音散射",
    pickup: "拾取雷音扇：扇形三发",
    color: [236, 226, 255],
    effect: "fan",
    sprite: "plantainFan",
  },
  jadeFan: {
    name: "玉兔蒲扇",
    hud: "玉兔蒲扇 / 扇形三发",
    cue: "玉兔扇开",
    pickup: "拾取玉兔蒲扇：扇形三发",
    color: [220, 248, 216],
    effect: "fan",
    sprite: "plantainFan",
  },
  ginsengLeaf: {
    name: "人参果叶",
    hud: "人参果叶 / 抵挡一次",
    cue: "灵叶护身",
    pickup: "拾取人参果叶：抵挡一次伤害",
    color: [188, 238, 148],
    effect: "shield",
    sprite: "windPearl",
  },
  dragonWhisker: {
    name: "龙须丝",
    hud: "龙须丝 / 双发",
    cue: "龙须双发",
    pickup: "拾取龙须丝：双发",
    color: [180, 236, 246],
    effect: "double",
    sprite: "cloneHair",
  },
  scripturePage: {
    name: "残页经文",
    hud: "残页经文 / 抵挡一次",
    cue: "经文护身",
    pickup: "拾取残页经文：抵挡一次伤害",
    color: [244, 224, 176],
    effect: "shield",
    sprite: "windPearl",
  },
  demonNeedle: {
    name: "破妖针",
    hud: "破妖针 / 穿透一名",
    cue: "破妖穿刺",
    pickup: "拾取破妖针：子弹可穿透一名妖怪",
    color: [255, 196, 132],
    effect: "pierce",
    sprite: "cloneHair",
  },
  vajraShard: {
    name: "金刚碎片",
    hud: "金刚碎片 / 穿透一名",
    cue: "金刚穿刺",
    pickup: "拾取金刚碎片：子弹可穿透一名妖怪",
    color: [255, 226, 150],
    effect: "pierce",
    sprite: "cloneHair",
  },
  bindingHoop: {
    name: "紧箍咒",
    hud: "紧箍咒 / 命中缓速",
    cue: "定身咒起",
    pickup: "拾取紧箍咒：命中精英会短暂压住身形",
    color: [255, 232, 126],
    effect: "bind",
    sprite: "windPearl",
  },
};

const RUN_ITEM_IDS = Object.keys(RUN_ITEM_INFO);
const TREASURE_CHOICE_EFFECTS = ["double", "shield", "fan", "speed", "pierce", "bind"];

const DOOR_POSITIONS = {
  up: { x: SCREEN_WIDTH / 2 - DOOR_SIZE / 2, y: 8 },
  down: { x: SCREEN_WIDTH / 2 - DOOR_SIZE / 2, y: SCREEN_HEIGHT - DOOR_SIZE - 8 },
  left: { x: 8, y: SCREEN_HEIGHT / 2 - DOOR_SIZE / 2 },
  right: { x: SCREEN_WIDTH - DOOR_SIZE - 8, y: SCREEN_HEIGHT / 2 - DOOR_SIZE / 2 },
};

const ENTRY_SPAWNS = {
  up: { x: SCREEN_WIDTH / 2 - PLAYER_SIZE / 2, y: 34 },
  down: { x: SCREEN_WIDTH / 2 - PLAYER_SIZE / 2, y: SCREEN_HEIGHT - PLAYER_SIZE - 34 },
  left: { x: 34, y: SCREEN_HEIGHT / 2 - PLAYER_SIZE / 2 },
  right: { x: SCREEN_WIDTH - PLAYER_SIZE - 34, y: SCREEN_HEIGHT / 2 - PLAYER_SIZE / 2 },
};

const OPPOSITE_DIRECTIONS = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const MAP_DIRECTION_OFFSET = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const DIRECTION_LABELS = {
  up: "上",
  down: "下",
  left: "左",
  right: "右",
};

const ROOM_TYPE_MAP_STYLE = {
  combat: { border: [104, 116, 128], mark: "" },
  treasure: { border: [255, 214, 104], mark: "宝" },
  elite: { border: [255, 132, 84], mark: "精" },
  final: { border: [255, 244, 164], mark: "终" },
};

const ROOM_TEMPLATES = [
  {
    id: "flame-mountain",
    type: "combat",
    trialNo: 47,
    trialName: "火焰山借扇",
    name: "火焰山",
    lore: "芭蕉难借，烈焰拦路",
    clearLore: "火势稍退，借扇之路仍远",
    enemySprite: "flameDemon",
    background: [48, 28, 24],
    wallColor: [110, 56, 42],
    wallOutline: [48, 24, 20],
    statusColor: [255, 196, 126],
    introColor: [255, 174, 92],
    introSubtitle: "烈焰翻涌，妖影逼近",
    mechanicHint: "机制：注意火焰预警 / P 暂停",
    decor: [
      { x: 32, y: 62, w: 76, h: 5, color: [255, 94, 42], opacity: 0.2 },
      { x: 168, y: 278, w: 98, h: 5, color: [255, 142, 50], opacity: 0.18 },
      { x: 268, y: 154, w: 72, h: 4, color: [255, 78, 46], opacity: 0.18 },
      { x: 390, y: 76, w: 38, h: 4, color: [255, 184, 74], opacity: 0.16 },
    ],
    enemyBehavior: "flameRush",
    enemySpeedScale: 1.12,
    player: { x: 40, y: 160 },
    exits: { up: "red-boy-cave", right: "bone-cave", down: "daughter-kingdom" },
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
    id: "red-boy-cave",
    type: "elite",
    trialNo: 40,
    trialName: "火云洞红孩儿",
    name: "火云洞",
    lore: "火云压洞，童妖试胆",
    clearLore: "三昧火退，云洞暂明",
    clearNote: "札记：烈火可逼退，贪战最伤身。",
    enemySprite: "redBoy",
    background: [50, 22, 28],
    wallColor: [128, 54, 44],
    wallOutline: [58, 22, 24],
    statusColor: [255, 188, 136],
    introColor: [255, 132, 82],
    introSubtitle: "红焰绕阵，火尖枪逼近",
    mechanicHint: "机制：火圈夹击，半血三昧真火 / P 暂停",
    decor: [
      { x: 46, y: 44, w: 72, h: 4, color: [255, 96, 46], opacity: 0.18 },
      { x: 178, y: 258, w: 108, h: 5, color: [255, 164, 64], opacity: 0.16 },
      { x: 334, y: 62, w: 68, h: 4, color: [255, 96, 46], opacity: 0.15 },
      { x: 350, y: 236, w: 62, h: 4, color: [255, 204, 86], opacity: 0.14 },
    ],
    enemyBehavior: "flameRush",
    enemySpeedScale: 0.92,
    player: { x: 230, y: 268 },
    exits: { down: "flame-mountain" },
    flameZones: [
      { x: 72, y: 82, w: 46, h: 42, phase: 0.35 },
      { x: 362, y: 82, w: 46, h: 42, phase: 1.15 },
      { x: 72, y: 202, w: 46, h: 42, phase: 1.95 },
      { x: 362, y: 202, w: 46, h: 42, phase: 2.75 },
    ],
    walls: [
      { x: 132, y: 72, w: 24, h: 80 },
      { x: 324, y: 72, w: 24, h: 80 },
      { x: 132, y: 188, w: 24, h: 80 },
      { x: 324, y: 188, w: 24, h: 80 },
      { x: 204, y: 142, w: 72, h: 24 },
    ],
    enemies: [
      { x: 226, y: 126, vx: ENEMY_SPEED * 0.76, vy: ENEMY_SPEED * 0.58, hp: 6, size: ELITE_SIZE, sprite: "redBoy", phaseCue: "三昧真火", phaseSpeedScale: 1.22 },
      { x: 88, y: 154, vx: ENEMY_SPEED * 0.88, vy: ENEMY_SPEED * 0.72, sprite: "flameDemon" },
      { x: 376, y: 154, vx: -ENEMY_SPEED * 0.88, vy: -ENEMY_SPEED * 0.72, sprite: "flameDemon" },
    ],
  },
  {
    id: "bone-cave",
    type: "combat",
    trialNo: 27,
    trialName: "三打白骨",
    name: "白骨洞",
    lore: "三打白骨，阴风入骨",
    clearLore: "三变皆破，阴风散去",
    enemySprite: "boneDemon",
    background: [28, 28, 40],
    wallColor: [92, 88, 104],
    wallOutline: [44, 42, 54],
    statusColor: [216, 214, 232],
    introColor: [190, 218, 255],
    introSubtitle: "阴风入骨，白影游移",
    mechanicHint: "机制：击破后有骨影 / P 暂停",
    decor: [
      { x: 34, y: 58, w: 38, h: 4, color: [210, 220, 230], opacity: 0.16 },
      { x: 236, y: 38, w: 46, h: 4, color: [190, 204, 222], opacity: 0.15 },
      { x: 108, y: 286, w: 42, h: 4, color: [218, 220, 228], opacity: 0.14 },
      { x: 382, y: 214, w: 36, h: 4, color: [190, 204, 222], opacity: 0.14 },
    ],
    enemyBehavior: "boneTrack",
    enemyAfterimage: "bone",
    player: { x: 42, y: 42 },
    exits: { left: "flame-mountain", right: "sand-river", up: "black-wind-mountain", down: "spider-cave" },
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
    id: "black-wind-mountain",
    type: "combat",
    trialNo: 17,
    trialName: "黑风山袈裟",
    name: "黑风山",
    lore: "黑风卷岭，袈裟藏影",
    clearLore: "风眼已破，山路复明",
    clearNote: "札记：黑风借势，守心不逐影。",
    enemySprite: "blackWindDemon",
    background: [24, 30, 34],
    wallColor: [54, 76, 76],
    wallOutline: [24, 38, 42],
    statusColor: [172, 222, 210],
    introColor: [136, 228, 210],
    introSubtitle: "黑风卷岭，妖影绕行",
    mechanicHint: "机制：清掉妖风后有伏击 / P 暂停",
    ambushCue: "熊罴精现身",
    ambushEnemies: [
      { x: 226, y: 146, vx: ENEMY_SPEED * 0.72, vy: ENEMY_SPEED * 0.64, hp: 4, size: ELITE_SIZE, sprite: "blackWindDemon", phaseCue: "黑风压顶", phaseSpeedScale: 1.16 },
    ],
    decor: [
      { x: 38, y: 42, w: 84, h: 3, color: [112, 190, 190], opacity: 0.16 },
      { x: 322, y: 54, w: 74, h: 3, color: [150, 226, 210], opacity: 0.14 },
      { x: 70, y: 260, w: 96, h: 3, color: [112, 190, 190], opacity: 0.15 },
      { x: 314, y: 236, w: 104, h: 3, color: [150, 226, 210], opacity: 0.13 },
    ],
    enemyBehavior: "sandDrift",
    enemySpeedScale: 1.08,
    player: { x: 42, y: 160 },
    exits: { down: "bone-cave" },
    walls: [
      { x: 108, y: 70, w: 92, h: 20 },
      { x: 280, y: 70, w: 92, h: 20 },
      { x: 108, y: 230, w: 92, h: 20 },
      { x: 280, y: 230, w: 92, h: 20 },
      { x: 220, y: 128, w: 40, h: 64 },
    ],
    enemies: [
      { x: 130, y: 116, vx: ENEMY_SPEED * 0.92, vy: ENEMY_SPEED },
      { x: 312, y: 116, vx: -ENEMY_SPEED, vy: ENEMY_SPEED * 0.84 },
      { x: 128, y: 202, vx: ENEMY_SPEED * 0.86, vy: -ENEMY_SPEED },
      { x: 322, y: 210, vx: -ENEMY_SPEED * 0.9, vy: -ENEMY_SPEED * 0.92 },
    ],
  },
  {
    id: "sand-river",
    type: "combat",
    trialNo: 22,
    trialName: "流沙河收徒",
    name: "流沙河",
    lore: "八百流沙，水路难行",
    clearLore: "沙浪暂平，彼岸仍远",
    enemySprite: "sandDemon",
    background: [38, 34, 28],
    wallColor: [122, 94, 54],
    wallOutline: [58, 43, 24],
    statusColor: [235, 204, 142],
    introColor: [245, 210, 132],
    introSubtitle: "黄沙压境，水路难行",
    mechanicHint: "机制：流沙会减速 / P 暂停",
    decor: [
      { x: 36, y: 34, w: 96, h: 3, color: [210, 176, 104], opacity: 0.2 },
      { x: 186, y: 76, w: 74, h: 3, color: [236, 204, 130], opacity: 0.16 },
      { x: 262, y: 264, w: 96, h: 3, color: [210, 176, 104], opacity: 0.18 },
      { x: 366, y: 118, w: 62, h: 3, color: [236, 204, 130], opacity: 0.14 },
    ],
    enemyBehavior: "sandDrift",
    player: { x: 42, y: 272 },
    exits: { left: "bone-cave", right: "tongtian-river", down: "lion-outpost" },
    exitPositions: { down: { x: 258, y: 290 } },
    entrySpawns: { down: { x: 258, y: 270 } },
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
  {
    id: "tongtian-river",
    type: "combat",
    trialNo: 49,
    trialName: "通天河冰渡",
    name: "通天河",
    lore: "寒河结镜，鱼妖绕桥",
    clearLore: "冰桥已稳，河雾渐开",
    enemySprite: "sandDemon",
    background: [22, 42, 56],
    wallColor: [56, 92, 116],
    wallOutline: [22, 48, 66],
    statusColor: [172, 228, 255],
    introColor: [156, 232, 255],
    introSubtitle: "冰桥狭窄，河妖夹击",
    mechanicHint: "机制：冰面减速，桥上点射 / P 暂停",
    decor: [
      { x: 26, y: 44, w: 86, h: 3, color: [152, 226, 255], opacity: 0.18 },
      { x: 184, y: 88, w: 116, h: 3, color: [210, 244, 255], opacity: 0.16 },
      { x: 318, y: 246, w: 106, h: 3, color: [152, 226, 255], opacity: 0.18 },
      { x: 94, y: 270, w: 70, h: 3, color: [210, 244, 255], opacity: 0.14 },
    ],
    enemyBehavior: "sandDrift",
    enemySpeedScale: 1.08,
    player: { x: 40, y: 160 },
    exits: { left: "sand-river", right: "jindou-cave" },
    slowZones: [
      { x: 136, y: 20, w: 208, h: 58 },
      { x: 136, y: 242, w: 208, h: 58 },
      { x: 36, y: 110, w: 78, h: 100 },
      { x: 366, y: 110, w: 78, h: 100 },
    ],
    walls: [
      { x: 120, y: 0, w: 24, h: 112 },
      { x: 120, y: 208, w: 24, h: 112 },
      { x: 336, y: 0, w: 24, h: 112 },
      { x: 336, y: 208, w: 24, h: 112 },
      { x: 196, y: 112, w: 88, h: 24 },
      { x: 196, y: 184, w: 88, h: 24 },
    ],
    enemies: [
      { x: 156, y: 42, vx: ENEMY_SPEED * 0.95, vy: ENEMY_SPEED * 1.05 },
      { x: 300, y: 260, vx: -ENEMY_SPEED, vy: -ENEMY_SPEED * 0.92 },
      { x: 388, y: 82, vx: -ENEMY_SPEED * 0.86, vy: ENEMY_SPEED * 1.1 },
      { x: 74, y: 228, vx: ENEMY_SPEED * 0.9, vy: -ENEMY_SPEED },
    ],
  },
  {
    id: "jindou-cave",
    type: "elite",
    trialNo: 52,
    trialName: "金兜洞青牛",
    name: "金兜洞",
    lore: "金圈收兵，青牛守洞",
    clearLore: "金圈暂歇，洞门复开",
    clearNote: "札记：锋芒越急，反冲越重。",
    enemySprite: "greenBullDemon",
    background: [28, 38, 34],
    wallColor: [62, 94, 76],
    wallOutline: [28, 48, 38],
    statusColor: [184, 232, 184],
    introColor: [178, 232, 156],
    introSubtitle: "金环绕洞，受击反冲",
    mechanicHint: "机制：击中敌人会反向加速 / P 暂停",
    enemyHitReaction: "counterRush",
    hitBoostTime: 0.72,
    hitBoostScale: 1.55,
    decor: [
      { x: 54, y: 46, w: 64, h: 4, color: [218, 196, 96], opacity: 0.16 },
      { x: 182, y: 78, w: 116, h: 4, color: [118, 206, 142], opacity: 0.14 },
      { x: 342, y: 236, w: 70, h: 4, color: [218, 196, 96], opacity: 0.15 },
      { x: 66, y: 260, w: 86, h: 4, color: [118, 206, 142], opacity: 0.13 },
    ],
    enemyBehavior: "flameRush",
    enemySpeedScale: 0.82,
    player: { x: 42, y: 160 },
    exits: { left: "tongtian-river" },
    walls: [
      { x: 96, y: 70, w: 24, h: 76 },
      { x: 96, y: 194, w: 24, h: 76 },
      { x: 360, y: 70, w: 24, h: 76 },
      { x: 360, y: 194, w: 24, h: 76 },
      { x: 190, y: 48, w: 100, h: 22 },
      { x: 190, y: 250, w: 100, h: 22 },
    ],
    enemies: [
      { x: 222, y: 142, vx: ENEMY_SPEED * 0.72, vy: ENEMY_SPEED * 0.58, hp: 5, size: ELITE_SIZE, sprite: "greenBullDemon", phaseCue: "金刚琢回旋", phaseSpeedScale: 1.14 },
      { x: 150, y: 104, vx: ENEMY_SPEED * 0.8, vy: ENEMY_SPEED * 0.7, sprite: "greenBullDemon" },
      { x: 314, y: 212, vx: -ENEMY_SPEED * 0.82, vy: -ENEMY_SPEED * 0.72, sprite: "greenBullDemon" },
    ],
  },
  {
    id: "daughter-kingdom",
    type: "combat",
    trialNo: 54,
    trialName: "女儿国情关",
    name: "女儿国",
    lore: "子母河畔，花影迷阵",
    clearLore: "花影渐散，情关未尽",
    enemySprite: "taoistDemon",
    background: [42, 32, 48],
    wallColor: [112, 70, 104],
    wallOutline: [54, 32, 62],
    statusColor: [245, 188, 224],
    introColor: [255, 172, 220],
    introSubtitle: "花影迷阵，香风绕路",
    mechanicHint: "机制：短墙分割路线 / P 暂停",
    decor: [
      { x: 44, y: 214, w: 10, h: 10, color: [255, 142, 210], opacity: 0.18 },
      { x: 252, y: 58, w: 10, h: 10, color: [255, 194, 226], opacity: 0.16 },
      { x: 410, y: 174, w: 10, h: 10, color: [255, 142, 210], opacity: 0.16 },
      { x: 320, y: 276, w: 10, h: 10, color: [255, 194, 226], opacity: 0.14 },
    ],
    enemyBehavior: "sandDrift",
    player: { x: 240, y: 250 },
    exits: { up: "flame-mountain", right: "spider-cave", down: "dragon-treasure" },
    walls: [
      { x: 96, y: 58, w: 24, h: 128 },
      { x: 176, y: 134, w: 132, h: 24 },
      { x: 360, y: 58, w: 24, h: 128 },
      { x: 130, y: 238, w: 220, h: 24 },
    ],
    enemies: [
      { x: 70, y: 72, vx: ENEMY_SPEED * 0.92, vy: ENEMY_SPEED * 0.76 },
      { x: 240, y: 82, vx: -ENEMY_SPEED * 0.86, vy: ENEMY_SPEED },
      { x: 392, y: 230, vx: -ENEMY_SPEED, vy: -ENEMY_SPEED * 0.78 },
    ],
  },
  {
    id: "dragon-treasure",
    type: "treasure",
    trialNo: 31,
    trialName: "龙宫取宝",
    name: "龙宫宝库",
    lore: "海藏微光，宝物待取",
    enemySprite: "taoistDemon",
    background: [24, 42, 54],
    wallColor: [52, 94, 112],
    wallOutline: [24, 48, 62],
    statusColor: [166, 230, 255],
    introColor: [156, 232, 255],
    introSubtitle: "海藏微光，宝物待取",
    mechanicHint: "机制：奖励房无战斗 / P 暂停",
    decor: [
      { x: 40, y: 48, w: 92, h: 3, color: [118, 214, 240], opacity: 0.18 },
      { x: 178, y: 166, w: 124, h: 3, color: [166, 230, 255], opacity: 0.16 },
      { x: 334, y: 262, w: 88, h: 3, color: [118, 214, 240], opacity: 0.18 },
      { x: 210, y: 246, w: 58, h: 3, color: [166, 230, 255], opacity: 0.14 },
    ],
    player: { x: 230, y: 48 },
    exits: { up: "daughter-kingdom" },
    walls: [
      { x: 88, y: 72, w: 24, h: 176 },
      { x: 368, y: 72, w: 24, h: 176 },
      { x: 150, y: 112, w: 180, h: 20 },
      { x: 150, y: 204, w: 180, h: 20 },
    ],
    enemies: [],
  },
  {
    id: "spider-cave",
    type: "combat",
    trialNo: 72,
    trialName: "盘丝洞蛛网",
    name: "盘丝洞",
    lore: "蛛丝结网，七情缠路",
    clearLore: "丝网已断，去路复明",
    enemySprite: "spiderDemon",
    background: [30, 28, 44],
    wallColor: [74, 82, 104],
    wallOutline: [34, 36, 52],
    statusColor: [188, 218, 235],
    introColor: [178, 236, 255],
    introSubtitle: "蛛丝横结，洞路缠绕",
    mechanicHint: "机制：蛛妖会轻追踪 / P 暂停",
    decor: [
      { x: 32, y: 42, w: 72, h: 2, color: [160, 196, 220], opacity: 0.18 },
      { x: 48, y: 58, w: 2, h: 72, color: [160, 196, 220], opacity: 0.14 },
      { x: 352, y: 210, w: 78, h: 2, color: [190, 220, 238], opacity: 0.16 },
      { x: 388, y: 174, w: 2, h: 72, color: [190, 220, 238], opacity: 0.14 },
    ],
    enemyBehavior: "boneTrack",
    player: { x: 40, y: 250 },
    exits: { left: "daughter-kingdom", up: "bone-cave", right: "lion-outpost" },
    walls: [
      { x: 76, y: 76, w: 120, h: 20 },
      { x: 284, y: 76, w: 120, h: 20 },
      { x: 150, y: 164, w: 180, h: 20 },
      { x: 76, y: 242, w: 120, h: 20 },
      { x: 284, y: 242, w: 120, h: 20 },
    ],
    enemies: [
      { x: 104, y: 120, vx: ENEMY_SPEED * 0.9, vy: ENEMY_SPEED },
      { x: 234, y: 52, vx: -ENEMY_SPEED, vy: ENEMY_SPEED * 0.72 },
      { x: 358, y: 194, vx: -ENEMY_SPEED * 0.92, vy: -ENEMY_SPEED },
      { x: 230, y: 268, vx: ENEMY_SPEED * 0.8, vy: -ENEMY_SPEED * 0.9 },
    ],
  },
  {
    id: "lion-outpost",
    type: "elite",
    trialNo: 76,
    trialName: "狮驼岭妖军",
    name: "狮驼岭前哨",
    lore: "狮吼压岭，妖军列阵",
    clearLore: "狮吼渐远，大岭在前",
    clearNote: "札记：过狮驼岭，先稳阵脚。",
    enemySprite: "lionElite",
    background: [42, 32, 30],
    wallColor: [106, 76, 54],
    wallOutline: [50, 34, 26],
    statusColor: [255, 204, 144],
    introColor: [255, 188, 112],
    introSubtitle: "狮吼压岭，妖军列阵",
    mechanicHint: "机制：精英妖怪需多次命中 / P 暂停",
    decor: [
      { x: 42, y: 38, w: 22, h: 8, color: [180, 110, 62], opacity: 0.18 },
      { x: 304, y: 48, w: 24, h: 8, color: [180, 110, 62], opacity: 0.16 },
      { x: 136, y: 264, w: 26, h: 8, color: [156, 86, 54], opacity: 0.18 },
      { x: 386, y: 236, w: 22, h: 8, color: [180, 110, 62], opacity: 0.14 },
    ],
    enemyBehavior: "flameRush",
    enemySpeedScale: 0.72,
    player: { x: 42, y: 160 },
    exits: { left: "spider-cave", up: "sand-river", right: "lesser-thunder" },
    walls: [
      { x: 96, y: 58, w: 24, h: 204 },
      { x: 360, y: 58, w: 24, h: 204 },
      { x: 176, y: 70, w: 128, h: 22 },
      { x: 176, y: 228, w: 128, h: 22 },
    ],
    enemies: [
      { x: 226, y: 146, vx: ENEMY_SPEED * 0.8, vy: ENEMY_SPEED * 0.68, hp: 5, size: ELITE_SIZE, sprite: "lionElite" },
      { x: 154, y: 112, vx: ENEMY_SPEED * 0.76, vy: -ENEMY_SPEED * 0.66 },
      { x: 322, y: 198, vx: -ENEMY_SPEED * 0.74, vy: ENEMY_SPEED * 0.68 },
    ],
  },
  {
    id: "lesser-thunder",
    type: "final",
    trialNo: 81,
    trialName: "小雷音黄眉",
    name: "小雷音寺前庭",
    lore: "假佛金光，终点在前",
    clearLore: "黄眉金钹已破，雷音幻境散去",
    enemySprite: "taoistDemon",
    background: [36, 34, 48],
    wallColor: [118, 102, 62],
    wallOutline: [58, 48, 30],
    statusColor: [255, 226, 150],
    introColor: [255, 232, 150],
    introSubtitle: "金光压云，黄眉拦路",
    mechanicHint: "机制：击破黄眉 Boss 即可通关 / P 暂停",
    decor: [
      { x: 224, y: 22, w: 32, h: 88, color: [255, 232, 150], opacity: 0.12 },
      { x: 188, y: 120, w: 104, h: 4, color: [255, 232, 150], opacity: 0.16 },
      { x: 146, y: 278, w: 188, h: 4, color: [255, 210, 112], opacity: 0.14 },
      { x: 404, y: 42, w: 28, h: 74, color: [255, 232, 150], opacity: 0.1 },
    ],
    enemyBehavior: "flameRush",
    enemySpeedScale: 1.04,
    ambushCue: "黄眉唤妖",
    ambushEnemies: [
      { x: 126, y: 248, vx: ENEMY_SPEED * 0.94, vy: -ENEMY_SPEED * 0.74 },
      { x: 384, y: 72, vx: -ENEMY_SPEED * 0.9, vy: ENEMY_SPEED * 0.78 },
    ],
    player: { x: 42, y: 160 },
    exits: { left: "lion-outpost" },
    walls: [
      { x: 96, y: 58, w: 24, h: 204 },
      { x: 176, y: 112, w: 128, h: 24 },
      { x: 176, y: 208, w: 128, h: 24 },
      { x: 360, y: 58, w: 24, h: 204 },
    ],
    enemies: [
      { x: 224, y: 144, vx: ENEMY_SPEED * 0.62, vy: ENEMY_SPEED * 0.54, hp: 7, size: ELITE_SIZE + 4, sprite: "yellowBrowBoss", phaseCue: "金钹合鸣", phaseSpeedScale: 1.18 },
      { x: 150, y: 56, vx: ENEMY_SPEED * 0.9, vy: ENEMY_SPEED * 0.78 },
      { x: 404, y: 236, vx: -ENEMY_SPEED * 0.86, vy: -ENEMY_SPEED * 0.82 },
    ],
  },
];

const RUN_LAYOUTS = [
  {
    name: "双宝分岔",
    slots: [
      { id: START_ROOM_ID, role: "combat", exits: { right: "trial-east-1", down: "trial-south-1", left: "trial-west-2" } },
      { id: "trial-east-1", role: "combat", exits: { left: START_ROOM_ID, right: "trial-east-2", up: "trial-treasure-1", down: "trial-center-1" } },
      { id: "trial-east-2", role: "combat", exits: { left: "trial-east-1", down: "trial-elite-1" } },
      { id: "trial-elite-1", role: "elite", exits: { up: "trial-east-2", left: "trial-center-1", right: "trial-final" } },
      { id: "trial-center-1", role: "combat", exits: { up: "trial-east-1", right: "trial-elite-1", left: "trial-south-1", down: "trial-treasure-2" } },
      { id: "trial-south-1", role: "combat", exits: { up: START_ROOM_ID, right: "trial-center-1", left: "trial-elite-2" } },
      { id: "trial-elite-2", role: "elite", exits: { right: "trial-south-1", up: "trial-west-2" } },
      { id: "trial-west-2", role: "combat", exits: { down: "trial-elite-2", right: START_ROOM_ID } },
      { id: "trial-treasure-1", role: "treasure", exits: { down: "trial-east-1" } },
      { id: "trial-treasure-2", role: "treasure", exits: { up: "trial-center-1", right: "trial-elite-3" } },
      { id: "trial-elite-3", role: "elite", exits: { left: "trial-treasure-2" } },
      { id: "trial-final", role: "final", exits: { left: "trial-elite-1" } },
    ],
  },
  {
    name: "宝库提前",
    slots: [
      { id: START_ROOM_ID, role: "combat", exits: { up: "trial-treasure-1", right: "trial-east-1", down: "trial-south-1" } },
      { id: "trial-treasure-1", role: "treasure", exits: { down: START_ROOM_ID, right: "trial-elite-2" } },
      { id: "trial-elite-2", role: "elite", exits: { left: "trial-treasure-1", down: "trial-east-1" } },
      { id: "trial-east-1", role: "combat", exits: { left: START_ROOM_ID, up: "trial-elite-2", right: "trial-east-2", down: "trial-center-1" } },
      { id: "trial-east-2", role: "combat", exits: { left: "trial-east-1", down: "trial-elite-1" } },
      { id: "trial-elite-1", role: "elite", exits: { up: "trial-east-2", left: "trial-center-1", right: "trial-final" } },
      { id: "trial-center-1", role: "combat", exits: { up: "trial-east-1", right: "trial-elite-1", left: "trial-south-1", down: "trial-treasure-2" } },
      { id: "trial-south-1", role: "combat", exits: { up: START_ROOM_ID, right: "trial-center-1", left: "trial-west-2" } },
      { id: "trial-west-2", role: "combat", exits: { right: "trial-south-1", up: "trial-elite-3" } },
      { id: "trial-elite-3", role: "elite", exits: { down: "trial-west-2" } },
      { id: "trial-treasure-2", role: "treasure", exits: { up: "trial-center-1" } },
      { id: "trial-final", role: "final", exits: { left: "trial-elite-1" } },
    ],
  },
  {
    name: "精英长廊",
    slots: [
      { id: START_ROOM_ID, role: "combat", exits: { right: "trial-center-1", left: "trial-west-2", down: "trial-treasure-1" } },
      { id: "trial-center-1", role: "combat", exits: { left: START_ROOM_ID, right: "trial-east-1", down: "trial-south-1" } },
      { id: "trial-east-1", role: "combat", exits: { left: "trial-center-1", right: "trial-elite-1", up: "trial-treasure-2" } },
      { id: "trial-elite-1", role: "elite", exits: { left: "trial-east-1", right: "trial-elite-2" } },
      { id: "trial-elite-2", role: "elite", exits: { left: "trial-elite-1", right: "trial-final", down: "trial-elite-3" } },
      { id: "trial-elite-3", role: "elite", exits: { up: "trial-elite-2" } },
      { id: "trial-final", role: "final", exits: { left: "trial-elite-2" } },
      { id: "trial-south-1", role: "combat", exits: { up: "trial-center-1", left: "trial-west-2", right: "trial-east-2" } },
      { id: "trial-west-2", role: "combat", exits: { right: START_ROOM_ID, down: "trial-south-1" } },
      { id: "trial-east-2", role: "combat", exits: { left: "trial-south-1", up: "trial-treasure-2" } },
      { id: "trial-treasure-1", role: "treasure", exits: { up: START_ROOM_ID } },
      { id: "trial-treasure-2", role: "treasure", exits: { down: "trial-east-1" } },
    ],
  },
];

const TRIAL_POOL = [
  { trialNo: 1, trialName: "金蝉遭贬", name: "金蝉旧梦", type: "combat" },
  { trialNo: 2, trialName: "出胎几杀", name: "江流渡口", type: "combat" },
  { trialNo: 3, trialName: "满月抛江", name: "洪江寒渡", type: "combat" },
  { trialNo: 4, trialName: "寻亲报冤", name: "长安旧案", type: "combat" },
  { trialNo: 5, trialName: "出城逢虎", name: "双叉岭", type: "combat" },
  { trialNo: 6, trialName: "落坑折从", name: "猎户荒径", type: "combat" },
  { trialNo: 7, trialName: "双叉岭上", name: "虎穴山道", type: "elite" },
  { trialNo: 8, trialName: "两界山头", name: "两界山", type: "combat" },
  { trialNo: 9, trialName: "陡涧换马", name: "鹰愁涧", type: "combat" },
  { trialNo: 10, trialName: "夜被火烧", name: "观音禅院", type: "combat" },
  { trialNo: 11, trialName: "失却袈裟", name: "袈裟暗阁", type: "treasure" },
  { trialNo: 12, trialName: "收降八戒", name: "高老庄", type: "combat" },
  { trialNo: 13, trialName: "黄风怪阻", name: "黄风岭", type: "elite" },
  { trialNo: 14, trialName: "请求灵吉", name: "定风庄", type: "treasure" },
  { trialNo: 15, trialName: "流沙难渡", name: "流沙河", type: "combat" },
  { trialNo: 16, trialName: "收降沙僧", name: "沙河渡口", type: "combat" },
  { trialNo: 17, trialName: "四圣显化", name: "试禅林", type: "treasure" },
  { trialNo: 18, trialName: "五庄观中", name: "五庄观", type: "combat" },
  { trialNo: 19, trialName: "难活人参", name: "人参果园", type: "treasure" },
  { trialNo: 20, trialName: "贬退心猿", name: "心猿荒野", type: "elite" },
  { trialNo: 21, trialName: "黑松林失散", name: "黑松林", type: "combat" },
  { trialNo: 22, trialName: "宝象国捎书", name: "宝象国", type: "combat" },
  { trialNo: 23, trialName: "金銮殿变虎", name: "金銮殿", type: "elite" },
  { trialNo: 24, trialName: "平顶山逢魔", name: "平顶山", type: "combat" },
  { trialNo: 25, trialName: "莲花洞高悬", name: "莲花洞", type: "elite" },
  { trialNo: 26, trialName: "乌鸡国救主", name: "乌鸡国井", type: "combat" },
  { trialNo: 27, trialName: "红孩儿火云", name: "火云洞", type: "elite" },
  { trialNo: 28, trialName: "黑水河沉没", name: "黑水河", type: "combat" },
  { trialNo: 29, trialName: "车迟国斗法", name: "车迟国", type: "elite" },
  { trialNo: 30, trialName: "通天河遇阻", name: "通天河", type: "combat" },
  { trialNo: 31, trialName: "金兜洞收兵", name: "金兜洞", type: "elite" },
  { trialNo: 32, trialName: "女儿国留婚", name: "女儿国", type: "combat" },
  { trialNo: 33, trialName: "琵琶洞蝎影", name: "琵琶洞", type: "elite" },
  { trialNo: 34, trialName: "真假美猴王", name: "水帘迷影", type: "elite" },
  { trialNo: 35, trialName: "火焰山借扇", name: "火焰山", type: "combat" },
  { trialNo: 36, trialName: "芭蕉扇三借", name: "翠云山", type: "treasure" },
  { trialNo: 37, trialName: "祭赛国扫塔", name: "金光寺塔", type: "combat" },
  { trialNo: 38, trialName: "乱石山碧波", name: "碧波潭", type: "elite" },
  { trialNo: 39, trialName: "荆棘岭吟诗", name: "荆棘岭", type: "combat" },
  { trialNo: 40, trialName: "小雷音遭困", name: "小雷音寺", type: "boss" },
  { trialNo: 41, trialName: "稀柿衕秽阻", name: "稀柿衕", type: "combat" },
  { trialNo: 42, trialName: "朱紫国行医", name: "朱紫国", type: "treasure" },
  { trialNo: 43, trialName: "盘丝洞蛛网", name: "盘丝洞", type: "combat" },
  { trialNo: 44, trialName: "黄花观毒茶", name: "黄花观", type: "elite" },
  { trialNo: 45, trialName: "狮驼岭妖军", name: "狮驼岭", type: "elite" },
  { trialNo: 46, trialName: "比丘国救子", name: "比丘国", type: "combat" },
  { trialNo: 47, trialName: "无底洞鼠影", name: "无底洞", type: "elite" },
  { trialNo: 48, trialName: "灭法国剃发", name: "灭法国", type: "combat" },
  { trialNo: 49, trialName: "隐雾山除怪", name: "隐雾山", type: "combat" },
  { trialNo: 50, trialName: "凤仙郡求雨", name: "凤仙郡", type: "treasure" },
  { trialNo: 51, trialName: "玉华州授艺", name: "玉华州", type: "treasure" },
  { trialNo: 52, trialName: "豹头山黄狮", name: "豹头山", type: "elite" },
  { trialNo: 53, trialName: "金平府观灯", name: "金平府", type: "combat" },
  { trialNo: 54, trialName: "青龙山玄英", name: "青龙山", type: "elite" },
  { trialNo: 55, trialName: "天竺国招亲", name: "天竺国", type: "combat" },
  { trialNo: 56, trialName: "玉兔精捣药", name: "广寒药园", type: "elite" },
  { trialNo: 57, trialName: "铜台府地灵", name: "铜台府", type: "combat" },
  { trialNo: 58, trialName: "灵山脚下", name: "灵山脚", type: "combat" },
  { trialNo: 59, trialName: "凌云渡脱胎", name: "凌云渡", type: "treasure" },
  { trialNo: 60, trialName: "无字真经", name: "藏经阁影", type: "boss" },
  { trialNo: 61, trialName: "通天河老鼋", name: "老鼋渡", type: "combat" },
  { trialNo: 62, trialName: "最后一难", name: "归途洪波", type: "boss" },
  { trialNo: 63, trialName: "白骨三变", name: "白骨洞", type: "elite" },
  { trialNo: 64, trialName: "黑风山袈裟", name: "黑风山", type: "combat" },
  { trialNo: 65, trialName: "黄眉金钹", name: "黄眉殿", type: "boss" },
  { trialNo: 66, trialName: "九灵元圣", name: "竹节山", type: "boss" },
  { trialNo: 67, trialName: "牛魔王拦路", name: "积雷山", type: "boss" },
  { trialNo: 68, trialName: "青牛金刚琢", name: "青牛洞", type: "elite" },
  { trialNo: 69, trialName: "蜘蛛七情", name: "蛛网密室", type: "combat" },
  { trialNo: 70, trialName: "蝎尾倒马毒", name: "毒琵琶洞", type: "elite" },
  { trialNo: 71, trialName: "黄风三昧", name: "黄风阵", type: "elite" },
  { trialNo: 72, trialName: "银角紫金葫", name: "葫芦洞", type: "elite" },
  { trialNo: 73, trialName: "红孩真火", name: "真火台", type: "elite" },
  { trialNo: 74, trialName: "流沙八百", name: "八百流沙", type: "combat" },
  { trialNo: 75, trialName: "女儿国情关", name: "情关水榭", type: "combat" },
  { trialNo: 76, trialName: "三藏遇虎", name: "虎口岭", type: "combat" },
  { trialNo: 77, trialName: "九曲盘桓", name: "九曲洞", type: "combat" },
  { trialNo: 78, trialName: "万妖围路", name: "万妖阵", type: "elite" },
  { trialNo: 79, trialName: "雷音幻境", name: "雷音幻境", type: "boss" },
  { trialNo: 80, trialName: "取经在望", name: "灵山门", type: "treasure" },
  { trialNo: 81, trialName: "功德圆满", name: "大雷音寺", type: "boss" },
];

let ROOMS = [];
let ROOM_BY_ID = {};
let ROOM_MAP_POSITIONS = {};
let currentStartRoomId = START_ROOM_ID;
let currentRunSeed = 0;
let currentRunRouteName = "";
let currentRunLayoutName = "";

let activeWalls = [];
let gameStarted = false;
let runHealth = PLAYER_MAX_HEALTH;
let runStats = {
  defeats: 0,
  hitsTaken: 0,
  time: 0,
  bossAmbushes: 0,
  eliteAffixes: 0,
};
let exploredRoomIds = new Set();
let clearedRoomIds = new Set();
let rewardedRoomIds = new Set();
let itemRewardedRoomIds = new Set();
let countedEliteAffixRoomIds = new Set();
let runItem = null;
let audioContext = null;
let isMuted = false;

function cloneRoomConfig(room) {
  return scaleRoomConfig(JSON.parse(JSON.stringify(room)));
}

function scaleX(value) {
  return Math.round(value * ROOM_SCALE_X);
}

function scaleY(value) {
  return Math.round(value * ROOM_SCALE_Y);
}

function scaleW(value) {
  return Math.max(1, Math.round(value * ROOM_SCALE_X));
}

function scaleH(value) {
  return Math.max(1, Math.round(value * ROOM_SCALE_Y));
}

function scalePoint(point) {
  return point ? { ...point, x: scaleX(point.x), y: scaleY(point.y) } : point;
}

function scaleRectLike(shape) {
  return shape
    ? {
        ...shape,
        x: scaleX(shape.x),
        y: scaleY(shape.y),
        w: scaleW(shape.w),
        h: scaleH(shape.h),
      }
    : shape;
}

function scaleEnemyConfig(enemy) {
  return {
    ...enemy,
    x: scaleX(enemy.x),
    y: scaleY(enemy.y),
  };
}

function scalePointMap(pointMap) {
  if (!pointMap) return pointMap;
  return Object.fromEntries(
    Object.entries(pointMap).map(([key, point]) => [key, scalePoint(point)]),
  );
}

function scaleRoomConfig(room) {
  room.player = scalePoint(room.player);
  room.decor = (room.decor ?? []).map(scaleRectLike);
  room.walls = (room.walls ?? []).map(scaleRectLike);
  room.slowZones = (room.slowZones ?? []).map(scaleRectLike);
  room.flameZones = (room.flameZones ?? []).map(scaleRectLike);
  room.enemies = (room.enemies ?? []).map(scaleEnemyConfig);
  room.ambushEnemies = (room.ambushEnemies ?? []).map(scaleEnemyConfig);
  room.exitPositions = scalePointMap(room.exitPositions);
  room.entrySpawns = scalePointMap(room.entrySpawns);
  return room;
}

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function takeCycling(items, count) {
  const source = shuffled(items);
  if (source.length === 0) return [];
  return Array.from({ length: count }, (_, index) => source[index % source.length]);
}

function getTemplatePool(role) {
  if (role === "final") return ROOM_TEMPLATES.filter((room) => room.type === "final");
  return ROOM_TEMPLATES.filter((room) => room.type === role);
}

function getTrialPool(role) {
  if (role === "final") return TRIAL_POOL.filter((trial) => trial.type === "boss");
  return TRIAL_POOL.filter((trial) => trial.type === role);
}

function getRandomItemId(seedOffset = 0) {
  return RUN_ITEM_IDS[(currentRunSeed + seedOffset) % RUN_ITEM_IDS.length] ?? "cloneHair";
}

function addWidescreenPressureEnemy(room, slotIndex) {
  if (room.type !== "combat" || slotIndex === 0 || slotIndex % 2 === 0) return;
  const sideSpawns = [
    { x: 52, y: 78, vx: ENEMY_SPEED * 1.04, vy: ENEMY_SPEED * 0.78 },
    { x: SCREEN_WIDTH - 86, y: 94, vx: -ENEMY_SPEED * 1.02, vy: ENEMY_SPEED * 0.82 },
    { x: 64, y: SCREEN_HEIGHT - 104, vx: ENEMY_SPEED * 0.96, vy: -ENEMY_SPEED },
    { x: SCREEN_WIDTH - 92, y: SCREEN_HEIGHT - 118, vx: -ENEMY_SPEED * 1.08, vy: -ENEMY_SPEED * 0.72 },
  ];
  const startIndex = (currentRunSeed + slotIndex) % sideSpawns.length;
  const spawn = sideSpawns
    .map((_, offset) => sideSpawns[(startIndex + offset) % sideSpawns.length])
    .find((candidate) => !isSpawnBlocked(room, candidate));
  if (!spawn) return;
  room.enemies.push({
    ...spawn,
    sprite: room.enemySprite,
    pressure: true,
  });
}

function addRouteEliteAffix(room, slotIndex, eliteIndex) {
  if (room.type !== "elite" || eliteIndex === 0) return;

  const affixIndex = (currentRunSeed + slotIndex + eliteIndex * 5) % 3;
  if (affixIndex === 0) {
    const ambushSpawns = [
      { x: 74, y: 82, vx: ENEMY_SPEED * 0.9, vy: ENEMY_SPEED * 0.72 },
      { x: SCREEN_WIDTH - 110, y: SCREEN_HEIGHT - 112, vx: -ENEMY_SPEED * 0.88, vy: -ENEMY_SPEED * 0.74 },
    ];
    const ambushEnemies = ambushSpawns
      .filter((spawn) => !isSpawnBlocked(room, spawn, ROUTE_ELITE_AFFIX_AMBUSH_SIZE))
      .map((spawn) => ({
        ...spawn,
        hp: 2,
        size: ROUTE_ELITE_AFFIX_AMBUSH_SIZE,
        sprite: room.enemySprite,
      }));
    if (ambushEnemies.length > 0) {
      room.ambushEnemies = [...(room.ambushEnemies ?? []), ...ambushEnemies];
      room.ambushCue = room.ambushCue ?? "劫难伏兵";
      room.eliteAffixLabel = "伏兵";
      room.eliteAffixText = "精英倒下后会追加小妖伏击";
      room.mechanicHint = "机制：精英倒下后有一次伏兵 / P 暂停";
      room.clearNote = "伏兵已破，劫难留痕";
    }
    return;
  }

  if (affixIndex === 1) {
    room.enemyHitReaction = "counterRush";
    room.hitBoostTime = room.hitBoostTime ?? 0.52;
    room.hitBoostScale = room.hitBoostScale ?? 1.32;
    room.eliteAffixLabel = "反冲";
    room.eliteAffixText = "击中精英后会短暂提高压迫速度";
    room.mechanicHint = "机制：击中精英会短暂反冲 / P 暂停";
    room.clearNote = "反冲已止，去路复开";
    return;
  }

  room.enemies = (room.enemies ?? []).map((enemy, enemyIndex) => (
    enemy.hp > 1 && enemyIndex === 0
      ? {
          ...enemy,
          phaseCue: enemy.phaseCue ?? "劫火转急",
          phaseSpeedScale: Math.max(enemy.phaseSpeedScale ?? 1, 1.16),
        }
      : enemy
  ));
  room.eliteAffixLabel = "半血急袭";
  room.eliteAffixText = "首个精英半血后会进入加速阶段";
  room.mechanicHint = "机制：首个精英半血会加速 / P 暂停";
  room.clearNote = "精英阶段已压住";
}

function addBossPhaseVariant(room, slotIndex, trial) {
  if (room.type !== "final") return;

  const bossEnemy = (room.enemies ?? []).find((enemy) => enemy.hp > 1);
  const variantIndex = (currentRunSeed + slotIndex + trial.trialNo) % 3;
  if (variantIndex === 0) {
    room.ambushEnemies = [
      ...(room.ambushEnemies ?? []),
      { x: SCREEN_WIDTH / 2 - 108, y: SCREEN_HEIGHT - 96, vx: ENEMY_SPEED * 0.86, vy: -ENEMY_SPEED * 0.72, sprite: room.enemySprite },
    ];
    room.bossVariantLabel = "追加护法";
    room.ambushCue = "黄眉再唤护法";
    room.mechanicHint = "机制：Boss 半血会追加护法 / P 暂停";
    return;
  }

  if (variantIndex === 1) {
    room.enemyHitReaction = "counterRush";
    room.hitBoostTime = 0.42;
    room.hitBoostScale = 1.22;
    room.bossVariantLabel = "金钹反冲";
    room.ambushCue = "金钹回震";
    room.mechanicHint = "机制：Boss 受击会短暂反冲 / P 暂停";
    return;
  }

  if (bossEnemy) {
    bossEnemy.phaseCue = "金钹急转";
    bossEnemy.phaseSpeedScale = Math.max(bossEnemy.phaseSpeedScale ?? 1, 1.28);
  }
  room.bossVariantLabel = "半血急转";
  room.ambushCue = "金钹急转";
  room.mechanicHint = "机制：Boss 半血后速度提升 / P 暂停";
}

function resetStartMenuRoutePreview() {
  const dashboard = document.querySelector(".start-dashboard");
  if (dashboard) dashboard.remove();
  const version = document.querySelector(".start-version");
  if (version) version.remove();
}

function generateRunMap() {
  currentRunSeed = Math.floor(Math.random() * 1000000);
  currentStartRoomId = START_ROOM_ID;
  const selectedLayout = RUN_LAYOUTS[currentRunSeed % RUN_LAYOUTS.length] ?? RUN_LAYOUTS[0];
  const layout = selectedLayout.slots;
  const roleCounts = layout.reduce((counts, slot) => {
    counts[slot.role] = (counts[slot.role] ?? 0) + 1;
    return counts;
  }, {});
  const templatesByRole = Object.fromEntries(
    Object.entries(roleCounts).map(([role, count]) => [role, takeCycling(getTemplatePool(role), count)]),
  );
  const trialsByRole = Object.fromEntries(
    Object.entries(roleCounts).map(([role, count]) => [role, takeCycling(getTrialPool(role), count)]),
  );
  const roleIndex = {};
  let eliteIndex = 0;

  ROOMS = layout.map((slot, slotIndex) => {
    const index = roleIndex[slot.role] ?? 0;
    roleIndex[slot.role] = index + 1;
    const template = templatesByRole[slot.role]?.[index] ?? ROOM_TEMPLATES[0];
    const trial = trialsByRole[slot.role]?.[index] ?? TRIAL_POOL[slotIndex % TRIAL_POOL.length];
    const room = cloneRoomConfig(template);
    room.id = slot.id;
    room.type = slot.role;
    room.exits = { ...slot.exits };
    room.trialNo = trial.trialNo;
    room.trialName = trial.trialName;
    room.name = trial.name;
    room.lore = `${trial.trialName}，本局随机显形`;
    room.clearLore = slot.role === "treasure"
      ? `${trial.name}宝光暂收，道具择主`
      : `${trial.name}已清，下一难开路`;
    room.introSubtitle = trial.trialName;
    if (slot.role === "treasure") {
      room.mechanicHint = "机制：奖励房三选一，从大规模道具池抽取 / P 暂停";
    }
    if (slot.role === "elite") {
      room.rewardItemId = getRandomItemId(slotIndex * 7 + trial.trialNo);
      addRouteEliteAffix(room, slotIndex, eliteIndex);
      eliteIndex += 1;
    }
    if (slot.role === "final") {
      room.mechanicHint = "机制：Boss 房，击破首领即可通关 / P 暂停";
      room.clearLore = `${trial.name}首领已破，本轮取经完成`;
      addBossPhaseVariant(room, slotIndex, trial);
    }
    addWidescreenPressureEnemy(room, slotIndex);
    return room;
  });

  ROOM_BY_ID = Object.fromEntries(ROOMS.map((room) => [room.id, room]));
  ROOM_MAP_POSITIONS = buildRoomMapPositions();
  currentRunLayoutName = selectedLayout.name;
  currentRunRouteName = ROOMS
    .slice(0, 4)
    .map((room) => `第${room.trialNo}难`)
    .join(" / ");
  currentRunRouteName = `${currentRunLayoutName} / ${currentRunRouteName}`;
}

function getTrialPoolPreview(limit = 5) {
  return TRIAL_POOL
    .filter((trial) => trial.trialNo >= 60)
    .slice(0, limit)
    .map((trial) => `第${trial.trialNo}难 ${trial.name}`)
    .join(" / ");
}

function getRunRouteSummary() {
  return `种子 ${currentRunSeed} / ${currentRunRouteName || "随机路线"}`;
}

function getCompactRunRouteSummary() {
  return `路线 ${currentRunLayoutName || "随机路线"} / 种子 ${currentRunSeed}`;
}

function getShortText(value, maxLength = 10) {
  const textValue = String(value ?? "");
  return textValue.length > maxLength ? `${textValue.slice(0, maxLength)}...` : textValue;
}

function getUnexploredExitCount(room) {
  return Object.values(room.exits ?? {})
    .filter((targetId) => !exploredRoomIds.has(targetId))
    .length;
}

function getRoomTypeLabel(room) {
  if (room.type === "treasure") return "宝物房";
  if (room.type === "elite") return "精英房";
  if (room.type === "final") return "Boss房";
  return "战斗房";
}

function getRouteHudLabel(room) {
  return `${getRoomTypeLabel(room)} / 未探门 ${getUnexploredExitCount(room)}`;
}

function getRouteHudColor(room) {
  return getUnexploredExitCount(room) > 0 ? [255, 232, 150] : [176, 204, 238];
}

function getRoomAffixLabel(room) {
  if (room.eliteAffixLabel) return `词缀 ${room.eliteAffixLabel}`;
  if (room.bossVariantLabel) return `变体 ${room.bossVariantLabel}`;
  if ((room.enemies ?? []).some((enemy) => enemy.pressure)) return "词缀 压迫";
  return "";
}

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
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  scale: 2,
  crisp: true,
  global: false,
  background: [30, 31, 42],
});

const style = document.createElement("style");
style.textContent = `
  html,
  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    background: #10131c;
    color: #f4eddc;
    font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
    overflow: hidden;
  }

  body {
    display: grid;
    place-items: center;
  }

  canvas {
    display: block;
    width: min(100vw, 1920px);
    height: min(100vh, 1080px);
    max-width: 100vw;
    max-height: 100vh;
    object-fit: contain;
    box-shadow: 0 18px 42px rgba(0, 0, 0, 0.46);
    image-rendering: pixelated;
  }

  #game-shell {
    position: fixed;
    inset: 0;
    z-index: 20;
  }

  #game-shell.is-playing {
    pointer-events: none;
  }

  #game-brand,
  #game-ui-note {
    position: fixed;
    left: 24px;
    padding: 8px 10px;
    border: 1px solid rgba(255, 232, 150, 0.28);
    background: rgba(15, 18, 28, 0.68);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
  }

  #game-brand {
    top: 20px;
    display: flex;
    gap: 10px;
    align-items: baseline;
  }

  #game-brand span {
    font-size: 12px;
    color: #9be7c6;
  }

  #game-brand strong {
    font-size: 15px;
    letter-spacing: 0;
    color: #ffe79a;
  }

  #game-ui-note {
    bottom: 20px;
    font-size: 12px;
    color: #e8dfca;
  }

  #start-menu {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    background:
      linear-gradient(180deg, rgba(16, 19, 28, 0.78), rgba(16, 19, 28, 0.52)),
      radial-gradient(circle at 50% 42%, rgba(255, 232, 150, 0.18), transparent 34%);
    pointer-events: auto;
  }

  #start-menu::before,
  #start-menu::after {
    content: "";
    position: fixed;
    pointer-events: none;
  }

  #start-menu::before {
    inset: 9% 8%;
    border-top: 1px solid rgba(210, 164, 86, 0.22);
    border-bottom: 1px solid rgba(210, 164, 86, 0.18);
  }

  #start-menu::after {
    width: 74px;
    height: 74px;
    right: 8%;
    bottom: 12%;
    border: 2px solid rgba(196, 58, 46, 0.34);
    background: rgba(120, 22, 22, 0.08);
    transform: rotate(-10deg);
  }

  #start-panel {
    width: min(600px, calc(100vw - 28px));
    max-height: calc(100vh - 24px);
    overflow: auto;
    padding: 20px;
    padding-bottom: 58px;
    border: 1px solid rgba(255, 232, 150, 0.42);
    background:
      linear-gradient(90deg, rgba(255, 232, 150, 0.06), transparent 16%, transparent 84%, rgba(255, 232, 150, 0.05)),
      rgba(14, 17, 26, 0.84);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.38);
    backdrop-filter: blur(8px);
    text-align: center;
  }

  .start-kicker {
    display: block;
    margin-bottom: 6px;
    font-size: 11px;
    color: #9be7c6;
  }

  #start-panel h1 {
    margin: 0;
    font-size: 31px;
    font-weight: 700;
    letter-spacing: 0;
    color: #ffe79a;
  }

  #start-panel p {
    margin: 8px auto 12px;
    max-width: 360px;
    font-size: 12px;
    line-height: 1.55;
    color: #efe7d3;
  }

  .start-loadout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin: 0 auto 12px;
    max-width: 360px;
  }

  .start-loadout span {
    min-height: 30px;
    display: grid;
    place-items: center;
    padding: 5px 8px;
    border: 1px solid rgba(155, 231, 198, 0.24);
    background: rgba(155, 231, 198, 0.08);
    color: #dff8e9;
    font-size: 11px;
    line-height: 1.3;
  }

  .start-dashboard {
    margin: 0 auto 12px;
    max-width: 560px;
    text-align: left;
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
    gap: 10px;
  }

  .route-preview,
  .menu-brief {
    border: 1px solid rgba(255, 232, 150, 0.24);
    background: rgba(255, 232, 150, 0.07);
    padding: 8px;
  }

  .menu-section-title {
    display: block;
    margin-bottom: 6px;
    font-size: 11px;
    color: #ffe79a;
  }

  .route-line {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .route-preview {
    min-height: 100%;
    margin: 0 auto 14px;
    max-width: 420px;
  }

  .start-dashboard .route-preview {
    margin-bottom: 0;
  }

  .route-map {
    display: grid;
    grid-template-columns: repeat(var(--map-cols), minmax(58px, 1fr));
    grid-template-rows: repeat(var(--map-rows), 34px);
    gap: 5px;
    position: relative;
  }

  .route-node {
    min-height: 30px;
    padding: 4px 6px;
    border: 1px solid rgba(155, 231, 198, 0.28);
    background: rgba(9, 13, 20, 0.44);
    color: #eaf6ee;
    font-size: 10px;
    line-height: 1.2;
    display: grid;
    align-content: center;
    gap: 2px;
    position: relative;
    isolation: isolate;
  }

  .route-node::before {
    content: "";
    position: absolute;
    inset: -4px;
    border-top: 1px solid rgba(255, 232, 150, 0.1);
    opacity: 0.7;
    z-index: -1;
  }

  .route-node em {
    font-style: normal;
    font-size: 8px;
    color: rgba(244, 237, 220, 0.58);
  }

  .route-node.is-branch {
    border-color: rgba(136, 228, 210, 0.42);
    color: #bdf6ed;
  }

  .route-node.is-treasure {
    border-color: rgba(255, 216, 116, 0.46);
    color: #ffe39a;
  }

  .route-node.is-elite,
  .route-node.is-final {
    border-color: rgba(255, 139, 116, 0.48);
    color: #ffc1ad;
  }

  .route-node.is-final {
    border-color: rgba(255, 236, 142, 0.7);
    color: #fff0a6;
    box-shadow: inset 0 0 18px rgba(255, 236, 142, 0.08);
  }

  .menu-brief p {
    margin: 0 0 5px;
    color: #efe7d3;
    font-size: 11px;
    line-height: 1.45;
  }

  .menu-brief p:last-child {
    margin-bottom: 0;
  }

  .menu-brief strong {
    color: #ffe79a;
    font-weight: 700;
  }

  .trial-teaser {
    margin: 7px 0 0;
    padding-top: 6px;
    border-top: 1px solid rgba(255, 232, 150, 0.14);
    color: #cdd8e6;
    font-size: 10px;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .trial-teaser span {
    color: #ffe79a;
  }

  .start-version {
    margin: -4px 0 14px;
    color: #aeb8c8;
    font-size: 11px;
  }

  #start-button {
    position: sticky;
    bottom: 0;
    z-index: 2;
    min-width: 132px;
    height: 38px;
    margin-top: 2px;
    border: 1px solid rgba(255, 232, 150, 0.78);
    background: #ffe79a;
    color: #171518;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    isolation: isolate;
    box-shadow:
      0 -12px 16px rgba(14, 17, 26, 0.88),
      0 8px 20px rgba(255, 232, 150, 0.16);
  }

  #start-button:disabled {
    cursor: default;
    opacity: 0.72;
  }

  @media (max-width: 620px) {
    #start-panel {
      padding: 14px;
      padding-bottom: 54px;
    }

    #start-panel h1 {
      font-size: 25px;
    }

    #start-panel p {
      margin-bottom: 10px;
      font-size: 11px;
    }

    .start-loadout {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6px;
    }

    .start-loadout span {
      min-height: 28px;
      padding: 4px;
      font-size: 10px;
    }

    #start-button {
      width: min(180px, 100%);
    }

    .route-map {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: none;
    }

    .route-node {
      grid-column: auto !important;
      grid-row: auto !important;
    }

    .start-dashboard {
      grid-template-columns: 1fr;
    }

    #game-brand,
    #game-ui-note {
      left: 12px;
      right: 12px;
    }
  }
`;
document.head.appendChild(style);

function initGsapShell() {
  const shell = document.querySelector("#game-shell");
  const brand = document.querySelector("#game-brand");
  const note = document.querySelector("#game-ui-note");
  const menu = document.querySelector("#start-menu");
  const panel = document.querySelector("#start-panel");
  const button = document.querySelector("#start-button");
  const canvas = document.querySelector("canvas");
  if (!shell || !brand || !note || !menu || !panel || !button) return;

  const roomTypeLabel = {
    combat: "战斗",
    treasure: "奖励",
    elite: "精英",
    boss: "Boss",
    final: "终点",
  };
  const roomTypeClass = {
    treasure: "is-treasure",
    elite: "is-elite",
    final: "is-final",
  };

  if (!panel.querySelector(".start-loadout")) {
    const loadout = document.createElement("div");
    loadout.className = "start-loadout";
    ["多房间探索", "攻击道具", "黄眉 Boss"].forEach((label) => {
      const item = document.createElement("span");
      item.textContent = label;
      loadout.appendChild(item);
    });
    panel.insertBefore(loadout, button);
  }

  if (!panel.querySelector(".start-dashboard")) {
    const dashboard = document.createElement("div");
    dashboard.className = "start-dashboard";
    const mapPositions = ROOMS
      .map((room) => ROOM_MAP_POSITIONS[room.id])
      .filter(Boolean);
    const minMapX = Math.min(...mapPositions.map((mapPos) => mapPos.x));
    const minMapY = Math.min(...mapPositions.map((mapPos) => mapPos.y));
    const maxMapX = Math.max(...mapPositions.map((mapPos) => mapPos.x));
    const maxMapY = Math.max(...mapPositions.map((mapPos) => mapPos.y));
    const mapCols = maxMapX - minMapX + 1;
    const mapRows = maxMapY - minMapY + 1;
    const routeNodes = ROOMS.map((room) => {
      const mapPos = ROOM_MAP_POSITIONS[room.id] ?? { x: minMapX, y: minMapY };
      const isBranch = Object.keys(room.exits ?? {}).length > 2;
      const className = ["route-node", roomTypeClass[room.type] ?? "", isBranch ? "is-branch" : ""]
        .filter(Boolean)
        .join(" ");
      const typeLabel = roomTypeLabel[room.type] ?? "房间";
      const gridColumn = mapPos.x - minMapX + 1;
      const gridRow = mapPos.y - minMapY + 1;
      return `<span class="${className}" style="grid-column:${gridColumn};grid-row:${gridRow}">${room.name}<em>${typeLabel}</em></span>`;
    }).join("");
    dashboard.innerHTML = `
      <div class="route-preview">
        <span class="menu-section-title">本局随机路线</span>
        <div class="route-map" style="--map-cols:${mapCols};--map-rows:${mapRows}">
          ${routeNodes}
        </div>
      </div>
      <div class="menu-brief">
        <span class="menu-section-title">探索情报</span>
        <p><strong>每次新局</strong>都会从 81 难题材池抽取本局房间。</p>
        <p><strong>奖励房</strong>从 28 个道具池里三选一，精英房也会掉落随机道具。</p>
        <p>按 P 暂停看地图，按 M 切换静音。</p>
        <p>本局种子：${currentRunSeed} / ${currentRunRouteName}</p>
        <div class="trial-teaser"><span>81 难题材池</span>：${getTrialPoolPreview()}</div>
      </div>
    `;
    panel.insertBefore(dashboard, button);
  }

  if (!panel.querySelector(".start-version")) {
    const version = document.createElement("div");
    version.className = "start-version";
    version.textContent = "当前体验：本局随机 12 房 / 81 难题材池 / 28 道具池 / Boss 房";
    panel.insertBefore(version, button);
  }

  if (canvas) {
    gsap.set(canvas, { scale: 0.985, filter: "saturate(0.78) brightness(0.82)" });
  }
  gsap.set([brand, note], { autoAlpha: 0, y: -10 });
  gsap.set(panel, { autoAlpha: 0, y: 18, scale: 0.98 });
  gsap.set(".start-loadout span", { autoAlpha: 0, y: 8 });
  gsap.set([".route-preview", ".menu-brief", ".start-version"], { autoAlpha: 0, y: 10 });
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.62 })
    .to(".start-loadout span", { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.06 }, "-=0.22")
    .to([".route-preview", ".menu-brief", ".start-version"], { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.07 }, "-=0.18")
    .to(brand, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.3")
    .to(note, { autoAlpha: 0.9, y: 0, duration: 0.45 }, "-=0.22");

  const menuLoopTweens = [
    gsap.to(".route-node.is-final", {
    y: -2,
    duration: 1.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    }),
    gsap.to(".menu-brief", {
      autoAlpha: 0.84,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    }),
  ];

  button.addEventListener("mouseenter", () => {
    gsap.to(button, { scale: 1.04, duration: 0.18, ease: "power2.out" });
  });
  button.addEventListener("mouseleave", () => {
    gsap.to(button, { scale: 1, duration: 0.18, ease: "power2.out" });
  });
  button.addEventListener("click", () => {
    if (gameStarted) return;
    gameStarted = true;
    menuLoopTweens.forEach((tween) => tween.kill());
    button.disabled = true;
    button.textContent = "进入劫难...";
    shell.classList.add("is-playing");
    const startTimeline = gsap.timeline({ defaults: { ease: "power2.inOut" } })
      .to(button, { scale: 0.98, duration: 0.12 }, 0)
      .to(panel, { autoAlpha: 0, y: -16, scale: 0.98, duration: 0.32 })
      .to(menu, { autoAlpha: 0, duration: 0.28 }, "-=0.12")
      .set(menu, { display: "none" })
      .to(note, { autoAlpha: 0.62, duration: 0.5, ease: "power1.out" });
    if (canvas) {
      startTimeline.to(canvas, { scale: 1, filter: "saturate(1) brightness(1)", duration: 0.42 }, 0);
    }
  });
}

generateRunMap();
initGsapShell();

loadSprite("wukong", "/sprites/wukong.svg");
loadSprite("demon", "/sprites/demon.svg");
loadSprite("flameDemon", "/sprites/flame-demon.svg");
loadSprite("redBoy", "/sprites/red-boy.svg");
loadSprite("boneDemon", "/sprites/bone-demon.svg");
loadSprite("blackWindDemon", "/sprites/black-wind-demon.svg");
loadSprite("sandDemon", "/sprites/sand-demon.svg");
loadSprite("greenBullDemon", "/sprites/green-bull-demon.svg");
loadSprite("spiderDemon", "/sprites/spider-demon.svg");
loadSprite("taoistDemon", "/sprites/taoist-demon.svg");
loadSprite("lionElite", "/sprites/lion-elite.svg");
loadSprite("yellowBrowBoss", "/sprites/yellow-brow-boss.svg");
loadSprite("staff", "/sprites/staff.svg");
loadSprite("portal", "/sprites/portal.svg");
loadSprite("healPeach", "/sprites/heal-peach.svg");
loadSprite("cloneHair", "/sprites/clone-hair.svg");
loadSprite("plantainFan", "/sprites/plantain-fan.svg");
loadSprite("windPearl", "/sprites/wind-pearl.svg");

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

function isSpawnBlocked(room, enemyConfig, size = WIDESCREEN_PRESSURE_ENEMY_SIZE) {
  const spawnRect = { x: enemyConfig.x, y: enemyConfig.y, w: size, h: size };
  return (room.walls ?? []).some((wall) => rectsOverlap(spawnRect, wall))
    || (room.enemies ?? []).some((enemy) => rectsOverlap(
      spawnRect,
      { x: enemy.x, y: enemy.y, w: enemy.size ?? ENEMY_SIZE, h: enemy.size ?? ENEMY_SIZE },
    ));
}

function isRuntimeSpawnBlocked(enemyConfig, size, existingEnemies = []) {
  const spawnRect = { x: enemyConfig.x, y: enemyConfig.y, w: size, h: size };
  return activeWalls.some((wall) => rectsOverlap(spawnRect, wall))
    || existingEnemies.some((enemy) => {
      if (!enemy.body?.exists()) return false;
      const enemySize = enemy.size ?? ENEMY_SIZE;
      return rectsOverlap(spawnRect, { x: enemy.body.pos.x, y: enemy.body.pos.y, w: enemySize, h: enemySize });
    });
}

function getSafeEnemySpawnConfig(enemyConfig, existingEnemies = []) {
  const enemySize = enemyConfig.size ?? ENEMY_SIZE;
  if (!isRuntimeSpawnBlocked(enemyConfig, enemySize, existingEnemies)) return enemyConfig;

  const offsets = [
    { x: -72, y: 0 },
    { x: 72, y: 0 },
    { x: 0, y: -72 },
    { x: 0, y: 72 },
    { x: -72, y: -72 },
    { x: 72, y: -72 },
    { x: -72, y: 72 },
    { x: 72, y: 72 },
    { x: -120, y: 0 },
    { x: 120, y: 0 },
    { x: 0, y: -120 },
    { x: 0, y: 120 },
  ];

  const safeSpawn = offsets
    .map((offset) => ({
      ...enemyConfig,
      x: Math.max(18, Math.min(width() - enemySize - 18, enemyConfig.x + offset.x)),
      y: Math.max(58, Math.min(height() - enemySize - 18, enemyConfig.y + offset.y)),
    }))
    .find((candidate) => !isRuntimeSpawnBlocked(candidate, enemySize, existingEnemies));

  return safeSpawn ?? {
    ...enemyConfig,
    x: Math.max(18, Math.min(width() - enemySize - 18, enemyConfig.x)),
    y: Math.max(58, Math.min(height() - enemySize - 18, enemyConfig.y)),
  };
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

function buildRoomMapPositions() {
  const positions = { [currentStartRoomId]: { x: 0, y: 0 } };
  const queue = [currentStartRoomId];
  while (queue.length > 0) {
    const roomId = queue.shift();
    const room = ROOM_BY_ID[roomId];
    if (!room) continue;
    Object.entries(room.exits ?? {}).forEach(([direction, targetId]) => {
      if (!ROOM_BY_ID[targetId] || positions[targetId]) return;
      const offset = MAP_DIRECTION_OFFSET[direction];
      if (!offset) return;
      positions[targetId] = {
        x: positions[roomId].x + offset.x,
        y: positions[roomId].y + offset.y,
      };
      queue.push(targetId);
    });
  }
  return positions;
}

function getRoomById(roomId) {
  return ROOM_BY_ID[roomId] ?? ROOMS[0];
}

function getRoomIndex(roomId) {
  return Math.max(0, ROOMS.findIndex((room) => room.id === roomId));
}

function getRoomProgressLabel(room) {
  return `${getRoomIndex(room.id) + 1}/${ROOMS.length}`;
}

function getRoomTrialLabel(room) {
  return room.trialNo ? `第 ${room.trialNo} 难 · ${room.trialName ?? room.name}` : room.name;
}

function getEntrySpawn(room, fromDirection) {
  if (fromDirection && room.entrySpawns?.[fromDirection]) {
    return room.entrySpawns[fromDirection];
  }
  if (fromDirection && ENTRY_SPAWNS[fromDirection]) {
    return ENTRY_SPAWNS[fromDirection];
  }
  return room.player;
}

function getExitLabel(room) {
  const labels = Object.keys(room.exits ?? {})
    .map((direction) => DIRECTION_LABELS[direction] ?? direction);
  return labels.length > 0 ? labels.join(" ") : "无";
}

function getExitPreviewText(roomExits, doorsOpened) {
  if (roomExits.length === 0) return "出口：无";
  if (!doorsOpened) return `出口：${roomExits.map((exit) => DIRECTION_LABELS[exit.direction] ?? exit.direction).join(" ")} / 清敌后开启`;
  const labels = roomExits.map((exit) => {
    const targetRoom = getRoomById(exit.targetId);
    return `${DIRECTION_LABELS[exit.direction] ?? exit.direction}->${targetRoom.name}`;
  });
  const rows = [];
  for (let i = 0; i < labels.length; i += 2) {
    rows.push(labels.slice(i, i + 2).join("  "));
  }
  return `出口：${rows.join("\n")}`;
}

function getSuggestedExit(roomExits) {
  return roomExits.find((exit) => !exploredRoomIds.has(exit.targetId))
    ?? roomExits.find((exit) => !clearedRoomIds.has(exit.targetId))
    ?? roomExits[0]
    ?? null;
}

function getSuggestedExitText(roomExits) {
  const suggestedExit = getSuggestedExit(roomExits);
  if (!suggestedExit) return "";
  const directionLabel = DIRECTION_LABELS[suggestedExit.direction] ?? suggestedExit.direction;
  const targetRoom = getRoomById(suggestedExit.targetId);
  return `建议：${directionLabel}->${getDoorLabelText(targetRoom, true)}`;
}

function getOpenExitPreviewText(roomExits) {
  const suggestedExitText = getSuggestedExitText(roomExits);
  return suggestedExitText ? `${suggestedExitText} / 其余看门名` : getExitPreviewText(roomExits, true);
}

function getObjectiveTitle(room, enemiesLeft, doorsOpened, isBossAmbushActive = false) {
  if (room.type === "treasure") return "当前目标：三选一宝物";
  if (doorsOpened) return room.type === "final" ? "当前目标：通关" : "当前目标：进入下一房";
  if (room.type === "final") {
    return isBossAmbushActive ? `当前目标：清掉黄眉护法 ${enemiesLeft}` : "当前目标：击破黄眉";
  }
  if (enemiesLeft > 0) return `当前目标：清掉妖怪 ${enemiesLeft}`;
  return "当前目标：等待开门";
}

function getSealedDoorHintText(room, enemiesLeft, isBossAmbushActive = false) {
  if (enemiesLeft <= 0) return "封印正在解除";
  if (room.type === "final") {
    return isBossAmbushActive ? `封印未解：护法还剩 ${enemiesLeft}` : "封印未解：黄眉还未击破";
  }
  return `封印未解：妖怪还剩 ${enemiesLeft}`;
}

function getDoorLabelPosition(exit) {
  const centerX = exit.x + DOOR_SIZE / 2;
  const centerY = exit.y + DOOR_SIZE / 2;
  if (exit.direction === "up") return { x: centerX, y: exit.y + DOOR_SIZE + 16 };
  if (exit.direction === "down") return { x: centerX, y: exit.y - 14 };
  if (exit.direction === "left") return { x: exit.x + DOOR_SIZE + 42, y: centerY };
  if (exit.direction === "right") return { x: exit.x - 42, y: centerY };
  return { x: centerX, y: Math.max(58, exit.y - 10) };
}

function getDoorLabelAnchor(exit) {
  if (exit.direction === "left") return "left";
  if (exit.direction === "right") return "right";
  return "center";
}

function getDoorLabelBoxPosition(exit, labelPos) {
  if (exit.direction === "left") return { x: labelPos.x - 8, y: labelPos.y - DOOR_LABEL_BOX_HEIGHT / 2 };
  if (exit.direction === "right") return { x: labelPos.x - DOOR_LABEL_BOX_WIDTH + 8, y: labelPos.y - DOOR_LABEL_BOX_HEIGHT / 2 };
  return { x: labelPos.x - DOOR_LABEL_BOX_WIDTH / 2, y: labelPos.y - DOOR_LABEL_BOX_HEIGHT / 2 };
}

function getRoomVisitStateLabel(room) {
  if (clearedRoomIds.has(room.id)) return "已清";
  if (exploredRoomIds.has(room.id)) return "已探";
  return "未探";
}

function getDoorLabelText(room, compact = false) {
  const typeMark = ROOM_TYPE_MAP_STYLE[room.type]?.mark;
  const visitState = getRoomVisitStateLabel(room);
  const typePrefix = typeMark ? `${typeMark} ` : "";
  if (compact) return `${typePrefix}${visitState} ${room.name}`;
  return `${typePrefix}${visitState}\n${room.name}`;
}

function getDoorAccentColor(room) {
  return (ROOM_TYPE_MAP_STYLE[room.type] ?? ROOM_TYPE_MAP_STYLE.combat).border;
}

function addHudPanel(panel, panelColor = [12, 14, 22], outlineColor = [82, 88, 104]) {
  add([
    rect(panel.w, panel.h),
    pos(panel.x, panel.y),
    color(...panelColor),
    opacity(HUD_PANEL_OPACITY),
    outline(1, outlineColor),
    z(HUD_Z),
  ]);
}

function addHudChip(x, y, w, h, chipColor, outlineColor) {
  return add([
    rect(w, h),
    pos(x, y),
    color(...chipColor),
    opacity(0.34),
    outline(1, outlineColor),
    z(HUD_Z),
  ]);
}

function addAttackChargeTicks(x, y, tickCount, outlineColor) {
  return Array.from({ length: tickCount }, (_, index) => add([
    rect(8, 10),
    pos(x + index * 11, y),
    color(76, 78, 88),
    opacity(0.38),
    outline(1, outlineColor),
    z(HUD_Z),
    "attackChargeTick",
  ]));
}

function addMiniMapLegendItem(x, y, swatchColor, outlineColor, label) {
  add([
    rect(7, 7),
    pos(x, y + 1),
    color(...swatchColor),
    opacity(0.9),
    outline(1, outlineColor),
    z(HUD_TEXT_Z),
  ]);
  add([
    text(label, { size: 7 }),
    pos(x + 11, y),
    color(202, 204, 196),
    z(HUD_TEXT_Z),
  ]);
}

function addMiniMap(currentRoom) {
  const adjacentRoomIds = new Set(Object.values(currentRoom.exits ?? {}));
  const mapEntries = ROOMS
    .filter((room) => room.id === currentRoom.id
      || exploredRoomIds.has(room.id)
      || clearedRoomIds.has(room.id)
      || adjacentRoomIds.has(room.id))
    .map((room) => ({ room, mapPos: ROOM_MAP_POSITIONS[room.id] }))
    .filter((entry) => entry.mapPos);
  if (mapEntries.length === 0) return;

  const originX = HUD_RIGHT_PANEL.x + HUD_RIGHT_PANEL.w / 2;
  const originY = HUD_RIGHT_PANEL.y + 54;
  const tileSize = 10;
  const gap = 5;
  const minX = Math.min(...mapEntries.map((entry) => entry.mapPos.x));
  const maxX = Math.max(...mapEntries.map((entry) => entry.mapPos.x));
  const minY = Math.min(...mapEntries.map((entry) => entry.mapPos.y));
  const maxY = Math.max(...mapEntries.map((entry) => entry.mapPos.y));
  const centerOffsetX = ((maxX - minX) * (tileSize + gap)) / 2;

  add([
    text(`地图 ${currentRoom.name}`, { size: 9 }),
    pos(originX, HUD_RIGHT_PANEL.y + 28),
    anchor("center"),
    color(220, 222, 216),
    z(HUD_TEXT_Z),
  ]);

  mapEntries.forEach(({ room, mapPos }) => {
    const isCurrent = room.id === currentRoom.id;
    const isCleared = clearedRoomIds.has(room.id);
    const isExplored = exploredRoomIds.has(room.id);
    const isAdjacent = adjacentRoomIds.has(room.id);
    const isHiddenNeighbor = isAdjacent && !isExplored && !isCleared;
    const typeStyle = ROOM_TYPE_MAP_STYLE[room.type] ?? ROOM_TYPE_MAP_STYLE.combat;
    const tileX = originX + (mapPos.x - minX) * (tileSize + gap) - centerOffsetX;
    const tileY = originY + (mapPos.y - minY) * (tileSize + gap);
    const fill = isCurrent
      ? [255, 232, 150]
      : isCleared
        ? [104, 216, 128]
        : isExplored
          ? [150, 176, 210]
          : [60, 64, 74];
    if (isCurrent) {
      const pulse = add([
        rect(tileSize + 6, tileSize + 6),
        pos(tileX - 3, tileY - 3),
        color(255, 232, 150),
        opacity(0.18),
        outline(1, [255, 250, 210]),
        z(HUD_TEXT_Z - 1),
        "miniMapCurrentPulse",
      ]);
      pulse.phase = (tileX + tileY) * 0.03;
    }
    add([
      rect(tileSize, tileSize),
      pos(tileX, tileY),
      color(...fill),
      opacity(isExplored || isCurrent || isCleared ? 0.92 : 0.52),
      outline(isCurrent ? 2 : 1, isCurrent ? [255, 250, 210] : typeStyle.border),
      z(HUD_TEXT_Z),
    ]);
    if (isHiddenNeighbor) {
      add([
        text("?", { size: 7 }),
        pos(tileX + tileSize / 2, tileY + tileSize / 2),
        anchor("center"),
        color(232, 232, 210),
        opacity(0.78),
        z(HUD_TEXT_Z + 1),
      ]);
    } else if (typeStyle.mark) {
      add([
        text(typeStyle.mark, { size: 6 }),
        pos(tileX + tileSize / 2, tileY + tileSize / 2),
        anchor("center"),
        color(20, 22, 28),
        opacity(isExplored || isCurrent || isCleared ? 0.9 : 0.55),
        z(HUD_TEXT_Z + 1),
      ]);
    }
  });

  const legendX = HUD_RIGHT_PANEL.x + 12;
  const legendY = HUD_RIGHT_PANEL.y + HUD_RIGHT_PANEL.h - 35;
  const footerY = Math.min(
    originY + (maxY - minY + 1) * (tileSize + gap) + 6,
    legendY - 14,
  );
  add([
    text(`出口 ${getExitLabel(currentRoom)}`, { size: 9 }),
    pos(HUD_RIGHT_PANEL.x + HUD_RIGHT_PANEL.w - HUD_MARGIN, footerY),
    anchor("topright"),
    color(204, 206, 198),
    z(HUD_TEXT_Z),
  ]);
  addMiniMapLegendItem(legendX, legendY, [255, 232, 150], [255, 250, 210], "当前");
  addMiniMapLegendItem(legendX + 58, legendY, [104, 216, 128], [146, 244, 164], "已清");
  addMiniMapLegendItem(legendX + 110, legendY, [60, 64, 74], [104, 116, 128], "未知");
  addMiniMapLegendItem(legendX, legendY + 14, [255, 214, 104], ROOM_TYPE_MAP_STYLE.treasure.border, "宝物");
  addMiniMapLegendItem(legendX + 58, legendY + 14, [255, 132, 84], ROOM_TYPE_MAP_STYLE.elite.border, "精英");
  addMiniMapLegendItem(legendX + 110, legendY + 14, [255, 244, 164], ROOM_TYPE_MAP_STYLE.final.border, "Boss");
}

function drawRoomDecor(room) {
  (room.decor ?? []).forEach((mark) => {
    add([
      rect(mark.w, mark.h),
      pos(mark.x, mark.y),
      color(...mark.color),
      opacity(mark.opacity ?? 0.16),
      z(-1),
    ]);
  });
}

function limitVelocity(velocity, maxSpeed) {
  const speed = Math.hypot(velocity.x, velocity.y);
  if (speed <= maxSpeed || speed === 0) return;
  velocity.x = (velocity.x / speed) * maxSpeed;
  velocity.y = (velocity.y / speed) * maxSpeed;
}

function rotateVelocity(velocity, angle) {
  const nextX = velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle);
  const nextY = velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle);
  velocity.x = nextX;
  velocity.y = nextY;
}

function moveOnAxis(body, dx, dy, bodySize) {
  return moveByAmount(body, dx * dt(), dy * dt(), bodySize);
}

function getNormalizedMoveVector(speed) {
  let dx = 0;
  let dy = 0;
  if (isKeyDown("a")) dx -= 1;
  if (isKeyDown("d")) dx += 1;
  if (isKeyDown("w")) dy -= 1;
  if (isKeyDown("s")) dy += 1;
  if (dx !== 0 && dy !== 0) {
    const diagonalScale = Math.SQRT1_2;
    dx *= diagonalScale;
    dy *= diagonalScale;
  }
  return { dx: dx * speed, dy: dy * speed };
}

function centersWithinDistance(firstBody, firstSize, secondBody, secondSize, maxDistance) {
  const firstCenterX = firstBody.pos.x + firstSize / 2;
  const firstCenterY = firstBody.pos.y + firstSize / 2;
  const secondCenterX = secondBody.pos.x + secondSize / 2;
  const secondCenterY = secondBody.pos.y + secondSize / 2;
  return Math.hypot(firstCenterX - secondCenterX, firstCenterY - secondCenterY) <= maxDistance;
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

function addPlayerGuardRing(player) {
  const ringSize = PLAYER_SIZE + PLAYER_GUARD_RING_PADDING * 2;
  return add([
    rect(ringSize, ringSize),
    pos(player.pos.x - PLAYER_GUARD_RING_PADDING, player.pos.y - PLAYER_GUARD_RING_PADDING),
    color(255, 232, 126),
    opacity(0),
    outline(2, [255, 248, 190]),
    z(-1),
    "playerGuardRing",
  ]);
}

function addDemonEnemy(x, y, spriteName, enemySize = ENEMY_SIZE) {
  return add([
    sprite(spriteName, { width: enemySize, height: enemySize }),
    pos(x, y),
    area(),
    "enemy",
  ]);
}

function addEliteHealthBar(enemyBody, enemySize) {
  const maxHp = enemyBody.maxHp ?? 1;
  if (maxHp <= 1) return null;

  const totalWidth = maxHp * ELITE_HEALTH_TICK_WIDTH + (maxHp - 1) * ELITE_HEALTH_TICK_GAP;
  const ticks = Array.from({ length: maxHp }, (_, index) => add([
    rect(ELITE_HEALTH_TICK_WIDTH, ELITE_HEALTH_TICK_HEIGHT),
    pos(enemyBody.pos.x + enemySize / 2 - totalWidth / 2 + index * (ELITE_HEALTH_TICK_WIDTH + ELITE_HEALTH_TICK_GAP), enemyBody.pos.y - 8),
    color(255, 82, 76),
    outline(1, [58, 24, 28]),
    opacity(1),
    "eliteHealthTick",
  ]));

  return { ticks, totalWidth };
}

function updateEliteHealthBar(enemy) {
  if (!enemy.healthBar) return;
  const enemySize = enemy.size ?? ENEMY_SIZE;
  enemy.healthBar.ticks.forEach((tick, index) => {
    if (!tick.exists()) return;
    tick.pos.x = enemy.body.pos.x + enemySize / 2 - enemy.healthBar.totalWidth / 2 + index * (ELITE_HEALTH_TICK_WIDTH + ELITE_HEALTH_TICK_GAP);
    tick.pos.y = enemy.body.pos.y - 8;
    tick.opacity = index < enemy.body.hp ? 1 : 0.22;
    tick.color = index < enemy.body.hp ? [255, 82, 76] : [92, 62, 66];
  });
}

function destroyEliteHealthBar(enemy) {
  if (!enemy.healthBar) return;
  enemy.healthBar.ticks.forEach((tick) => {
    if (tick.exists()) {
      destroy(tick);
    }
  });
}

function addHealPeach(x, y) {
  return add([
    sprite("healPeach", { width: HEAL_PEACH_SIZE, height: HEAL_PEACH_SIZE }),
    pos(x, y),
    area(),
    opacity(1),
    "healPeach",
  ]);
}

function addCloneHairItem(x, y) {
  return add([
    sprite("cloneHair", { width: ATTACK_ITEM_SIZE, height: ATTACK_ITEM_SIZE }),
    pos(x, y),
    area(),
    opacity(1),
    "attackItem",
  ]);
}

function addPlantainFanItem(x, y) {
  return add([
    sprite("plantainFan", { width: ATTACK_ITEM_SIZE, height: ATTACK_ITEM_SIZE }),
    pos(x, y),
    area(),
    opacity(1),
    "attackItem",
  ]);
}

function addWindPearlItem(x, y) {
  return add([
    sprite("windPearl", { width: ATTACK_ITEM_SIZE, height: ATTACK_ITEM_SIZE }),
    pos(x, y),
    area(),
    opacity(1),
    "attackItem",
  ]);
}

function getRunItemInfo(itemId = runItem) {
  return RUN_ITEM_INFO[itemId] ?? null;
}

function getItemEffectLabel(itemInfo) {
  if (!itemInfo) return "未知";
  if (itemInfo.effect === "double") return "双发";
  if (itemInfo.effect === "fan") return "扇形";
  if (itemInfo.effect === "shield") return "护身";
  if (itemInfo.effect === "speed") return "移速";
  if (itemInfo.effect === "pierce") return "穿透";
  if (itemInfo.effect === "bind") return "缓速";
  return "特殊";
}

function getRunItemSummary(itemInfo = getRunItemInfo()) {
  return itemInfo ? `${itemInfo.name}/${getItemEffectLabel(itemInfo)}` : "无道具";
}

function getTreasureChoiceItemIds(roomId) {
  const seed = [...roomId].reduce((total, char) => total + char.charCodeAt(0), 0) + runStats.defeats;
  const effects = TREASURE_CHOICE_EFFECTS
    .map((effect, index) => ({ effect, sortKey: (seed + index * 17) % 97 }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(0, 3)
    .map((entry) => entry.effect);
  return effects.map((effect, effectIndex) => {
    const candidates = RUN_ITEM_IDS.filter((itemId) => RUN_ITEM_INFO[itemId].effect === effect);
    return candidates[(seed + effectIndex * 3) % candidates.length] ?? candidates[0];
  });
}

function spawnAttackItem(itemId, x, y) {
  const itemInfo = getRunItemInfo(itemId) ?? RUN_ITEM_INFO.cloneHair;
  const item = add([
    sprite(itemInfo.sprite, { width: ATTACK_ITEM_SIZE, height: ATTACK_ITEM_SIZE }),
    pos(x, y),
    area(),
    opacity(1),
    "attackItem",
  ]);
  item.itemId = itemId;
  return item;
}

function spawnTreasureChoiceItem(itemId, x, y, roomId) {
  const item = spawnAttackItem(itemId, x, y);
  item.treasureChoiceRoomId = roomId;
  return item;
}

function addTreasureChoiceLabel(itemId, x, y) {
  const itemInfo = getRunItemInfo(itemId) ?? RUN_ITEM_INFO.cloneHair;
  const labelText = `${itemInfo.name}\n${getItemEffectLabel(itemInfo)}`;
  const labelY = Math.max(62, y - 42);
  const box = add([
    rect(52, 25),
    pos(x + ATTACK_ITEM_SIZE / 2, labelY),
    anchor("center"),
    color(18, 20, 28),
    opacity(0.78),
    outline(1, itemInfo.color),
    z(HUD_Z - 1),
    "treasureChoiceLabel",
  ]);
  const label = add([
    text(labelText, { size: 8 }),
    pos(x + ATTACK_ITEM_SIZE / 2, labelY - 8),
    anchor("top"),
    color(...itemInfo.color),
    z(HUD_Z),
    "treasureChoiceLabel",
  ]);
  return [box, label];
}

function rotateDirection(dirX, dirY, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: dirX * cos - dirY * sin,
    y: dirX * sin + dirY * cos,
  };
}

function addStaffBullet(x, y, dirX, dirY, options = {}) {
  const horizontal = dirX !== 0;
  const body = add([
    sprite("staff", {
      width: horizontal ? STAFF_BULLET_LONG : STAFF_BULLET_SHORT,
      height: horizontal ? STAFF_BULLET_SHORT : STAFF_BULLET_LONG,
      flipX: dirX < 0,
      flipY: dirY < 0,
    }),
    pos(x, y),
    area(),
    opacity(options.opacity ?? 1),
    "bullet",
  ]);
  const sideDrift = options.sideDrift ?? 0;
  body.velocity = {
    x: dirX * BULLET_SPEED + (horizontal ? 0 : sideDrift * BULLET_SPEED),
    y: dirY * BULLET_SPEED + (horizontal ? sideDrift * BULLET_SPEED : 0),
  };
  body.life = 0;
  body.pierceLeft = options.pierceLeft ?? 0;
  body.isPiercing = options.isPiercing ?? false;
  body.trailTimer = 0;
  body.hitEnemies = new Set();
  if (options.tint) body.color = options.tint;
  body.hitSize = horizontal
    ? { w: STAFF_BULLET_LONG, h: STAFF_BULLET_SHORT }
    : { w: STAFF_BULLET_SHORT, h: STAFF_BULLET_LONG };
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
  const enemySize = enemy.size ?? ENEMY_SIZE;
  const centerX = enemy.body.pos.x + enemySize / 2;
  const centerY = enemy.body.pos.y + enemySize / 2;
  if (room.enemyBehavior === "flameRush") {
    addHitSpark(centerX - enemy.velocity.x * 0.035, centerY - enemy.velocity.y * 0.035, { x: 0, y: -8 }, [255, 116, 58], 5);
    return;
  }
  if (room.enemyBehavior === "boneTrack") {
    addHitSpark(centerX, centerY - 11, { x: 0, y: -16 }, [166, 218, 255], 3);
    return;
  }
  if (room.enemyBehavior === "sandDrift") {
    addHitSpark(centerX - 7, centerY + Math.sin(enemy.phase) * 4, { x: -12, y: 3 }, [210, 176, 104], 3);
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

function addRoomObjectiveBanner(title, subtitle, bannerColor, maxLife = ROOM_OBJECTIVE_LIFETIME) {
  const banner = add([
    rect(300, 58),
    pos(width() / 2, height() / 2 - 76),
    anchor("center"),
    color(12, 15, 22),
    opacity(0.74),
    outline(2, bannerColor),
    z(80),
    "roomObjective",
  ]);
  banner.life = 0;
  banner.maxLife = maxLife;

  const titleText = add([
    text(title, { size: 15 }),
    pos(width() / 2, height() / 2 - 88),
    anchor("center"),
    color(...bannerColor),
    opacity(1),
    z(81),
    "roomObjective",
  ]);
  titleText.life = 0;
  titleText.maxLife = maxLife;

  const subtitleText = add([
    text(subtitle, { size: 10 }),
    pos(width() / 2, height() / 2 - 66),
    anchor("center"),
    color(226, 230, 218),
    opacity(1),
    z(81),
    "roomObjective",
  ]);
  subtitleText.life = 0;
  subtitleText.maxLife = maxLife;
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

function getClearedProgressLabel() {
  return `${clearedRoomIds.size}/${ROOMS.length}`;
}

function getClearedPercentLabel() {
  const percent = ROOMS.length > 0 ? Math.round((clearedRoomIds.size / ROOMS.length) * 100) : 0;
  return `${getClearedProgressLabel()}·${percent}%`;
}

function resetRunStats() {
  runStats = {
    defeats: 0,
    hitsTaken: 0,
    time: 0,
    bossAmbushes: 0,
    eliteAffixes: 0,
  };
  exploredRoomIds = new Set();
  clearedRoomIds = new Set();
  rewardedRoomIds = new Set();
  itemRewardedRoomIds = new Set();
  countedEliteAffixRoomIds = new Set();
  runItem = null;
}

function formatRunTime(seconds) {
  return `${Math.floor(seconds)} 秒`;
}

function getClearRank(stats) {
  if (stats.time <= 125 && stats.hitsTaken <= 1) {
    return { grade: "S", comment: "近乎无伤" };
  }
  if (stats.time <= 165 && stats.hitsTaken <= 3) {
    return { grade: "A", comment: "身法不错" };
  }
  if (stats.time <= 220 && stats.hitsTaken <= 5) {
    return { grade: "B", comment: "稳住阵脚" };
  }
  return { grade: "C", comment: "再战会更顺" };
}

function getRunItemName() {
  return getRunItemSummary();
}

function getCompactRunItemName(maxLength = 5) {
  const itemName = getRunItemName();
  return itemName.length > maxLength ? `${itemName.slice(0, maxLength)}...` : itemName;
}

function getBossAmbushLabel() {
  return runStats.bossAmbushes > 0 ? "Boss伏击 已触发" : "Boss伏击 未触发";
}

function getCompactBossAmbushLabel() {
  return runStats.bossAmbushes > 0 ? "伏击已触发" : "伏击未触发";
}

function getEliteAffixLabel() {
  return runStats.eliteAffixes > 0 ? `精英词缀 ${runStats.eliteAffixes}` : "精英词缀 0";
}

function getCompactEliteAffixLabel() {
  return runStats.eliteAffixes > 0 ? `词缀${runStats.eliteAffixes}` : "词缀0";
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

scene("game", (roomId = START_ROOM_ID, shouldResetRun = false, fromDirection = null) => {
  if (shouldResetRun) {
    generateRunMap();
    resetStartMenuRoutePreview();
    if (!gameStarted) initGsapShell();
    roomId = currentStartRoomId;
    fromDirection = null;
  }
  if (typeof roomId === "number") {
    roomId = ROOMS[roomId]?.id ?? currentStartRoomId;
  }
  const room = getRoomById(roomId);
  const roomIndex = getRoomIndex(room.id);
  const roomProgress = getRoomProgressLabel(room);
  const entrySpawn = getEntrySpawn(room, fromDirection);
  const roomExits = Object.entries(room.exits ?? {})
    .filter(([, targetId]) => ROOM_BY_ID[targetId])
    .map(([direction, targetId]) => ({
      direction,
      targetId,
      ...DOOR_POSITIONS[direction],
      ...(room.exitPositions?.[direction] ?? {}),
    }))
    .filter((exit) => typeof exit.x === "number" && typeof exit.y === "number");
  activeWalls = room.walls;
  if (shouldResetRun) {
    resetRunStats();
    runHealth = PLAYER_MAX_HEALTH;
  }
  exploredRoomIds.add(room.id);

  add([
    rect(width(), height()),
    pos(0, 0),
    color(...room.background),
    z(-2),
  ]);

  drawRoomDecor(room);

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
    const warningLabel = add([
      text("避火", { size: 10 }),
      pos(zone.x + zone.w / 2, zone.y + zone.h / 2),
      anchor("center"),
      color(255, 238, 170),
      opacity(0),
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
      warningLabel,
      fireMarker,
      timer: zone.phase,
      active: false,
    };
  });

  const player = addMonkeyHero(entrySpawn.x, entrySpawn.y);
  const playerGuardRing = addPlayerGuardRing(player);

  const roomAlreadyCleared = clearedRoomIds.has(room.id);
  const speedScale = room.enemySpeedScale ?? 1;
  function addRoomEnemy(enemyConfig) {
    const enemySize = enemyConfig.size ?? ENEMY_SIZE;
    const body = addDemonEnemy(enemyConfig.x, enemyConfig.y, enemyConfig.sprite ?? room.enemySprite, enemySize);
    body.hp = enemyConfig.hp ?? 1;
    body.maxHp = body.hp;
    body.enemySize = enemySize;
    const enemy = {
      body,
      size: enemySize,
      velocity: {
        x: enemyConfig.vx * speedScale,
        y: enemyConfig.vy * speedScale,
      },
      phase: (enemyConfig.x + enemyConfig.y) * 0.03,
      trailTimer: (enemyConfig.x % 3) * 0.04,
      hitBoostTimer: 0,
      hitBoostScale: 1,
      bindTimer: 0,
      bindSparkTimer: 0,
      eliteTimer: enemyConfig.hp > 1 ? ELITE_ROAR_INTERVAL * 0.72 : 0,
      eliteState: "idle",
      phaseCue: enemyConfig.phaseCue,
      phaseSpeedScale: enemyConfig.phaseSpeedScale ?? 1,
      bossPhaseWarned: false,
    };
    enemy.healthBar = addEliteHealthBar(body, enemySize);
    return enemy;
  }
  const enemies = (roomAlreadyCleared ? [] : room.enemies).map(addRoomEnemy);
  const hasPressureEnemy = !roomAlreadyCleared && (room.enemies ?? []).some((enemy) => enemy.pressure);
  const isTreasureRoom = room.type === "treasure";

  addHudPanel(HUD_LEFT_PANEL, [12, 14, 22], room.wallOutline);
  addHudPanel(HUD_RIGHT_PANEL, [12, 14, 22], room.wallOutline);
  addHudPanel(HUD_OBJECTIVE_PANEL, [12, 16, 22], room.wallOutline);
  addHudPanel(HUD_FEEDBACK_PANEL, [16, 18, 28], room.wallOutline);
  const objectiveAccent = add([
    rect(4, HUD_OBJECTIVE_PANEL.h - 12),
    pos(HUD_OBJECTIVE_PANEL.x + 6, HUD_OBJECTIVE_PANEL.y + 6),
    color(255, 232, 168),
    opacity(0.82),
    z(HUD_Z),
  ]);
  add([
    rect(HUD_OBJECTIVE_PANEL.w - 22, 1),
    pos(HUD_OBJECTIVE_PANEL.x + 14, HUD_OBJECTIVE_PANEL.y + 24),
    color(...room.wallOutline),
    opacity(0.7),
    z(HUD_Z),
  ]);
  add([
    rect(86, 32),
    pos(HUD_OBJECTIVE_PANEL.x + HUD_OBJECTIVE_PANEL.w - 98, HUD_OBJECTIVE_PANEL.y + 5),
    color(24, 28, 34),
    opacity(0.5),
    outline(1, room.wallOutline),
    z(HUD_Z),
  ]);
  const healthChip = addHudChip(HUD_LEFT_PANEL.x + 8, HUD_LEFT_PANEL.y + 24, 92, 18, [80, 26, 32], room.wallOutline);
  addHudChip(HUD_LEFT_PANEL.x + 106, HUD_LEFT_PANEL.y + 24, 54, 18, [28, 48, 72], room.wallOutline);
  addHudChip(HUD_LEFT_PANEL.x + 166, HUD_LEFT_PANEL.y + 24, 54, 18, [42, 72, 48], room.wallOutline);
  addHudChip(HUD_LEFT_PANEL.x + 226, HUD_LEFT_PANEL.y + 24, 66, 18, [72, 58, 28], room.wallOutline);
  addHudChip(HUD_LEFT_PANEL.x + 298, HUD_LEFT_PANEL.y + 24, 104, 18, [54, 48, 78], room.wallOutline);
  addHudChip(HUD_LEFT_PANEL.x + 8, HUD_LEFT_PANEL.y + 50, 394, 18, [42, 50, 52], room.wallOutline);

  add([
    text(`${getRoomTrialLabel(room)} ${roomProgress}：方向键射击`, { size: 13 }),
    pos(HUD_LEFT_PANEL.x + HUD_MARGIN, HUD_LEFT_PANEL.y + 7),
    color(230, 230, 238),
    z(HUD_TEXT_Z),
  ]);

  const statusText = add([
    text(`生命 ${getHealthLabel(runHealth)} / 敌 ${enemies.length} / 门 未开`, { size: 12 }),
    pos(HUD_LEFT_PANEL.x + HUD_MARGIN, HUD_LEFT_PANEL.y + 25),
    color(...room.statusColor),
    z(HUD_TEXT_Z),
  ]);

  const enemyText = add([
    text("", { size: 10 }),
    pos(HUD_LEFT_PANEL.x + 112, HUD_LEFT_PANEL.y + 29),
    color(204, 224, 255),
    z(HUD_TEXT_Z),
  ]);

  const doorText = add([
    text("", { size: 10 }),
    pos(HUD_LEFT_PANEL.x + 172, HUD_LEFT_PANEL.y + 29),
    color(196, 238, 190),
    z(HUD_TEXT_Z),
  ]);

  const compactStatusText = add([
    text("", { size: 10 }),
    pos(HUD_LEFT_PANEL.x + 14, HUD_LEFT_PANEL.y + 29),
    color(...room.statusColor),
    z(HUD_TEXT_Z + 1),
  ]);

  const clearProgressText = add([
    text(`清房 ${getClearedProgressLabel()}`, { size: 10 }),
    pos(HUD_LEFT_PANEL.x + 232, HUD_LEFT_PANEL.y + 29),
    color(214, 210, 198),
    z(HUD_TEXT_Z),
  ]);

  add([
    text(room.mechanicHint, { size: 10 }),
    pos(HUD_LEFT_PANEL.x + 122, HUD_LEFT_PANEL.y + 55),
    color(214, 210, 198),
    z(HUD_TEXT_Z),
  ]);

  const muteText = add([
    text("", { size: 10 }),
    pos(HUD_RIGHT_PANEL.x + HUD_RIGHT_PANEL.w - HUD_MARGIN, HUD_RIGHT_PANEL.y + 20),
    anchor("topright"),
    color(214, 210, 198),
    z(HUD_TEXT_Z),
  ]);

  const timerText = add([
    text(`用时 ${formatRunTime(runStats.time)}`, { size: 10 }),
    pos(HUD_RIGHT_PANEL.x + HUD_RIGHT_PANEL.w - HUD_MARGIN, HUD_RIGHT_PANEL.y + 8),
    anchor("topright"),
    color(255, 235, 190),
    z(HUD_TEXT_Z),
  ]);

  addMiniMap(room);

  const feedbackText = add([
    text("入场安全", { size: 12 }),
    pos(width() / 2, HUD_FEEDBACK_PANEL.y + 7),
    anchor("top"),
    color(255, 220, 160),
    z(HUD_TEXT_Z),
  ]);

  const itemText = add([
    text("", { size: 10 }),
    pos(HUD_LEFT_PANEL.x + 14, HUD_LEFT_PANEL.y + 55),
    color(214, 210, 198),
    z(HUD_TEXT_Z),
  ]);

  const objectiveTitleText = add([
    text("", { size: 11 }),
    pos(HUD_OBJECTIVE_PANEL.x + HUD_MARGIN, HUD_OBJECTIVE_PANEL.y + 7),
    color(255, 232, 168),
    z(HUD_TEXT_Z),
  ]);

  const routeTypeText = add([
    text(getRouteHudLabel(room), { size: 9 }),
    pos(HUD_OBJECTIVE_PANEL.x + HUD_OBJECTIVE_PANEL.w - HUD_MARGIN, HUD_OBJECTIVE_PANEL.y + 9),
    anchor("topright"),
    color(...getRouteHudColor(room)),
    opacity(0.86),
    z(HUD_TEXT_Z),
  ]);

  const affixText = add([
    text(getRoomAffixLabel(room), { size: 8 }),
    pos(HUD_OBJECTIVE_PANEL.x + HUD_OBJECTIVE_PANEL.w - HUD_MARGIN, HUD_OBJECTIVE_PANEL.y + 24),
    anchor("topright"),
    color(255, 204, 150),
    opacity(getRoomAffixLabel(room) ? 0.88 : 0),
    z(HUD_TEXT_Z),
  ]);

  const exitPreviewText = add([
    text(getExitPreviewText(roomExits, false), { size: 10 }),
    pos(HUD_OBJECTIVE_PANEL.x + HUD_MARGIN, HUD_OBJECTIVE_PANEL.y + 26),
    color(198, 226, 210),
    opacity(0.82),
    z(HUD_TEXT_Z),
  ]);

  const attackReadyText = add([
    text("", { size: 10 }),
    pos(HUD_FEEDBACK_PANEL.x + HUD_FEEDBACK_PANEL.w - HUD_MARGIN, HUD_FEEDBACK_PANEL.y + 7),
    anchor("topright"),
    color(170, 238, 190),
    opacity(0.86),
    z(HUD_TEXT_Z),
  ]);
  const attackChargeTicks = addAttackChargeTicks(
    HUD_FEEDBACK_PANEL.x + HUD_FEEDBACK_PANEL.w - 138,
    HUD_FEEDBACK_PANEL.y + 8,
    ATTACK_CHARGE_TICKS,
    room.wallOutline,
  );

  const sealedDoorMarkers = roomExits.map((exit) => {
    const marker = add([
      rect(DOOR_SIZE, DOOR_SIZE),
      pos(exit.x, exit.y),
      color(72, 98, 72),
      opacity(0.34),
      outline(1, [120, 170, 120]),
    ]);
    marker.exit = exit;
    return marker;
  });

  if (room.id === currentStartRoomId && shouldResetRun) {
    addRoomCue("清掉妖怪，探索四周门 / P 暂停 / M 静音", width() / 2, height() - 36, [255, 235, 190], 2);
  }
  if (hasPressureEnemy) {
    addRoomObjectiveBanner("侧翼来袭", "边角妖怪会压缩走位空间", room.introColor, 2.2);
  }
  if (!roomAlreadyCleared && room.type === "elite") {
    const affixTitle = room.eliteAffixLabel ? `精英房：${room.eliteAffixLabel}` : "精英房";
    const affixDescription = room.eliteAffixText ?? "多段血量，稳住点射节奏";
    if (room.eliteAffixLabel && !countedEliteAffixRoomIds.has(room.id)) {
      countedEliteAffixRoomIds.add(room.id);
      runStats.eliteAffixes += 1;
    }
    addRoomObjectiveBanner(affixTitle, affixDescription, room.introColor, 2.2);
  }
  if (!roomAlreadyCleared && room.type === "final") {
    addRoomObjectiveBanner("Boss 房", "黄眉半血会进入二阶段", room.introColor, 2.4);
  }

  const lowHealthOverlay = add([
    rect(width(), height()),
    pos(0, 0),
    color(88, 8, 16),
    opacity(0),
  ]);

  const lowHealthText = add([
    text("危险：生命仅剩 1", { size: 11 }),
    pos(HUD_FEEDBACK_PANEL.x + HUD_MARGIN, HUD_FEEDBACK_PANEL.y + 7),
    color(255, 150, 140),
    opacity(0),
    z(HUD_TEXT_Z),
  ]);

  const roomIntroTitle = add([
    text(getRoomTrialLabel(room), { size: 20 }),
    pos(width() / 2, 78),
    anchor("center"),
    color(...room.introColor),
    opacity(1),
  ]);

  const roomIntroSubtitle = add([
    text(room.lore ?? room.introSubtitle, { size: 12 }),
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
    text("WASD 移动 / 方向键或 IJKL 射击\nP 继续 / R 重开本局 / M 静音\n地图：宝=奖励 精=精英 终=终点\n评级：少受伤 + 更快通关", { size: 12 }),
    pos(width() / 2, 150),
    anchor("center"),
    color(230, 230, 238),
    opacity(0),
    z(1001),
  ]);

  const pauseStatus = add([
    text("", { size: 11 }),
    pos(width() / 2, 220),
    anchor("center"),
    color(255, 235, 190),
    opacity(0),
    z(1001),
  ]);

  let ended = false;
  let paused = false;
  let shotTimer = 0;
  let shotBlockedCueTimer = 0;
  let entrySafeTimer = ENTRY_SAFE_TIME;
  let invincibleTimer = 0;
  let feedbackTimer = 0;
  let sealedDoorHintTimer = 0;
  let sealedDoorFadeTimer = 0;
  let remainingCueTimer = 0;
  let lowHealthPulseTimer = 0;
  let roomIntroTimer = ROOM_INTRO_DURATION;
  let cloneHairShotSide = 1;
  let doorsOpened = false;
  let doors = [];
  let healPeach = null;
  let attackItem = null;
  let attackChoices = [];
  let attackChoiceLabels = [];
  let enemiesLeft = enemies.length;
  let ambushTriggered = false;

  function updateStatusText() {
    const doorStatus = doorsOpened ? "已开" : "未开";
    statusText.text = `生命 ${getHealthLabel(runHealth)} / 敌 ${enemiesLeft} / 门 ${doorStatus}`;
    statusText.color = runHealth === 1 ? [255, 160, 146] : room.statusColor;
    clearProgressText.text = `清房 ${getClearedProgressLabel()}`;
    objectiveTitleText.text = getObjectiveTitle(room, enemiesLeft, doorsOpened, room.type === "final" && ambushTriggered);
    objectiveTitleText.color = doorsOpened ? [156, 244, 176] : [255, 232, 168];
    routeTypeText.text = getRouteHudLabel(room);
    routeTypeText.color = getRouteHudColor(room);
    affixText.text = getRoomAffixLabel(room);
    affixText.opacity = affixText.text ? 0.88 : 0;
    exitPreviewText.text = doorsOpened ? getOpenExitPreviewText(roomExits) : getExitPreviewText(roomExits, false);
    exitPreviewText.color = doorsOpened ? [156, 244, 176] : [198, 226, 210];
  }

  function updateMuteText() {
    muteText.text = isMuted ? "M 音效开" : "M 静音";
  }

  function updateItemText() {
    const itemInfo = getRunItemInfo();
    itemText.text = itemInfo ? `道具：${itemInfo.hud}` : "道具：无";
  }

  function updateAttackReadyText() {
    const itemInfo = getRunItemInfo();
    const attackTag = itemInfo ? `${getItemEffectLabel(itemInfo)}` : "";
    const attackPrefix = attackTag ? `攻:${attackTag}` : "攻";
    const readyRatio = 1 - Math.min(1, shotTimer / SHOT_COOLDOWN);
    const filledTicks = shotTimer <= 0
      ? ATTACK_CHARGE_TICKS
      : Math.max(1, Math.min(ATTACK_CHARGE_TICKS - 1, Math.ceil(readyRatio * ATTACK_CHARGE_TICKS)));
    attackChargeTicks.forEach((tick, index) => {
      const isFilled = index < filledTicks;
      tick.color = shotTimer <= 0
        ? [92, 210, 128]
        : isFilled
          ? [255, 214, 128]
          : [76, 78, 88];
      tick.opacity = shotTimer <= 0
        ? 0.82 + Math.sin(runStats.time * 6 + index) * 0.08
        : isFilled
          ? 0.7
          : 0.34;
    });
    if (entrySafeTimer > 0) {
      attackReadyText.text = shotTimer <= 0 ? "安全 攻OK" : `安全 攻${Math.ceil(shotTimer * 10) / 10}s`;
      attackReadyText.color = [255, 232, 126];
      attackReadyText.opacity = 0.72 + Math.sin(runStats.time * 8) * 0.1;
      return;
    }
    if (shotTimer <= 0) {
      attackReadyText.text = `${attackPrefix} OK`;
      attackReadyText.color = [170, 238, 190];
      attackReadyText.opacity = 0.78 + Math.sin(runStats.time * 5) * 0.12;
      return;
    }
    attackReadyText.text = `${attackPrefix} ${Math.ceil(shotTimer * 10) / 10}s`;
    attackReadyText.color = [255, 214, 128];
    attackReadyText.opacity = 0.66;
  }

  function updatePauseOverlay() {
    const compactPauseRoom = getShortText(room.name, 8);
    const compactPauseItem = getShortText(getCompactRunItemName(), 6);
    const compactPauseRoute = getShortText(getCompactRunRouteSummary(), 22);
    pauseOverlay.opacity = paused ? 0.62 : 0;
    pauseTitle.opacity = paused ? 1 : 0;
    pauseHelp.opacity = paused ? 1 : 0;
    pauseStatus.opacity = paused ? 1 : 0;
    pauseStatus.text = `房间 ${compactPauseRoom} / 生命 ${getHealthLabel(runHealth)} / 清房 ${getClearedProgressLabel()}\n用时 ${formatRunTime(runStats.time)} / 道具 ${compactPauseItem} / ${getCompactBossAmbushLabel()} / ${getCompactEliteAffixLabel()}\n${compactPauseRoute}`;
  }

  updateMuteText();
  updateItemText();
  updateAttackReadyText();

  function dropHealRewardIfNeeded() {
    if (room.type === "final") return;
    if (room.type === "treasure") return;
    if (roomAlreadyCleared) return;
    if (rewardedRoomIds.has(room.id)) return;
    if (runHealth >= PLAYER_MAX_HEALTH) return;

    rewardedRoomIds.add(room.id);
    const rewardX = Math.max(26, Math.min(width() - HEAL_PEACH_SIZE - 26, entrySpawn.x + 34));
    const rewardY = Math.max(64, Math.min(height() - HEAL_PEACH_SIZE - 28, entrySpawn.y));
    healPeach = addHealPeach(rewardX, rewardY);
    feedbackText.text = "清房奖励：回血桃出现";
    feedbackTimer = 1.25;
    addRoomObjectiveBanner("回血桃出现", "先补生命，再进下一间房", [255, 198, 144], 2.4);
    addRoomCue("+1 生命", rewardX + HEAL_PEACH_SIZE / 2, Math.max(58, rewardY - 12), [255, 198, 144], 1.2);
    playTone(720, 0.08, 0.02, "triangle");
  }

  function dropAttackItemIfNeeded() {
    if (room.type !== "elite") return;
    if (roomAlreadyCleared) return;
    if (runItem) return;
    if (itemRewardedRoomIds.has(room.id)) return;

    itemRewardedRoomIds.add(room.id);
    const rewardItemId = room.rewardItemId ?? getRandomItemId(getRoomIndex(room.id) * 11 + runStats.defeats);
    const itemInfo = getRunItemInfo(rewardItemId) ?? RUN_ITEM_INFO.cloneHair;
    const rewardX = Math.max(28, Math.min(width() - ATTACK_ITEM_SIZE - 28, width() / 2 - ATTACK_ITEM_SIZE / 2));
    const rewardY = Math.max(68, Math.min(height() - ATTACK_ITEM_SIZE - 30, height() / 2 + 34));
    attackItem = spawnAttackItem(rewardItemId, rewardX, rewardY);
    feedbackText.text = `精英奖励：${itemInfo.name}`;
    feedbackTimer = 1.25;
    addRoomCue(itemInfo.name, rewardX + ATTACK_ITEM_SIZE / 2, Math.max(58, rewardY - 12), itemInfo.color, 1.2);
    playTone(880, 0.08, 0.02, "triangle");
  }

  function triggerAmbushIfNeeded() {
    if (room.type === "final") return false;
    if (ambushTriggered || roomAlreadyCleared || !(room.ambushEnemies?.length > 0)) return false;

    ambushTriggered = true;
    room.ambushEnemies.forEach((enemyConfig) => {
      const safeEnemyConfig = getSafeEnemySpawnConfig(enemyConfig, enemies);
      enemies.push(addRoomEnemy(safeEnemyConfig));
    });
    enemiesLeft += room.ambushEnemies.length;
    updateStatusText();
    feedbackText.text = room.ambushCue ?? "伏击出现";
    feedbackTimer = 1.3;
    addRoomCue(room.ambushCue ?? "伏击出现", width() / 2, Math.max(58, height() / 2 - 42), room.introColor, 1.25);
    addScreenFlash(room.introColor, 0.22);
    playToneSequence([
      { frequency: 210, duration: 0.07, volume: 0.024, type: "sawtooth" },
      { frequency: 420, duration: 0.09, volume: 0.026, type: "triangle" },
    ]);
    return true;
  }

  function triggerBossAmbushIfNeeded() {
    if (room.type !== "final") return;
    if (ambushTriggered || roomAlreadyCleared || !(room.ambushEnemies?.length > 0)) return;
    ambushTriggered = true;
    runStats.bossAmbushes += 1;
    room.ambushEnemies.forEach((enemyConfig) => {
      const safeEnemyConfig = getSafeEnemySpawnConfig(enemyConfig, enemies);
      enemies.push(addRoomEnemy(safeEnemyConfig));
    });
    enemiesLeft += room.ambushEnemies.length;
    updateStatusText();
    feedbackText.text = room.ambushCue ?? "Boss 召唤";
    feedbackTimer = 1.25;
    addRoomObjectiveBanner("Boss 二阶段", "黄眉召来护法小妖", room.introColor, 2.2);
    addScreenFlash(room.introColor, 0.18);
    playToneSequence([
      { frequency: 260, duration: 0.07, volume: 0.024, type: "sawtooth" },
      { frequency: 620, duration: 0.09, volume: 0.026, type: "triangle" },
    ]);
  }

  function dropTreasureRoomRewardIfNeeded() {
    if (room.type !== "treasure") return;
    if (itemRewardedRoomIds.has(room.id)) {
      feedbackText.text = "宝库已取";
      feedbackTimer = 1.1;
      return;
    }

    itemRewardedRoomIds.add(room.id);
    const rewardX = width() / 2 - ATTACK_ITEM_SIZE / 2;
    const rewardY = height() / 2 - ATTACK_ITEM_SIZE / 2;
    if (runItem) {
      if (runHealth >= PLAYER_MAX_HEALTH) {
        feedbackText.text = "宝库已取";
        feedbackTimer = 1.1;
        addRoomCue("宝库已取", width() / 2, height() / 2 - 18, [166, 230, 255], 1.2);
        return;
      }
      healPeach = addHealPeach(rewardX, rewardY);
      feedbackText.text = "宝库奖励：回血桃";
      addRoomObjectiveBanner("宝库回血", "先补生命，再继续取经", [255, 198, 144], 2.4);
      addRoomCue("+1 生命", rewardX + HEAL_PEACH_SIZE / 2, Math.max(58, rewardY - 12), [255, 198, 144], 1.2);
      playTone(720, 0.08, 0.02, "triangle");
      return;
    }

    const choiceIds = getTreasureChoiceItemIds(room.id);
    const choiceX = [rewardX - 56, rewardX, rewardX + 56];
    attackChoices = choiceIds.map((itemId, index) => spawnTreasureChoiceItem(itemId, choiceX[index], rewardY, room.id));
    attackChoiceLabels = choiceIds.flatMap((itemId, index) => addTreasureChoiceLabel(itemId, choiceX[index], rewardY));
    attackItem = attackChoices[0];
    feedbackText.text = "龙宫宝库：三选一道具";
    addRoomObjectiveBanner("宝物房", "三选一，只能带走一个", [255, 214, 104], 2.8);
    playTone(880, 0.08, 0.02, "triangle");
  }

  function openDoorIfReady() {
    if (doorsOpened || enemiesLeft > 0) return;
    if (triggerAmbushIfNeeded()) return;
    doorsOpened = true;
    clearedRoomIds.add(room.id);
    const isFinalRoom = room.type === "final";
    const doorMessage = isFinalRoom ? "终点已净化" : "四周传送门已开启";
    const doorCue = isFinalRoom ? "小雷音寺前庭已净，通关" : "门已开启，选路探索";
    if (isFinalRoom) {
      feedbackText.text = doorMessage;
      feedbackTimer = 1.2;
      playTone(660, 0.12, 0.022, "triangle");
      ended = true;
      go("complete");
      return;
    }
    dropAttackItemIfNeeded();
    dropHealRewardIfNeeded();
    doors = roomExits.map((exit) => {
      const targetRoom = getRoomById(exit.targetId);
      const accentColor = getDoorAccentColor(targetRoom);
      const doorGlow = add([
        rect(DOOR_SIZE + 10, DOOR_SIZE + 10),
        pos(exit.x - 5, exit.y - 5),
        color(...accentColor),
        opacity(0.16),
        "doorGlow",
      ]);
      doorGlow.phase = (exit.x + exit.y) * 0.02;
      const openedDoor = add([
        sprite("portal", { width: DOOR_SIZE, height: DOOR_SIZE }),
        pos(exit.x, exit.y),
        area(),
        opacity(0.92),
        "door",
      ]);
      openedDoor.targetId = exit.targetId;
      openedDoor.direction = exit.direction;
      openedDoor.phase = (exit.x + exit.y) * 0.02;
      return openedDoor;
    });
    sealedDoorMarkers.forEach((marker) => {
      marker.color = [92, 220, 112];
      marker.opacity = 0.58;
    });
    sealedDoorFadeTimer = SEALED_DOOR_FADE_TIME;
    feedbackText.text = !roomAlreadyCleared && room.clearLore ? room.clearLore : doorMessage;
    feedbackTimer = 1.2;
    if (!roomAlreadyCleared && room.clearNote) {
      addRoomCue(room.clearNote, width() / 2, Math.max(58, height() / 2 - 52), room.introColor, 1.8);
    }
    const suggestedExit = getSuggestedExit(roomExits);
    if (isTreasureRoom) {
      feedbackText.text = "宝物房：选宝后看门离开";
      feedbackTimer = 1.2;
    } else if (suggestedExit) {
      const targetRoom = getRoomById(suggestedExit.targetId);
      addRoomObjectiveBanner(
        `推荐出口：${DIRECTION_LABELS[suggestedExit.direction] ?? suggestedExit.direction}`,
        `通往 ${getDoorLabelText(targetRoom)}`,
        [255, 232, 118],
      );
    } else if (roomExits.length > 0) {
      addRoomObjectiveBanner("传送门开启", "看门名选择下一间房", [120, 255, 150]);
    }
    roomExits.forEach((exit) => {
      const isSuggested = suggestedExit && exit.targetId === suggestedExit.targetId;
      const cueText = isSuggested ? `推荐 ${DIRECTION_LABELS[exit.direction] ?? exit.direction}` : doorCue;
      if (!isTreasureRoom) {
        addRoomCue(cueText, exit.x + DOOR_SIZE / 2, Math.max(58, exit.y - 14), isSuggested ? [255, 232, 118] : [120, 255, 150]);
        addHitBurst(exit.x + DOOR_SIZE / 2, exit.y + DOOR_SIZE / 2, [118, 255, 142]);
      }
      const labelPos = getDoorLabelPosition(exit);
      const targetRoom = getRoomById(exit.targetId);
      const labelBoxPos = getDoorLabelBoxPosition(exit, labelPos);
      const labelBox = add([
        rect(DOOR_LABEL_BOX_WIDTH, DOOR_LABEL_BOX_HEIGHT),
        pos(labelBoxPos.x, labelBoxPos.y),
        color(12, 14, 22),
        opacity(0.54),
        outline(isSuggested ? 2 : 1, isSuggested ? [255, 232, 118] : getDoorAccentColor(targetRoom)),
        "doorLabelBox",
      ]);
      labelBox.phase = (exit.x + exit.y) * 0.02;
      const label = add([
        text(getDoorLabelText(targetRoom), { size: DOOR_LABEL_FONT_SIZE, align: getDoorLabelAnchor(exit) }),
        pos(labelPos.x, labelPos.y),
        anchor(getDoorLabelAnchor(exit)),
        color(...getDoorAccentColor(targetRoom)),
        opacity(0.9),
        "doorLabel",
      ]);
      label.phase = (exit.x + exit.y) * 0.02;
    });
    playTone(660, 0.12, 0.022, "triangle");
    updateStatusText();
  }

  if (roomAlreadyCleared) {
    openDoorIfReady();
  }

  if (room.type === "treasure") {
    openDoorIfReady();
    dropTreasureRoomRewardIfNeeded();
  }

  function shoot(dirX, dirY) {
    if (!gameStarted || ended) return;
    if (shotTimer > 0) {
      if (shotBlockedCueTimer <= 0) {
        if (entrySafeTimer <= 0 && invincibleTimer <= 0) {
          addRoomCue("蓄力中", player.pos.x + PLAYER_SIZE / 2, Math.max(56, player.pos.y - 12), [255, 214, 128], 0.45);
        }
        shotBlockedCueTimer = SHOT_BLOCKED_CUE_COOLDOWN;
      }
      return;
    }
    shotTimer = SHOT_COOLDOWN;
    playTone(520, 0.035, 0.018, "square");
    const bulletX = player.pos.x + PLAYER_SIZE / 2 - BULLET_SIZE / 2;
    const bulletY = player.pos.y + PLAYER_SIZE / 2 - BULLET_SIZE / 2;
    const itemEffect = getRunItemInfo()?.effect;
    const bulletOptions = itemEffect === "pierce"
      ? { pierceLeft: 1, opacity: 0.92, tint: [255, 220, 132], isPiercing: true }
      : {};
    addStaffBullet(
      bulletX,
      bulletY,
      dirX,
      dirY,
      bulletOptions,
    );
    if (itemEffect === "double") {
      cloneHairShotSide *= -1;
      const spreadOffset = dirX !== 0
        ? { x: 0, y: 8 * cloneHairShotSide }
        : { x: 8 * cloneHairShotSide, y: 0 };
      addStaffBullet(
        bulletX + spreadOffset.x,
        bulletY + spreadOffset.y,
        dirX,
        dirY,
        { sideDrift: 0.075 * cloneHairShotSide, opacity: 0.72 },
      );
    } else if (itemEffect === "fan") {
      const leftFan = rotateDirection(dirX, dirY, -0.18);
      const rightFan = rotateDirection(dirX, dirY, 0.18);
      addStaffBullet(bulletX, bulletY, leftFan.x, leftFan.y);
      addStaffBullet(bulletX, bulletY, rightFan.x, rightFan.y);
    }
  }

  function hurtPlayer(sourceX, sourceY, message = "-1 生命") {
    if (ended || paused || entrySafeTimer > 0 || invincibleTimer > 0) return false;

    const itemInfo = getRunItemInfo();
    if (itemInfo?.effect === "shield") {
      runItem = null;
      invincibleTimer = PLAYER_INVINCIBLE_TIME;
      updateItemText();
      addScreenFlash(itemInfo.color, 0.18);
      addRoomCue(itemInfo.cue, player.pos.x + PLAYER_SIZE / 2, Math.max(56, player.pos.y - 12), itemInfo.color, 1);
      feedbackText.text = `${itemInfo.name}抵挡一次伤害`;
      feedbackTimer = 1.15;
      playToneSequence([
        { frequency: 640, duration: 0.06, volume: 0.022, type: "triangle" },
        { frequency: 920, duration: 0.09, volume: 0.024, type: "sine" },
      ]);
      return true;
    }

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
      go("lose", room.id);
      return true;
    }

    invincibleTimer = PLAYER_INVINCIBLE_TIME;
    feedbackText.text = "受击！短暂无敌";
    feedbackTimer = PLAYER_INVINCIBLE_TIME;
    return true;
  }

  player.onCollide("enemy", (enemy) => {
    if (ended || paused || invincibleTimer > 0) return;
    const enemySize = enemy.enemySize ?? ENEMY_SIZE;
    const enemyCenter = {
      x: enemy.pos.x + enemySize / 2,
      y: enemy.pos.y + enemySize / 2,
    };
    hurtPlayer(enemyCenter.x, enemyCenter.y);
  });

  player.onCollide("door", (doorBody) => {
    if (ended || paused || !doorBody.targetId) return;
    ended = true;
    go("game", doorBody.targetId, false, OPPOSITE_DIRECTIONS[doorBody.direction] ?? null);
  });

  function collectHealPeach(peach) {
    if (ended || paused || runHealth >= PLAYER_MAX_HEALTH) return;
    runHealth = Math.min(PLAYER_MAX_HEALTH, runHealth + 1);
    destroy(peach);
    healPeach = null;
    updateStatusText();
    feedbackText.text = "回血桃 +1 生命";
    feedbackTimer = 1.05;
    addRoomObjectiveBanner("生命恢复", `当前生命 ${getHealthLabel(runHealth)}`, [255, 198, 144], 1.6);
    addRoomCue("+1 生命", player.pos.x + PLAYER_SIZE / 2, Math.max(58, player.pos.y - 12), [255, 198, 144], 1);
    playToneSequence([
      { frequency: 640, duration: 0.055, volume: 0.02, type: "triangle" },
      { frequency: 820, duration: 0.07, volume: 0.022, type: "triangle" },
    ]);
  }

  function collectAttackItem(item) {
    if (ended || paused) return;
    const itemId = item.itemId ?? "cloneHair";
    const itemInfo = getRunItemInfo(itemId) ?? RUN_ITEM_INFO.cloneHair;
    runItem = itemId;
    if (item.treasureChoiceRoomId) {
      attackChoices.forEach((choice) => {
        if (choice !== item && choice.exists()) {
          destroy(choice);
        }
      });
      attackChoiceLabels.forEach((label) => {
        if (label.exists()) {
          destroy(label);
        }
      });
      attackChoices = [];
      attackChoiceLabels = [];
      addRoomObjectiveBanner("已选择宝物", "其余宝物消散", itemInfo.color, 1.9);
    }
    destroy(item);
    attackItem = null;
    updateItemText();
    feedbackText.text = itemInfo.pickup;
    feedbackTimer = 1.35;
    addRoomCue(itemInfo.cue, player.pos.x + PLAYER_SIZE / 2, Math.max(58, player.pos.y - 12), itemInfo.color, 1.1);
    playToneSequence([
      { frequency: 720, duration: 0.055, volume: 0.02, type: "triangle" },
      { frequency: 960, duration: 0.07, volume: 0.022, type: "triangle" },
    ]);
  }

  player.onCollide("healPeach", collectHealPeach);
  player.onCollide("attackItem", collectAttackItem);

  onKeyPress("p", () => {
    if (!gameStarted) return;
    if (ended) return;
    paused = !paused;
    updatePauseOverlay();
  });

  onKeyPress("m", () => {
    if (!gameStarted) return;
    isMuted = !isMuted;
    updateMuteText();
  });

  onKeyPress("r", () => {
    if (!gameStarted) return;
    if (ended) return;
    go("game", currentStartRoomId, true);
  });

  onUpdate(() => {
    if (ended) return;
    if (paused) return;
    if (!gameStarted) return;
    shotTimer = Math.max(0, shotTimer - dt());
    shotBlockedCueTimer = Math.max(0, shotBlockedCueTimer - dt());
    entrySafeTimer = Math.max(0, entrySafeTimer - dt());
    invincibleTimer = Math.max(0, invincibleTimer - dt());
    feedbackTimer = Math.max(0, feedbackTimer - dt());
    sealedDoorHintTimer = Math.max(0, sealedDoorHintTimer - dt());
    sealedDoorFadeTimer = Math.max(0, sealedDoorFadeTimer - dt());
    remainingCueTimer = Math.max(0, remainingCueTimer - dt());
    lowHealthPulseTimer += dt();
    roomIntroTimer = Math.max(0, roomIntroTimer - dt());
    runStats.time += dt();
    const compactDoorStatus = doorsOpened ? "开" : "封";
    const isLowHealth = runHealth === 1;
    const hasGuardWindow = entrySafeTimer > 0 || invincibleTimer > 0;
    statusText.opacity = 0;
    objectiveAccent.color = doorsOpened ? [156, 244, 176] : [255, 232, 168];
    objectiveAccent.opacity = doorsOpened ? 0.95 : 0.82;
    compactStatusText.text = isLowHealth ? `危 ${getHealthLabel(runHealth)}` : `HP ${getHealthLabel(runHealth)}`;
    compactStatusText.color = isLowHealth ? [255, 158, 142] : room.statusColor;
    healthChip.color = isLowHealth ? [120, 22, 34] : [80, 26, 32];
    healthChip.opacity = isLowHealth ? 0.48 : 0.34;
    enemyText.text = `妖 ${enemiesLeft}`;
    enemyText.color = doorsOpened ? [156, 244, 176] : enemiesLeft === 1 ? [255, 214, 128] : [255, 170, 150];
    doorText.text = `门 ${compactDoorStatus}`;
    doorText.color = doorsOpened ? [156, 244, 176] : [255, 204, 132];
    clearProgressText.text = `清 ${getClearedProgressLabel()}`;
    clearProgressText.color = doorsOpened ? [156, 244, 176] : [214, 210, 198];
    timerText.text = `用时 ${formatRunTime(runStats.time)}`;
    updateAttackReadyText();
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
    playerGuardRing.pos.x = player.pos.x - PLAYER_GUARD_RING_PADDING;
    playerGuardRing.pos.y = player.pos.y - PLAYER_GUARD_RING_PADDING;
    playerGuardRing.opacity = hasGuardWindow ? 0.22 + Math.sin(runStats.time * 16) * 0.1 : 0;
    playerGuardRing.color = entrySafeTimer > 0 ? [255, 232, 126] : [166, 226, 255];

    if (isLowHealth) {
      const pulse = (Math.sin(lowHealthPulseTimer * LOW_HEALTH_PULSE_SPEED) + 1) / 2;
      lowHealthOverlay.opacity = 0.04 + pulse * 0.035;
      const feedbackIsActive = feedbackText.text !== "" && feedbackText.text !== "入场安全";
      lowHealthText.opacity = feedbackIsActive ? 0.38 + pulse * 0.18 : 0.62 + pulse * 0.38;
    } else {
      lowHealthOverlay.opacity = 0;
      lowHealthText.opacity = 0;
    }

    if (doorsOpened) {
      sealedDoorMarkers.forEach((marker) => {
        marker.opacity = Math.max(0, 0.58 * (sealedDoorFadeTimer / SEALED_DOOR_FADE_TIME));
      });
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

    get("roomObjective").forEach((objective) => {
      fadeAndDestroy(objective, 0.9);
    });

    get("miniMapCurrentPulse").forEach((pulse) => {
      pulse.opacity = 0.12 + Math.sin(runStats.time * 4 + pulse.phase) * 0.08;
    });

    get("boneAfterimage").forEach((ghost) => {
      fadeAndDestroy(ghost, 0.44);
    });

    get("healPeach").forEach((peach) => {
      peach.opacity = 0.74 + Math.sin(runStats.time * 8) * 0.18;
      if (
        peach.exists()
        && runHealth < PLAYER_MAX_HEALTH
        && centersWithinDistance(player, PLAYER_SIZE, peach, HEAL_PEACH_SIZE, PICKUP_MAGNET_DISTANCE)
      ) {
        collectHealPeach(peach);
      }
    });

    get("attackItem").forEach((item) => {
      item.opacity = isTreasureRoom ? 0.9 : 0.76 + Math.sin(runStats.time * 7) * 0.16;
      if (
        item.exists()
        && !item.treasureChoiceRoomId
        && centersWithinDistance(player, PLAYER_SIZE, item, ATTACK_ITEM_SIZE, PICKUP_MAGNET_DISTANCE)
      ) {
        collectAttackItem(item);
      }
    });

    get("doorGlow").forEach((glow) => {
      glow.opacity = 0.12 + Math.sin(runStats.time * 4 + glow.phase) * 0.05;
    });

    get("door").forEach((door) => {
      door.opacity = 0.84 + Math.sin(runStats.time * 4.4 + door.phase) * 0.12;
    });

    get("doorLabelBox").forEach((box) => {
      box.opacity = isTreasureRoom ? 0.5 : 0.48 + Math.sin(runStats.time * 3.2 + box.phase) * 0.06;
    });

    get("doorLabel").forEach((label) => {
      label.opacity = isTreasureRoom ? 0.92 : 0.86 + Math.sin(runStats.time * 3.2 + label.phase) * 0.1;
    });

    if (isKeyDown("left") || isKeyDown("j")) shoot(-1, 0);
    if (isKeyDown("right") || isKeyDown("l")) shoot(1, 0);
    if (isKeyDown("up") || isKeyDown("i")) shoot(0, -1);
    if (isKeyDown("down") || isKeyDown("k")) shoot(0, 1);

    const playerRect = { x: player.pos.x, y: player.pos.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
    if (!doorsOpened && sealedDoorHintTimer <= 0) {
      const playerCenterX = player.pos.x + PLAYER_SIZE / 2;
      const playerCenterY = player.pos.y + PLAYER_SIZE / 2;
      const nearSealedDoor = roomExits.some((exit) => {
        const doorCenterX = exit.x + DOOR_SIZE / 2;
        const doorCenterY = exit.y + DOOR_SIZE / 2;
        return Math.hypot(playerCenterX - doorCenterX, playerCenterY - doorCenterY) <= SEALED_DOOR_HINT_DISTANCE;
      });
      if (nearSealedDoor && feedbackTimer <= 0) {
        feedbackText.text = getSealedDoorHintText(room, enemiesLeft, room.type === "final" && ambushTriggered);
        feedbackTimer = 0.75;
        sealedDoorHintTimer = SEALED_DOOR_HINT_COOLDOWN;
      }
    }

    flameHazards.forEach((hazard) => {
      const cycleLength = FLAME_WARNING_TIME + FLAME_ACTIVE_TIME + FLAME_REST_TIME;
      hazard.timer = (hazard.timer + dt()) % cycleLength;
      hazard.active = hazard.timer >= FLAME_WARNING_TIME && hazard.timer < FLAME_WARNING_TIME + FLAME_ACTIVE_TIME;
      if (hazard.timer < FLAME_WARNING_TIME) {
        const warningPulse = 0.18 + Math.floor(hazard.timer * 8) % 2 * 0.18;
        hazard.warningMarker.opacity = warningPulse;
        hazard.warningLabel.opacity = 0.58 + warningPulse;
        hazard.fireMarker.opacity = 0;
      } else if (hazard.active) {
        hazard.warningMarker.opacity = 0;
        hazard.warningLabel.opacity = 0;
        hazard.fireMarker.opacity = 0.64;
        if (rectsOverlap(playerRect, hazard)) {
          hurtPlayer(hazard.x + hazard.w / 2, hazard.y + hazard.h / 2, "灼伤 -1");
        }
      } else {
        hazard.warningMarker.opacity = 0;
        hazard.warningLabel.opacity = 0;
        hazard.fireMarker.opacity = 0;
      }
    });
    if (ended) return;

    const inSlowZone = (room.slowZones ?? []).some((zone) => rectsOverlap(playerRect, zone));
    const speedItemScale = getRunItemInfo()?.effect === "speed" ? 1.18 : 1;
    const sp = (inSlowZone ? MOVE_SPEED * QUICKSAND_SPEED_SCALE : MOVE_SPEED) * speedItemScale;
    const { dx, dy } = getNormalizedMoveVector(sp);
    if (dx !== 0) moveOnAxis(player, dx, 0, PLAYER_SIZE);
    if (dy !== 0) moveOnAxis(player, 0, dy, PLAYER_SIZE);

    enemies.forEach((enemy) => {
      if (!enemy.body.exists()) {
        destroyEliteHealthBar(enemy);
        return;
      }
      const enemySize = enemy.size ?? ENEMY_SIZE;
      enemy.trailTimer = Math.max(0, enemy.trailTimer - dt());
      enemy.hitBoostTimer = Math.max(0, enemy.hitBoostTimer - dt());
      enemy.bindTimer = Math.max(0, enemy.bindTimer - dt());
      enemy.bindSparkTimer = Math.max(0, enemy.bindSparkTimer - dt());
      if ((enemy.body.maxHp ?? 1) > 1) {
        enemy.eliteTimer -= dt();
        if (enemy.eliteState === "idle" && enemy.eliteTimer <= 0) {
          enemy.eliteState = "warning";
          enemy.eliteTimer = ELITE_ROAR_WARN_TIME;
          feedbackText.text = "精英怒吼蓄力";
          feedbackTimer = ELITE_ROAR_WARN_TIME;
          addRoomCue("怒吼蓄力", enemy.body.pos.x + enemySize / 2, Math.max(58, enemy.body.pos.y - 14), [255, 180, 120], 0.8);
          addHitBurst(enemy.body.pos.x + enemySize / 2, enemy.body.pos.y + enemySize / 2, [255, 132, 84]);
        } else if (enemy.eliteState === "warning" && enemy.eliteTimer <= 0) {
          enemy.eliteState = "rushing";
          enemy.eliteTimer = ELITE_ROAR_RUSH_TIME;
        } else if (enemy.eliteState === "rushing" && enemy.eliteTimer <= 0) {
          enemy.eliteState = "idle";
          enemy.eliteTimer = ELITE_ROAR_INTERVAL;
        }
      }
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

      if (enemy.eliteState === "warning") {
        moveX = 0;
        moveY = 0;
      } else if (enemy.eliteState === "rushing") {
        moveX *= ELITE_ROAR_SPEED_SCALE;
        moveY *= ELITE_ROAR_SPEED_SCALE;
      }

      if (enemy.hitBoostTimer > 0) {
        moveX *= enemy.hitBoostScale;
        moveY *= enemy.hitBoostScale;
      }
      if (enemy.bindTimer > 0) {
        moveX *= ENEMY_BIND_SPEED_SCALE;
        moveY *= ENEMY_BIND_SPEED_SCALE;
        if (enemy.bindSparkTimer <= 0) {
          addHitSpark(
            enemy.body.pos.x + enemySize / 2,
            enemy.body.pos.y + enemySize / 2,
            { x: 0, y: -18 },
            [255, 232, 126],
            5,
          );
          enemy.bindSparkTimer = ENEMY_BIND_SPARK_INTERVAL;
        }
      }

      const hitX = moveOnAxis(enemy.body, moveX, 0, enemySize);
      const hitY = moveOnAxis(enemy.body, 0, moveY, enemySize);
      if (hitX || enemy.body.pos.x <= 0 || enemy.body.pos.x + enemySize >= width()) {
        enemy.velocity.x *= -1;
      }
      if (hitY || enemy.body.pos.y <= 0 || enemy.body.pos.y + enemySize >= height()) {
        enemy.velocity.y *= -1;
      }
      if (hitX && hitY) {
        rotateVelocity(enemy.velocity, ENEMY_CORNER_TURN_ANGLE);
      }
      if (enemy.trailTimer <= 0) {
        addEnemyMotionCue(enemy, room);
        enemy.trailTimer = room.enemyBehavior === "sandDrift" ? SAND_DRIFT_TRAIL_INTERVAL : ENEMY_TRAIL_INTERVAL;
      }
      updateEliteHealthBar(enemy);
    });

    get("bullet").forEach((bullet) => {
      const distance = Math.hypot(bullet.velocity.x, bullet.velocity.y) * dt();
      const steps = Math.max(1, Math.ceil(distance / BULLET_STEP));
      const stepX = bullet.velocity.x * dt() / steps;
      const stepY = bullet.velocity.y * dt() / steps;
      if (bullet.isPiercing) {
        bullet.trailTimer -= dt();
        if (bullet.trailTimer <= 0) {
          addHitSpark(
            bullet.pos.x + bullet.hitSize.w / 2,
            bullet.pos.y + bullet.hitSize.h / 2,
            { x: -bullet.velocity.x * 0.002, y: -bullet.velocity.y * 0.002 },
            [255, 218, 150],
            3,
          );
          bullet.trailTimer = 0.035;
        }
      }

      for (let i = 0; i < steps; i += 1) {
        if (!bullet.exists()) break;
        bullet.move(stepX, stepY);

        const enemy = get("enemy").find((enemyBody) => (
          !bullet.hitEnemies.has(enemyBody)
          && bulletOverlapsTarget(bullet, enemyBody, enemyBody.enemySize ?? ENEMY_SIZE)
        ));
        if (enemy) {
          bullet.hitEnemies.add(enemy);
          const enemySize = enemy.enemySize ?? ENEMY_SIZE;
          const enemyCenterX = enemy.pos.x + enemySize / 2;
          const enemyCenterY = enemy.pos.y + enemySize / 2;
          const enemyRecord = enemies.find((entry) => entry.body === enemy);
          enemy.hp = Math.max(0, (enemy.hp ?? 1) - 1);
          addHitBurst(enemyCenterX, enemyCenterY, room.introColor);
          if (bullet.pierceLeft > 0) {
            bullet.pierceLeft -= 1;
            bullet.opacity = Math.max(0.58, bullet.opacity - 0.22);
            addRoomCue("穿透", enemyCenterX, Math.max(58, enemyCenterY - 18), [255, 218, 150], 0.45);
          } else {
            destroy(bullet);
          }
          if (enemy.hp > 0) {
            if (getRunItemInfo()?.effect === "bind" && enemyRecord && enemy.maxHp > 1) {
              enemyRecord.bindTimer = ENEMY_BIND_TIME;
              feedbackText.text = "紧箍咒：精英缓速";
              feedbackTimer = 0.8;
              addRoomCue("定身", enemyCenterX, Math.max(58, enemyCenterY - 18), [255, 232, 126], 0.5);
            }
            if (room.enemyHitReaction === "counterRush" && enemyRecord) {
              enemyRecord.velocity.x *= -1;
              enemyRecord.velocity.y *= -1;
              enemyRecord.hitBoostTimer = room.hitBoostTime ?? 0.65;
              enemyRecord.hitBoostScale = room.hitBoostScale ?? 1.45;
              addRoomCue("反冲", enemyCenterX, Math.max(58, enemyCenterY - 18), room.introColor, 0.6);
            }
            if (
              enemyRecord?.phaseCue
              && !enemyRecord.bossPhaseWarned
              && enemy.hp <= Math.ceil((enemy.maxHp ?? 1) / 2)
            ) {
              enemyRecord.bossPhaseWarned = true;
              enemyRecord.velocity.x *= enemyRecord.phaseSpeedScale;
              enemyRecord.velocity.y *= enemyRecord.phaseSpeedScale;
              triggerBossAmbushIfNeeded();
              feedbackText.text = enemyRecord.phaseCue;
              feedbackTimer = 1.05;
              addRoomCue(enemyRecord.phaseCue, enemyCenterX, Math.max(58, enemyCenterY - 24), [255, 232, 118], 1.1);
              addHitBurst(enemyCenterX, enemyCenterY, [255, 232, 118]);
              playToneSequence([
                { frequency: 420, duration: 0.06, volume: 0.024, type: "sawtooth" },
                { frequency: 720, duration: 0.08, volume: 0.026, type: "triangle" },
              ]);
            } else {
              feedbackText.text = `精英妖怪 ${enemy.hp}/${enemy.maxHp}`;
              feedbackTimer = 0.45;
            }
            playTone(560, 0.045, 0.02, "triangle");
          } else {
            if (enemyRecord) {
              destroyEliteHealthBar(enemyRecord);
            }
            if (room.enemyAfterimage === "bone") {
              addBoneAfterimage(enemy.pos.x, enemy.pos.y);
            }
            enemiesLeft -= 1;
            runStats.defeats += 1;
            playTone(760, 0.055, 0.024, "triangle");
            destroy(enemy);
            if (enemiesLeft > 0) {
              feedbackText.text = enemy.maxHp > 1 ? `精英已破，妖怪还剩 ${enemiesLeft}` : `妖怪已击破，还剩 ${enemiesLeft}`;
              feedbackTimer = 0.55;
              if (remainingCueTimer <= 0) {
                addRoomCue(`还剩 ${enemiesLeft}`, enemyCenterX, Math.max(58, enemyCenterY - 20), room.introColor, 0.65);
                remainingCueTimer = REMAINING_ENEMY_CUE_COOLDOWN;
              }
            }
            updateStatusText();
            openDoorIfReady();
          }
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

function addResultStatCard(x, y, w, h, label, value, accentColor) {
  add([
    rect(w, h),
    pos(x, y),
    anchor("center"),
    color(18, 21, 28),
    opacity(0.86),
    outline(1, accentColor),
  ]);
  add([
    text(label, { size: 9 }),
    pos(x, y - 10),
    anchor("center"),
    color(184, 190, 196),
  ]);
  add([
    text(value, { size: 12 }),
    pos(x, y + 5),
    anchor("center"),
    color(...accentColor),
  ]);
}

scene("complete", () => {
  const bestResult = updateBestTime(runStats.time);
  const bestLabel = bestResult.bestTime === null ? "暂无记录" : formatRunTime(bestResult.bestTime);
  const bestPrefix = bestResult.isNewBest ? "新最快" : "最快";
  const clearRank = getClearRank(runStats);
  const compactCompleteItem = getShortText(getCompactRunItemName(), 6);
  const compactCompleteRoute = getShortText(getCompactRunRouteSummary(), 22);
  playToneSequence([
    { frequency: 520, duration: 0.08, volume: 0.022, type: "triangle" },
    { frequency: 660, duration: 0.08, volume: 0.022, type: "triangle" },
    { frequency: 880, duration: 0.12, volume: 0.024, type: "triangle" },
  ]);
  addResultScreen({
    title: "取经路已通",
    subtitle: "多房间妖气已被清理，终点前庭归于平静",
    hint: "按 R 开始新一轮取经",
    accentColor: [255, 232, 150],
    backgroundColor: [32, 38, 30],
  });
  add([
    text("传送门光芒稳定，妖气暂退。", { size: 11 }),
    pos(width() / 2, 210),
    anchor("center"),
    color(190, 216, 190),
  ]);
  add([
    text(`评级 ${clearRank.grade} / ${clearRank.comment}`, { size: 11 }),
    pos(width() / 2, 228),
    anchor("center"),
    color(255, 232, 150),
  ]);
  add([
    text(`用时 ${formatRunTime(runStats.time)} / 击败 ${runStats.defeats} / 受伤 ${runStats.hitsTaken}`, { size: 11 }),
    pos(width() / 2, 246),
    anchor("center"),
    color(230, 226, 194),
  ]);
  add([
    text(`剩余生命 ${getHealthLabel(runHealth)} / 道具 ${compactCompleteItem} / 清房 ${getClearedProgressLabel()}`, { size: 11 }),
    pos(width() / 2, 264),
    anchor("center"),
    color(210, 228, 198),
  ]);
  add([
    text(`${bestPrefix} ${bestLabel}`, { size: 11 }),
    pos(width() / 2, 282),
    anchor("center"),
    color(255, 232, 150),
  ]);
  add([
    rect(312, 94),
    pos(width() / 2, 242),
    anchor("center"),
    color(24, 25, 34),
    opacity(0.94),
    outline(2, [255, 232, 150]),
  ]);
  add([
    text(`评级 ${clearRank.grade}`, { size: 19 }),
    pos(width() / 2 - 104, 220),
    anchor("center"),
    color(255, 232, 150),
  ]);
  add([
    text(clearRank.comment, { size: 10 }),
    pos(width() / 2 - 104, 244),
    anchor("center"),
    color(230, 226, 194),
  ]);
  addResultStatCard(width() / 2 + 6, 220, 64, 30, "用时", formatRunTime(runStats.time), [255, 232, 150]);
  addResultStatCard(width() / 2 + 76, 220, 64, 30, "最快", bestLabel, bestResult.isNewBest ? [152, 238, 190] : [210, 228, 198]);
  addResultStatCard(width() / 2 + 6, 256, 64, 30, "击/伤", `${runStats.defeats}/${runStats.hitsTaken}`, [230, 226, 194]);
  addResultStatCard(width() / 2 + 76, 256, 64, 30, "清房", getClearedPercentLabel(), [190, 216, 190]);
  add([
    text(`道具 ${compactCompleteItem} / ${getCompactBossAmbushLabel()} / ${getCompactEliteAffixLabel()}`, { size: 9 }),
    pos(width() / 2, 290),
    anchor("center"),
    color(255, 235, 190),
  ]);
  add([
    text(compactCompleteRoute, { size: 8 }),
    pos(width() / 2, 304),
    anchor("center"),
    color(206, 214, 190),
  ]);
  onKeyDown("r", () => go("game", currentStartRoomId, true));
});

scene("lose", (roomId = START_ROOM_ID) => {
  if (typeof roomId === "number") {
    roomId = ROOMS[roomId]?.id ?? currentStartRoomId;
  }
  const room = getRoomById(roomId);
  const roomIndex = getRoomIndex(room.id);
  const roomName = room.name ?? "当前房间";
  const compactRoomName = getShortText(roomName, 8);
  const compactLoseRoute = getShortText(getCompactRunRouteSummary(), 18);
  addResultScreen({
    title: "取经受阻",
    subtitle: `${roomName} 的妖气仍未散尽`,
    hint: "按 R 开始新一轮取经",
    accentColor: [255, 156, 132],
    backgroundColor: [44, 30, 34],
  });
  add([
    text(`当前房间：${roomName} / 节点 ${roomIndex + 1}/${ROOMS.length}`, { size: 11 }),
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
  add([
    rect(312, 88),
    pos(width() / 2, 242),
    anchor("center"),
    color(28, 22, 28),
    opacity(0.94),
    outline(2, [255, 156, 132]),
  ]);
  add([
    text("本次受阻", { size: 18 }),
    pos(width() / 2 - 104, 218),
    anchor("center"),
    color(255, 156, 132),
  ]);
  add([
    text(compactRoomName, { size: 10 }),
    pos(width() / 2 - 104, 242),
    anchor("center"),
    color(236, 204, 198),
  ]);
  addResultStatCard(width() / 2 + 6, 218, 64, 30, "用时", formatRunTime(runStats.time), [255, 190, 160]);
  addResultStatCard(width() / 2 + 76, 218, 64, 30, "清房", getClearedPercentLabel(), [210, 228, 198]);
  addResultStatCard(width() / 2 + 6, 254, 64, 30, "击/伤", `${runStats.defeats}/${runStats.hitsTaken}`, [230, 226, 194]);
  addResultStatCard(width() / 2 + 76, 254, 64, 30, "路线", currentRunLayoutName || "随机", [236, 204, 198]);
  add([
    text(`生命 ${getHealthLabel(runHealth)} / 道具 ${getCompactRunItemName()} / 房间 ${compactRoomName}`, { size: 9 }),
    pos(width() / 2, 288),
    anchor("center"),
    color(255, 220, 190),
  ]);
  add([
    text(`${compactLoseRoute} / ${getCompactBossAmbushLabel()} / ${getCompactEliteAffixLabel()}`, { size: 8 }),
    pos(width() / 2, 302),
    anchor("center"),
    color(220, 204, 198),
  ]);
  onKeyDown("r", () => go("game", currentStartRoomId, true));
});

go("game", currentStartRoomId, false);
