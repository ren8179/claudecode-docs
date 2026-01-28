# ClaudeCode 培训文档 - 部署指南

本仓库包含 ClaudeCode 培训的完整文档，使用 VitePress 构建，自动部署到 GitHub Pages。

## 🚀 快速部署到 GitHub Pages

### 步骤 1：在 GitHub 上创建仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `claudecode-docs`
   - **Description**: ClaudeCode 培训文档
   - **Visibility**: Public（必须公开才能使用免费的 GitHub Pages）
4. **不要**勾选 "Add a README file"
5. 点击 "Create repository"

### 步骤 2：推送代码到 GitHub

在项目目录执行以下命令：

```bash
# 1. 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/claudecode-docs.git

# 2. 推送代码到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

1. 访问你刚创建的仓库：`https://github.com/YOUR_USERNAME/claudecode-docs`
2. 点击 **Settings** 标签
3. 在左侧菜单找到 **Pages**
4. 在 "Source" 下，选择 **GitHub Actions**
5. 点击 **Save**

### 步骤 4：等待自动部署

1. 推送代码后，GitHub Actions 会自动构建和部署
2. 点击 **Actions** 标签查看部署进度
3. 大约需要 1-2 分钟完成
4. 完成后，你的文档网站将部署到：
   ```
   https://YOUR_USERNAME.github.io/claudecode-docs/
   ```

## 📝 本地预览

在部署之前，你可以在本地预览文档：

```bash
# 1. 进入项目目录
cd F:\02Doc\ClaudeCode

# 2. 启动开发服务器（仅本机访问）
npm run docs:dev

# 3. 打开浏览器访问
# http://localhost:5173
```

### 局域网访问（使用 IP 和端口）

如果需要在局域网内其他设备访问，启动时添加 `--host` 参数：

```bash
# 启动开发服务器，监听所有网络接口
npm run docs:dev -- --host 0.0.0.0
```

**访问方式：**

| 设备           | 访问地址              |
| -------------- | --------------------- |
| 本机           | http://localhost:5173 |
| 局域网其他设备 | http://你的IP:5173    |

**获取本机 IP 地址：**

```bash
# Windows
ipconfig

# macOS/Linux
ifconfig或 ip addr
```

例如：如果你的 IP 是 `192.168.1.100`，局域网内其他设备可访问：

```
http://192.168.1.100:5173
```

**注意：** 确保防火墙允许 5173 端口的入站连接。

## 🔄 更新文档

当你更新文档后：

```bash
# 1. 提交更改
git add .
git commit -m "更新文档内容"

# 2. 推送到 GitHub
git push

# GitHub Actions 会自动重新部署
```

## 🎨 自定义配置

### 修改网站标题和描述

编辑 `.vitepress/config.mts` 文件：

```typescript
export default defineConfig({
  title: '你的标题',           // 修改这里
  description: '你的描述',     // 修改这里
  base: '/claudecode-docs/',  // 如果仓库名不同，修改这里
  ...
})
```

### 修改 GitHub 用户名

编辑 `.vitepress/config.mts` 文件，将 `yourusername` 替换为你的 GitHub 用户名：

```typescript
nav: [
  { text: 'GitHub', link: 'https://github.com/YOUR_USERNAME/claudecode-docs' }
],

socialLinks: [
  { icon: 'github', link: 'https://github.com/YOUR_USERNAME/claudecode-docs' }
]
```

## 📚 文档结构

```
claudecode-docs/
├── docs/                    # 文档源文件
│   ├── index.md             # 首页
│   ├── outline.md           # 培训大纲
│   ├── chapter-1.md         # 第一章
│   ├── chapter-2.md         # 第二章
│   ├── chapter-3.md         # 第三章
│   ├── chapter-4.md         # 第四章
│   ├── chapter-5.md         # 第五章
│   └── chapter-6.md         # 第六章
├── .vitepress/              # VitePress 配置
│   └── config.mts           # 网站配置
├── .github/                 # GitHub 配置
│   └── workflows/
│       └── deploy.yml       # 自动部署配置
├── package.json             # 项目配置
└── README.md                # 本文件
```

## 🔧 常见问题

### Q: 部署后 404 错误？

A: 检查以下几点：

1. 仓库必须是 Public
2. 确认在 Settings → Pages 中选择了 GitHub Actions
3. 检查 `docs/.vitepress/config.mts` 中的 `base` 配置是否正确

### Q: 样式不正确？

A: 清除浏览器缓存或使用无痕模式访问

### Q: 更新后没有生效？

A:

1. 检查 GitHub Actions 是否成功运行
2. 清除浏览器缓存
3. 等待 1-2 分钟让 CDN 更新

---

## 💡 部署经验总结（踩坑记录）

### 1. 配置文件位置

**❌ 错误做法：** 将配置文件放在根目录 `.vitepress/config.mts`

**✅ 正确做法：** 配置文件必须放在 `docs/.vitepress/config.mts`

VitePress 构建时读取的是 `docs/.vitepress/config.mts`，根目录的配置不会被读取。

### 2. base 路径配置

**❌ 错误配置：** `base: '/'`

**✅ 正确配置：** `base: '/claudecode-docs/'`

部署地址是 `https://username.github.io/claudecode-docs/`，所以 base 必须设置为 `/claudecode-docs/`，否则静态资源（CSS、JS）会 404。

### 3. 文档更新流程

修改文档内容时，需要同时更新：

- `docs/chapter-1.md` - VitePress 构建使用的文件
- `ClaudeCode_第一章_详细版.md` - 源文件（可选，用于备份）

**推荐流程：**

```bash
# 1. 编辑 docs/chapter-1.md（直接修改部署用文件）
# 2. 提交并推送
git add docs/chapter-1.md
git commit -m "docs: 更新第一章内容"
git push
```

### 4. 忽略构建输出

构建输出目录 `docs/.vitepress/dist/` 不应提交到仓库，已在 `.gitignore` 中配置。

**.gitignore 内容：**

```
# VitePress build output
docs/.vitepress/dist/
docs/.vitepress/cache/

# Dependencies
node_modules/
```

### 5. 本地预览注意事项

本地预览时使用 `npm run docs:dev`，访问 `http://localhost:5173`。

**注意：** 本地预览不需要 base 路径前缀，但部署后需要。这是正常现象，VitePress 会自动处理。

## 📖 更多资源

- [VitePress 官方文档](https://vitepress.dev/)
- [GitHub Pages 官方文档](https://docs.github.com/pages)
- [GitHub Actions 官方文档](https://docs.github.com/actions)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个文档！

## 📄 许可证

MIT License
