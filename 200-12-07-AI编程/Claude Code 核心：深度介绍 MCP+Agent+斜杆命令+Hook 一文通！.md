[[Claude Code]] [[AI编程工具]] [[技术教程]] [[MCP协议]] [[Agent Skills]] [[技术原理]] [[最佳实践]] 

# [Claude Code 核心：深度介绍 MCP+Agent+斜杆命令+Hook 一文通！](https://mp.weixin.qq.com/s/7g5DugzATAIX1by4yAYtTg)

## 一、Claude Code 介绍

Claude Code 是由 Anthropic 公司开发的 AI 编程工具，于 2025 年正式发布。这是一个运行在终端中的智能编程助手，核能能力包括实时代码生成、文件操作、命令行执行、多文件项目理解、代码调试和重构等；其核心特点是深度集成开发环境、支持复杂多步骤任务自动化、具备强大的代码理解能力、可与现有工具链无缝配合，并通过对话式交互让开发者能够用自然语言描述需求并快速转化为可执行的代码，大幅提升编程效率和开发体验。

Claude Code 是一个非常有限的命令行 AI Code Agent ， 具备非常丰富的 Agent/MCP/Hooks 等功能，具备非常强的能力，能够囊括除了写代码之外更多联动工作，可以作为一个核心操作交互的入口。

对于 Claude Code 来说，比较重要的就是：Slash Command + SubAgent + MCP + Hooks：

-   Slash Command（斜杆命令）：快速的操作Claude，完成主要基础的与系统和大模型交互能力（自定义快捷操作，提升效率）
-   Agent/Subagent（代理/子代理）：通过插件系统安装，提供特定领域的辅助功能（比如某个工作流，或者是专门写文档、或者写代码的代理）
-   MCP（模型上下文协议工具）：通过 Model Context Protocol 连接外部工具和服务，扩展 Claude Code 的能力边界
-   Hook（钩子）：在关键节点的自定义行为，它允许开发者在一个既定的流程中，“见缝插针”地挂入自己的一段代码。

这四者组合才是它比其他开发工具更胜一筹的核心，当然，目前这些都可以打包组合成为 Plugin（插件），能够快速组合使用。

当然，最重要能够提效的首先是 Agent，然后是 MCP，辅助的是 Slash Command 和 Hook ，主要是进一步效率提升的关键点。

## 二、Claude Code 快速使用

快速交互

```
#### 启动交互式会话claude#### 在会话中可以直接输入自然语言指令> 帮我创建一个 Express 服务器> 读取 config.json 文件的内容> 使用 use context7 搜索 Next.js 最新文档
```

快速任务执行

```
#### 直接执行任务而不进入交互模式claude "创建一个 React 组件"#### 编辑特定文件claude edit src/app.js "添加错误处理逻辑"#### 生成测试文件claude generate "为 utils.js 生成单元测试"#### 基础使用：启动交互式会话claude#### 带初始提示启动claude "帮我创建一个 Express 应用"#### 非交互模式执行任务claude -p "分析这个项目的架构"#### 继续上次对话claude -c#### 跳过权限检查（开发时使用）claude --dangerously-skip-permissions#### 指定允许的工具claude --allowedTools "Read""Write""Bash(git *)"#### 使用特定模型claude --model opus#### 处理管道输入cat error.log | claude -p "分析这个错误"#### 配置 MCP 服务器claude mcp
```

##### 注意事项

-   命令行历史：使用上下箭头可以浏览历史命令
-   停止执行：按 Esc 停止 Claude 执行（不是 Ctrl+C）
-   退出：按 Ctrl+C 退出 Claude Code
-   引用文件：使用 @filename 语法引用文件
-   运行 shell：使用 !command 直接运行 shell 命令
-   首次使用需要认证: 运行 claude 命令后会提示登录
-   MCP 服务器路径: 使用绝对路径更可靠
-   权限管理: 确保 Claude Code 有权访问所需的文件和目录
-   日志查看: 遇到问题时使用 claude logs 查看详细日志

#### Claude Code 官方命令及配置整理

##### 环境变量

| 变量名 | 功能描述 |
| --- | --- |
| ANTHROPIC\_API\_KEY | Claude API /三方兼容 Anthropic API 协议的访问密钥 |
| ANTHROPIC\_AUTH\_TOKEN | Claude API /三方兼容 Anthropic API 协议的访问密钥 |
| ANTHROPIC\_BASE\_URL | 访问大模型API的基础URL前缀 |
| CLAUDE\_MODEL | 指定使用的模型版本 |
| CLAUDE\_CONFIG\_DIR | 配置文件目录路径 |

##### 配置文件位置

-   基础配置

-   macOS/Linux: ~/.config/claude/config.json
-   Windows: %APPDATA%\\Claude\\config.json

-   MCP 配置: ~/.config/claude/mcp.json
-   Subagent 配置：

-   项目级 Agents（优先级高）：.claude/agents/<agent-name>.md
-   用户级 Agents（全局）：~/.claude/agents/<agent-name>.md

-   Slash Commands（自定义斜杆命令）配置：

-   项目级：.claude/commands/
-   用户级：~/.claude/commands/

-   Hook 配置：.claude/hooks.json

配置文件目录结构参考：

```
项目目录/├── .claude/│   ├── agents/          # 项目级 subagents│   │   ├── code-reviewer.md│   │   └── test-runner.md│   ├── commands/        # 项目级自定义命令│   │   └── review.md│   └── hooks.json       # Hooks 配置├── .mcp.json           # 项目 MCP 配置└── CLAUDE.md           # 项目文档用户主目录/├── ~/.claude/│   ├── agents/         # 用户级 subagents（全局）│   └── commands/       # 用户级自定义命令├── ~/.claude.json      # 主配置文件└── ~/.config/claude/   # Claude 配置目录    ├── config.json     # Claude Desktop 配置    └── mcp.json        # 用户 MCP 配置
```

##### 基础命令

| 命令 | 功能描述 |
| --- | --- |
| claude | 启动交互式 REPL 会话 |
| claude "query" | 启动 REPL 并带初始提示 |
| claude -p "query" | SDK 模式：执行查询后退出（非交互式） |
| claude -c | 继续最近的对话 |
| claude -c -p "query" | 继续对话并执行查询（SDK 模式） |
| claude -r "" "query" | 通过 session ID 恢复指定会话 |
| claude update | 更新 Claude Code 到最新版本 |
| claude --help | 显示帮助信息 |
| claude --version | 显示版本信息 |

