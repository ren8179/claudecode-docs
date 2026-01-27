[[Claude Code]] [[AI编程工具]] [[技术教程]] [[实战经验]] [[开发效率]] [[工具对比]]  

# [如何用AI Coding和Claude Code提升开发效率？看我的全流程复盘](https://mp.weixin.qq.com/s/6j-MqSrJz5YlKAe2LZW6pg)

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-8RNh5CjSe7.jpeg)

随着人工智能技术的迅速发展，AI Coding 工具已经成为我日常开发中提升效率的重要手段。前阵子参加了一个算法技术的 Hackathon 活动，全程使用 AI 进行写文档、出设计图、写代码，这次经历让我深刻体会到 AI 在加速开发流程中的巨大潜力。因此，我想分享一些自己在实际业务场景中使用 AI Coding（特别是 Claude Code）的经验和心得，希望能对大家有所启发。

文章共分为两部分。第一部分是关于 AI Coding 相关的经验，在这部分，我会详细介绍如何利用 AI Coding 工具优化开发流程；第二部分主要讲述使用 Claude Code 方面的经验，Claude Code 作为一款先进的 AI 编程助手，在此次实践中发挥了重要作用。

AI Coding

**关于 Prompt 工程的一些心得**

关于prompt engineering，这个话题差不多有两年了，这个词虽然已经过气，尤其最近被Karpathy的新词Context Engineering盖过，不过还是想强调一下prompt的重要性，prompt的质量直接关乎到AI交付结果的质量。然而实际很多开发同学，对prompt技巧掌握并不多，那让AI产出好代码的上限可能就不高了。

我们平时工作中拒绝接受一句话需求，同样，我们和AI沟通时候，应该尽量避免一句话需求，而是尝试将需求描述清楚。这和我们平时工作时候和同事沟通的情况也是一样的，如果表达不清楚，对方也是不知道要做什么，那交付的产物也是五花八门的。

在开始使用 AI Coding 之前，是有必要系统学习一下Prompt 技巧，对后续使用效果影响是很大。

我的两个经验：  

1. 清晰的需求描述：

如果一个需求不能描述出来，那么谨慎将任务交给AI，因为你可能获取到的是惊喜，也可能是失望。举个例子，作为服务端同学，如果没法用语言描述前端这个输入框的视觉效果，那就没办法让AI实现前端代码

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-lP3NQu4Z6O.gif)

另外，在中文表达的时候可能存在二义性，可以中英文混合描述来表达需求。

前后端接口对齐

```
根据服务端接口/v1/api/chat 的request schema 和 response schema，调整一下前端接口
```

2.使用结构化的方式表示Prompt  

我比较喜欢使用COSTAR框架，他是2023年新加坡prompt大赛冠军总结出来的一个提示词编写框架，他将Prompt分成了Context、Objective、Style、Tone、Audience、Response这几个部分，分别表示任务的背景、agent的目标、风格、回复预期、受众以及响应格式要求。我经常会将style、tone、audience做一些修改，加入一些对agent的要求。

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-tMBQdW0ex3.jpeg)

另外，使用claude模型的时候，可以使用伪xml的结构做结构化，claude模型对于伪xml的理解更好。比如：

```
<<这是你的角色>>{your_role}<</这是你的角色>>
```

3.让AI协助将需求明确清楚，然后再做prompt engineering  

在高效写prompt，或者明确需求这块，可以借助一些AI的工具，提升写prompt的效率。比如openai的prompt工具，也可以自己写一个prompt优化的agent。Claude在写prompt template这方面的效果比较不错。

**合理划分AI任务边界**

在尝试修改生产级别的代码时，我一般会根据任务复杂度和自身能力范围合理分配 AI 的工作，按照我自己的能力范围划分为3个类别：

1\. 能力范围内的任务：实现逻辑是清晰的，实现需要花很多时间让 AI 处理逻辑清晰但实现耗时的任务，可以显著提升效率。我把这类任务称为"搬砖提效"，常见的如CRUD，稍微复杂一点的像需求文档是非常清晰的，技术设计完善，性能、稳定性等方案也已经完善，剩下就是coding实现。

2\. 略超出能力范围的任务：如果我通过调研、短期学习，就可以解决的，那我也会把这部分任务交给AI去解决。，比如我在一个项目环境里面需要调用阿里云 SDK ，他并没有提供javascript版本的签名，我需要详细文档阅读、参考python源码，改成js的版本。这种任务交给AI实现会非常方便，一方面他有能力去fetch官方的文档阅读，另外，对于一些流行的模型，比如Claude，他已经把主流的官方文档都已经训练过了，甚至不用阅读，就可以凭借内生的知识就可以帮我们补全。

