# Kaboom v3000 一页备忘（与本模板 `kaboom@3000.1.17` 对齐）

以下内容摘自项目内类型定义 `node_modules/kaboom/dist/kaboom.d.ts` 的常用入口，课堂够用即可。

## 初始化

```js
import kaboom from "kaboom";

const k = kaboom({
  width: 320,
  height: 200,
  scale: 3,       // 画布像素放大，适合教学演示
  crisp: true,
  global: false,  // 推荐：从返回值解构 API，避免污染全局
});
```

默认导出即 `kaboom` 函数；`kaboom(opt?)` 返回 `KaboomCtx`（含 `add`、`scene` 等全部 API）。

## `add` — 组装游戏对象

`add([ ...components ])`：组件从左到右叠加能力；**字符串标签**可写在数组里，用于碰撞分组。

常用组件工厂（均在 `KaboomCtx` 上）：

| 工厂 | 作用 |
|------|------|
| `rect(w, h)` | 画矩形 |
| `pos(x, y)` | 位置；提供 `.move(vx, vy)`（**按秒像素速度**） |
| `area()` | 碰撞盒；提供 `.onCollide(...)` |
| `color(r,g,b)` | 填充色 |
| `text(str, { size })` | 文本 |
| `anchor("center")` 等 | 对齐锚点 |
| `outline(w, color?)` | 描边（可选） |

## 输入：`onKeyDown` 与 `isKeyDown`

- `onKeyDown("r", () => { ... })`：某键按下时触发（适合一次性动作）。
- `onUpdate(() => { if (isKeyDown("left")) player.move(-sp, 0) })`：按住连续移动（WASD / 方向键）。

## 碰撞：`onCollide`

挂在带 `area()` 的对象上：

```js
player.onCollide("goal", () => {
  go("win");
});
```

全局也有 `onCollide(tagA, tagB, fn)` 形式；课堂优先用 **对象上的** `.onCollide` 更直观。

## `destroy`

`destroy(obj)`：从场景移除某个游戏对象（常用于拾取物消失）。

## `wait`

`wait(seconds, () => { ... })`：延迟执行（可选第二个回调参数）；返回 `TimerController` 可用于取消等高级用法。

## 场景：`scene` + `go`

```js
scene("game", () => {
  // 放关卡物体、注册事件
});

scene("win", () => {
  // 胜利 UI
});

go("game"); // 启动默认场景
```

`go("win")` 切换到已注册的同名场景，可传额外参数（进阶）。

---

**提示**：官方已标记 `kaboom` 包弃用， successor 为 KAPLAY；本模板仍固定 Kaboom 3000 以便与既有教材一致。
