# 第一章：ClaudeCode快速入门（详细版）

---

## 1.1 ClaudeCode是什么？

### 核心定位

**Claude Code（CC）**是由Anthropic开发的**系统级AI Agent**，它不仅仅是一个代码编写工具，更是一个可以通过自然语言指令完成各种电脑任务的智能助手。

### 核心能力

Claude Code拥有三大核心能力，使其区别于传统的开发工具：

| 能力                 | 说明                                               | 实际应用                                 |
| -------------------- | -------------------------------------------------- | ---------------------------------------- |
| **全功能访问** | 拥有系统级权限，可执行文件操作、运行命令、管理进程 | 自动化部署、批量处理文件、系统维护       |
| **超大上下文** | 支持200K token上下文窗口，可处理大型项目           | 分析整个代码库、理解复杂架构、跨文件重构 |
| **高度可扩展** | 支持Skills、MCP、Hooks等多种扩展方式               | 连接外部服务、自定义工作流、团队协作     |

### 核心价值

**传统开发方式 vs Claude Code**

```
传统开发工具：
- IDE：只能写代码
- ChatGPT：只能对话问答
- 脚本：需要手动编写和调试
- 需要切换多个工具完成复杂任务

Claude Code：
- 代码编写 ✓
- 对话问答 ✓
- 文件管理 ✓
- 网页自动化 ✓
- 数据分析 ✓
- 文档处理 ✓
- 通过自然语言统一完成所有任务
```

**实际应用场景：**

- 程序员：从需求分析到代码实现再到部署，一个会话完成
- UI设计师：从设计规范到界面实现到测试验证，AI全程辅助
- 测试人员：从测试用例生成到自动化测试到缺陷报告，一体化流程

---

## 1.2 安装与配置

### 前置准备

在安装Claude Code之前，需要准备以下工具：

| 工具              | 用途     | 必需    | 获取方式                      |
| ----------------- | -------- | ------- | ----------------------------- |
| **Node.js** | 运行环境 | ✅ 必需 | https://nodejs.org (推荐v18+) |
| **Git**     | 版本控制 | ✅ 必需 | https://git-scm.com           |
| **API Key** | 模型服务 | ✅ 必需 | 智谱GLM/Kimi/通义千问等       |

**验证前置工具：**

```bash
# 检查Node.js版本
node -v
# 输出示例：v20.11.0

# 检查Git版本
git --version
# 输出示例：git version 2.43.0
```

### 快速安装Claude Code

**方式一：全局安装（推荐）**

```bash
npm install -g @anthropic-ai/claude-code
```

**验证安装：**

```bash
claude --version
# 输出示例：claude 2.0.64
```

**常见安装问题与解决方案：**

| 问题                  | 原因              | 解决方案                                                                 |
| --------------------- | ----------------- | ------------------------------------------------------------------------ |
| `command not found` | npm全局路径未配置 | 重启终端或添加npm全局路径到环境变量                                      |
| 权限错误              | 需要管理员权限    | 使用sudo（Mac/Linux）或管理员权限（Windows）                             |
| 网络超时              | npm源慢           | 使用国内镜像：`npm config set registry https://registry.npmmirror.com` |

### 模型配置

Claude Code支持多种模型配置方式，选择适合你的模型：

#### 推荐模型对比

| 模型                      | 提供商   | 代码能力   | 价格 | 优势                     | 适用场景       |
| ------------------------- | -------- | ---------- | ---- | ------------------------ | -------------- |
| **GLM-4.7**         | 智谱AI   | ⭐⭐⭐⭐⭐ | 中等 | 中文理解强，有Coding套餐 | 中文项目为主   |
| **Kimi K2**         | 月之暗面 | ⭐⭐⭐⭐⭐ | 较低 | 超长上下文，MoE架构      | 大型项目重构   |
| **Qwen-Coder-Plus** | 阿里云   | ⭐⭐⭐⭐⭐ | 低   | 开源，性能优秀           | Python/JS项目  |
| **DeepSeek-Coder**  | 深度求索 | ⭐⭐⭐⭐   | 极低 | 价格优势                 | 预算有限的场景 |