##### 常用命令行标志（Flags）

| 标志 | 功能描述 | 示例 |
| --- | --- | --- |
| \--add-dir | 添加额外的工作目录 | claude --add-dir ../apps |
| \--allowedTools | 允许的工具列表（免权限提示） | claude --allowedTools "Read" "Write" |
| \--disallowedTools | 禁用的工具列表 | claude --disallowedTools "Bash(rm \*)" |
| \-p, --print | 打印模式（非交互式） | claude -p "explain code" |
| \--model | 指定使用的模型 | claude --model opus |
| \-c, --continue | 继续最近的对话 | claude -c |
| \-r, --resume | 恢复指定会话 | claude -r abc123 |
| \--output-format | 输出格式（text/json/stream-json） | claude -p --output-format json "query" |
| \--input-format | 输入格式 | claude -p --input-format stream-json |
| \--max-turns | 最大交互轮次 | claude -p --max-turns 3 "query" |
| \--permission-mode | 权限模式 | claude --permission-mode plan |
| \--dangerously-skip-permissions | 跳过所有权限检查（慎用） | claude --dangerously-skip-permissions |
| \--append-system-prompt | 添加系统提示 | claude --append-system-prompt "custom" |
| \--verbose | 详细日志模式 | claude --verbose |
| \--agents | 定义自定义 subagents | claude --agents '{"name":{...}}' |

##### 交互式会话中的 Slash 命令 (斜杆命令）

| 命令 | 功能描述 |
| --- | --- |
| /help | 显示所有可用的 slash 命令 |
| /agents | 创建和管理 subagents |
| /mcp | 配置 MCP 服务器 |
| /permissions | 管理工具权限 |
| /hooks | 配置 hooks |
| /clear | 清除当前对话上下文 |
| /compact | 压缩对话历史（保留关键信息） |
| /model | 切换模型（sonnet/opus） |
| /bug | 报告 bug |
| /init | 初始化项目（创建 CLAUDE.md） |

##### 配置文件位置

| 配置类型 | 路径 |
| --- | --- |
| 用户配置 | ~/.config/claude/ |
| 项目 MCP 配置 | .mcp.json |
| 项目命令 | .claude/commands/\*.md |
| 用户命令 | ~/.claude/commands/\*.md |
| 项目 agents | .claude/agents/\*.md |
| 用户 agents | ~/.claude/agents/\*.md |
| 项目文档 | CLAUDE.md |
| Hooks 配置 | .claude/hooks.json |

#### MCP 服务

##### MCP管理命令

| 命令 | 功能描述 |
| --- | --- |
| claude mcp | 启动交互式 MCP 配置界面 |
| claude mcp add | 添加 MCP 服务器（交互式） |
| claude mcp list | 列出所有已配置的 MCP 服务器 |
| claude mcp get | 查看指定 MCP 服务器的详细信息 |
| claude mcp remove | 删除指定的 MCP 服务器 |

MCP 服务器添加示例

```
#### 添加 stdio 传输协议的本地 MCP 服务器claude mcp add my-db -- npx -y @executeautomation/database-server /path/to/database.db#### 添加 SSE 传输协议的远程 MCP 服务器claude mcp add context7 --transport sse https://context7.liam.sh/sse#### 添加飞书 MCP 服务器claude mcp add feishu -- npx -y feishu-mcp --stdio# HTTP 传输方式claude mcp add --transport http <server-name> <url># STDIO 传输方式（本地命令）claude mcp add --transport stdio <server-name> <command> [args...]# 示例：安装文件系统 MCPclaude mcp add --transport stdio filesystem npx -y @modelcontextprotocol/server-filesystem /path/to/directory# 示例：安装 GitHub MCPclaude mcp add --transport http github https://api.github.com
```

管理 MCP 服务器

```
# 列出所有 MCP 服务器claude mcp list# 查看特定服务器详情claude mcp get <server-name># 删除 MCP 服务器claude mcp remove <server-name>
```

MCP 作用域

-   local（默认）：项目特定，存储在本地
-   project：通过 .mcp.json 文件共享给项目
-   user：跨项目共享，用户级别

使用 MCP

安装后，MCP 服务器提供的工具会自动集成到 Claude Code 中：

```
# 在对话中直接使用 MCP 提供的功能# 例如："请读取项目根目录的 README.md 文件""请创建一个 GitHub issue""请使用 @xxx 进行 xx"
```

看有哪些MCP

列出目前本机现有的MCP和对应使用方法：