3\. 远超能力范围的任务：对于自己完全不熟悉的技术领域，不建议完全依赖 AI，除非这个代码仅仅只是用于demo用途。有个翻车例子是，我对React Native了解甚少，有个非常紧急的项目，期望用Claude Code生成一个React Native项目。AI前期代码写的很快，基本上半天就有一个可以跑在手机上的demo出来了。但是到了项目后期，想要加更多效果，就显得非常困难了。代码量越来越多，冗余代码问题、设计问题都藏在底下不得而知，效率变低，成本变高。最后还是回到使用熟悉的语言。

题外话: 越发觉得全栈技能，对于现在鞭笞AI干活显得非常重要。

**小步快跑，每一步需要可验证**

不要等代码全生成了，然后一次性调试，好的代码应该像细菌🦠一样（by Karpathy），精炼，模块化，闭包( copy paste-able)。再举一个翻车例子，当时按照需求/技术文件让AI进行生成全部代码，然后调试，结果AI告诉我这不是一个react-native的项目，直接崩溃。

```
⏺ Bash(npx react-native run-ios)  ⎿  Error: error iOS project folder not found. Are you sure this is a React Native project?.
```

当时没舍得从头来过，进入无休止的鞭笞、调试、PUA，成本很高，最后不得已，还是重头开发...

```
哥，将mobile目录删除掉吧，然后初始化一个React Native工程，使用这些中间件版本，核心技术栈是... balaba... 
```

**AI生成的方案和代码必须要Review**

除非需求极其清晰，否则不要期望一次命令就能完成一个完整需求，AI认为的完成，有可能并不是实际的完成。一方面可能会因为上下文长度的原因，遗忘，或者产生幻觉。 另外一方面对于项目的了解程度的片面性，生产出来的代码质量或技术方案不够好。

因此，我对AI生产的态度其实有转变，从部分信任到不信任，类似于防御性编程，在系统代码行增加到2万行左右时，对他生产的方案或者代码，我会详细的Review，确保代码投入到生产是没有问题的。

防御性编程的好处是提高代码质量和可靠性，但也需要平衡，过度会导致效率低下。中间过程中，通常也需要多轮沟通，减少信息传递过程中存在理解差异。其次让 AI 编写单元测试 ，利用 AI 为生成的代码编写单元测试，这是一种验证代码质量的有效方法，需要注意的是，不要盲目信任单元测试，AI 也可能为了让测试通过而采取一些技巧，因此仍需人工审核测试质量。

有两个例子，一个是AI为了能通过单元测试，修改了技术方案，实际仅仅是安装包依赖问题。另外一个例子是，多轮修复bug不成功后，AI偷懒修改了测试代码，做了mock数据让单元测试通过了。

**频繁提交到git仓库**

AI 通常能给出详细的 git commit 信息，充分利用这一点。AI非常熟悉git指令，能了解代码仓库过去都修改了哪些内容。因此git history就是项目的另外一份README.md，抑或者是上下文。

另外，频繁提交有助于在问题出现时方便回滚。

**有效管理上下文**

最近 Karpathy 提出了"上下文工程"(Context Engineering)"的概念。虽然现代模型支持 128K 甚至 192K 的上下文长度，但在编码场景下，这些上下文往往仍然不足，因为模型需要阅读和理解大量code文件，一下子就把上下文塞得差不多了。

像Claude Code这类的工具，在上下文做了很多优化（后续会分享一些），但是上下文越长，AI 生成代码出现幻觉的概率就越高，后续修正过程会消耗更多资源。

因此，我会人工辅助管理上下文：

#### 1\. 提供精确信息

-   当已确定修改范围时，应提供准确的文件路径和相关细节。
    
-   先通过与 AI 逐步沟通，获取并明确关键信息，形成清晰上下文后，再让AI执行。
    

#### 2\. 信息压缩策略

手动筛选重要信息，只保留有价值的部分。举个例子，我们在让AI修复一些执行错误的时候，如果把全部Exception信息丢给AI，比如Java抛出来的Exception，会非常长。想象一下我们自己去解决问题的时候，往往也是定位几行有用信息。

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-GVfI83Spdz.jpeg)

#### 3\. 控制任务粒度

执行复杂任务需要较高的 prompt 技巧和使用经验，且难以验证细节。尝试过让AI写2个半小时的代码，一直在运行。但是对于结果，其实我们要花很多时间去做验证，review的成本会非常高。

过于复杂的任务可能超出上下文长度限制，导致 AI 遗忘早期任务内容。之前尝试让AI生成上百个单元测试，执行过程有过半没成功。尝试在依据命令里面让AI逐一修复，AI执行到最后会告知执行完成，实际只修复了几个。原因就是上下文太长了，他不记得任务列表。

