# ClaudeCode 快速入门大纲

## 培训目标

- 快速掌握ClaudeCode核心功能与应用
- 针对程序员、UI设计师、测试人员介绍实用技巧
- 提升团队AI辅助开发效率

## 培训对象

- 程序员（前端/后端/全栈开发）
- UI设计师（交互设计/视觉设计）
- 测试人员（功能测试/自动化测试）

## 培训时长：60分钟

- 理论讲解：40分钟
- 实操演示：15分钟
- Q&A：5分钟

---

## 第一章：ClaudeCode快速入门（10分钟）

### 1.1 ClaudeCode是什么？（3分钟）

- **核心定位**：系统级AI助手，不仅是代码编写工具
- **核心能力**：
  - 全功能访问：文件操作、运行命令、管理进程
  - 超大上下文：200K token，可处理大型项目
  - 高度可扩展：支持Skills、MCP、Hooks等扩展
- **核心价值**：通过自然语言完成各种电脑任务

### 1.2 安装与配置（4分钟）

- **前置准备**：Node.js、Git、API Key（智谱GLM-4.7/Kimi K2/通义千问）
- **快速安装**：
  ```bash
  npm install -g @anthropic-ai/claude-code
  claude --version
  ```
- **模型配置**（示例：智谱GLM）：
  ```bash
  # Windows
  setx ANTHROPIC_BASE_URL "https://open.bigmodel.cn/api/anthropic"
  setx ANTHROPIC_AUTH_TOKEN "你的API密钥"
  setx ANTHROPIC_MODEL "GLM-4.7"

  # macOS/Linux
  export ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic
  export ANTHROPIC_AUTH_TOKEN=你的API密钥
  export ANTHROPIC_MODEL=GLM-4.7
  ```
- **启动方式**：`claude` 或 `claude --dangerously-skip-permissions`

### 1.3 核心概念速览（3分钟）

- **Skills（技能包）**：预封装工作流，如插件，用完即走
- **MCP Servers**：连接外部服务的桥梁（GitHub、数据库、浏览器等）
- **CLAUDE.md**：项目记忆文件，记录项目规则和规范
- **其他扩展**：Hooks（钩子）、Plugins（插件）、子代理（Subagents）暂不深入

---

## 第二章：ClaudeCode核心功能（20分钟）

### 2.1 Skills（技能包）：你的能力扩展包（8分钟）

#### 什么是Skills？

Skills是预封装的工作流，就像游戏中的"技能包"，把专业知识、工具使用方法、模板材料打包成一个完整的能力扩展包。

**核心优势**：

- 零代码创建：用自然语言描述，AI自动执行
- 灵活应对：能突破预设限制，处理边缘情况
- 多技能联用：一个任务可调用多个Skills

#### Skills的渐进式加载机制

```
Level 1: 元数据（name + description）- 始终加载，约100 tokens
   ↓
Level 2: 完整指令内容 - 触发时加载，建议<5000 tokens
   ↓
Level 3: 资源文件（脚本/参考文档/素材）- 按需动态加载
```

**价值**：可安装很多Skills但不影响上下文性能

#### 安装与使用Skills

**方法1：命令安装**

```bash
# 安装官方Skill
npx skills-installer install @anthropics/claude-code/frontend-design --client claude-code

# 查看可用Skills
claude /skills
```

**方法2：手动安装**

- 将Skill文件包放入：`~/.claude/skills/`（全局）或 `.claude/skills/`（项目级）
- 重启Claude Code

**使用Skills**

```bash
# 在Claude Code中
使用 frontend-design skill 优化 https://example.com
使用 pdf skill 提取 report.pdf 中的表格数据
```

#### 常用官方Skills

| Skill                     | 功能       | 适用场景           |
| ------------------------- | ---------- | ------------------ |
| **frontend-design** | 前端设计   | 网页开发、UI实现   |
| **pdf**             | PDF处理    | 文档处理、数据提取 |
| **canvas-design**   | Canvas设计 | 视觉素材创建       |
| **doc-coauthoring** | 文档协同   | 技术文档写作       |
| **commit**          | 代码提交   | 自动生成commit消息 |

