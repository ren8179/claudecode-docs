 [[Article]] [[Claude Code  实用指南]] [[AI编程工具]] [[技术教程]] [[最佳实践]] [[工具对比]] [[配置指南]] [[开发效率]]
#ClaudeCode
# [从 Cursor 换到 Claude Code，我总结的这份保姆级上手指南](https://mp.weixin.qq.com/s/y33nRz8a3sioDQkZSyn19A)

最近我自己的 Cursor 额度刚好用完，正巧赶上 Claude 的免费活动，就顺势切换到了 Claude Code。搭配上之前提过的 AI 中转服务，可以说是体验非常深入了，下面就给大家介绍一下我使用过程中遇到的一些问题,以及根据官方文档总结的一些经验! 欢迎大家留言交流! 另外我发现使用的问题,直接问Claude Code也能得到解决!

关于自建中转服务可以参考: `https://mp.weixin.qq.com/s/ct30ZEikn3M2ZWEGgwcf7g` .

## 准备工作：环境搭建

### 第一步：选择你的操作系统环境

#### Windows用户（推荐配置）

我的环境是 Windows + WSL2 + VSCode，说真的，安装过程我这里就不啰嗦了，官方文档写得比我清楚。WSL 的安装可以搜一下教程，一大堆。Claude Code 直接看官网就行，几条命令的事儿。

> WSL完整教程可以参考:  https://www.wangwangit.com/WSL完全指南-从安装到进阶使用,让你的Windows如虎添翼/
> 
> Claude Code官网安装教程:  https://code.claude.com/docs/zh-CN/quickstart

至于Linux,macOS用户那就更简单了,直接安装Claude Code就可以开始使用了!

---

## 快速开始：第一个项目

### 创建你的第一个项目

让我们通过一个实际例子来熟悉Claude Code的使用。

1.  1. **创建项目目录**
    
    ```
    mkdir my-first-claude-projectcd my-first-claude-project
    ```
    
2.  2. **初始化Git（强烈推荐）**
    
    ```
    git initgit config user.name "你的名字"git config user.email "你的邮箱"
    ```
    
    > **为什么要用Git？** 使用Git后，可以启用危险模式跳过权限确认，让Claude自动执行所有操作！
    
3.  3. **创建CLAUDE.md文件（项目配置）**
    
    ```
    touch CLAUDE.md
    ```
    
    在CLAUDE.md中写入：
    
    ```
    # 我的第一个Claude项目## 项目描述这是一个简单的待办事项Web应用## 技术栈- 前端：HTML + CSS + JavaScript- 无需后端，使用localStorage存储数据## 项目规则- 保持代码简洁- 添加适当的注释- 所有功能必须有测试
    ```
    
4.  4. **启动Claude Code（自动模式）**
    
    ```
    # 普通模式（每次操作需要确认）claude# 自动模式（推荐，需要Git）claude --dangerously-skip-permissions
    ```
    
5.  5. **你的第一个任务**在Claude Code终端中输入：
    
    ```
    创建一个简单的待办事项应用，要有添加、删除和标记完成的功能
    ```
    
    观察Claude如何：
    

-   • 分析你的需求
    
-   • 创建文件结构
    
-   • 编写代码
    
-   • 自动测试
    

---

## 核心概念：理解Claude Code的工作方式

### 1\. 三种工作模式

#### 编辑模式（Edit Mode）- 默认

这是你最常用的模式，Claude可以：

-   • 创建、修改、删除文件
    
-   • 执行命令
    
-   • 运行测试
    

**切换方式：** 默认就是这个模式

#### 计划模式（Plan Mode）

在开始大型任务前使用，Claude会：

-   • 制定详细的实施计划
    
-   • 列出所有步骤
    
-   • 创建计划文档供参考
    

**切换方式：** 按 `Shift+Tab`

#### 对话模式（Chat Mode）

纯对话，不执行任何操作，适合：

-   • 讨论架构设计
    
-   • 理解代码逻辑
    
-   • 获取建议
    

**切换方式：** 按 `Shift+Tab` 两次