#### 4\. 利用外部记忆

针对上面这种情况，我的做法是，将失败的任务手动编辑出来，并存储在一个外部文档中，然后告诉AI去逐个修复。

```
test_result.md里面记录了运行单元测试失败的case以及异常的信息，请从上往下进行修复。
```

也可以尝试使用 mem0 等 MCP 工具辅助管理上下文，我还没来得及尝试，有试过的同学可以分享一下。

#### 5\. 知识库很重要

对于已有项目，如果希望长期让AI持续进来改动，请务必先给他提供更多的信息，以及一个良好的信息获取方式。

像Claude Code，提供了 /init 指令，目的是为了让AI快速了解项目的背景、技术架构等，知识库记录了业务需求、技术规约、常见的工程流程等信息。

对于一个已经存在的工程项目，我强烈建议先让AI针对代码写说明文档(README.md)，然后再让他参与到写代码 。

Claude Code使用经验分享

在使用Claude Code之前我是Cline的用户，最近深度使用Claude Code之后，发现Claude Code在多方面表现更为出色。它对上下文的管理更智能，能够精准定位修改区域，并且在命令行工具的使用上更加直观高效。因此，在开始使用Claude Code前，了解其claude code大概原理将有助于更好地发挥其潜力。

Claude Code本质上是由一个主模型搭配15个专用工具组成的智能体系统。其工具集主要包括：  

\- 任务列表管理  

\- 文件编辑功能  

\- Bash命令执行  

\- 内容查找（Grep、Glob）  

\- Web搜索能力

官方文档\[1\]提供了简要介绍，而更深入的原理将在后续文章中详细讲解。

https://docs.anthropic.com/en/docs/build-with-claude/overview

**关于安装**

快速安装，打开终端执行下面命令即可，安装过程需要用到api key，去心流网站\[2\]申请一个即可。

```
bash -c "$(curl -fsSL https://cloud.iflow.cn/claude-code/install.sh)"
```

后续如果要更改模型，修改~/.config/claude-code-proxy/config.json，通过配置兼容function call模型的base url和api key，就可以欢乐地使用上claude code了。如果需要图像相关的，需要有多模态模型能力。

**常用启动参数(启动前）**

-   \--dangerously-skip-permissions：允许 Claude Code 无需询问权限直接执行操作
    
-   \--continue：继续上一次的工作会话
    

**常用交互指令（启动后）**

-   /memory：直接编辑记忆，也可通过 # 命令追加记忆
    
-   /mcp：查看当前 MCP 工作状态
    
-   /compact：压缩上下文（当上下文达到 95% 时会自动启动，但建议主动管理）
    
-   /clean：清除上下文
    
-   /resume：查看历史记录
    

可以安装的扩展工具：

ccusage：查看claude code的模型使用量

实时查看消耗

```
ccusage blocks --live
```

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-IPvUTTAL4X.jpeg)

掌握这些基础知识后，接下来的互动主要依靠自然语言交流。

**构建项目的rules和workflow**

通过/init指令，可以让Claude Code扫描整个工程，了解项目结构，并将结果写入CLAUDE.md文件：

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-pRsvK3ABGq.jpeg)

CLAUDE.md是Claude Code的记忆存储文件，执行任务时它会优先参考这里的内容。官方文档对此有详细介绍。我们可以通过 /memory 直接编辑这个文件，也可以用 # 命令追加内容。

我建议在CLAUDE.md中包含以下关键内容：

1\. AI必须了解的核心信息：项目背景、技术栈、架构设计等

2\. 项目编码标准、流程等指导AI正确执行任务的行为准则

对于常用框架、开发语言规范甚至是工作流，可参考GitHub上的优质资源，如awesome-cursor-rules-mdc\[3\]，描述了各种语言、各种框架沉淀的code conduct。

https://github.com/sanjeed5/awesome-cursor-rules-mdc/blob/main/rules-mdc/python.mdc

以下是一个我追加的CLAUDE.md片段示例：

CLAUDE.md片段

```
1. **workflow**：处理Excel时使用pandas进行数据分析
```

如果单个CLAUDE.md信息量过大，可以将其分层分模块存储，按模块准备不同的CLAUDE.md文件。Claude会从修改最深一级的记忆开始查找。

**上下文管理策略**

-   定期使用/compact命令：上下文容易超出限制，需要主动压缩，否则模型可能遗忘早期重要信息；
    
-   及时更新README.md和CLAUDE.md，将其作为上下文存储的补充；
    
-   任务结束后，使用/clean清除上下文，保持环境整洁；
    

考虑到AI上下文长度限制，建议尝试使用外部文件列表管理复杂任务。