#### 创建自定义Skills（快速版）

使用官方的skill-creator自动创建：

```bash
# 安装skill-creator
npx skills-installer install @anthropics/claude-code/skill-creator --client claude-code

# 创建Skill
创建skill，能按照公司规范写技术文档
```

**Skill目录结构**（简化版）：

```
my-skill/
├── skill.md          # Skill文档（必需）
├── scripts/          # 可执行脚本（可选）
├── assets/           # 资源文件（可选）
└── reference/        # 参考文档（可选）
```

**skill.md示例**：

```markdown
---
name: company-doc-writer
description: 按照公司规范写技术文档
---

这个技能帮助用户按照公司技术文档规范撰写文档。

## 使用场景
- API文档编写
- 技术方案文档
- 系统设计文档

## 规范要求
1. 使用三级标题
2. 代码示例使用```语言```格式
3. 每个API必须包含：描述、参数、返回值、示例
```

---

### 2.2 MCP Servers：连接外部世界（7分钟）

#### 什么是MCP？

MCP（Model Context Protocol）是AI的扩展接口标准，通过添加MCP服务器可以连接外部工具、资源、服务。

**核心价值**：统一外部服务接入标准，避免手动复制粘贴

#### 常用MCP服务器

| MCP Server                    | 功能                   | Star数 |
| ----------------------------- | ---------------------- | ------ |
| **chrome-devtools-mcp** | 浏览器自动化，26个工具 | 18.5k  |
| **github**              | GitHub API集成         | 10k+   |
| **postgres**            | PostgreSQL数据库操作   | 5k+    |
| **filesystem**          | 增强文件系统操作       | 3k+    |
| **web-search**          | 网络搜索功能           | 2k+    |

#### 安装MCP服务器

**方法1：命令行安装**

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
claude mcp add github npx -y @modelcontextprotocol/server-github
```

**方法2：配置文件安装**
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
    }
  }
}
```

**验证安装**

```bash
# 在Claude Code中
/mcp

# 或通过命令行
claude mcp list
claude mcp test chrome-devtools
```

#### Chrome DevTools MCP实战示例

```bash
# 在Claude Code中
用Chrome浏览器打开 https://example.com，然后通过 chrome devtools mcp 完成以下任务:
1. 截取页面截图
2. 提取所有链接
3. 分析页面结构
4. 获取页面性能数据
```

**26个内置工具**包括：

- `chrome_navigate`: 导航到指定URL
- `chrome_screenshot`: 截取页面截图
- `chrome_click`: 点击元素
- `chrome_fill`: 填写表单
- `chrome_evaluate`: 执行JavaScript

---

### 2.3 CLAUDE.md：项目记忆文件（3分钟）

#### 什么是CLAUDE.md？

Claude Code启动时会自动读取的项目记忆文件，记录项目结构、构建命令、代码规范、架构决策等信息。

#### CLAUDE.md的作用

- **项目知识库**：记录项目架构、技术栈、依赖关系
- **快速启动**：自动读取，无需重复解释项目背景
- **团队协作**：共享项目规范，确保团队理解一致
- **持续迭代**：随项目演进自动更新

#### CLAUDE.md的核心内容

```markdown
# 项目名称：E-Commerce Platform

## 项目概述
这是一个基于 Node.js + React 的电商平台

## 技术栈
- 前端：React 18, TypeScript, Tailwind CSS
- 后端：Node.js 20, Express, TypeScript
- 数据库：PostgreSQL 15, Redis 7

## 常用命令
# 开发
npm run dev              # 启动开发服务器
npm test                 # 运行测试
npm run build            # 构建项目

# 代码质量
npm run format           # 格式化代码
npm run lint             # 代码检查

## 代码规范
- 文件名：kebab-case (user-profile.ts)
- 组件名：PascalCase (UserProfile)
- 函数/变量：camelCase (getUserProfile)

## Git提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
```

