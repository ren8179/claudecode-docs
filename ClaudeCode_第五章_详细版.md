# 第五章：实操演示（详细版）

---

## 5.1 环境准备

### 5.1.1 前置条件检查

**检查清单：**

```bash
# 1. 检查Node.js版本
node -v
# 要求：v18.0.0 或更高

# 2. 检查Git版本
git --version
# 要求：2.0.0 或更高

# 3. 检查npm版本
npm -v
# 要求：8.0.0 或更高
```

**如果Node.js未安装：**

| 操作系统 | 下载地址 |
|---------|---------|
| Windows | https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi |
| macOS | https://nodejs.org/dist/v20.11.0/node-v20.11.0.pkg |
| Linux | `curl -fsSL https://deb.nodesource.com/setup_20.x \| sudo -E bash -` |

### 5.1.2 安装Claude Code

**全局安装（推荐）：**

```bash
# Windows (PowerShell/CMD)
npm install -g @anthropic-ai/claude-code

# macOS/Linux
sudo npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
# 输出示例：claude 2.0.64
```

### 5.1.3 配置模型

**推荐模型对比：**

| 模型 | 提供商 | 代码能力 | 价格 | 优势 | 适用场景 |
|------|--------|---------|------|------|---------|
| **GLM-4.7** | 智谱AI | ⭐⭐⭐⭐⭐ | 中等 | 中文理解强，有Coding套餐 | 中文项目为主 |
| **Kimi K2** | 月之暗面 | ⭐⭐⭐⭐⭐ | 较低 | 超长上下文128K | 大型项目重构 |
| **Qwen-Coder-Plus** | 阿里云 | ⭐⭐⭐⭐⭐ | 低 | 开源，性能优秀 | Python/JS项目 |
| **DeepSeek-Coder** | 深度求索 | ⭐⭐⭐⭐ | 极低 | 价格优势 | 预算有限的场景 |

**配置示例（智谱GLM）：**

```bash
# Windows (PowerShell)
setx ANTHROPIC_BASE_URL "https://open.bigmodel.cn/api/anthropic"
setx ANTHROPIC_AUTH_TOKEN "你的API密钥"
setx ANTHROPIC_MODEL "GLM-4.7"
# 重启终端

# macOS/Linux
export ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic
export ANTHROPIC_AUTH_TOKEN=你的API密钥
export ANTHROPIC_MODEL=GLM-4.7

# 永久配置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN=你的API密钥' >> ~/.bashrc
echo 'export ANTHROPIC_MODEL=GLM-4.7' >> ~/.bashrc
source ~/.bashrc
```

**获取API密钥：**

- 智谱AI：https://open.bigmodel.cn/
- Kimi：https://platform.moonshot.cn/
- 通义千问：https://bailian.console.aliyun.com/

### 5.1.4 创建演示项目

```bash
# 1. 创建项目目录
mkdir claude-demo
cd claude-demo

# 2. 初始化Git（强烈推荐）
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 3. 首次提交
git add .
git commit -m "Initial commit"

# 4. 启动Claude Code
claude

# 看到以下提示说明启动成功：
# Claude Code CLI v2.0.64
# Type /help for available commands
# Model: GLM-4.7
# Context: 0/200K tokens
```

---

## 5.2 实操演示1：快速创建项目

### 5.2.1 项目初始化

```bash
# 在Claude Code中
/init

# Claude会自动：
# 1. 扫描项目结构
# 2. 分析是否有package.json
# 3. 识别技术栈
# 4. 生成CLAUDE.md
```

**CLAUDE.md生成示例：**

```markdown
# 项目名称：claude-demo

## 项目概述
这是一个新创建的演示项目

## 技术栈
- 语言：JavaScript/TypeScript
- 框架：待定
- 包管理器：npm

## 目录结构
```
claude-demo/
└── (空)
```

## 常用命令
- npm install: 安装依赖
- npm start: 启动项目
- npm test: 运行测试

## 代码规范
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化

## Git提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
```

### 5.2.2 创建待办事项应用

**步骤1：进入Plan模式**

```bash
# 按两次 Shift+Tab，或输入：
/plan

# 描述需求
请帮我创建一个简单的待办事项应用，包括：
1. 添加待办事项
2. 标记完成状态
3. 删除待办事项
4. 使用React + TypeScript + Tailwind CSS
5. 数据存储在localStorage
```

**Claude生成的计划：**

