# 第二章：ClaudeCode核心功能（详细版）

---

## 2.1 Skills（技能包）：你的能力扩展包

### 什么是Skills？

**Skills**是Claude Code的预封装工作流，就像游戏中的"技能包"，把专业知识、工具使用方法、模板材料打包成一个完整的能力扩展包。

**核心概念：**

```
┌─────────────────────────────────────────────────────────────┐
│                    Skill 能力扩展包                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   指令文档   │  │   代码脚本   │  │    参考资料         │  │
│  │  SKILL.md   │  │  scripts/   │  │  reference/assets/  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│         ↓                ↓                    ↓              │
│  告诉Agent做什么    提供可靠工具        供给事实材料          │
└─────────────────────────────────────────────────────────────┘
```

### Skills的核心优势

| 优势 | 说明 | 实际价值 |
|------|------|---------|
| **零代码创建** | 用自然语言描述，AI自动执行 | 非技术人员也能创建专业Agent |
| **灵活应对** | 能突破预设限制，处理边缘情况 | 不像Workflow容易卡住 |
| **多技能联用** | 一个任务可调用多个Skills | 应对复杂多步骤任务 |

### Skills的渐进式加载机制

这是Skills设计的核心智慧，解决了上下文窗口有限的问题：

```
Level 1: 元数据（name + description）
   始终加载，约100 tokens
   ↓ Agent判断是否需要该Skill
Level 2: 完整指令内容（SKILL.md正文）
   触发时加载，建议<5000 tokens
   ↓ Agent判断需要哪些资源
Level 3: 资源文件（脚本/参考文档/素材）
   按需动态加载，无大小限制
```

**价值：** 可安装很多Skills但不影响上下文性能！

### 常用官方Skills速查表

| Skill名称 | 功能描述 | 适用场景 | 安装命令 |
|-----------|---------|---------|---------|
| **frontend-design** | 前端设计 | 网页开发、UI实现 | `npx skills-installer install @anthropics/claude-code/frontend-design` |
| **pdf** | PDF处理 | 文档处理、数据提取 | 官方仓库下载 |
| **canvas-design** | Canvas设计 | 视觉素材创建 | 官方仓库下载 |
| **doc-coauthoring** | 文档协同 | 技术文档写作 | 官方仓库下载 |
| **commit** | 代码提交 | 自动生成commit消息 | `/commit` 内置 |
| **skill-creator** | Skill创建 | 创建自定义Skill | 官方仓库下载 |

### 安装Skills的方法

#### 方法1：命令行安装（推荐新手）

```bash
# 安装官方Skill（需要先安装skills-installer）
npx skills-installer install @anthropics/claude-code/frontend-design --client claude-code

# 查看已安装的Skills
claude /skills
```

#### 方法2：手动安装（推荐进阶用户）

**项目级Skills：** 只在当前项目可用

```bash
# 1. 在项目根目录创建skills目录
mkdir -p .claude/skills

# 2. 将Skill文件包放入该目录
# 例如：将 frontend-design/ 整个文件夹放入 .claude/skills/

# 3. 重启Claude Code
```

**用户级Skills：** 所有项目共享

```bash
# 1. 在用户目录创建skills目录
mkdir -p ~/.claude/skills

# 2. 将Skill文件包放入该目录

# 3. 重启Claude Code
```

### 使用Skills

#### 显式调用

```bash
# 在Claude Code中直接指定使用某个Skill
使用 frontend-design skill 优化 https://example.com
使用 pdf skill 提取 report.pdf 中的表格数据
```

#### 隐式调用

当你的任务描述与Skill的元数据（name + description）匹配时，Claude会自动调用：

```bash
# 以下任务会自动触发 frontend-design skill
请帮我设计一个产品官网首页

# 以下任务会自动触发 pdf skill
请合并这三个PDF文件
```

### 创建自定义Skills

#### 使用skill-creator自动创建（推荐）