#### 生成CLAUDE.md的方法

**方法1：使用/init命令**

```bash
claude /init
```

**方法2：手动创建**

```bash
touch CLAUDE.md
claude "请根据当前项目结构生成CLAUDE.md文件"
```

**方法3：动态更新**

```bash
# 直接告诉Claude更新知识
Update CLAUDE.md: 永远使用bun而不是npm
Update CLAUDE.md: 不要使用enum,改用string union
```

#### CLAUDE.md的AI进化机制

来自创始人的实战经验：

1. **在PR中发现问题**：`@claude 这里的代码使用了enum，但我们项目规范要求使用string union`
2. **让Claude记住教训**：`@claude 请把这次的教训写入CLAUDE.md`
3. **Claude自动更新**：在CLAUDE.md中添加规范说明
4. **团队共同维护**：将CLAUDE.md签入Git，整个团队共享

**价值**：

- 集体智慧：每个团队成员的反馈都让AI更聪明
- 持续进化：Claude不会重复犯同样的错误
- 知识沉淀：项目规范自动文档化

---

### 2.4 Plan模式：先规划后执行（2分钟）

#### Plan模式是什么？

Plan模式是一种"先规划、后执行"的工作模式，Claude会先分析项目架构、依赖关系并起草实现方案，确认后才开始编写代码。

**核心价值**：Anthropic开发者关系负责人有90%的时间都在使用这个模式。

#### 使用方法

```bash
# 快捷键：按两次 Shift+Tab
Shift+Tab, Shift+Tab

# 或使用命令
/plan
```

#### 适用场景

- ✅ 复杂功能开发（多文件、多步骤）
- ✅ 架构重构
- ✅ 性能优化
- ❌ 简单bug修复
- ❌ 单行代码修改

---

### 2.5 其他扩展（一笔带过）（1分钟）

#### Hooks（钩子）

- 作用：在特定事件触发时自动执行脚本
- 典型用途：自动格式化代码、拦截危险命令
- 示例：每次编辑后运行格式化命令

#### Plugins（插件）

- 作用：打包在一起的扩展集合（5个Skills、10个斜杠命令等）
- 与Skills的区别：Plugins是完整功能套件，Skills是单一技能

#### 子代理（Subagents）

- 作用：并行处理任务的独立AI代理，每个有独立上下文
- 典型用途：代码审查、测试编写、文档生成并行执行

---

## 第三章：针对不同角色的最佳实践（20分钟）

### 3.1 程序员最佳实践（7分钟）

#### 3.1.1 代码开发与重构

**技巧1：使用Plan模式进行架构设计**

```bash
# 进入Plan模式
Shift+Tab × 2

# 描述需求
请帮我实现用户认证功能，包括：
1. 用户注册
2. 用户登录
3. JWT token验证
4. 密码加密存储
```

**技巧2：利用子代理并行处理**

```bash
# 并行执行多个任务
请帮我：
1. 使用code-reviewer agent审查现有认证代码
2. 使用test-writer agent编写测试用例
3. 使用doc-generator agent更新API文档
```

**技巧3：通过Hooks自动格式化代码**
配置自动格式化（创始人的实战经验）：

```json
{
  "hooks": {
    "after-tool-use-hook": {
      "command": "npm run format || true",
      "enabled": true,
      "blocking": false
    }
  }
}
```

**价值**：彻底消灭CI里的格式报错

#### 3.1.2 代码审查与团队协作

**技巧1：使用CLAUDE.md建立团队代码规范**

```markdown
## 代码规范更新 (2026-01-03)

### Enum vs String Union
- ❌ 不要使用enum
- ✅ 改用string union
- 理由：更好的类型推断和Tree-shaking

### 包管理器
- 永远使用bun而不是npm
- 理由：启动速度快10倍
```

**技巧2：在PR中使用Claude进行代码审查**