```
> 列出本机所有的mcp服务，主要是 英文名、中文名、核心用途，应用场景和调用方式，简略一些● 我来帮你查找本机配置的MCP服务。● Bash(cat "$HOME/.claude/claude_desktop_config.json" 2>/dev/null || cat "$HOME/AppData/Roaming/Claude/claude_desktop_config.json"      2>/dev/null || echo "配置文件未找到")  ⎿  配置文件未找到● Search(pattern: "**/*claude*config*.json")  ⎿  Found 2 files (ctrl+o to expand)● Bash(find "$HOME/AppData" -name "*claude*config*.json" -type f 2>/dev/null | head -5)  ⎿  (No content)● Bash(ls -la "$HOME/AppData/Roaming/Claude/" 2>/dev/null || echo "Claude目录不存在")  ⎿  total 88     drwxr-xr-x 1 heiye 197609     0  6月 16 10:16 .     drwxr-xr-x 1 heiye 197609     0 10月 12 01:51 ..     … +22 lines (ctrl+o to expand)● Read(AppData\Roaming\Claude\config.json)  ⎿  Read 5 lines● 根据当前可用的MCP工具（从系统提示中获取），这里是你本机配置的所有MCP服务列表：  ---  📦 MCP 服务列表  | 英文名            | 中文名         | 核心用途                           | 应用场景                  | 调用方式                               |  |----------------|-------------|--------------------------------|-----------------------|--------------------------------------------  -----------|  | context7       | 文档上下文获取器    | 获取最新库文档和代码示例                   | 查询框架/库的最新API文档        |  mcp__context7__resolve-library-id + get-library-docs  |  | spec-workflow  | 规范工作流管理器    | 管理功能规范文档生命周期                   | 功能开发流程管理（需求→设计→任务→实现） |  spec-workflow-guide → spec-status → approvals         |  | open-websearch | 开放网页搜索      | 多引擎网页搜索（DuckDuckGo/Bing/Brave） | 搜索技术文档、获取文章内容         | search /  fetchGithubReadme / fetchCsdnArticle 等       |  | exa            | Exa AI搜索    | 高质量网页搜索和代码上下文获取                | 编程问题搜索、库文档查询          | web_search_exa   / get_code_context_exa                 |  | Playwright     | 浏览器自动化      | 网页交互、截图、表单填写                   | 网页测试、自动化操作、内容抓取       |  browser_navigate → browser_snapshot → browser_click 等 |  | mcp-deepwiki   | DeepWiki获取器 | 获取deepwiki.com仓库的Markdown文档    | 获取深度技术文档              | deepwiki_fetch                               |  ---  🔍 详细说明  1. context7 - 文档上下文获取器  - 用途: 获取最新的库/框架文档和代码示例  - 场景:    - 查询React最新API: resolve-library-id("react") → get-library-docs("/vercel/react")    - 获取特定版本文档: get-library-docs("/vercel/next.js/v14.3.0")  - 调用: 两步走 - 先解析ID，再获取文档  2. spec-workflow - 规范工作流管理器  - 用途: 功能开发的规范化流程管理  - 场景:    - 新功能开发: 创建需求→设计→任务→实现文档    - 查看进度: spec-status 查看完成情况    - 审批流程: approvals 请求/查看审批  - 调用: spec-workflow-guide 获取指引 → 按阶段调用  3. open-websearch - 开放网页搜索  - 用途: 多引擎网页搜索和内容获取  - 场景:    - 通用搜索: search(query="AI news", engines=["duckduckgo"])    - 获取GitHub README: fetchGithubReadme("https://github.com/user/repo")    - 获取CSDN文章: fetchCsdnArticle(url)  - 调用: 直接调用对应函数，支持多引擎并行  4. exa - Exa AI搜索  - 用途: AI驱动的高质量搜索和代码上下文获取  - 场景:    - 网页搜索: web_search_exa("Next.js SSR tutorial")    - 代码上下文: get_code_context_exa("React useState examples")  - 调用: 直接查询，AI自动优化搜索质量  - 特点: 支持动态token分配，搜索质量高  5. Playwright - 浏览器自动化  - 用途: 网页交互、测试、自动化操作  - 场景:    - 访问网页: browser_navigate(url) → browser_snapshot()    - 表单填写: browser_fill_form(fields=[...])    - 截图: browser_take_screenshot()    - 点击交互: browser_click(element, ref)  - 调用: 链式调用，先导航再操作  - 特点: 完整的浏览器控制能力  6. mcp-deepwiki - DeepWiki获取器  - 用途: 获取deepwiki仓库的Markdown文档  - 场景:    - 获取仓库文档: deepwiki_fetch(url="vercel/ai")    - 聚合模式: mode="aggregate" 合并所有页面    - 分页模式: mode="pages" 分别返回  - 调用: 提供仓库名或URL即可  ---  💡 快速调用示例  // 1. 查询React文档  mcp__context7__resolve_library_id("react")  mcp__context7__get_library_docs("/facebook/react", topic="hooks")  // 2. 搜索AI新闻  mcp__open_websearch__search("AI model releases 2025", engines=["duckduckgo", "brave"])  // 3. 获取代码上下文  mcp__exa__get_code_context_exa("Next.js partial prerendering configuration")  // 4. 自动化网页操作  mcp__Playwright__browser_navigate("https://example.com")  mcp__Playwright__browser_snapshot()  // 5. 获取DeepWiki文档  mcp__mcp_deepwiki__deepwiki_fetch("vercel/ai", mode="aggregate")  ---  注意: 这些是当前Claude Code环境中已激活的MCP服务，可以直接通过对应的函数调用使用。
```

![Image](ReadItLater%20Inbox/assets/Claude%20Code%20核心：深度介绍%20MCP+Agent+斜杆命令+Hook%20一文通！-XYSRqfp6PI.png)

使用一个MCP服务

比如使用 Playwright 打开百度搜索：

![Image](ReadItLater%20Inbox/assets/Claude%20Code%20核心：深度介绍%20MCP+Agent+斜杆命令+Hook%20一文通！-IVvUAHpWFG.png)

![Image](ReadItLater%20Inbox/assets/Claude%20Code%20核心：深度介绍%20MCP+Agent+斜杆命令+Hook%20一文通！-DMPlVvhTl8.png)

#### Agent/Subagent 配置使用

##### 安装 Agent

```
# 从市场安装claude plugin install <agent-name># 或手动创建 Agentmkdir .claude/agents# 在其中创建 agent 配置文件# 让Claude Code去网上找找有哪些自己需要的Agent
```

##### 创建 Agent 

通过命令行定义 Agent

```
claude --agents '{  "code-reviewer": {    "description": "Expert code reviewer",    "prompt": "You are a senior code reviewer...",    "tools": ["Read", "Grep", "Glob"],    "model": "sonnet"  }}'
```

通过文件创建 Subagent

| 级别 | 操作步骤 |
| --- | --- |
| 项目级 agents | 1\. 在项目目录执行 2\. 在该目录下创建  |
| 用户级 agents | 1\. 执行 2\. 在该目录下创建  |

Agent 配置文件示例模版 (code-reviewer.md)：

```
# Code Reviewer AgentDescription: Expert code reviewer with focus on best practices## PromptYou are a senior code reviewer with 10+ years of experience...## Tools- Read- Grep- Glob## Modelsonnet
```

比如我们创建一个简单的Agent，获取当前时间的agent，名字叫做 get-current-datetime ，配置文件内容如下（配置文件存储在 ~/claude/agents/heiyeluren/get-current-datetime.md ）：