```bash
# 1. 安装skill-creator
npx skills-installer install @anthropics/claude-code/skill-creator --client claude-code

# 2. 在Claude Code中
创建skill，能按照公司规范写技术文档

# 3. Claude会自动：
#    - 引导你描述需求
#    - 生成SKILL.md文件
#    - 创建必要的脚本
#    - 提示安装位置
```

#### 手动创建Skill

**Skill目录结构：**

```
my-skill/
├── skill.md          # Skill文档（必需）
├── scripts/          # 可执行脚本（可选）
│   └── process.js
├── assets/           # 资源文件（可选）
│   └── template.png
└── reference/        # 参考文档（可选）
    └── guide.pdf
```

**skill.md完整示例：**

```markdown
---
name: company-doc-writer
description: 按照公司技术文档规范撰写文档
---

# 公司技术文档写作助手

这个Skill帮助用户按照公司技术文档规范撰写文档。

## 使用场景
- API文档编写
- 技术方案文档
- 系统设计文档
- 接口对接文档

## 文档规范

### 标题层级
- 一级标题：文档名称
- 二级标题：主要章节
- 三级标题：具体内容

### 代码示例
使用```语言```格式：

\`\`\`javascript
function example() {
  return "Hello";
}
\`\`\`

### API文档模板

每个API必须包含：
1. **功能描述**：简要说明API的作用
2. **请求参数**：参数名、类型、是否必需、说明
3. **返回值**：返回数据结构和说明
4. **错误码**：可能的错误及处理方式
5. **调用示例**：完整的调用示例

### 示例

## 获取用户信息

### 功能描述
根据用户ID获取用户详细信息

### 请求参数
| 参数名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| userId | string | 是 | 用户唯一标识 |

### 返回值
```json
{
  "code": 200,
  "data": {
    "id": "123",
    "name": "张三",
    "email": "zhangsan@example.com"
  }
}
```

### 错误码
- 400: 参数错误
- 404: 用户不存在
- 500: 服务器错误

### 调用示例
\`\`\`javascript
const user = await getUserInfo('123');
\`\`\`
```

### 什么时候应该创建Skill？

根据实战经验，以下场景应该创建Skill：

#### 场景1：反复解释同一件事

**信号：** 你发现自己一直在向AI重复同样的规则

```
❌ 每次都要说：
"帮我把这段话改成我们公司的格式"
"不对，表格要用这种样式"
"还有，图表要按这个配色"

✅ 应该创建Skill：
把这些规范打包成 "company-report-style" skill
```

#### 场景2：需要特定知识材料才能做好

**信号：** AI的通用能力够了，但缺特定场景的材料

```
典型场景：
- 技术文档写作：需要参考代码规范、术语表
- 品牌设计：需要参考品牌手册、Logo资源
- 数据分析：需要参考指标定义、计算公式
```

#### 场景3：任务需要多个流程协同完成

**信号：** 一个任务需要组合多个步骤

```
例如：竞品分析报告
1. 检索竞品数据（Web Scraping Skill）
2. 提取PDF中的用户反馈（PDF Skill）
3. 分析数据并生成图表（Data Analysis Skill）
4. 按品牌规范制作PPT（Brand Guidelines + PPTX Skill）
```

---

## 2.2 MCP Servers：连接外部世界

### 什么是MCP？

**MCP（Model Context Protocol）**是AI的扩展接口标准，通过添加MCP服务器可以连接外部工具、资源、服务。

**核心价值：** 统一外部服务接入标准，避免手动复制粘贴

### MCP vs Skills

| 特性 | MCP | Skills |
|------|-----|--------|
| **本质** | 外部服务连接器 | 能力扩展包 |
| **关注点** | 如何调用外部工具 | 如何完成特定任务 |
| **包含内容** | 工具定义、API接口 | 执行方法、工具调用、知识材料 |
| **典型用途** | 连接GitHub、数据库、浏览器 | PDF处理、前端设计、文档写作 |

### 常用MCP服务器

