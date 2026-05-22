# Game Vibe

本项目由刘秉昂使用 Codex 完成与维护。

项目基于 `kaboom-vibe-workshop` 课程参考模板进行游戏开发与迭代。后续每次游戏更新都会同步记录在本 README 的“更新日志”里，并提交到 GitHub。

## 课程包基线

课程包已经固定了 Kaboom 画布分辨率和放大倍数，位置在 `kaboom-vibe-workshop/src/main.js`：

```js
kaboom({
  width: 320,
  height: 200,
  scale: 3,
  crisp: true,
  global: false,
});
```

这表示游戏逻辑画布是 `320 x 200`，显示时放大 `3` 倍，并保持像素风清晰显示。

## 更新日志

### 2026-05-22

- 将更新日志整合到 README，让 GitHub 首页更明显地展示项目状态。
- 添加项目署名说明：本项目由刘秉昂使用 Codex 完成与维护。
- 初始化本地 Git 仓库管理。
- 纳入 Kaboom + Vite 游戏项目文件。
- 建立后续更新说明规范。