#### 配置示例（以智谱GLM为例）

智谱AI官方提供了三种配置方式，**自动化助手（推荐）** 是最简单的配置方式：

##### 方式一：自动化助手 Coding Tool Helper（最推荐）

**Coding Tool Helper** 是智谱AI官方提供的编码工具助手，可以快速将 GLM 编码套餐加载到 Claude Code 中。

**使用方法：**

```bash
# 在命令行中执行
npx @z_ai/coding-helper
```

**功能特点：**

- ✅ 自动完成工具安装
- ✅ 自动配置 GLM 编码套餐
- ✅ 自动管理 MCP 服务器
- ✅ 交互式界面，操作简单

按照界面提示操作即可完成配置，无需手动修改配置文件。

详细说明请参考 [Coding Tool Helper 文档](https://docs.bigmodel.cn/cn/coding-plan/quick-start)。

---

##### 方式二：自动化脚本（仅支持 macOS/Linux）

```bash
# 下载并运行自动配置脚本
curl -O "https://cdn.bigmodel.cn/install/claude_code_env.sh" && bash ./claude_code_env.sh
```

---

##### 方式三：手动配置环境变量

**Windows：**

```bash
# 打开PowerShell或CMD
setx ANTHROPIC_BASE_URL "https://open.bigmodel.cn/api/anthropic"
setx ANTHROPIC_AUTH_TOKEN "你的API密钥"
setx ANTHROPIC_MODEL "GLM-4.7"

# 重启终端使配置生效
```

**macOS/Linux：**

```bash
# 临时配置（当前终端有效）
export ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic
export ANTHROPIC_AUTH_TOKEN=你的API密钥
export ANTHROPIC_MODEL=GLM-4.7

# 永久配置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN=你的API密钥' >> ~/.bashrc
echo 'export ANTHROPIC_MODEL=GLM-4.7' >> ~/.bashrc

# 重新加载配置
source ~/.bashrc
```

**注意：**

- 配置环境变量后需要重启终端或运行 `source ~/.bashrc` 使配置生效
- API密钥需要从对应平台获取：[智谱AI](https://open.bigmodel.cn/) / [Kimi](https://platform.moonshot.cn/) / [通义千问](https://bailian.console.aliyun.com/)

#### 方式四：通过配置文件设置模型

智谱AI官方推荐通过修改 `~/.claude/settings.json` 文件来配置GLM模型：

**步骤 1：创建或编辑配置文件**

```bash
# 创建配置目录（如果不存在）
mkdir -p ~/.claude

# 编辑配置文件
# macOS/Linux: 使用 vim/nano 等编辑器
# Windows: 使用记事本或 VS Code
vim ~/.claude/settings.json
```

**步骤 2：添加以下配置内容**

```json
{
  "env": {
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.7"
  }
}
```

**步骤 3：验证配置**

```bash
# 关闭所有 Claude Code 窗口，重新打开一个新的命令行窗口
# 启动 Claude Code
claude

# 在 Claude Code 中输入以下命令确认模型状态
/status
```

**配置说明：**

| 配置项 | 说明 | 推荐值 |
|--------|------|--------|
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | 快速响应模型 | `glm-4.5-air` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | 均衡性能模型 | `glm-4.7` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | 最强性能模型 | `glm-4.7` |

**常见配置问题排查：**

| 问题 | 解决方案 |
|------|----------|
| 配置不生效 | 关闭所有 Claude Code 窗口，重新打开新终端 |
| JSON 格式错误 | 使用在线 JSON 校验工具检查格式 |
| 变量名错误 | 确认变量名拼写正确，不要多逗号或少逗号 |

### 启动Claude Code

**基本启动方式：**

| 模式               | 命令                                      | 说明                   | 使用场景           |
| ------------------ | ----------------------------------------- | ---------------------- | ------------------ |
| **常规模式** | `claude`                                | 正常启动，需要确认权限 | 日常开发           |
| **危险模式** | `claude --dangerously-skip-permissions` | 跳过权限确认           | 自动化脚本、CI/CD  |
| **无头模式** | `claude -p "prompt"`                    | 非交互式运行           | 脚本集成、批量处理 |

**启动验证：**

```bash
# 创建测试目录
mkdir claude-demo
cd claude-demo

# 启动Claude Code
claude

# 看到以下提示说明启动成功
```

**成功启动的界面示例：**

```
Claude Code CLI v2.0.64
Type /help for available commands
Model: GLM-4.7
Context: 0/200K tokens

user@claude-demo:~$
```

---

## 1.3 核心概念速览

Claude Code有多个核心概念，这里快速介绍最重要的几个，后续章节会详细讲解：

### Skills（技能包）

**概念：**
Skills是预封装的工作流，就像游戏中的"技能包"，把专业知识、工具使用方法、模板材料打包成一个完整的能力扩展包。

**价值：**

- 用完即走，不占用上下文
- 别人已经编写好的，可直接使用
- 官方Skills库32k+ Stars，有大量现成技能

**示例：**

- frontend-design：前端设计技能
- pdf：PDF处理技能
- doc-coauthoring：文档协同技能

### MCP Servers（模型上下文协议服务器）

**概念：**
MCP是AI的扩展接口标准，通过添加MCP服务器可以连接外部工具、资源、服务。

**价值：**

- 连接GitHub、数据库、浏览器等外部服务
- 统一的外部服务接入标准
- 避免手动复制粘贴

**示例：**

- chrome-devtools-mcp：浏览器自动化（26个工具）
- github：GitHub API集成
- postgres：PostgreSQL数据库操作

### CLAUDE.md（项目记忆文件）

**概念：**
Claude Code启动时会自动读取的项目记忆文件，记录项目结构、构建命令、代码规范、架构决策等信息。

**价值：**

- 项目知识库：记录项目架构、技术栈
- 快速启动：自动读取，无需重复解释
- 团队协作：共享项目规范
- 持续迭代：随项目演进自动更新

### 其他扩展

#### Hooks（钩子）

**概念：** 在特定事件触发时自动执行的脚本

**典型用途：**

- 自动格式化代码
- 拦截危险命令
- 发送通知

#### Plugins（插件）

**概念：** 打包在一起的扩展集合（5个Skills、10个斜杠命令等）

**与Skills的区别：**

- Plugins是完整功能套件
- Skills是单一技能

#### 子代理（Subagents）

**概念：** 并行处理任务的独立AI代理，每个有独立上下文

**典型用途：**

- 代码审查、测试编写、文档生成并行执行

---

## 本章重点回顾

### 核心要点

1. **Claude Code的定位**：系统级AI Agent，不只是代码编写工具
2. **三大核心能力**：全功能访问、超大上下文、高度可扩展
3. **安装配置三步**：安装Node.js → 安装Claude Code → 配置模型
4. **核心概念**：Skills、MCP、CLAUDE.md是三大核心功能

### 常见问题

**Q：必须使用Claude模型吗？**
A：不是，支持多种兼容Anthropic API的模型，包括国产模型（GLM、Kimi、通义千问等）

**Q：Claude Code只适合编程吗？**
A：不是，可以通过自然语言完成文件管理、网页自动化、数据分析、文档处理等各种任务

**Q：学习难度大吗？**
A：不需要编程知识，会用自然语言交流就能使用，非技术人员也能快速上手

### 下一步

- **程序员**：重点学习第二章Skills和第三章程序员最佳实践
- **UI设计师**：重点学习第二章MCP和第三章UI设计师最佳实践
- **测试人员**：重点学习第二章CLAUDE.md和第三章测试人员最佳实践

---

## 实践练习（可选）

### 练习1：验证安装（1分钟）

```bash
# 1. 验证Claude Code版本
claude --version

# 2. 验证模型配置
echo $ANTHROPIC_MODEL  # macOS/Linux
echo %ANTHROPIC_MODEL% # Windows

# 3. 启动Claude Code
claude
# 输入 /help 查看帮助
```

### 练习2：首次对话（1分钟）

```bash
# 在Claude Code中
你好，请简单介绍一下你自己
```

### 练习3：查看帮助命令（1分钟）

```bash
# 在Claude Code中
/help
```