| MCP Server | 功能 | Star数 | 适合角色 |
|------------|------|--------|---------|
| **chrome-devtools-mcp** | 浏览器自动化，26个工具 | 18.5k | 程序员、测试人员、UI设计师 |
| **github** | GitHub API集成 | 10k+ | 程序员 |
| **postgres** | PostgreSQL数据库操作 | 5k+ | 程序员、测试人员 |
| **filesystem** | 增强文件系统操作 | 3k+ | 程序员 |
| **web-search** | 网络搜索功能 | 2k+ | 所有角色 |
| **context7** | 获取最新文档和代码示例 | - | 程序员 |
| **puppeteer** | 浏览器自动化和网页抓取 | - | 测试人员 |
| **slack** | Slack频道管理和消息 | - | 程序员 |
| **notion** | Notion生产力工具连接 | - | 所有角色 |

### 安装MCP服务器

#### 方法1：命令行安装（推荐）

```bash
# 添加chrome-devtools MCP
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest

# 添加GitHub MCP
claude mcp add github npx -y @modelcontextprotocol/server-github

# 添加PostgreSQL MCP
claude mcp add postgres npx -y @modelcontextprotocol/server-postgres --connection-string "postgresql://..."
```

#### 方法2：配置文件安装（推荐多服务器场景）

编辑 `~/.claude/mcp.json`：

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"],
      "disabled": false
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@localhost:5432/dbname"
      }
    }
  }
}
```

### 验证MCP安装

```bash
# 在Claude Code中
/mcp

# 或通过命令行
claude mcp list
claude mcp test chrome-devtools
```

### Chrome DevTools MCP实战示例

这是最强大的MCP之一，提供26个内置工具：

```bash
# 在Claude Code中
用Chrome DevTools MCP打开 https://example.com，然后：
1. 截取页面截图
2. 提取所有链接
3. 分析页面结构
4. 获取页面性能数据
```

**26个内置工具包括：**

| 工具名 | 功能 | 使用场景 |
|--------|------|---------|
| `chrome_navigate` | 导航到指定URL | 页面访问 |
| `chrome_screenshot` | 截取页面截图 | UI测试、设计验证 |
| `chrome_click` | 点击元素 | 交互测试 |
| `chrome_fill` | 填写表单 | 表单测试 |
| `chrome_evaluate` | 执行JavaScript | 动态内容处理 |
| `chrome_snapshot` | 获取页面可访问性快照 | 无障碍测试 |

**完整实战示例：**

```bash
# 测试登录功能
用Chrome DevTools MCP完成以下测试：
1. 打开 http://localhost:3000/login
2. 截取初始页面截图
3. 填写用户名：testuser@example.com
4. 填写密码：Test1234!
5. 点击"登录"按钮
6. 等待页面跳转
7. 验证当前URL是否为 http://localhost:3000/dashboard
8. 截取最终页面截图
```

### 不同角色的MCP推荐

#### 程序员推荐MCP

| MCP | 用途 |
|-----|------|
| github | PR管理、Issue跟踪 |
| context7 | 获取最新文档 |
| postgres/mysql | 数据库操作 |
| filesystem | 文件管理 |

#### UI设计师推荐MCP

| MCP | 用途 |
|-----|------|
| chrome-devtools | 网页测试、响应式验证 |
| puppeteer | 网页自动化操作 |
| figma | Figma设计稿访问（需要自行实现） |

#### 测试人员推荐MCP

| MCP | 用途 |
|-----|------|
| chrome-devtools | E2E测试 |
| puppeteer | 自动化测试 |
| postgres | 测试数据准备 |

---

## 2.3 CLAUDE.md：项目记忆文件

### 什么是CLAUDE.md？

**CLAUDE.md**是Claude Code启动时会自动读取的项目记忆文件，记录项目结构、构建命令、代码规范、架构决策等信息。

**类比：** 就像给新同事准备的项目交接文档

### CLAUDE.md的核心价值

| 价值 | 说明 |
|------|------|
| **项目知识库** | 记录项目架构、技术栈、依赖关系 |
| **快速启动** | 自动读取，无需重复解释项目背景 |
| **团队协作** | 共享项目规范，确保团队理解一致 |
| **持续迭代** | 随项目演进自动更新 |

### CLAUDE.md的标准模板

```markdown
# 项目名称：E-Commerce Platform