![image-20251113173758394](ReadItLater%20Inbox/assets/从%20Cursor%20换到%20Claude%20Code，我总结的这份保姆级上手指南-B31Y7kImSY.png)

### 2\. CLAUDE.md

CLAUDE.md是Claude每次启动时自动读取的配置文件，就像是给Claude的"工作手册"。

**基础模板：**

```
# 项目名称## 项目概述[简要描述项目目的和功能]## 技术栈- 语言：[例如：Python 3.10+]- 框架：[例如：Django 4.2]- 数据库：[例如：PostgreSQL]- 前端：[例如：React + TypeScript]## 开发规范### 代码风格- [例如：使用Black格式化Python代码]- [例如：函数名使用snake_case]- [例如：类名使用PascalCase]### 文件结构project/├── src/           # 源代码├── tests/         # 测试文件├── docs/          # 文档└── config/        # 配置文件## 核心命令- `npm start` - 启动开发服务器- `npm test` - 运行测试- `npm build` - 构建生产版本## 重要注意事项- [例如：永远不要直接修改数据库，使用迁移]- [例如：所有API调用必须有错误处理]- [例如：新功能必须包含测试]## 当前任务- [ ] 实现用户认证- [ ] 添加数据验证- [ ] 优化性能
```

### 3\. 检查点（Checkpoints）

检查点是Claude Code的杀手级功能，让你可以大胆尝试而不用担心搞砸项目。

**使用场景：**

-   • 在进行大型重构前
    
-   • 尝试实验性功能时
    
-   • 处理复杂的bug修复前
    

**使用方法：**

1.  1\. 设置检查点：Claude会在重要操作前自动创建
    
2.  2\. 回滚：如果出错，输入 `/rewind` 立即回到上一个检查点
    

**示例对话：**

```
你: 帮我重构整个认证系统，使用JWT替代sessionClaude: 我将进行大型重构，已创建检查点...[Claude开始工作...]你: 等等，这样改动太大了，回滚吧你: /rewindClaude: 已回滚到检查点，所有更改已撤销
```

---

## 实战技巧：提升10倍效率的方法

### 技巧1：测试驱动开发（TDD）工作流

这是使用Claude Code最重要的技巧，能让代码质量提升10倍！

**正确的工作流程：**

1.  1. **先计划，后编码**
    
    ```
    你: 我要添加一个用户注册功能。先给我一个详细计划，不要写代码。Claude: [提供计划]你: 计划看起来不错，继续
    ```
    
2.  2. **先测试，后实现**
    
    ```
    你: 现在先写测试用例，确保它们都失败Claude: [创建测试文件，运行测试，显示失败]你: 好，现在实现功能让测试通过，但不要修改测试
    ```
    
3.  3. **迭代到完美**
    
    ```
    你: 继续优化直到所有测试都是绿色的Claude: [反复修改代码直到测试通过]
    ```
    

### 技巧2：自定义斜杠命令

通过自定义命令，可以让Claude变成你的定制化团队成员。

**创建步骤：**

1.  1\. 创建命令目录：
    
    ```
    mkdir -p .claude/commands
    ```
    
2.  2\. 创建命令文件 `.claude/commands/review-code.md`：
    
    ```
    # 代码审查对 $ARGUMENTS 指定的文件进行严格的代码审查：1. 检查代码风格是否符合项目规范2. 查找潜在的bug和安全问题3. 评估性能问题4. 检查是否有充分的注释5. 验证是否有对应的测试6. 给出改进建议并创建TODO列表
    ```
    
3.  3\. 使用命令(注意,需要重启Claude code)：
    
    ```
    review-code src/auth.py
    ```
    

![image-20251114164852728](ReadItLater%20Inbox/assets/从%20Cursor%20换到%20Claude%20Code，我总结的这份保姆级上手指南-N4XY0ItP77.png)

**常用自定义命令示例：**

-   • `/project:fix-github-issue [issue编号]` - 自动修复GitHub issue
    
-   • `/project:optimize-performance [文件名]` - 性能优化
    
-   • `/project:add-tests [模块名]` - 为模块添加测试
    
-   • `/project:document [功能名]` - 生成文档
    

### 技巧3：MCP（Model Context Protocol）工具集成

