[[AI编程工具]] [[技术教程]] [[最佳实践]] [[MCP协议]] [[Agent Skills]] [[开发效率]] [[Claude Code]]  

## 要点总结
**先思考，后动手。** 规划比直接开聊能产生好得多的结果
**CLAUDE.md 是你的杠杆点。** 保持简短、具体，解释原因，并持续更新。这个文件影响每一次交互
**上下文在30%使用率时就开始退化，而不是100%。** 使用外部记忆，限定对话范围，并善用“复制-粘贴重置”技巧
**架构比任何事都重要。** 你不能跳过规划。没有预先思考结构，输出就会很糟糕
**输出源于输入。** 如果你用好模型得到坏结果，是你的 Prompt 需要改进。提升你的沟通能力
**实验工具和配置。** MCP、钩子、斜杠命令。把所有功能都试一遍
**卡住时，改变方法。** 不要陷入循环。清空、简化、展示、重新构思
**构建系统，而非一次性任务。** 利用无头模式、自动化，并随时间记录和改进。

## 提示文档模板
**你如何编写 Prompt：** 具体 > 模糊，约束 > 开放，示例 > 描述

## 当 Claude 卡住时怎么办
- **清空对话。** 累积的上下文可能正在迷惑它。`/clear` 给你一个全新的开始。
-  **简化任务。** 如果 Claude 难以处理一个复杂任务，把它分解成更小的部分。在组合之前，确保每个部分都能正常工作。但实际上，如果 Claude 在复杂任务上挣扎，这通常意味着你的规划模式做得不够充分。
-  **展示而非告知。** 如果 Claude 一直误解你的意图，自己写一个最小化的例子。“看，输出应该长这样。现在把这个模式应用到其余部分。” *Claude 非常擅长理解成功的范例并遵循它*。
- **创新思路。** 尝试一个不同的角度。有时你描述问题的方式与 Claude 的“思维”方式不匹配。重新表述——比如从“处理这些状态转换”变为“将此实现为一个状态机”——可能会打开僵局。

## 重要规则


**与用户交流时，优先使用中文回复。** 代码注释、文档说明、解释性文字都应以中文为主。

## 重要约定

- 凡是在方案、编码过程遇到任何争议或不确定，必须在第一时间主动告知我由我做决策。

- 对于需要补充的信息，即使向我询问，而不是直接应用修改。

- 不要生成测试文件、任何形式的文档、运行测试、打印日志、使用示例，除非显式要求。

- 每次改动基于最小范围修改原则。


# 可用插件
### [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
UI UX Pro Max 是一个可搜索的数据库，包含 UI 风格、配色方案、字体搭配、图表类型、产品推荐、UX 指南以及特定技术栈的最佳实践。它作为 AI 编码助手（Claude Code、Codex、Cursor、Windsurf 等）的技能/工作流程。
``` shell
# Install CLI globally
npm install -g uipro-cli

# Go to your project
cd /path/to/your/project

# Install for your AI assistant
uipro init --ai claude      # Claude Code
```

### [Ralph-wiggum](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop)
持续迭代、不断循环
``` shell
/ralph-loop "Build a REST API for todos. Requirements: CRUD operations, input validation, tests. Output <promise>COMPLETE</promise> when done." --completion-promise "COMPLETE" --max-iterations 50
```
**Options:**

- `--max-iterations <n>` - 迭代N次后停止（默认：无限）
- `--completion-promise <text>` - 表示完成的短语

### /cancel-ralph
取消活跃的Ralph循环。

### 提示写作最佳实践
- 1. 明确的完成标准
``` shell
Build a REST API for todos.

When complete:
- All CRUD endpoints working
- Input validation in place
- Tests passing (coverage > 80%)
- README with API docs
- Output: <promise>COMPLETE</promise>
```
 - 2.增量目标
```
Phase 1: User authentication (JWT, tests)
Phase 2: Product catalog (list/search, tests)
Phase 3: Shopping cart (add/remove, tests)

Output <promise>COMPLETE</promise> when all phases done.
```
 - 3. 自我纠正
```
Implement feature X following TDD:
1. Write failing tests
2. Implement feature
3. Run tests
4. If any fail, debug and fix
5. Refactor if needed
6. Repeat until all green
7. Output: <promise>COMPLETE</promise>
```
 - 4.逃生舱口
始终使用`--max-iterations`作为安全网，以防止在不可能的任务上出现无限循环

**失败本身就是有价值的数据。**

# 可用技能

### [Superpowers - 全能开发套件 ](https://github.com/obra/superpowers)
这个 Skill 包覆盖了软件开发的完整流程：

●🧠 Brainstorming - 头脑风暴

●📝 Writing Plans - 编写需求文档

●💻 Subagent-Driven Development - 子代理驱动开发

●🐛 Systematic Debugging - 系统化调试

●✅ Test-Driven Development - 测试驱动开发

●🔍 Code Review - 代码审查

●🎯 Verification Before Completion - 完成前验证

口碑极佳，几乎是 OpenCode 用户的必备选择！
``` shell
/plugin marketplace add obra/superpowers-marketplace

/plugin install superpowers@superpowers-marketplace

# OpenCode
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