## 项目概述
这是一个基于 Node.js + React 的电商平台，支持商品浏览、购物车、订单管理等功能。

## 技术栈
- 前端：React 18, TypeScript, Tailwind CSS
- 后端：Node.js 20, Express, TypeScript
- 数据库：PostgreSQL 15, Redis 7

## 目录结构
```
project/
├── frontend/          # 前端项目
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── backend/           # 后端项目
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── models/
│   └── package.json
└── shared/            # 共享类型定义
    └── types/
```

## 常用命令

### 开发
```bash
# 前端开发
cd frontend && npm run dev

# 后端开发
cd backend && npm run dev

# 同时启动前后端
npm run dev:all
```

### 测试
```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行E2E测试
npm run test:e2e
```

### 构建
```bash
# 构建生产版本
npm run build

# 构建并部署
npm run deploy
```

### 代码质量
```bash
# 格式化代码
npm run format

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 代码规范

### 命名规范
- 文件名：kebab-case (user-profile.ts)
- 组件名：PascalCase (UserProfile)
- 函数/变量：camelCase (getUserProfile)
- 常量：UPPER_SNAKE_CASE (API_BASE_URL)
- 类型/接口：PascalCase (UserProfile)

### 目录组织规范
- 每个功能模块独立文件夹
- 组件文件与样式文件同目录
- 共享工具函数放在 utils/
- 类型定义放在 types/

### Git提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建/工具相关

示例：`feat: 添加用户登录功能`

## API规范

### RESTful API设计
- GET：获取资源
- POST：创建资源
- PUT：更新资源（全量）
- PATCH：更新资源（部分）
- DELETE：删除资源

### 响应格式
成功响应：
```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

错误响应：
```json
{
  "code": 400,
  "message": "参数错误",
  "error": "详细错误信息"
}
```

## 环境变量

### 前端环境变量
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=E-Commerce Platform
```

### 后端环境变量
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
```

## 常见问题

### Q: 如何添加新的API端点？
A: 在 backend/src/routes/ 中创建对应的路由文件

### Q: 前端如何调用API？
A: 使用 frontend/src/utils/api.ts 中的封装函数

### Q: 如何处理权限？
A: 使用 middleware/auth.ts 中的认证中间件

## 重要提醒

### 架构决策记录
- 2024-01-15: 决定使用PostgreSQL而非MySQL，因为JSON支持更好
- 2024-02-01: 采用Redis做缓存，提升查询性能
- 2024-03-10: 前端状态管理从Redux迁移到Zustand

### 代码规范更新
- 2024-03-01: 统一使用Async/Await，避免Promise链
- 2024-03-15: 所有API调用必须包含错误处理
```

### 生成CLAUDE.md的方法

#### 方法1：使用/init命令（最简单）

```bash
# 在项目根目录
claude /init

# Claude会自动扫描项目并生成CLAUDE.md
```

#### 方法2：让Claude自动生成

```bash
# 在Claude Code中
请根据当前项目结构生成CLAUDE.md文件

# Claude会：
# 1. 扫描目录结构
# 2. 分析package.json
# 3. 识别技术栈
# 4. 生成规范文件
```

#### 方法3：手动创建并持续更新

```bash
# 创建初始文件
touch CLAUDE.md

# 让Claude填充
claude "请根据项目情况填充CLAUDE.md"
```

### CLAUDE.md的AI进化机制

这是Claude Code最强大的功能之一：

```
┌─────────────────────────────────────────────────────────┐
│           CLAUDE.md AI进化机制                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. 在PR/开发中发现问题                                 │
│     @claude 这里的代码使用了enum，                       │
│     但我们项目规范要求使用string union                  │
│         ↓                                               │
│  2. 让Claude记住教训                                    │
│     @claude 请把这次的教训写入CLAUDE.md                 │
│         ↓                                               │
│  3. Claude自动更新                                     │
│     在CLAUDE.md中添加规范说明                           │
│         ↓                                               │
│  4. 团队共同维护                                       │
│     将CLAUDE.md签入Git，整个团队共享                    │
│         ↓                                               │
│  5. 持续进化                                           │
│     Claude不会重复犯同样的错误                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**实战示例：**