```bash
# 使用GitHub MCP
请使用github MCP查看最近的PR，并审查代码变更
```

**技巧3：通过CLAUDE.md的AI进化机制避免重复犯错**

```bash
# 在PR中直接告诉Claude
@claude 请把这次的教训写入CLAUDE.md：不要使用enum,改用string union
```

#### 3.1.3 项目管理与部署

**技巧1：使用Slash Commands自动化部署**
创建 `.claude/commands/deploy-production.md`：

```markdown
你是一个部署专家。请按以下步骤执行生产环境部署：

## 前置检查
1. 确认当前分支：!git branch --show-current
2. 运行测试：!npm run test:all

## 部署阶段
3. 构建生产版本：!npm run build
4. 部署：!npm run deploy:production
5. 验证部署：!curl https://api.example.com/health

## 回滚准备
如果部署失败，立即执行：
!git revert HEAD
!git push origin main
```

**使用**：`/deploy-production`

**技巧2：利用MCP服务器连接外部服务**

```bash
# 使用GitHub MCP
请使用github MCP创建PR，标题为"feat: 添加用户认证功能"

# 使用数据库MCP
请查询数据库中的用户表，统计活跃用户数
```

**技巧3：通过Headless模式集成CI/CD**

```bash
# 在GitHub Actions中
git diff origin/main...HEAD | claude -p "审查这个PR的代码变更" > review.txt
```

---

### 3.2 UI设计师最佳实践（7分钟）

#### 3.2.1 设计系统与规范

**技巧1：使用brand-guidelines skill维护设计一致性**

```bash
# 安装brand-guidelines skill
npx skills-installer install @anthropics/claude-code/brand-guidelines --client claude-code

# 创建符合品牌规范的设计
使用brand-guidelines skill为我们的SaaS产品设计官网首页
```

**技巧2：创建设计相关Skills**
创建 `.claude/skills/company-design-system/`：

```markdown
---
name: company-design-system
description: 公司设计规范，包括颜色方案、组件库、交互模式
---

这个技能帮助设计师遵循公司设计规范创建界面。

## 设计规范

### 颜色方案
- 主色：#2563EB（蓝色）
- 辅助色：#10B981（绿色）
- 警告色：#F59E0B（橙色）
- 错误色：#EF4444（红色）

### 组件规范
- 按钮高度：40px
- 输入框边框：1px solid #D1D5DB
- 圆角：8px

### 交互模式
- Hover状态：透明度变为0.8
- 点击反馈：缩放0.95
```

#### 3.2.2 原型与界面开发

**技巧1：使用Claude Code快速生成HTML/CSS原型**

```bash
# 快速生成响应式导航栏
请创建一个响应式导航栏，包含：
1. Logo在左侧
2. 导航链接在中间
3. 用户头像在右侧
4. 移动端使用汉堡菜单
```

**技巧2：利用Chrome DevTools MCP进行网页测试与优化**

```bash
# 测试网页在不同设备上的表现
用Chrome DevTools MCP打开 http://localhost:3000，然后：
1. 在iPhone 14 Pro尺寸下截图
2. 在iPad Pro尺寸下截图
3. 检查所有链接是否可点击
4. 获取页面性能数据
```

**技巧3：使用Canvas Design Skill创建视觉素材**

```bash
# 安装canvas-design skill
npx skills-installer install @anthropics/claude-code/canvas-design --client claude-code

# 创建设计素材
使用canvas-design skill创建一个产品功能介绍图，风格要简约现代
```

#### 3.2.3 设计交付与协作

**技巧1：使用CLAUDE.md记录设计规范与交付标准**

```markdown
## 设计交付标准

### 交付格式
- UI设计稿：Figma链接
- 图标资源：SVG格式，72x72px
- 图片资源：PNG格式，2x和3x倍图

### 设计规范
- 字体：PingFang SC，常规400，中等500
- 行高：1.5倍字号
- 间距：使用8px的倍数（8px, 16px, 24px, 32px）
```

**技巧2：通过Skills将设计转换为前端代码**