**先plan再code(shift + tab)**

当项目复杂度高、代码设计量大时，采用"计划先行"模式能显著提升效率：先让AI分析修改点，制定详细计划，然后再执行具体编码工作。

比较两种方案的差异：直接生成代码模式在运行时间长、代码量大的情况下，容易导致代码难以review、方案错误难以回滚。而plan模式则允许先review方案，对齐期望，流程更加清晰。

计划先行的好处

计划先行的主要优点是允许人参与决策过程：

1\. 纠正过度保守倾向：AI有时不敢删除现有代码，倾向于通过新建而非修改来实现功能，可能导致代码冗余。人参与可以判断并纠正这种行为。

2\. 避免信息片面：AI容易基于首次找到的信息做决策，而忽视项目中的其他相关信息，或者使用已经废弃的代码。人可以提供更全面的视角。

3\. 避免不必要的AI调用：有时规划后发现修改仅涉及少量代码，由人工直接完成更为高效，避免AI进行搜索、定位、修改和总结的耗时过程。

**使用git worktree**

**多个Claude Code协同工作**

为减少等待时间和提高工作效率，可以使用git worktree同时运行多个Claude Code实例处理不同任务。git worktree是多检出的轻量替代方案，允许将同一仓库的多个分支检出到不同目录，每个worktree有独立的工作目录和文件，但共享历史和reflog。

#### 适用场景

1.多个功能特性同时迭代；

2.前后端协作：一个实例负责前端，另一个负责后端；

#### 示例

例如，一个Claude实例重构认证系统，另一个构建数据可视化组件，两个任务互不干扰，可以同时高效推进：

-   创建worktree：git worktree add -b feature-a ../project-feature-a；
    
-   在每个worktree目录中启动独立的Claude Code实例；
    
-   根据需要创建更多worktree（在新终端标签页重复 1-2 步骤，但不建议过多，以免人工切换上下文带来认知负担）；
    

重要提示：不要在同一工作目录同时启动多个Claude Code实例执行任务，这会导致文件冲突。建议限制worktree数量，避免人工切换上下文带来的认知负担。

**有效利用MCP**

Claude Code可以扩展一些工具，增加他的能力，但是不建议过多。

-   Context7 MCP\[4\]：能够从源代码直接提取最新、特定版本的文档和代码示例，并将其直接放入prompt中
    
-   Figma Dev Mode MCP\[5\]：实现交互稿像素级还原，MasterGO也有类似功能。注意点：Figma的源码文件往往很长，建议逐个模块选中，让AI实现。
    
-   Browse use MCP：配合工作流，完成前端研发后，让Claude Code查看浏览器中的实际表现
    

最后

AI Coding 工具，尤其是 Claude Code，在正确使用的情况下，可以显著提升开发效率。以上是我个人的一些经验分享。

除此之外，Claude Code其实能做更多的事情。在原理简单介绍可以看出，Claude Code是一个非常通用的Agent，通过自然语言描述工作流程，接入MCP，是可以让Claude Code做很多事情。

**下面是我的一些探索**

#### 写HTML研究报告\[6\]

```
计划8月15到8月24或25去西欧旅游，杭州出发亲子游，共9天。
```

结果html\[6\]

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-KQbyArKvya.jpeg)

#### 

**做PPT**

```
你是一个PPT编写专家，你会根据用户的需求做一个漂亮美观的PPT
```

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-wdCwKtgEsJ.jpeg)

**处理Excel，进行数据分析，最后导出HTML\[7\]**

#### 我今年考了674分，想在山东上大学，物理这门课考的比较好，喜欢金融/计算机相关的专业，请帮我分析一下应该怎么填报高考志愿. 结果帮我输出成html

结果html\[7\]

![](ReadItLater%20Inbox/assets/如何用AI%20Coding和Claude%20Code提升开发效率？看我的全流程复盘-dPoga9rJhG.jpeg)

参考链接：

\[1\]https://docs.anthropic.com/en/docs/build-with-claude/overview

\[2\]https://iflow.cn/#setting

\[3\]https://github.com/sanjeed5/awesome-cursor-rules-mdc/blob/main/rules-mdc/python.mdc

\[4\]https://github.com/upstash/context7

\[5\]https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server

\[6\]https://cloud.iflow.cn/sites/chuyou/index.html

\[7\]https://cloud.iflow.cn/sites/gaokao/index.html

**自建数据库迁移到云数据库**

本方案介绍如何将网站的自建数据库迁移至云数据库 RDS，解决您随着业务增长可能会面临的数据库运维难题。数据库采用高可用架构，支持跨可用区容灾，给业务带来数据安全、可用性、性能和成本方面收益。

点击阅读原文查看详情。