```markdown
# Plan: 创建待办事项应用

## 需求分析
创建一个简单的待办事项应用，支持添加、完成、删除功能

## 技术栈选择
- 前端框架：React 18
- 语言：TypeScript
- 样式：Tailwind CSS
- 数据存储：localStorage
- 构建工具：Vite

## 实施计划

### 阶段1：项目初始化
1. 使用Vite创建React + TypeScript项目
2. 安装Tailwind CSS
3. 配置开发环境

### 阶段2：数据层
1. 定义Todo类型
2. 创建localStorage hook
3. 实现数据持久化

### 阶段3：组件开发
1. 创建TodoItem组件
2. 创建TodoList组件
3. 创建TodoForm组件
4. 创建App组件

### 阶段4：样式设计
1. 应用Tailwind CSS样式
2. 响应式设计
3. 交互动画

### 阶段5：测试
1. 功能测试
2. 浏览器兼容性测试

## 文件结构
```
claude-demo/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── public/
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types/
    │   └── todo.ts
    ├── hooks/
    │   └── useLocalStorage.ts
    └── components/
        ├── TodoForm.tsx
        ├── TodoItem.tsx
        └── TodoList.tsx
```

## 预估工作量
- 开发时间：约30分钟
- 测试时间：约10分钟

---

确认后开始执行? (yes/no/modify)
```

**步骤2：确认并执行**

```bash
# 输入 yes 确认
yes

# Claude会开始执行：
# 1. 创建项目
# 2. 安装依赖
# 3. 创建文件
# 4. 编写代码
```

**步骤3：查看生成的代码**

```bash
# 查看项目结构
!ls -la

# 查看主要文件
@src/App.tsx
@src/types/todo.ts
@src/hooks/useLocalStorage.ts

# 查看CLAUDE.md
@CLAUDE.md
```

**步骤4：运行项目**

```bash
# 启动开发服务器
!npm run dev

# 输出示例：
#   VITE v4.3.2  ready in 234 ms
#
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
```

**步骤5：测试功能**

```bash
# 打开浏览器访问 http://localhost:5173/
# 测试以下功能：
# 1. 添加待办事项
# 2. 点击复选框标记完成
# 3. 点击删除按钮删除
# 4. 刷新页面，数据是否保留
```

---

## 5.3 实操演示2：使用Skills

### 5.3.1 安装frontend-design skill

**方法1：手动安装（推荐）**

```bash
# 1. 下载官方skill
# 访问：https://github.com/anthropics/skills/tree/main/skills/frontend-design

# 2. 创建skills目录
mkdir -p .claude/skills

# 3. 下载并解压到该目录
# .claude/skills/frontend-design/
# ├── skill.md
# ├── assets/
# └── reference/

# 4. 重启Claude Code
# 按 Ctrl+C 退出，再重新启动
claude
```

**方法2：命令安装（需要skills-installer）**

```bash
# 安装skills-installer
npm install -g @anthropic/skills-installer

# 安装frontend-design skill
npx skills-installer install @anthropics/claude-code/frontend-design --client claude-code
```

### 5.3.2 使用frontend-design skill优化设计

```bash
# 使用skill优化现有界面
使用frontend-design skill优化待办事项应用的界面设计

要求：
1. 现代简约风格
2. 使用渐变色背景
3. 添加平滑动画
4. 改善交互体验
```

**Claude会自动：**

1. 读取frontend-design skill的指导
2. 应用设计原则
3. 优化样式代码
4. 添加动画效果
5. 改善用户体验

**优化后的效果：**

```tsx
// App.tsx 优化后
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            📝 待办事项
          </h1>
          <TodoForm onAdd={addTodo} />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
```

### 5.3.3 创建自定义skill

**使用skill-creator创建：**

```bash
# 1. 先安装skill-creator
# 按照frontend-design的方法安装

# 2. 在Claude Code中
创建skill，能按照我们公司的格式写周报

周报格式要求：
1. 本周工作内容
2. 遇到的问题
3. 下周计划
4. 需要的支持
```

**Claude会引导创建：**

1. 询问skill的名称和描述
2. 生成skill.md
3. 创建必要的模板
4. 提供使用说明

**生成的skill示例：**

```markdown
---
name: weekly-report-writer
description: 按照公司格式撰写周报
---

# 周报撰写助手

这个Skill帮助按照公司标准格式撰写周报。

## 周报格式

### 本周工作内容
- [工作项1]
- [工作项2]
- [工作项3]

### 遇到的问题
1. [问题描述]
   - 影响：[影响范围]
   - 解决方案：[解决方法]

### 下周计划
- [计划项1]
- [计划项2]

### 需要的支持
- [支持项1]
- [支持项2]

## 使用方法

告诉我你这周做了什么，我会帮你生成周报。
```