```
---name:get-current-datetimedescription:执行日期命令并仅返回原始输出。不添加格式、标题、说明或并行代理。tools:Bash,Read,Writecolor:cyan---执行`date`命令并仅返回原始输出。```bashdate+'%Y-%m-%d%H:%M:%S'```不添加任何文本、标题、格式或说明。不添加markdown格式或代码块。不添加"当前日期和时间是："或类似短语。不使用并行代理。只返回原始bash命令输出，完全按其显示的样子。示例响应：`2025-07-2823:59:42`如果需要特定格式选项：-文件名格式：添加`+"%Y-%m-%d_%H%M%S"`-可读格式：添加`+"%Y-%m-%d%H:%M:%S%Z"`-ISO格式：添加`+"%Y-%m-%dT%H:%M:%S%z"`使用get-current-datetime 代理来获取准确的时间戳，而不是手动编写时间信息。
```

如果需要设置复杂一些的Agent，那么可以如下参考（新增了agent md之后，最好重新进入 Claude Code）：

```
---name:init-masterdescription:项目初始化专家：自动扫描项目结构并生成文档tools:Read,Write,Glob,Grepcolor:orange---# 初始化专家>不暴露参数；内部自适应三档：快速摘要/模块扫描/深度补捞。保证每次运行可增量更新、可续跑，并输出覆盖率报告与下一步建议。## 核心约束-只读模式：不修改源代码，仅生成/更新文档-忽略规则：优先读取`.gitignore`，否则使用默认规则（node_modules、.git、dist等）-智能处理：大文件/二进制只记录路径## 扫描策略（三阶段自适应）### 阶段 A：全仓清点-使用`Glob`获取文件清单-统计文件数、语言占比、目录结构-识别模块（package.json、go.mod、apps/*、services/*等）### 阶段 B：模块扫描对每个模块按优先级读取：-入口文件（main.ts、index.js、app.py等）-API定义（路由、控制器）-配置文件（package.json、依赖声明）-数据层（schema、ORM模型）-测试目录### 阶段 C：深度补充满足以下条件时触发：-项目较小-关键信息缺失-达到工具调用上限时提前输出并说明原因>注：如果分页/次数达到工具或时间上限，必须**提前写出部分结果**并在摘要中说明"到此为止的原因"和"下一步建议扫描的目录列表"。## 输出产物### 1. 根级 `CLAUDE.md`包含：-项目愿景-架构总览-**模块结构图（Mermaid可点击）**-模块索引表格-运行指南-编码规范-变更记录### 2. 模块级 `CLAUDE.md`包含：-**面包屑导航**（链接到父级文档）-模块职责-入口与接口-依赖与配置-数据模型-测试策略-常见问题### 3. `.claude/index.json`记录：-扫描时间戳-模块列表及关键路径-覆盖率统计-缺口清单（供下次续扫）## 覆盖率报告每次运行输出：-总文件数vs已扫描文件数-各模块覆盖情况-被忽略的目录-推荐的下一步扫描目标## 使用说明支持增量更新，下次运行时自动补齐上次未覆盖的部分。
```

也可以设置一些非研发类的Agent，比如追踪最新动态（下面只是一个演示，实际还需要仔细调整整个Agent的设置才能可靠运行）：

