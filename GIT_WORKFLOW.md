# Git 更新流程

以后每次更新游戏，按这个顺序处理：

1. 修改游戏代码或资源。
2. 运行验证命令，例如 `npm run build`。
3. 更新 `README.md` 里的“更新日志”，写清楚本次改动。
4. 执行 `git status --short` 检查变更。
5. 提交更新，例如：

```bash
git add .
git commit -m "说明本次游戏更新"
```

如果已经配置 GitHub 远端，再推送：

```bash
git push origin main
```

当前仓库还没有绑定 GitHub 远端。拿到 GitHub 仓库地址后，执行：

```bash
git remote add origin <GitHub 仓库地址>
git push -u origin main
```