---

## 5.4 实操演示3：使用MCP服务器

### 5.4.1 安装Chrome DevTools MCP

```bash
# 在Claude Code中
请帮我安装chrome-devtools MCP服务器

# Claude会执行：
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest

# 重启Claude Code
```

### 5.4.2 使用Chrome DevTools MCP测试网页

```bash
# 确保待办事项应用正在运行
!npm run dev

# 使用Chrome DevTools MCP测试
用Chrome DevTools MCP打开 http://localhost:5173，然后执行以下测试：

1. 截取初始页面（保存为 screenshot-initial.png）
2. 测试添加待办事项：
   - 找到输入框
   - 输入"学习Claude Code"
   - 点击添加按钮
   - 截图（保存为 screenshot-after-add.png）
3. 测试标记完成：
   - 点击复选框
   - 截图（保存为 screenshot-after-complete.png）
4. 测试删除功能：
   - 点击删除按钮
   - 截图（保存为 screenshot-after-delete.png）
5. 验证数据持久化：
   - 刷新页面
   - 验证数据是否保留
   - 截图（保存为 screenshot-after-refresh.png）
6. 生成测试报告
```

**Claude的执行过程：**

```
1. 导航到页面
   chrome_navigate: http://localhost:5173 ✓

2. 截取初始页面
   chrome_screenshot: screenshot-initial.png ✓

3. 填写输入框
   chrome_fill: 输入框 → "学习Claude Code" ✓

4. 点击添加按钮
   chrome_click: 添加按钮 ✓

5. 截图验证
   chrome_screenshot: screenshot-after-add.png ✓

...继续执行其他测试步骤...

6. 生成测试报告
   ✅ 所有测试通过
```

### 5.4.3 使用GitHub MCP（可选）

**安装GitHub MCP：**

```bash
# 需要GitHub token
# 获取地址：https://github.com/settings/tokens

claude mcp add github npx -y @modelcontextprotocol/server-github
# 设置环境变量 GITHUB_TOKEN
```

**使用GitHub MCP：**

```bash
# 创建Issue
请使用github MCP创建Issue：
- 仓库：[你的仓库]
- 标题：添加待办事项编辑功能
- 描述：用户应该能够编辑已创建的待办事项
- 标签：enhancement, todo

# 创建PR
请使用github MCP创建PR：
- 标题：feat: 添加待办事项编辑功能
- 描述：实现了待办事项的编辑功能
- 基础分支：main
```

---

## 5.5 实操演示4：Plan模式实战

### 5.5.1 复杂任务：添加用户认证

```bash
# 进入Plan模式
Shift+Tab × 2

# 描述需求
请为待办事项应用添加用户认证功能，包括：
1. 用户注册
2. 用户登录
3. 登录后才能查看待办事项
4. 每个用户的数据独立存储
5. 使用localStorage模拟后端API
```

**Claude生成的详细计划：**

```markdown
# Plan: 添加用户认证功能

## 需求分析
为待办事项应用添加完整的用户认证系统

## 技术方案
- 使用localStorage模拟后端
- JWT token管理
- 私有路由保护

## 实施计划

### 阶段1：类型定义
1. 创建User类型
2. 创建AuthContext类型
3. 扩展API类型

### 阶段2：认证服务
1. 创建auth.service.ts
   - register注册
   - login登录
   - logout登出
   - getCurrentUser获取当前用户
2. 创建auth.storage.ts
   - 管理用户数据存储
   - 管理token存储

### 阶段3：认证Context
1. 创建AuthContext
2. 创建AuthProvider
3. 创建useAuth hook

### 阶段4：路由保护
1. 创建ProtectedRoute组件
2. 创建LoginPage
3. 创建RegisterPage
4. 更新路由配置

### 阶段5：数据隔离
1. 修改useLocalStorage支持用户隔离
2. 迁移现有数据结构
3. 更新组件使用新API

### 阶段6：UI更新
1. 创建登录表单
2. 创建注册表单
3. 添加导航栏
4. 添加登出按钮

## 文件变更清单

### 新增文件
- src/types/user.ts
- src/types/auth.ts
- src/services/auth.service.ts
- src/services/auth.storage.ts
- src/contexts/AuthContext.tsx
- src/hooks/useAuth.ts
- src/components/ProtectedRoute.tsx
- src/pages/LoginPage.tsx
- src/pages/RegisterPage.tsx
- src/components/LoginForm.tsx
- src/components/RegisterForm.tsx
- src/components/Navbar.tsx

### 修改文件
- src/App.tsx
- src/types/todo.ts
- src/hooks/useLocalStorage.ts
- src/components/TodoList.tsx

## 测试计划
1. 注册新用户
2. 登录验证
3. 数据隔离验证
4. 未登录重定向验证
5. 登出验证

## 潜在风险
- localStorage容量限制（通常5MB）
- Token安全性（仅演示用）
- 数据迁移兼容性

## 预估工作量
- 开发时间：约1小时
- 测试时间：约20分钟

---

确认后开始执行? (yes/no/modify)
```