```bash
# 在PR中直接告诉Claude
@claude 请把这次的教训写入CLAUDE.md：
不要使用enum，改用string union，
因为这样有更好的类型推断和Tree-shaking支持

# Claude会自动在CLAUDE.md中添加：
## 代码规范更新 (2026-01-27)

### Enum vs String Union
- ❌ 不要使用enum
- ✅ 改用string union
- 理由：更好的类型推断和Tree-shaking

### 错误示例
\`\`\`typescript
// ❌ 错误
enum Status {
  Active = 'active',
  Inactive = 'inactive'
}

// ✅ 正确
type Status = 'active' | 'inactive';
\`\`\`
```

**价值：**
- 集体智慧：每个团队成员的反馈都让AI更聪明
- 持续进化：Claude不会重复犯同样的错误
- 知识沉淀：项目规范自动文档化

---

## 2.4 Plan模式：先规划后执行

### Plan模式是什么？

**Plan模式**是一种"先规划、后执行"的工作模式，Claude会先分析项目架构、依赖关系并起草实现方案，确认后才开始编写代码。

**核心价值：** Anthropic开发者关系负责人有90%的时间都在使用这个模式。

### Plan模式的价值

| 传统方式 | Plan模式 |
|---------|---------|
| 直接开始写代码 | 先分析、规划，再执行 |
| 容易遗漏边缘场景 | 全面考虑，减少返工 |
| 架构不清晰 | 明确架构设计 |
| 难以预估工作量 | 明确步骤，可追踪 |

### 使用方法

#### 快捷键方式（推荐）

```bash
# 按两次 Shift+Tab
Shift+Tab, Shift+Tab
```

#### 命令方式

```bash
# 进入Plan模式
/plan
```

### Plan模式工作流程

```
┌─────────────────────────────────────────────────────────┐
│              Plan模式工作流程                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. 描述需求                                            │
│     "请帮我实现用户认证功能"                             │
│         ↓                                               │
│  2. Claude探索项目                                      │
│     - 扫描现有代码结构                                  │
│     - 分析依赖关系                                      │
│     - 识别可能的问题                                    │
│         ↓                                               │
│  3. Claude生成计划                                     │
│     - 列出实施步骤                                      │
│     - 标注文件变更                                      │
│     - 说明潜在风险                                      │
│         ↓                                               │
│  4. 用户确认计划                                       │
│     查看计划，提出修改意见                              │
│         ↓                                               │
│  5. 执行计划                                          │
│     Claude按步骤实施                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Plan模式输出示例

```markdown
# Plan: 用户认证功能实现

## 需求分析
实现用户认证功能，包括：
1. 用户注册
2. 用户登录
3. JWT token验证
4. 密码加密存储

## 现有项目分析
- 框架：Express + TypeScript
- 数据库：PostgreSQL
- 已有用户表模型：models/User.ts
- 缺少：认证中间件、路由、控制器

## 实施计划

### 阶段1：数据库层
1. 更新用户模型，添加密码字段
2. 创建数据库迁移脚本

### 阶段2：服务层
1. 创建认证服务 (services/auth.service.ts)
   - hash密码
   - 验证密码
   - 生成JWT token
2. 创建用户服务扩展
   - 注册用户
   - 查找用户

### 阶段3：路由层
1. 创建认证路由 (routes/auth.routes.ts)
   - POST /auth/register
   - POST /auth/login
   - GET /auth/me

### 阶段4：中间件
1. 创建认证中间件 (middleware/auth.middleware.ts)
   - 验证JWT token
   - 注入用户信息到请求

### 阶段5：测试
1. 单元测试
2. 集成测试

