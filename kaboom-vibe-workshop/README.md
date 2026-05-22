# Kaboom + Vite 课堂模板

**本项目文件绝对路径：** `C:\Users\123\kaboom-vibe-workshop`

（说明：若环境变量 `CURSOR_WORKSPACE` 等未指向工作区，则模板落在上述目录。）

## 环境要求

建议使用 **Node.js v24.15.0（LTS）**（Node 24 LTS，建议与本课堂一致安装 **24.15.0**；与官网当前 LTS 线路及 Vite 8、课堂机房环境对齐）。

## 安装与运行

仓库中已包含 `package-lock.json` 时，推荐：

```bash
npm ci
```

若无 lockfile（例如从零复制了部分文件），则使用：

```bash
npm install
```

然后启动开发服务器：

```bash
npm run dev
```

浏览器打开终端里提示的本地地址（默认端口 **5173**）。`vite.config.js` 已设置 `host: true`，便于同一局域网其它设备访问。

## 课堂三句话

先用 `kaboom({ width, height, scale, global: false })` 固定分辨率与放大倍数，让全班看到一致的画面；再用 `add([ rect, pos, area, color, "标签" ])` 把「能画、能动、能撞」三件事拆开讲；最后用 `scene` / `go` 把胜利与重开做成独立段落，学生改关卡不会把整份文件搅成一团。

## 第一个建议修改的参数（速度）

打开 `src/main.js` 第 **4** 行常量 **`MOVE_SPEED`**：数值越大，玩家矩形移动越快（单位：像素/秒，配合 `pos().move()`）。

## Git 基线标签（老师用）

第一次能正常运行后，可打标签方便学生回滚：

```bash
git tag class-baseline
```

## 目录说明

| 路径 | 说明 |
|------|------|
| `src/main.js` | 最小可玩示例：移动、目标碰撞胜利、红块失败 |
| `docs/kaboom-cheatsheet.md` | 与本版本 API 对齐的一页备忘 |
| `templates/acceptance-checklist.md` | 学生验收清单模板 |
| `templates/prompt-template.md` | 中文「目标 / 约束 / 验收 / 回滚」提示词模板 |

## 依赖版本（精确锁定）

- `kaboom@3000.1.17`
- `vite@8.0.13`

（版本通过 `npm view kaboom version` 与 `npm view vite version` 在生成模板当日解析。）

## 离线分发说明

若某台机器 `npm install` 失败：请在一台已成功安装的电脑上，将 **`C:\Users\123\kaboom-vibe-workshop`** 整个文件夹打包（含 `node_modules` 与 `package-lock.json`），解压后学生可直接 `npm run dev`；长期维护仍建议修复网络后重新 `npm install` 以保持一致性。