```bash
# 创建design-to-code skill
创建skill，能将Figma设计稿转换为React + Tailwind CSS代码
```

**技巧3：利用子代理并行处理多个设计任务**

```bash
# 并行创建多个页面
请帮我并行创建以下页面：
1. 首页
2. 产品页
3. 关于我们页
4. 联系我们页
```

---

### 3.3 测试人员最佳实践（6分钟）

#### 3.3.1 测试用例生成

**技巧1：使用Claude Code生成测试用例**

```bash
# 生成单元测试
请为src/auth/userAuth.ts生成单元测试，覆盖以下场景：
1. 成功登录
2. 密码错误
3. 用户不存在
4. Token过期
```

**技巧2：通过子代理并行生成不同类型的测试用例**

```bash
# 并行生成多种测试
请帮我并行生成以下测试：
1. 单元测试
2. 集成测试
3. E2E测试
4. 性能测试
```

**技巧3：利用CLAUDE.md记录测试规范和模板**

```markdown
## 测试规范

### 测试命名
- 使用`should_`描述期望行为
- 示例：`should_return_200_when_valid_credentials`

### 测试覆盖率要求
- 单元测试覆盖率：≥80%
- 集成测试覆盖率：≥60%
- E2E测试覆盖核心流程

### 测试模板
```typescript
describe('功能名称', () => {
  it('should_期望行为', async () => {
    // Arrange
    const input = '测试数据';

    // Act
    const result = await function(input);

    // Assert
    expect(result).toBe('期望结果');
  });
});
```

```

#### 3.3.2 自动化测试
**技巧1：使用Chrome DevTools MCP进行端到端测试**
```bash
# 安装chrome-devtools MCP
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest

# 进行E2E测试
用Chrome DevTools MCP打开 http://localhost:3000，然后执行以下测试流程：
1. 访问首页
2. 点击"登录"按钮
3. 输入用户名和密码
4. 点击"提交"
5. 验证是否跳转到首页
6. 截图保存
```

**技巧2：利用Scripts编写可重用的测试脚本**
创建 `.claude/skills/e2e-testing/scripts/login-test.js`：

```javascript
const puppeteer = require('puppeteer');

async function loginTest() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000');
  await page.click('#login-button');
  await page.type('#username', 'testuser');
  await page.type('#password', 'testpass');
  await page.click('#submit-button');

  await page.waitForNavigation();

  const title = await page.title();
  console.log('页面标题:', title);

  await browser.close();
}

loginTest();
```

**技巧3：通过Hooks在代码变更后自动运行测试**

```json
{
  "hooks": {
    "after-write-hook": {
      "command": "npm test || true",
      "enabled": true,
      "blocking": false
    }
  }
}
```

#### 3.3.3 缺陷分析与报告

**技巧1：使用Claude Code分析日志和错误信息**

```bash
# 分析错误日志
请分析error.log中的错误信息，找出：
1. 最常见的错误类型
2. 错误发生的时间分布
3. 可能的根因
```

**技巧2：自动生成缺陷报告和修复建议**

```bash
# 根据测试结果生成报告
根据test-results.xml生成缺陷报告，包括：
1. 失败的测试用例
2. 错误信息
3. 可能的原因
4. 修复建议
```

**技巧3：利用MCP服务器连接测试管理工具**

```bash
# 使用Jira MCP（假设存在）
请使用jira MCP创建缺陷报告：
- 标题：用户无法登录
- 优先级：High
- 描述：详见附件test.log
```

---

## 第四章：实用技巧与工作流（5分钟）

### 4.1 效率提升技巧

#### 基础操作技巧

```bash
# 项目初始化
/init

# 快速引用上下文
@src/auth.ts                    # 引用单个文件
@src/components/                # 引用整个目录
@auth                           # 模糊匹配

# 即时执行Bash命令
!git status
!npm test
```

#### 会话管理技巧