MCP让Claude能够与外部工具交互，极大扩展了它的能力。很多人在VS Code中安装时会出现各种各样的问题,我这次是直接让Claude帮我安装的,大家也可以试试!

**让Claude自动安装（推荐）**

```
你: 帮我安装这些MCP工具：Context7,serena,chrome-devtools,playwright-mcpClaude: [自动下载和配置MCP工具]
```

![image-20251113173611205](ReadItLater%20Inbox/assets/从%20Cursor%20换到%20Claude%20Code，我总结的这份保姆级上手指南-c2YN9Luf3K.png)

## 高级功能：成为Claude Code专家

### 1\. 多文件并行编辑

Claude可以同时处理多个文件，充分利用这个能力：

```
你: 同时更新以下文件：- 在user.model.js中添加email字段- 在user.controller.js中添加email验证- 在user.test.js中添加email测试用例- 更新API文档中的用户模型说明
```

### 2\. 智能代码重构

利用Claude的模式识别能力进行大规模重构：

```
你: 找出项目中所有重复的代码模式并提取为通用函数
```

### 3\. 自动化文档生成

```
你: 为src/目录下的所有模块生成JSDoc文档，并创建一个API文档网站
```

### 4\. 性能分析与优化

```
你: 分析整个应用的性能瓶颈，给出优化建议并实施前3个最重要的优化
```

---

## 最佳实践：避免常见陷阱

### DO - 推荐做法

1.  1. **始终使用版本控制**
    
    ```
    git initgit add .git commit -m "Initial commit"
    ```
    
2.  2. **明确的指令**
    
    ```
    好: "创建一个REST API端点 /api/users，支持GET和POST，返回JSON格式"差: "做个API"
    ```
    
3.  3. **增量式开发**
    
    ```
    第1步: 创建基础结构第2步: 添加核心功能第3步: 添加边缘情况处理第4步: 优化性能
    ```
    
4.  4. **保持CLAUDE.md更新**
    

-   • 记录新的约定
    
-   • 更新技术栈变化
    
-   • 添加常见问题的解决方案
    

6.  5. **定期创建检查点**
    
    ```
    你: 在开始重构前，请创建一个检查点
    ```
    

### DON’T - 避免的做法

1.  1. **不要跳过测试**
    
    ```
    错误: "快速实现功能，不需要测试"正确: "实现功能并编写相应的测试"
    ```
    
2.  2. **不要一次性改动太多**
    
    ```
    错误: "重写整个应用"正确: "逐步重构，每次专注一个模块"
    ```
    
3.  3. **不要忽略错误处理**
    
    ```
    错误: "假设一切正常工作"正确: "添加try-catch和错误边界"
    ```
    
4.  4. **不要硬编码配置**
    
    ```
    错误: 直接在代码中写死API密钥正确: 使用环境变量或配置文件
    ```
    

---

## 故障排除：常见问题解答

### 问题1：Claude不执行命令，总是要求确认

**解决方案：**

1.  1\. 确保项目有Git管理：`git init`
    
2.  2\. 使用自动模式启动：`claude --dangerously-skip-permissions`
    

### 问题2：Claude忘记了项目上下文

**解决方案：**

1.  1\. 检查CLAUDE.md是否存在和更新
    
2.  2\. 使用 `@claude.md` 显式引用配置
    
3.  3\. 在长对话中定期总结关键信息
    

### 问题3：MCP工具无法使用

**解决方案：**

```
# 重新安装MCPclaude mcp install [工具名]# 检查配置claude mcp list# 查看日志claude logs
```

### 问题4：检查点回滚失败

**解决方案：**

1.  1\. 确保没有未提交的Git更改
    
2.  2\. 使用 `/checkpoint list` 查看所有检查点
    
3.  3\. 手动指定检查点：`/rewind [checkpoint-id]`
    

### 问题5：代码执行错误

**解决方案：**

```
你: 上一个命令失败了，请分析错误并修复Claude: [分析错误日志并提供解决方案]
```

---

## 总结

恭喜你！完成这份指南后，你已经掌握了Claude Code的所有核心功能。若你有什么更好的玩法,欢迎在留言给大家分享你的技巧!