## 文件变更清单
- 新增：services/auth.service.ts
- 新增：routes/auth.routes.ts
- 新增：middleware/auth.middleware.ts
- 修改：models/User.ts
- 新增：tests/auth.test.ts

## 潜在风险
- 密码加密算法选择：推荐bcrypt
- JWT secret管理：需要从环境变量读取
- Token过期策略：建议24小时

## 预估工作量
- 开发时间：约2小时
- 测试时间：约1小时

---

确认后开始执行? (yes/no/modify)
```

### Plan模式适用场景

| ✅ 推荐使用 | ❌ 不推荐使用 |
|------------|--------------|
| 复杂功能开发（多文件、多步骤） | 简单bug修复（一两行代码） |
| 架构重构 | 单个文件修改 |
| 性能优化 | 代码格式调整 |
| 新功能模块 | 文本替换 |
| 技术栈迁移 | 查看代码 |

---

## 2.5 其他扩展（快速了解）

### Hooks（钩子）

**概念：** 在特定事件触发时自动执行的脚本

**典型用途：**
- 自动格式化代码（每次保存后运行prettier）
- 拦截危险命令（删除文件前确认）
- 发送通知（构建完成后通知）

**配置示例：**

```json
{
  "hooks": {
    "after-write-hook": {
      "command": "npm run format || true",
      "enabled": true,
      "blocking": false
    }
  }
}
```

### Plugins（插件）

**概念：** 打包在一起的扩展集合

**典型插件包含：**
- 5个Skills
- 10个斜杠命令
- 3个Hooks
- 2个MCP配置

**与Skills的区别：**
- Plugins是完整功能套件
- Skills是单一技能

### 子代理（Subagents）

**概念：** 并行处理任务的独立AI代理，每个有独立上下文

**典型用途：**
- 代码审查（一个agent审查，一个agent修复）
- 测试编写（一个agent写单元测试，一个agent写E2E测试）
- 文档生成（一个agent写API文档，一个agent写用户手册）

**使用示例：**

```bash
# 并行执行多个任务
请帮我：
1. 使用code-reviewer agent审查现有代码
2. 使用test-writer agent编写测试用例
3. 使用doc-generator agent更新文档
```

---

## 本章重点回顾

### 核心要点

1. **Skills（技能包）**
   - 预封装工作流，用完即走
   - 渐进式加载，不占上下文
   - 可创建自定义Skill

2. **MCP Servers**
   - 连接外部服务（GitHub、数据库、浏览器）
   - 统一接入标准
   - Chrome DevTools MCP最强大

3. **CLAUDE.md**
   - 项目记忆文件
   - AI进化机制是核心价值
   - 团队共享规范

4. **Plan模式**
   - 先规划后执行
   - 适合复杂任务
   - 减少返工

### 选择指南

**程序员：** 优先掌握Skills + CLAUDE.md + Plan模式

**UI设计师：** 优先掌握Chrome DevTools MCP + frontend-design Skill

**测试人员：** 优先掌握Chrome DevTools MCP + CLAUDE.md

### 下一步学习

- **所有人：** 练习创建自己的第一个Skill
- **程序员：** 学习第三章程序员最佳实践
- **UI设计师：** 学习第三章UI设计师最佳实践
- **测试人员：** 学习第三章测试人员最佳实践

---

## 实践练习（可选）

### 练习1：安装并使用一个Skill（5分钟）

```bash
# 1. 安装frontend-design skill
# 2. 使用它优化一个简单网页
```

### 练习2：创建自己的第一个Skill（10分钟）

```bash
# 使用skill-creator创建一个skill
# 主题：按照你公司的格式写周报
```

### 练习3：生成并完善CLAUDE.md（10分钟）

```bash
# 1. 使用 /init 生成初始CLAUDE.md
# 2. 添加你自己的规范和常用命令
```

### 练习4：使用Plan模式规划一个功能（10分钟）

```bash
# 1. 进入Plan模式
# 2. 描述一个你想要的功能
# 3. 查看Claude生成的计划
```