```bash
# 无缝续关
claude --continue               # 恢复上一次对话
claude --resume                 # 显示历史会话列表

# 会话命名
/rename feature-auth            # 给当前会话命名
/resume feature-auth            # 按名称恢复会话

# 上下文可视化
/context                        # 查看token使用情况
```

#### 高效快捷键

| 快捷键           | 功能               |
| ---------------- | ------------------ |
| `Shift+Tab×2` | 进入Plan模式       |
| `Ctrl+R`       | 反向搜索历史提示词 |
| `Ctrl+S`       | 暂存当前提示词     |
| `ESC ESC`      | 回退操作           |

### 4.2 常用斜杠命令速查

| 命令         | 功能               | 使用频率   |
| ------------ | ------------------ | ---------- |
| `/clear`   | 清空对话历史       | ⭐⭐⭐⭐⭐ |
| `/compact` | 清空对话但保留摘要 | ⭐⭐⭐⭐⭐ |
| `/context` | 可视化上下文使用   | ⭐⭐⭐⭐⭐ |
| `/model`   | 切换模型           | ⭐⭐⭐⭐   |
| `/init`    | 项目初始化         | ⭐⭐⭐⭐   |
| `/skills`  | 列出可用技能       | ⭐⭐⭐     |
| `/mcp`     | 管理MCP服务器      | ⭐⭐⭐     |

### 4.3 上下文管理技巧

#### 理解上下文窗口局限性

- 上下文在**20-40%使用率**时性能就开始下降
- 不要等到100%才压缩

#### 复制-粘贴重置法

```bash
# 当上下文臃肿时
1. 复制重要内容
2. 运行 /compact 获取摘要
3. 运行 /clear 清空上下文
4. 粘贴关键信息回去
```

#### 限定对话范围

- 每个功能或任务使用一个独立对话
- 不要在同一对话中既构建认证系统又重构数据库层

---

## 第五章：实操演示（15分钟）

### 5.1 环境准备（2分钟）

```bash
# 1. 安装Claude Code（如果已安装跳过）
npm install -g @anthropic-ai/claude-code

# 2. 配置模型（使用智谱GLM-4.7示例）
export ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic
export ANTHROPIC_AUTH_TOKEN=你的API密钥
export ANTHROPIC_MODEL=GLM-4.7

# 3. 验证安装
claude --version

# 4. 创建测试目录
mkdir claude-demo
cd claude-demo
```

### 5.2 实操演示：快速创建一个简单项目（8分钟）

#### 步骤1：项目初始化

```bash
# 启动Claude Code
claude

# 初始化项目
/init

# Claude会自动生成CLAUDE.md
```

#### 步骤2：创建一个简单的Web应用

```bash
# 使用Plan模式
Shift+Tab × 2

# 描述需求
请帮我创建一个简单的待办事项应用，包括：
1. 添加待办事项
2. 标记完成状态
3. 删除待办事项
4. 使用React + TypeScript + Tailwind CSS
```

**Claude会先探索并规划：**

```
Plan: 创建待办事项应用

1. 分析现有代码结构
2. 设计应用架构
3. 创建React组件
4. 实现状态管理
5. 添加样式
6. 测试功能

确认后开始执行? (yes/no)
```

#### 步骤3：确认并执行

```bash
# 确认
yes

# Claude会自动创建文件
```

#### 步骤4：查看生成的代码

```bash
# 查看生成的文件
!ls -la

# 查看CLAUDE.md
@CLAUDE.md
```

### 5.3 实操演示：使用Skills（3分钟）

#### 步骤1：安装frontend-design skill

```bash
# 在Claude Code中
安装frontend-design skill，skill项目地址为：https://github.com/anthropics/skills/tree/main/skills/frontend-design

# 重启Claude Code
# 按Ctrl+C退出，再重新启动
```

#### 步骤2：使用skill优化设计

```bash
# 使用frontend-design skill
使用frontend-design skill优化刚才创建的待办事项应用的界面设计
```

### 5.4 实操演示：使用MCP服务器（2分钟）