```
---name: ai-news-trackerdescription: AI动态追踪专家：自动搜索并整理最新AI大模型动态tools: BashTool, WebBrowser, Web Search, open-websearchcolor: blue---# AI动态追踪专家> 通过搜索引擎和网页抓取，自动获取最新AI大模型动态，生成结构化报告。支持多源验证、增量更新。## 核心约束- 只读模式：不修改本地文件，仅生成报告文档- 信息来源：优先权威来源（官网、技术博客、GitHub、论文站点）- 时效性：关注最近30天内的动态- 去重：同一新闻从多个来源验证后只记录一次## 搜索策略（三阶段）### 阶段 A：广度搜索使用 `BashTool` 执行搜索命令：```bash# 搜索最新AI模型发布curl -s "https://www.google.com/search?q=latest+AI+model+releases+2025"# 或使用其他搜索API```关键词组合：- "AI model release 2025"- "GPT-5 Claude Gemini 最新动态"- "大模型 发布 更新"- "LLM benchmark leaderboard"### 阶段 B：定向抓取使用 `WebBrowser` 工具访问重点来源：**优先站点列表**：- OpenAI Blog: https://openai.com/blog- Anthropic News: https://www.anthropic.com/news- Google AI Blog: https://ai.googleblog.com- HuggingFace: https://huggingface.co/models- Papers with Code: https://paperswithcode.com/latest- GitHub Trending (AI): https://github.com/trending/python对每个站点：1. 使用 `WebBrowser` 打开页面，或者是使用 `Web Search` 或 `open-websearch` 进行终端下的搜索2. 提取标题、日期、摘要3. 识别关键信息（模型名称、参数规模、性能指标）### 阶段 C：深度验证对重要新闻：- 访问原始链接获取完整信息- 交叉验证多个来源- 提取技术细节（模型架构、训练数据、benchmark结果）> 注：如达到时间或请求限制，提前输出已收集结果，并标注"未完成的来源列表"。## 输出产物### 1. `AI_NEWS_REPORT.md`包含：-**执行摘要**（本次发现的重大动态 Top 3）-**时间线**（按日期倒序）-**分类动态**：  - 🚀 模型发布（新模型、版本更新）  - 📊 性能突破（benchmark记录、能力提升）  - 🔬 研究进展（新论文、技术创新）  - 🏢 行业动态（公司合作、产品应用）-**趋势分析**（技术方向、竞争格局）-**数据来源**（链接列表）示例格式：```markdown## 🚀 模型发布### GPT-5 发布 (2025-10-10)- **来源**: [OpenAI Blog](https://...)- **关键信息**:   - 参数规模：未公开  - 性能提升：MMLU 95.2% (+8%)  - 新能力：原生多模态、更长上下文- **影响评估**: ⭐⭐⭐⭐⭐```### 2. `.claude/ai_news_cache.json`记录：- 最后更新时间- 已访问的URL列表（避免重复抓取）- 新闻条目哈希（用于去重）- 下次优先访问的来源### 3. `SOURCES.md`所有引用来源的完整列表，包含：- URL- 访问时间- 可信度评级- 是否需要复核## 信息质量控制### 可信度评级- ⭐⭐⭐⭐⭐ 官方发布- ⭐⭐⭐⭐ 权威媒体/技术博客- ⭐⭐⭐ 社区讨论（多源验证）- ⭐⭐ 单一来源，待确认### 去重规则- 标题相似度 > 80% 视为重复- 同一模型的不同报道合并为一条- 保留最详细/最新的版本## 执行流程1.**启动阶段**（5-10次工具调用）   - 读取缓存 `.claude/ai_news_cache.json`   - 确定本次搜索范围   2.**信息收集**（20-30次工具调用）   - 执行搜索查询（5-8个关键词）   - 访问优先站点（8-10个）   - 深度抓取重要新闻（5-10条）3.**整理输出**（5次工具调用）   - 去重、分类、排序   - 生成 Markdown 报告   - 更新缓存文件   
```

上面这个AI新闻跟踪的Agent，使用方法也很简单：

```
# 基础用法claude code --agent ai-news-tracker "获取最新AI动态"# 指定时间范围claude code --agent ai-news-tracker "获取最近7天的AI模型发布动态"# 聚焦特定主题claude code --agent ai-news-tracker "搜索关于多模态大模型的最新进展"
```

使用 Agent/Subagent

-   主要方式：通过交互对话触发特定 Agent
-   Agent 在 Claude Code 中自动可用（它会按照上下文等场景动态调用，取决于大模型返回的function call的决策）
-   使用 /agents 命令管理已安装的 agents

我们可以列出我们所有的Agent（可以通过对话交互方式）

```
> 请看看我本地有哪些Agent，都列出来，就是英文名、中文名、用途，简略一些● 我来帮你查找本地的Agent配置文件。● Search(pattern: "**/*agent*.json")  ⎿  Found 13 files (ctrl+o to expand)● Search(pattern: "**/.claude/agents/**/*.md")  ⎿  Found 6 files (ctrl+o to expand)● Search(pattern: "**/agents/**/*.json")  ⎿  Found 0 files● Bash(ls -la "$HOME/.claude/agents" 2>/dev/null|| echo "目录不存在")  ⎿  total 12     drwxr-xr-x 1 heiye 197609    010月 1301:14 .     drwxr-xr-x 1 heiye 197609    010月 1301:17 ..     … +3 lines (ctrl+o to expand)● 找到了Agent配置文件，让我读取它们的内容：● Read(.claude\agents\init-master.md)  ⎿  Read 82 lines● Read(.claude\agents\ai-news-tracker.md)  ⎿  Read 129 lines● ...● 根据你本地的Agent配置，这里是所有Agent的列表：  Agent 列表| 英文名                  | 中文名      | 用途                               ||----------------------|----------|----------------------------------|| init-master          | 项目初始化专家  | 自动扫描项目结构并生成文档，支持增量更新             || ai-news-tracker      | AI动态追踪专家 | 自动搜索并整理最新AI大模型动态，生成结构化报告         ||get-current-datetime | 日期时间获取器  | 执行date命令并返回原始时间戳输出               || init-architect       | 初始化架构师   | 根级简明 + 模块级详尽，分阶段遍历项目并生成文档，带覆盖率报告 || planner              | 任务拆解规划师  | 将复杂任务拆解为可执行的步骤序列，生成结构化规划文档       || ui-ux-designer       | UI/UX设计师 | 提供UI/UX设计指导和界面改进建议，符合设计规范        |  说明：- init-architect 和 init-master 功能类似，architect版本更强调模块化文档和覆盖率追踪- planner 专注项目规划，ui-ux-designer 专注界面设计- ai-news-tracker 和 get-current-datetime 为专用工具型Agent
```

检索大概输出结果如下：

![Image](ReadItLater%20Inbox/assets/Claude%20Code%20核心：深度介绍%20MCP+Agent+斜杆命令+Hook%20一文通！-QgRXoFmuGX.png)

直接使用一个自定义的Agent，以上面我们获取的这个获取当前时间的agent为例，我们就可以在Claude Code中执行使用这个Agent：

```
> 获取一下当前的时间● get-current-datetime(获取当前日期时间)  ⎿  Done (1 tool use · 4.8k tokens · 13s)● 当前时间： 2025年10月13日 0:45:40  ---  现在我们回到用户登录功能的开发。请告诉我：  1. 项目路径是什么？（如：C:/Users/heiye/my-project）  2. 采用我建议的标准方案，还是需要自定义配置？  有了这些信息，我就可以开始创建需求文档并启动 spec workflow 流程。
```

![Image](ReadItLater%20Inbox/assets/Claude%20Code%20核心：深度介绍%20MCP+Agent+斜杆命令+Hook%20一文通！-xwbmcVuTd3.png)

你也可以在Claude Code的交互过程中直接指示需要使用那个Agent，直接使用 @XXXX 就可以，可以直接调用MCP和Agent，比如看看我们新增加的 init-master：

![Image](ReadItLater%20Inbox/assets/Claude%20Code%20核心：深度介绍%20MCP+Agent+斜杆命令+Hook%20一文通！-889YgLhm0W.png)

#### Slash Command（斜杆命令）配置使用

Slash Command（斜杠命令） 是 Claude Code 的核心交互机制，用 /命令名 \[参数\] 的方式快速调用固定的操作或 Prompt 模板。

它既可以是官方内置命令（如 /clear、/compact），也可以是用户自定义命令（放在 .claude/commands/ 目录）。

一句话总结：

Slash Command = 命令化的 Prompt 模板系统

让 Claude Code 不只是“回答问题”，而能像一个真正的 智能命令行助手，快速执行复杂的 AI 操作。

Slash Command解决问题：

| 问题 | 解决方式 |
| --- | --- |
| 重复写 Prompt 太麻烦 | 把常用操作做成模板命令，比如  |
| 团队使用不统一 | 在项目中共享命令模板，保证操作规范一致。 |
| 输入效率低 | 通过  |
| 难与外部工具联动 | 可结合 MCP 协议、Git、CI 等实现自动化执行。 |
| Prompt 不可复用 | 命令模板化后可版本管理、分享、扩展。 |

常见Slash Command（斜杆命令）

内置命令：

-   /clear：清除对话 （系统内建命令）
-   /compact：压缩历史节省上下文 （系统内建命令）
-   /init：项目初始化 （系统内建命令）
-   /model：切换模型或查看模型（系统内建命令）
-   /config：修改配置 （系统内建命令）
-   /memory：编辑 CLAUDE 的记忆 / 上下文提示 （系统内建命令）
-   /help：列出可用命令 （系统内建命令）

自定义命令：

-   /review-pr 456：生成代码审查建议（自定义命令）
-   /test LoginPage：生成测试用例 （自定义命令）
-   /mcp\_\_github\_\_create-issue：通过 MCP 创建 GitHub Issue （与外部MCP集成命令）

创建命令（自定义 Slash Command）

Slash Command 这些都是放在对应目录下面才能生效：

| 级别 | 操作步骤 |
| --- | --- |
| 项目级命令 | 1\. 执行 2\. 执行  |
| 用户级命令 | 1\. 执行 2\. 执行  |

使用方式

```
/mycommand
```

我们具体自己设置一个项目级的slash command，比如设计一个 review-code 的 Slash Command ：

```
your-project/│├── main.go└── .claude/    └── commands/        └── review.md
```

review-code.md 文件内容：

```
# 代码审查（Code Review）分析指定文件的源代码，并提供详细的审查建议。## Arguments 参数说明-`$ARGUMENTS`：需要审查的文件路径（可以是一个或多个）---请阅读并审查以下文件内容：$ARGUMENTS### 审查要求：1.指出明显的逻辑问题或潜在Bug2.分析代码结构和可读性，提出改进建议3.检查性能和资源使用是否合理4.指出命名、注释、代码风格是否规范5.如果有安全隐患或边界条件未处理，也请说明6.最后总结整体质量评价（优秀/可改进/风险高）
```

使用的时候可以直接在 claude 命令行下运行：

```
/review-code main.go
```

执行效果：

![Image](ReadItLater%20Inbox/assets/Claude%20Code%20核心：深度介绍%20MCP+Agent+斜杆命令+Hook%20一文通！-b04tlI2QPR.png)

#### Hook 配置使用

Hooks 是 Claude Code 在特定生命周期节点（如工具使用前后、会话开始结束等）自动执行自定义命令或脚本的机制，用于在 AI 执行操作时自动插入代码检查、格式化、测试等流程。

比如：在 Claude 写入 Python 文件后自动运行 black 格式化，或在提交前自动运行 lint 检查。

1.  1.Hook 是什么、为什么用

-   Hooks 是用户可以在 Claude Code 的生命周期关键时刻插入 shell 命令／脚本执行的机制，用来“拦截”或“增强” Claude 执行工具（Tool）操作的行为。 
-   它能让你在 Claude 执行之前或之后做一些必要的检查、格式化、日志记录、通知、权限校验等操作 —— 从而变得更加可控。 
-   Hooks 机制比以前那种“靠 Prompt 让 Claude 自己记得做某件事”更可靠，因为它脱离了模型的随机性，是确定性触发。 

1.  2.Hook 配置文件 / 存放位置

-   Hook 的配置一般写在 Claude Code 的配置文件里，通常是 settings.json 或 settings.local.json，存放在项目的 .claude/ 目录或用户主目录（~/.claude/）中。
-   举例来说，用户级别配置可能在 ~/.claude/settings.json，项目级别配置在项目根目录的 .claude/settings.json 或 .claude/settings.local.json。
-   Hook 配置一般会写在配置里的 "hooks" 键下。 

1.  3.Hook 的事件类型 / 支持的触发点

Claude Code 支持多个 Hook 事件，在不同阶段触发。常见的事件包括：

| Hook 事件类型 | 会话阶段 | 主要用途 |
| --- | --- | --- |
| SessionStart | 会话开始 | 加载开发上下文、读取代码变更、加载配置文件 |
| UserPromptSubmit | 用户提交提示词后 | 用户提交 prompt 时，Claude 处理之前触发。可用于在 prompt 上加额外上下文或过滤 prompt。预处理输入、自动补充上下文(如git分支)、验证提示词 |
| PreToolUse | 工具使用前 | 在 Claude 准备调用某个工具之前触发，你可以在这里检查、拦截或调整工具参数。比如执行安全检查(如拦截危险命令  |
| PostToolUse | 工具使用后 | 在工具执行完毕之后触发，可以用于后处理、校验、通知等。比如自动格式化代码(运行linter/prettier)、后处理操作 |
| PreCompact | 上下文压缩前 | 在 Claude 执行上下文压缩 (compact) 前触发。   存档完整对话记录、标记重要内容 |
| Notification | 需要用户交互时 | 当 Claude 发出通知（如等待用户输入、请求权限等）时触发。自定义通知方式(如语音提醒"需要授权") |
| Stop | 任务完成时 | 当主 Claude 响应结束时触发（非中断情况）。 记录耗时统计、生成任务小结 |
| SubagentStop | 子任务完成时 | 当子任务 (Task 工具) 完成时触发。  |
| SessionEnd | 会话结束 | 清理临时文件、保存会话日志 |

1.  4.Hook 配置格式与字段

下面是一个典型的 Hook 配置结构示例（JSON 形式）：

```
{  "hooks":{    "PreToolUse":[      {        "matcher":"Write|Edit",            // 匹配工具名称的正则 / 模式        "hooks":[          {            "type":"command",               // 当前支持 “command” 类型            "command":"bash ./hooks/format-go.sh",   // 要执行的 shell 命令或脚本            "timeout":30                    // 可选：超时时间（秒），默认 60 秒          }        ]      }    ],    "PostToolUse":[      {        "matcher":"",                      // 空字符串表示匹配所有工具        "hooks":[          {            "type":"command",            "command":"echo \"工具已执行完毕\""          }        ]      }    ],    "Stop":[      {        "matcher":"",        "hooks":[          {            "type":"command",            "command":"bash ./hooks/cleanup.sh"          }        ]      }    ]}}
```

字段说明：

-   "matcher"：工具名称匹配器，可以是工具名称、正则表达式、空字符串（代表匹配所有） (\[掘金\]\[4\])
-   "type"：当前支持 "command" 类型，表示执行一个 shell 命令 (\[掘金\]\[4\])
-   "command"：要执行的 shell 命令或脚本路径（工作目录是你项目根目录或 Claude 启动目录） 
-   "timeout"：可选，命令的超时时间（单位秒），默认 60 秒 (\[掘金\]\[4\])

1.  5.如何启用 / 使用 Hook

-   步骤1：打开 Hook 配置界面

-   在 Claude Code 中，你可以使用 /hooks 这样的 Slash 命令进入 Hook 设置界面（菜单化交互）来添加、编辑 Hook。

-   步骤2：新增 / 编辑 Hook

-   在 Hook 配置界面里选择一个事件（如 PreToolUse），输入对应 matcher（如 Write、Edit、或更复杂的正则），然后指定要执行的命令。

-   步骤3：选择存储位置

-   可以把 Hook 保存为项目级（在 .claude/ 目录内）或者用户级（全局适用于你所有项目）配置。比如保存到 ~/.claude/settings.json 或 项目/.claude/settings.json。

-   步骤4：确认 / 刷新 Hook 生效

-   通常保存后，Claude Code 会读取配置并在下次执行工具时触发 Hook。如果你在会话中改了 Hook，可能需要重启或通过 /hooks 菜单重新加载。 

-   步骤5：调试 / 查看效果

-   使用命令 claude --debug 可以查看 Hook 执行的日志与错误信息。 
-   如果 Hook 执行失败、超时或命令写错，你可以看到错误、回退或跳过该 Hook。 

1.  6.示例：Hook 示例

假设你在一个 Go 项目中，希望在每次编辑写文件时自动运行 gofmt 格式化。

你可以这样配置（项目级）：.claude/settings.json 或 .claude/settings.local.json

```
{  "hooks":{    "PostToolUse":[      {        "matcher":"Write",        "hooks":[          {            "type":"command",            "command":"go fmt ./$(dirname \"$CLAUDE_PROJECT_DIR\")",            "timeout":10          }        ]      }    ]}}
```

或用更具体脚本路径：

```
{  "hooks":{    "PostToolUse":[      {        "matcher":"Write",        "hooks":[          {            "type":"command",            "command":"bash ./hooks/auto_gofmt.sh",            "timeout":10          }        ]      }    ]}}
```

脚本 auto\_gofmt.sh 可以写：

```
##!/usr/bin/env bash## 自动格式化项目里的 .go 文件gofmt -w .
```

然后保存这个脚本并给执行权限：

```
chmod +x ./hooks/auto_gofmt.sh
```

这样，每次 Claude 写入文件后（PostToolUse、匹配 “Write” 操作），就会自动格式化。

1.  7.Hook使用注意事项与安全提示

-   安全风险：Hook 会执行 shell 命令／脚本，有可能误操作、删除、访问敏感文件。务必在可信环境测试。 
-   输入验证：不要直接信任 Hook 接收到的路径或内容，最好在脚本里做路径检查（避免 ..、绝对路径绕过等）。 
-   timeout 设置：命令运行超时默认是 60 秒，如果脚本可能耗时，要设合理的 timeout。 (\[掘金\]\[4\])
-   并行与去重：如果多个 Hook 匹配一个事件，它们会并行运行；相同命令会被去重。 
-   环境变量：Hook 执行时，环境变量 CLAUDE\_PROJECT\_DIR 会被设置为项目根目录的绝对路径。可在脚本中使用它。 
-   调试模式：如果遇问题，用 \--debug 模式运行 Claude Code，可以看到 Hook 执行情况、错误输出等。 
-   不要滥用 Hook：Hook 是强工具，不要把所有逻辑都放在 Hook 里，以免系统变得难以维护。

## 三、Claude Code 常用 Agent 和 MCP 介绍

#### Agent 集合

##### wshobson-agents

-   地址：https://github.com/wshobson/agents
-   特点：

-   83个专业的AI代理,涵盖架构、语言、基础设施、质量、数据/AI、文档、业务运营和SEO等领域
-   15个多代理工作流编排器,用于复杂的操作,如全栈开发、安全强化、ML管道和事故响应
-   42个专注于特定任务的开发工具,包括API脚手架、安全扫描、测试自动化和基础设施设置

-   这个项目是一个综合性的生产就绪系统,包含83个专业的AI代理、15个多代理工作流编排器和42个开发工具,用于在现代软件开发中实现智能自动化和多代理编排。
-   主要功能点：

##### awesome-claude-agents

-   地址：https://github.com/vijaythecoder/awesome-claude-agents
-   特点：

-   提供 24 个专门的 AI 代理,涵盖多种框架和领域的专业知识
-   自动检测项目技术栈并配置最佳的 AI 团队
-   代理之间协作,并行执行任务,提高开发效率
-   生成高质量的代码,遵循最佳实践
-   为开发人员提供学习机会,了解专家如何解决问题

-   这是一个基于 Claude Code 的 AI 开发团队项目,旨在通过协作的 AI 代理来加速软件开发和交付。该项目提供了一组专门的 AI 代理,可以处理各种技术栈,并协调完成复杂的开发任务。
-   主要功能点

##### VoltAgent-subagents：

-   地址：https://github.com/VoltAgent/awesome-claude-code-subagents
-   特点：

-   生产就绪:在实际场景中进行过测试
-   最佳实践合规:遵循行业标准和模式
-   MCP工具集成:利用模型上下文协议工具
-   持续维护:定期更新新功能
-   社区驱动:开放贡献和改进

-   这个仓库是一个全面的 Claude 子代理参考集合,包含了100多个专门用于全栈开发、DevOps、数据科学和业务运营的AI代理。这些子代理经过生产环境测试,遵循最佳实践和行业标准,并集成了模型上下文协议(MCP)工具。这个项目由 VoltAgent 开源 AI 代理框架社区维护,旨在为开发人员提供一致和安全的工作流程。
-   主要功能点

#### MCP 集合

整合了主流参考、编程开发、飞书生态、数据库访问、搜索引擎等多类主流 MCP 服务器，包含准确的 GitHub 地址与功能描述，便于快速查询使用。

##### 主流推荐MCP

| 服务器名称 | GitHub 地址 | 功能描述 |
| --- | --- | --- |
| Everything | https://github.com/modelcontextprotocol/servers/tree/main/src/everything | 参考/测试服务器，包含提示、资源和工具 |
| Fetch | https://github.com/modelcontextprotocol/servers/tree/main/src/fetch | 网页内容获取和转换 |
| Filesystem | https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem | 安全的文件操作，可配置访问控制 |
| Git | https://github.com/modelcontextprotocol/servers/tree/main/src/git | 读取、搜索和操作 Git 仓库 |
| Memory | https://github.com/modelcontextprotocol/servers/tree/main/src/memory | 基于知识图谱的持久化记忆系统 |
| Sequential Thinking | https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking | 动态和反思性问题解决的思维序列 |
| GitHub | https://github.com/modelcontextprotocol/servers/tree/main/src/github | GitHub 仓库管理、文件操作和 API 集成 |
| GitLab | https://github.com/modelcontextprotocol/servers/tree/main/src/gitlab | GitLab API 集成，项目管理 |
| Slack | https://github.com/modelcontextprotocol/servers/tree/main/src/slack | 频道管理和消息功能 |
| Puppeteer | https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer | 浏览器自动化和网页抓取 |

##### 编程开发工具类 MCP 服务器

| 服务器名称 | GitHub 地址 | 功能描述 |
| --- | --- | --- |
| Context7 | https://github.com/upstash/context7 | 获取最新的代码文档和示例，解决 AI 编程“瞎编”问题 |
| Filesystem (Go 版本) | https://github.com/mark3labs/mcp-filesystem-server | Go 语言实现的文件系统操作服务器 |
| Fast Filesystem | 参考官方仓库社区部分（https://github.com/modelcontextprotocol/servers） | 高级文件系统操作，优化大文件处理 |

##### 飞书（Feishu/Lark）生态 MCP 服务器

| 服务器名称 | GitHub 地址 | 功能描述 |
| --- | --- | --- |
| Feishu-MCP | https://github.com/cso1z/Feishu-MCP | 为 Cursor、Windsurf、Cline 提供飞书文档访问和编辑 |
| Lark-Tools-MCP | https://github.com/Li-vien/lark-tools-mcp | 飞书文档读取、消息发送、合同审批等 |
| Lark OpenAPI MCP（官方） | https://github.com/larksuite/lark-openapi-mcp | 飞书官方 OpenAPI 适配，支持文档处理、会话管理 |
| Feishu-MCP-Server | https://github.com/DarkNoah/feishu-mcp | 支持飞书多维表格操作 |

##### 数据库访问类 MCP 服务器

| 服务器名称 | GitHub 地址 | 功能描述 |
| --- | --- | --- |
| MCP Database Server | https://github.com/executeautomation/mcp-database-server | 支持 SQLite、SQL Server、PostgreSQL、MySQL |
| MCP-Alchemy | https://github.com/runekaagaard/mcp-alchemy | 支持 PostgreSQL、MySQL、SQLite、Oracle、MS SQL 等 |
| DBHub | https://github.com/bytebase/dbhub | 通用数据库适配，支持 PostgreSQL、MySQL、SQL Server、MariaDB |
| PostgreSQL MCP Server | https://github.com/HenkDz/postgresql-mcp-server | 专用 PostgreSQL 服务器，含 17 个智能工具 |
| MySQL MCP Server | https://github.com/designcomputer/mysql\_mcp\_server | MySQL 数据库交互专用服务器 |
| DB MCP Server | https://github.com/FreePeak/db-mcp-server | Golang 实现，支持 MySQL 和 PostgreSQL |
| MongoDB Lens | https://github.com/furey/mongodb-lens | MongoDB 数据库完整功能适配 |

##### 搜索引擎类 MCP 服务器

| 服务器名称 | GitHub 地址 | 功能描述 |
| --- | --- | --- |
| MCP Omnisearch | https://github.com/spences10/mcp-omnisearch | 统一访问 Tavily、Brave、Kagi、Perplexity、Exa AI 等多搜索引擎 |
| Brave Search | 参考官方仓库（https://github.com/modelcontextprotocol/servers） | 基于 Brave Search API 实现网络搜索 |
| Tavily Search | 参考官方仓库（https://github.com/modelcontextprotocol/servers） | 基于 Tavily API 实现网络搜索 |
| Google Maps | 参考官方仓库（https://github.com/modelcontextprotocol/servers） | 位置服务、路线规划和地点详情查询 |
| Perplexity（官方） | 参考 Perplexity 官方文档（需结合官方 API 配置） | Perplexity API 连接器，支持智能搜索 |

##### 云服务与工具集成类 MCP 服务器

| 服务器名称 | GitHub 地址 | 功能描述 |
| --- | --- | --- |
| AWS MCP Servers | https://github.com/awslabs/mcp | AWS 官方 MCP 集合，支持 S3、EC2 等多种 AWS 服务 |
| Firebase MCP | https://github.com/gannonh/firebase-mcp | 适配 Firebase 服务，含 Auth、Firestore、Storage |
| Redis | 参考官方仓库（https://github.com/modelcontextprotocol/servers） | Redis 键值存储交互，支持缓存操作 |
| Sentry | 参考官方仓库（https://github.com/modelcontextprotocol/servers） | 从 Sentry.io 检索和分析项目错误日志 |
| Google Drive | 参考官方归档仓库（https://github.com/modelcontextprotocol/servers，已归档） | Google Drive 文件访问和搜索（需注意归档状态） |

##### 协作与知识管理类 MCP 服务器

| 服务器名称 | GitHub 地址 | 功能描述 |
| --- | --- | --- |
| Slack MCP（社区增强版） | https://github.com/korotovsky/slack-mcp-server | 增强版 Slack 集成，支持多种传输协议 |
| Notion MCP | 参考社区列表（https://github.com/wong2/awesome-mcp-servers） | Notion 生产力工具连接，支持文档读写 |
| Obsidian MCP | 参考社区列表（https://github.com/wong2/awesome-mcp-servers） | Obsidian 笔记工具连接，支持知识库访问 |
| Jira MCP | 参考社区列表（https://github.com/wong2/awesome-mcp-servers） | Jira 项目管理集成，支持任务查询与创建 |
| Linear | 参考社区列表（https://github.com/wong2/awesome-mcp-servers） | Linear 项目管理工具集成，支持工单管理 |
| Asana | 参考社区列表（https://github.com/wong2/awesome-mcp-servers） | Asana 任务管理集成，支持任务跟踪 |

##### 核心MCP服务集合库

| 资源类型 | GitHub 地址/链接 | 说明 |
| --- | --- | --- |
| MCP 官方服务器集合 | https://github.com/modelcontextprotocol/servers | 官方维护的核心服务器仓库，含基础工具与协议 |
| 社区服务器列表 | https://github.com/wong2/awesome-mcp-servers | 社区维护的完整 MCP 服务器清单，更新频繁 |
| MCP 官方文档 | https://modelcontextprotocol.io | 协议标准、集成指南与最佳实践 |