### 5.5.2 调整计划并执行

```bash
# 如果需要调整计划
modify

# 提出修改意见
请添加记住密码功能
请简化注册流程，只需要邮箱和密码

# Claude会更新计划

# 确认后执行
yes

# Claude会开始实施
```

---

## 5.6 实操演示5：团队协作

### 5.6.1 共享CLAUDE.md

```bash
# 1. 更新CLAUDE.md
@CLAUDE.md

# 2. 添加团队规范
请在CLAUDE.md中添加：
- 代码风格：使用ESLint + Prettier
- 命名规范：组件用PascalCase，函数用camelCase
- Git规范：使用Conventional Commits
- 测试要求：覆盖率>80%

# 3. 提交到Git
!git add CLAUDE.md
!git commit -m "docs: 添加团队代码规范"
!git push origin main
```

### 5.6.2 在PR中使用Claude审查

```bash
# 创建feature分支
!git checkout -b feature-auth

# 开发功能
[使用Claude Code开发...]

# 提交代码
!git add .
!git commit -m "feat: 添加用户认证功能"

# 推送到远程
!git push origin feature-auth

# 使用Claude审查
请审查当前分支的所有代码变更

# Claude会：
# 1. 查看git diff
# 2. 分析代码变更
# 3. 检查是否符合CLAUDE.md规范
# 4. 提出改进建议
```

---

## 本章重点回顾

### 实操演示流程

| 步骤 | 内容 | 时间 |
|------|------|------|
| **环境准备** | 安装Claude Code、配置模型 | 5分钟 |
| **项目初始化** | 使用/init创建CLAUDE.md | 2分钟 |
| **创建应用** | Plan模式 + 实现待办事项应用 | 15分钟 |
| **使用Skills** | 安装frontend-design skill | 5分钟 |
| **使用MCP** | Chrome DevTools MCP测试 | 5分钟 |
| **团队协作** | 共享CLAUDE.md、代码审查 | 5分钟 |

### 关键操作要点

**安装Claude Code：**
```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

**配置模型：**
```bash
export ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic
export ANTHROPIC_AUTH_TOKEN=你的API密钥
export ANTHROPIC_MODEL=GLM-4.7
```

**初始化项目：**
```bash
mkdir my-project
cd my-project
git init
claude
/init
```

**Plan模式：**
```bash
Shift+Tab × 2
[描述需求]
yes  # 确认执行
```

**安装Skill：**
```bash
mkdir -p .claude/skills
# 将skill放入该目录
# 重启Claude Code
```

**安装MCP：**
```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
# 重启Claude Code
```

---

## 实践练习

### 练习1：创建新项目（15分钟）

```bash
# 1. 创建新项目
mkdir my-todo-app
cd my-todo-app
git init
claude

# 2. 初始化项目
/init

# 3. 使用Plan模式创建项目
Shift+Tab × 2
请创建一个笔记应用，支持：
- 添加笔记
- 编辑笔记
- 删除笔记
- 搜索笔记
- 使用React + TypeScript

# 4. 确认并执行
yes

# 5. 运行项目
npm run dev

# 6. 测试功能
```

### 练习2：使用Skill优化（10分钟）

```bash
# 1. 安装frontend-design skill

# 2. 使用skill优化设计
使用frontend-design skill优化笔记应用的界面

# 3. 查看优化效果
```

### 练习3：使用MCP测试（10分钟）

```bash
# 1. 安装chrome-devtools MCP

# 2. 使用MCP测试
用Chrome DevTools MCP测试笔记应用的所有功能

# 3. 生成测试报告
```

### 练习4：团队协作（15分钟）

```bash
# 1. 更新CLAUDE.md
添加团队规范

# 2. 创建feature分支
git checkout -b feature-search

# 3. 实现搜索功能
使用Claude Code实现搜索功能

# 4. 代码审查
让Claude审查代码

# 5. 提交PR
git push origin feature-search
```