#### 步骤1：安装chrome-devtools MCP

```bash
# 在Claude Code中
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest

# 重启Claude Code
```

#### 步骤2：使用MCP测试网页

```bash
# 启动应用（假设已启动）
!npm run dev

# 使用Chrome DevTools MCP测试
用Chrome DevTools MCP打开 http://localhost:3000，然后：
1. 截取页面截图
2. 测试添加待办事项功能
3. 验证删除功能
```

---

## 第六章：Q&A与总结（5分钟）

### 6.1 培训要点回顾

1. **ClaudeCode核心功能**：Skills、MCP、CLAUDE.md、Plan模式
2. **针对不同角色的最佳实践**：
   - 程序员：代码开发、审查、部署
   - UI设计师：设计系统、原型开发、交付
   - 测试人员：测试用例生成、自动化测试、缺陷分析
3. **实用技巧**：效率提升、上下文管理、快捷键

### 6.2 常见问题速解

#### Q1：如何选择合适的模型？

- **GLM-4.7**：中文理解强，有Coding套餐，适合中文项目
- **Kimi K2**：超长上下文，MoE架构，适合大型项目重构
- **Qwen-Coder-Plus**：开源，性能优秀，适合Python/JS项目
- **DeepSeek-Coder**：价格优势，适合预算有限的场景

#### Q2：上下文满了怎么办？

- 使用 `/compact`压缩对话
- 使用 `/clear`清空上下文
- 限定对话范围，一个任务一个对话
- 使用复制-粘贴重置法

#### Q3：如何提高Claude Code的输出质量？

- 使用Plan模式先规划
- 提供具体的、有约束的描述
- 创建CLAUDE.md记录项目规范
- 使用Skills和MCP扩展能力

#### Q4：团队如何协作？

- 将CLAUDE.md签入Git，共享项目规范
- 在PR中使用Claude进行代码审查
- 通过CLAUDE.md的AI进化机制避免重复犯错
- 创建自定义Skills和Slash Commands

### 6.3 进阶学习资源

#### 官方资源

- Claude Code官方文档：https://code.claude.com
- Skills官方仓库：https://github.com/anthropics/skills
- MCP官方文档：https://modelcontextprotocol.io

#### 社区资源

- Claude Code Marketplace：https://claudecodemarketplaces.com
- Awesome Claude Code：https://awesomeclaude.ai/plugins
- 中文社区：skillsmp.com/zh

#### 实践建议

1. 从简单任务开始，逐步掌握Claude Code
2. 定期查看使用统计（`/stats`），优化工作流
3. 创建符合团队需求的Skills和Commands
4. 持续更新CLAUDE.md，让AI越用越聪明

### 6.4 后续行动建议

#### 个人层面

- 每天尝试使用Claude Code完成一个任务
- 创建至少3个自定义Skills
- 配置常用的MCP服务器
- 定期查看 `/stats`了解使用习惯

#### 团队层面

- 建立团队CLAUDE.md规范
- 创建团队共享的Skills库
- 在代码审查中使用Claude Code
- 定期分享使用心得和最佳实践

---

## 培训材料清单

### 必备软件

- Claude Code最新版本
- 适合的模型API（推荐智谱GLM-4.7或Kimi K2）

### 演示项目

- 简单的待办事项应用示例
- 常用Skills演示
- MCP服务器演示

### 参考资料

- Claude Code快速入门指南
- Skills速查表
- MCP服务器列表
- 斜杠命令速查表

---

## 培训评估（可选）

### 理论考核（5分钟）

1. Claude Code的核心功能有哪些？
2. Skills的渐进式加载机制是什么？
3. CLAUDE.md的主要作用是什么？
4. Plan模式适合什么场景？

### 实操评估（5分钟）

1. 安装Claude Code并配置模型
2. 创建一个CLAUDE.md文件
3. 安装并使用一个Skill
4. 使用Plan模式创建一个简单功能

---

**培训结束！祝大家使用愉快！** 🎉
