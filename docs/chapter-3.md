# 第三章：针对不同角色的最佳实践（详细版）

---

## 3.1 程序员最佳实践

### 3.1.1 代码开发与重构

#### 技巧1：使用Plan模式进行架构设计

**为什么重要？**

直接让Claude写代码，往往会跳过设计步骤，导致：
- 架构不清晰
- 缺少边缘情况处理
- 代码风格不一致

**正确做法：**

```bash
# 1. 进入Plan模式
Shift+Tab × 2

# 2. 描述需求
请帮我实现用户认证功能，包括：
1. 用户注册
2. 用户登录
3. JWT token验证
4. 密码加密存储

# 3. Claude会生成详细计划
# 4. 仔细审查计划，提出修改意见
# 5. 确认后才开始执行
```

**Plan模式输出示例：**

```markdown
# Plan: 用户认证功能实现

## 需求分析
实现用户认证功能，包括注册、登录、JWT验证、密码加密

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
2. 创建用户服务扩展

### 阶段3：路由层
1. 创建认证路由 (routes/auth.routes.ts)

### 阶段4：中间件
1. 创建认证中间件 (middleware/auth.middleware.ts)

### 阶段5：测试
1. 单元测试
2. 集成测试

## 文件变更清单
- 新增：services/auth.service.ts
- 新增：routes/auth.routes.ts
- 新增：middleware/auth.middleware.ts
- 修改：models/User.ts
- 新增：tests/auth.test.ts

---

确认后开始执行? (yes/no/modify)
```

#### 技巧2：任务拆解与增量式开发

**为什么要拆解任务？**

```
大任务不拆解的问题：
├── Token消耗多，可能超过上下文窗口
├── 对话轮数多，Claude容易"遗忘"要求
└── 一次改动太多，出问题难以定位

拆解任务的好处：
├── 每个任务小而专注
├── 完成后立即清理上下文
└── 出问题容易回滚和修复
```

**实战案例：重构通用组件**

```bash
# ❌ 错误做法：一次性重构所有地方
请把项目中所有类似表格的地方都用新组件重构

# ✅ 正确做法：逐步重构
# 第一步：开发通用组件
请帮我开发一个通用的DataTable组件，要求：
1. 支持列配置
2. 支持排序
3. 支持分页
4. 支持选择行

# 等组件开发完成，Demo验证通过后

# 第二步：重构第一个页面
现在用这个DataTable组件重构 UserList 页面

# 重构完成后，清理上下文
/clear

# 第三步：重构第二个页面
现在用这个DataTable组件重构 OrderList 页面

# 继续逐个重构...
```

#### 技巧3：通过Hooks自动格式化代码

**问题：** Claude写的代码格式可能不一致

**解决方案：** 配置自动格式化Hook

```json
// .claude/settings.json
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

**价值：** 彻底消灭CI里的格式报错

### 3.1.2 代码审查与团队协作

#### 技巧1：使用CLAUDE.md建立团队代码规范

**标准CLAUDE.md模板：**

```markdown
# 项目名称：E-Commerce Platform

## 代码规范更新记录

### 2024-01-27: Enum vs String Union
- ❌ 不要使用enum
- ✅ 改用string union
- 理由：更好的类型推断和Tree-shaking

**错误示例：**
\`\`\`typescript
// ❌ 错误
enum Status {
  Active = 'active',
  Inactive = 'inactive'
}
\`\`\`

**正确示例：**
\`\`\`typescript
// ✅ 正确
type Status = 'active' | 'inactive';
\`\`\`

### 2024-01-25: 包管理器选择
- 永远使用bun而不是npm
- 理由：启动速度快10倍

### 2024-01-20: 错误处理规范
- 所有API调用必须包含错误处理
- 使用try-catch包裹异步操作
- 错误信息要包含足够的上下文

**错误示例：**
\`\`\`typescript
// ❌ 错误
const user = await getUser(id);
\`\`\`

**正确示例：**
\`\`\`typescript
// ✅ 正确
try {
  const user = await getUser(id);
  return user;
} catch (error) {
  logger.error(`Failed to get user ${id}:`, error);
  throw new Error(`User not found: ${id}`);
}
\`\`\`

### 2024-01-15: 命名规范
- 文件名：kebab-case (user-profile.ts)
- 组件名：PascalCase (UserProfile)
- 函数/变量：camelCase (getUserProfile)
- 常量：UPPER_SNAKE_CASE (API_BASE_URL)
- 类型/接口：PascalCase (UserProfile)

### Git提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建/工具相关

示例：`feat: 添加用户登录功能`
```

#### 技巧2：在PR中使用Claude进行代码审查

**方法1：使用GitHub MCP**

```bash
# 安装GitHub MCP
claude mcp add github npx -y @modelcontextprotocol/server-github

# 在Claude Code中
请使用github MCP查看最近的PR，并审查代码变更

# Claude会：
# 1. 获取PR列表
# 2. 读取代码变更
# 3. 进行代码审查
# 4. 提出改进建议
```

**方法2：手动审查PR**

```bash
# 复制PR的diff
# 在Claude Code中
请审查以下代码变更，检查：
1. 代码风格是否符合CLAUDE.md中的规范
2. 是否有潜在的bug
3. 是否有安全问题
4. 性能是否有优化空间

[粘贴PR diff]
```

#### 技巧3：通过CLAUDE.md的AI进化机制避免重复犯错

**实战案例：**

```
场景：在PR中发现代码使用了enum，但规范要求使用string union

步骤1：在PR中指出问题
@claude 这里的代码使用了enum，
但我们项目规范要求使用string union

步骤2：让Claude记住教训
@claude 请把这次的教训写入CLAUDE.md：
不要使用enum，改用string union，
因为这样有更好的类型推断和Tree-shaking支持

步骤3：Claude自动更新
Claude会在CLAUDE.md中添加：
## 代码规范更新 (2024-01-27)

### Enum vs String Union
- ❌ 不要使用enum
- ✅ 改用string union
- 理由：更好的类型推断和Tree-shaking

步骤4：团队共同维护
# 将CLAUDE.md签入Git
git add CLAUDE.md
git commit -m "docs: 更新代码规范，禁止使用enum"
git push

步骤5：持续进化
# Claude不会再重复犯同样的错误
# 整个团队都受益
```

### 3.1.3 项目管理与部署

#### 技巧1：使用Slash Commands自动化部署

**创建部署命令：**

```bash
# 1. 创建命令目录
mkdir -p .claude/commands

# 2. 创建部署命令文件
cat > .claude/commands/deploy-production.md << 'EOF'
# 生产环境部署

你是一个部署专家。请按以下步骤执行生产环境部署：

## 前置检查
1. 确认当前分支：!git branch --show-current
2. 检查是否有未提交的更改：!git status
3. 运行测试：!npm run test:all
4. 运行代码检查：!npm run lint

## 构建阶段
5. 构建生产版本：!npm run build
6. 检查构建产物是否生成

## 部署阶段
7. 部署到生产环境：!npm run deploy:production
8. 验证部署：!curl https://api.example.com/health

## 回滚准备
如果部署失败，立即执行：
!git revert HEAD
!git push origin main

部署完成后，生成部署报告。
EOF

# 3. 使用命令
/deploy-production
```

#### 技巧2：利用MCP服务器连接外部服务

**常用场景：**

```bash
# 场景1：创建PR
请使用github MCP创建PR，标题为"feat: 添加用户认证功能"

# 场景2：查询数据
请查询数据库中的用户表，统计活跃用户数

# 场景3：部署验证
用Chrome DevTools MCP打开 https://example.com，
验证新功能是否正常工作
```

#### 技巧3：通过子代理并行处理任务

**场景：需要同时进行代码审查、测试编写、文档生成**

```bash
请帮我并行执行以下任务：
1. 使用code-reviewer agent审查当前分支的代码变更
2. 使用test-writer agent为新增功能编写测试用例
3. 使用doc-generator agent更新API文档

# Claude会创建3个子代理，每个有独立上下文，并行执行
```

---

## 3.2 UI设计师最佳实践

### 3.2.1 设计系统与规范

#### 技巧1：使用brand-guidelines skill维护设计一致性

**安装brand-guidelines skill：**

```bash
# 1. 下载官方brand-guidelines skill
# 从 https://github.com/anthropics/skills/tree/main/skills/brand-guidelines

# 2. 放入项目skills目录
cp -r brand-guidelines .claude/skills/

# 3. 修改skill.md，添加你的品牌规范
```

**自定义品牌规范示例：**

```markdown
---
name: company-brand-guidelines
description: 公司品牌设计规范，包括颜色、字体、组件规范
---

# 公司品牌设计规范

## 品牌色彩

### 主色调
- 主色：#2563EB（蓝色）
- 辅助色：#10B981（绿色）
- 警告色：#F59E0B（橙色）
- 错误色：#EF4444（红色）

### 中性色
- 黑色：#000000
- 深灰：#1F2937
- 中灰：#6B7280
- 浅灰：#E5E7EB
- 白色：#FFFFFF

### 字体
- 中文字体：PingFang SC
- 英文字体：Inter
- 代码字体：JetBrains Mono

### 字号规范
- 标题1：32px / 48px行高
- 标题2：24px / 36px行高
- 标题3：18px / 28px行高
- 正文：14px / 22px行高
- 辅助文字：12px / 18px行高

### 间距规范
- 使用8px的倍数：8px, 16px, 24px, 32px, 48px
- 组件内边距默认16px
- 组件之间间距默认24px

### 圆角规范
- 小圆角：4px（按钮、输入框）
- 中圆角：8px（卡片）
- 大圆角：16px（对话框）

### 阴影规范
- 轻微阴影：box-shadow: 0 1px 2px rgba(0,0,0,0.05)
- 常规阴影：box-shadow: 0 2px 4px rgba(0,0,0,0.1)
- 深度阴影：box-shadow: 0 4px 12px rgba(0,0,0,0.15)

## 组件规范

### 按钮
- 高度：40px
- 内边距：12px 24px
- 圆角：4px
- 字号：14px

### 输入框
- 高度：40px
- 内边距：10px 14px
- 边框：1px solid #D1D5DB
- 圆角：4px
- 字号：14px

### 卡片
- 内边距：24px
- 圆角：8px
- 背景：#FFFFFF
- 阴影：常规阴影

## 交互规范

### Hover状态
- 透明度变为0.8
- 添加轻微阴影

### 点击反馈
- 缩放0.95
- 持续时间100ms

### 加载状态
- 显示loading图标
- 禁用交互
- 半透明遮罩
```

**使用brand-guidelines skill：**

```bash
# Claude会自动应用品牌规范
使用brand-guidelines skill为我们的SaaS产品设计官网首页

# 输出的设计会自动遵循：
# - 品牌色彩
# - 字体规范
# - 间距规范
# - 组件规范
```

#### 技巧2：创建设计相关Skills

**创建design-system skill：**

```bash
# 使用skill-creator创建
创建skill，能按照公司设计规范创建React组件

# Claude会自动创建skill，包含：
# - 组件模板
# - 样式规范
# - 使用示例
```

**手动创建design-system skill：**

```markdown
---
name: company-design-system
description: 按照公司设计规范创建前端组件
---

# 公司设计系统助手

这个Skill帮助设计师和开发者按照公司设计规范创建前端组件。

## 组件创建流程

### 1. 理解需求
- 明确组件的功能
- 确定组件的变体
- 列出组件的props

### 2. 应用设计规范
- 使用品牌色彩
- 遵循间距规范
- 应用圆角和阴影

### 3. 生成代码
- 使用TypeScript
- 使用Tailwind CSS
- 包含 PropTypes
- 包含使用示例

## 组件模板

### 按钮组件模板
\`\`\`tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded font-medium transition-all';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

## 使用示例

创建一个主按钮：
\`\`\`tsx
<Button variant="primary" size="md">
  点击我
</Button>
\`\`\`
```

### 3.2.2 原型与界面开发

#### 技巧1：使用Claude Code快速生成HTML/CSS原型

**实战案例：响应式导航栏**

```bash
请创建一个响应式导航栏，包含：
1. Logo在左侧
2. 导航链接在中间（首页、产品、关于、联系）
3. 用户头像在右侧
4. 移动端使用汉堡菜单
5. 使用Tailwind CSS
6. 遵循我们的设计规范（颜色、间距）

# Claude会生成：
# - 完整的HTML结构
# - Tailwind CSS样式
# - 响应式设计
# - 移动端菜单交互
```

**输出示例：**

```tsx
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600">
              首页
            </a>
            <a href="/products" className="text-gray-700 hover:text-blue-600">
              产品
            </a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">
              关于
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">
              联系
            </a>
          </div>

          {/* User Avatar */}
          <div className="hidden md:flex items-center">
            <button className="flex items-center space-x-2">
              <User className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 text-gray-700">
              首页
            </a>
            <a href="/products" className="block px-3 py-2 text-gray-700">
              产品
            </a>
            <a href="/about" className="block px-3 py-2 text-gray-700">
              关于
            </a>
            <a href="/contact" className="block px-3 py-2 text-gray-700">
              联系
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
```

#### 技巧2：利用Chrome DevTools MCP进行网页测试与优化

**安装Chrome DevTools MCP：**

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
```

**测试网页在不同设备上的表现：**

```bash
用Chrome DevTools MCP打开 http://localhost:3000，然后：
1. 在iPhone 14 Pro尺寸下截图
2. 在iPad Pro尺寸下截图
3. 在桌面1920x1080尺寸下截图
4. 检查所有链接是否可点击
5. 获取页面性能数据
6. 检查是否有可访问性问题
```

**验证设计实现：**

```bash
请使用Chrome DevTools MCP验证以下设计要求：
1. 按钮高度是否为40px
2. 输入框边框是否为1px solid #D1D5DB
3. 卡片圆角是否为8px
4. 主色调是否为#2563EB
5. 间距是否使用8px的倍数
```

#### 技巧3：使用Canvas Design Skill创建视觉素材

**安装canvas-design skill：**

```bash
# 从官方仓库下载
# https://github.com/anthropics/skills/tree/main/skills/canvas-design

# 放入skills目录
cp -r canvas-design .claude/skills/
```

**创建设计素材：**

```bash
使用canvas-design skill创建一个产品功能介绍图，要求：
1. 风格简约现代
2. 使用我们的品牌色（#2563EB）
3. 展示3个核心功能
4. 每个功能包含图标、标题、描述
5. 输出为PNG格式
```

### 3.2.3 设计交付与协作

#### 技巧1：使用CLAUDE.md记录设计规范与交付标准

**设计师的CLAUDE.md模板：**

```markdown
# 设计规范与交付标准

## 设计交付标准

### 交付格式
- UI设计稿：Figma链接
- 图标资源：SVG格式，72x72px
- 图片资源：PNG格式，2x和3x倍图
- 原型图：可交互的Figma原型

### 设计规范
- 字体：PingFang SC，常规400，中等500
- 行高：1.5倍字号
- 间距：使用8px的倍数（8px, 16px, 24px, 32px）
- 颜色：使用品牌色板

### 命名规范
- 图标文件：icon-{名称}.svg
- 图片文件：img-{用途}-{尺寸}.png
- 组件文件：{组件名}.component.tsx

### 代码交付要求
- 使用TypeScript
- 使用Tailwind CSS
- 组件要有PropTypes
- 包含使用示例

## 开发协作规范

### 设计到开发的流程
1. 设计师在Figma完成设计
2. 使用Claude Code生成React代码
3. 开发者review代码
4. 部署到测试环境
5. 使用Chrome DevTools MCP验证
6. 设计师验收
7. 交付生产

### 验收标准
- 像素级还原设计稿
- 响应式适配正常
- 交互效果符合预期
- 性能指标达标
- 可访问性符合标准
```

#### 技巧2：通过Skills将设计转换为前端代码

**创建design-to-code skill：**

```bash
创建skill，能将Figma设计稿转换为React + Tailwind CSS代码

# Claude会创建skill，包含：
# - Figma API调用方法
# - 组件结构识别
# - 样式转换规则
# - 代码生成模板
```

**使用design-to-code skill：**

```bash
使用design-to-code skill转换这个Figma设计稿：
[Figma链接]

要求：
1. 识别所有组件
2. 生成React组件代码
3. 使用Tailwind CSS
4. 包含PropTypes
5. 遵循我们的命名规范
```

#### 技巧3：利用子代理并行处理多个设计任务

```bash
请帮我并行完成以下设计任务：
1. 首页UI设计
2. 产品页UI设计
3. 关于我们页UI设计
4. 联系我们页UI设计

每个页面要：
- 遵循品牌设计规范
- 响应式设计
- 包含所有交互状态
- 输出为Figma设计稿

# Claude会创建4个子代理并行执行
```

---

## 3.3 测试人员最佳实践

### 3.3.1 测试用例生成

#### 技巧1：使用Claude Code生成测试用例

**生成单元测试：**

```bash
请为src/auth/userAuth.ts生成单元测试，覆盖以下场景：
1. 成功登录
2. 密码错误
3. 用户不存在
4. Token过期
5. 网络错误

使用Jest框架
确保代码严格遵守我在CLAUDE.md中的原则
```

**输出示例：**

```typescript
import { authenticateUser } from '@/auth/userAuth';
import { getUserByEmail } from '@/models/user';
import { verifyPassword } from '@/utils/crypto';

jest.mock('@/models/user');
jest.mock('@/utils/crypto');

describe('authenticateUser', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'hashed_password'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('成功登录', () => {
    it('当凭证有效时返回用户信息', async () => {
      (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (verifyPassword as jest.Mock).mockReturnValue(true);

      const result = await authenticateUser('test@example.com', 'password');

      expect(result).toEqual(mockUser);
      expect(getUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(verifyPassword).toHaveBeenCalledWith('password', 'hashed_password');
    });
  });

  describe('密码错误', () => {
    it('当密码错误时抛出异常', async () => {
      (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (verifyPassword as jest.Mock).mockReturnValue(false);

      await expect(
        authenticateUser('test@example.com', 'wrong_password')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('用户不存在', () => {
    it('当用户不存在时抛出异常', async () => {
      (getUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        authenticateUser('nonexistent@example.com', 'password')
      ).rejects.toThrow('User not found');
    });
  });

  describe('Token过期', () => {
    it('当Token过期时抛出异常', async () => {
      // Token过期测试逻辑
    });
  });

  describe('网络错误', () => {
    it('当数据库连接失败时抛出异常', async () => {
      (getUserByEmail as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(
        authenticateUser('test@example.com', 'password')
      ).rejects.toThrow('Database error');
    });
  });
});
```

#### 技巧2：通过子代理并行生成不同类型的测试用例

```bash
请帮我并行生成以下测试：
1. 单元测试：测试所有工具函数
2. 集成测试：测试API端点
3. E2E测试：测试核心业务流程
4. 性能测试：测试API响应时间

确保代码严格遵守我在CLAUDE.md中的原则

# Claude会创建4个子代理并行执行
```

#### 技巧3：利用CLAUDE.md记录测试规范和模板

**测试人员的CLAUDE.md模板：**

```markdown
# 测试规范

## 测试命名规范
- 使用`should_`描述期望行为
- 示例：`should_return_200_when_valid_credentials`

## 测试覆盖率要求
- 单元测试覆盖率：≥80%
- 集成测试覆盖率：≥60%
- E2E测试覆盖核心流程

## 测试模板

### 单元测试模板
\`\`\`typescript
describe('功能名称', () => {
  beforeEach(() => {
    // 每个测试前的准备工作
  });

  describe('场景描述', () => {
    it('should_期望行为', async () => {
      // Arrange（准备）
      const input = '测试数据';

      // Act（执行）
      const result = await function(input);

      // Assert（断言）
      expect(result).toBe('期望结果');
    });
  });
});
\`\`\`

### 集成测试模板
\`\`\`typescript
describe('API端点测试', () => {
  beforeAll(async () => {
    // 启动测试服务器
    await setupTestServer();
  });

  afterAll(async () => {
    // 关闭测试服务器
    await teardownTestServer();
  });

  it('should_期望行为', async () => {
    const response = await request(app)
      .post('/api/endpoint')
      .send({ data: 'test' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });
});
\`\`\`

### E2E测试模板
\`\`\`typescript
describe('业务流程测试', () => {
  it('should_完成整个流程', async () => {
    // 1. 打开页面
    await page.goto('https://example.com');

    // 2. 执行操作
    await page.click('#button');
    await page.fill('#input', 'test');

    // 3. 验证结果
    await expect(page).toHaveURL('https://example.com/success');
  });
});
\`\`\`

## 测试数据管理

### Fixture目录结构
```
tests/
├── fixtures/
│   ├── users.json
│   ├── products.json
│   └── orders.json
└── __mocks__/
    └── database.ts
```

### Mock数据规范
- 使用真实数据格式
- 覆盖边缘情况
- 数据独立，不相互依赖
```

### 3.3.2 自动化测试

#### 技巧1：使用Chrome DevTools MCP进行端到端测试

**安装Chrome DevTools MCP：**

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
```

**编写E2E测试脚本：**

```bash
用Chrome DevTools MCP完成以下E2E测试流程：

场景：用户登录流程
1. 打开 http://localhost:3000/login
2. 截取初始页面（保存为 login-initial.png）
3. 填写用户名：testuser@example.com
4. 填写密码：Test1234!
5. 点击"登录"按钮
6. 等待页面跳转（最多5秒）
7. 验证当前URL是否为 http://localhost:3000/dashboard
8. 验证页面是否显示用户名
9. 截取最终页面（保存为 login-success.png）
10. 生成测试报告

如果任何步骤失败，记录错误信息并截图
```

#### 技巧2：利用Scripts编写可重用的测试脚本

**创建测试脚本：**

```bash
# 创建测试脚本目录
mkdir -p .claude/skills/e2e-testing/scripts

# 创建登录测试脚本
cat > .claude/skills/e2e-testing/scripts/login-test.js << 'EOF'
const puppeteer = require('puppeteer');

async function loginTest(baseUrl, username, password) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 1. 打开登录页面
    await page.goto(`${baseUrl}/login`);
    console.log('✓ 打开登录页面');

    // 2. 填写表单
    await page.fill('#username', username);
    await page.fill('#password', password);
    console.log('✓ 填写表单');

    // 3. 点击登录按钮
    await page.click('#login-button');
    console.log('✓ 点击登录按钮');

    // 4. 等待跳转
    await page.waitForNavigation({ timeout: 5000 });
    console.log('✓ 页面跳转');

    // 5. 验证URL
    const url = page.url();
    if (!url.includes('/dashboard')) {
      throw new Error(`登录失败，当前URL: ${url}`);
    }
    console.log('✓ 登录成功');

    // 6. 截图
    await page.screenshot({ path: 'login-success.png' });
    console.log('✓ 截图已保存');

    return { success: true, url };
  } catch (error) {
    console.error('✗ 测试失败:', error.message);
    await page.screenshot({ path: 'login-error.png' });
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  loginTest('http://localhost:3000', 'testuser@example.com', 'Test1234!')
    .then(result => console.log('测试结果:', result))
    .catch(error => console.error('执行失败:', error));
}

module.exports = { loginTest };
EOF
```

**使用测试脚本：**

```bash
# 在Claude Code中
运行登录测试脚本，测试环境为 http://localhost:3000
用户名：testuser@example.com
密码：Test1234!

# Claude会调用脚本并返回结果
```

#### 技巧3：通过Hooks在代码变更后自动运行测试

**配置自动测试Hook：**

```json
// .claude/settings.json
{
  "hooks": {
    "after-write-hook": {
      "command": "npm test -- --watchAll=false || true",
      "enabled": true,
      "blocking": false
    }
  }
}
```

**价值：** 每次代码变更后自动运行测试，及早发现问题

### 3.3.3 缺陷分析与报告

#### 技巧1：使用Claude Code分析日志和错误信息

```bash
# 分析错误日志
请分析error.log中的错误信息，找出：
1. 最常见的错误类型
2. 错误发生的时间分布
3. 可能的根因
4. 修复建议

请生成详细的分析报告
```

#### 技巧2：自动生成缺陷报告和修复建议

```bash
# 根据测试结果生成报告
根据test-results.xml生成缺陷报告，包括：
1. 失败的测试用例清单
2. 每个失败的错误信息
3. 可能的原因分析
4. 修复建议（按优先级排序）
5. 回归测试计划

输出格式：Markdown
```

**输出示例：**

```markdown
# 缺陷报告

生成时间：2024-01-27 10:30:00
测试版本：v1.2.3

## 概览
- 总测试用例：150
- 通过：142
- 失败：8
- 跳过：0
- 通过率：94.67%

## 失败用例详情

### 🔴 高优先级（3个）

#### 1. 用户登录失败
**测试用例：** `should_login_with_valid_credentials`
**错误信息：**
\`\`\`
Error: Expected status 200, got 500
  at tests/auth/login.test.ts:45:20
\`\`\`
**可能原因：**
- 数据库连接失败
- Token生成服务异常
**修复建议：**
1. 检查数据库连接配置
2. 验证JWT secret是否正确
3. 添加更详细的错误日志
**负责模块：** 认证服务
**预计修复时间：** 2小时

#### 2. 支付超时
**测试用例：** `should_process_payment_successfully`
**错误信息：**
\`\`\`
TimeoutError: Payment processing exceeded 30s timeout
\`\`\`
**可能原因：**
- 第三方支付API响应慢
- 网络问题
**修复建议：**
1. 增加超时时间到60s
2. 添加重试机制
3. 考虑使用异步处理
**负责模块：** 支付服务
**预计修复时间：** 4小时

#### 3. 数据库连接池耗尽
**测试用例：** `should_handle_concurrent_requests`
**错误信息：**
\`\`\`
Error: Connection pool exhausted
\`\`\`
**可能原因：**
- 连接未正确释放
- 并发量超过配置
**修复建议：**
1. 检查连接池配置
2. 确保所有连接都正确释放
3. 增加连接池大小
**负责模块：** 数据库层
**预计修复时间：** 3小时

### 🟡 中优先级（3个）
[...中优先级缺陷...]

### 🟢 低优先级（2个）
[...低优先级缺陷...]

## 修复计划

### 第一阶段（今天）
1. 修复用户登录失败（高优先级）
2. 修复数据库连接池问题（高优先级）

### 第二阶段（明天）
1. 修复支付超时问题（高优先级）
2. 修复中优先级问题

### 第三阶段（本周）
1. 修复低优先级问题
2. 完善回归测试

## 回归测试计划

### 核心回归测试
1. 用户登录流程
2. 支付流程
3. 并发请求处理

### 全面回归测试
- 所有150个测试用例
- 性能测试
- 压力测试
```

#### 技巧3：利用MCP服务器连接测试管理工具

```bash
# 使用Jira MCP创建缺陷报告（假设有Jira MCP）
请使用jira MCP创建缺陷报告：
- 标题：用户无法登录
- 优先级：High
- 描述：详见附件test.log
- 附件：error.log

# 或者使用GitHub MCP创建Issue
请使用github MCP创建Issue：
- 标题：修复用户登录失败问题
- 标签：bug, high-priority
- 描述：[粘贴详细错误信息]
```

---

## 本章重点回顾

### 程序员核心技巧

| 技巧 | 价值 |
|------|------|
| Plan模式 | 先规划后执行，减少返工 |
| 任务拆解 | 每个任务小而专注，出问题容易定位 |
| CLAUDE.md AI进化 | 集体智慧，持续进化 |
| Hooks自动格式化 | 彻底消灭CI里的格式报错 |

### UI设计师核心技巧

| 技巧 | 价值 |
|------|------|
| brand-guidelines skill | 设计一致性 |
| Chrome DevTools MCP | 网页测试与验证 |
| design-to-code skill | 快速将设计转换为代码 |
| 子代理并行处理 | 同时完成多个设计任务 |

### 测试人员核心技巧

| 技巧 | 价值 |
|------|------|
| 自动生成测试用例 | 覆盖全面场景 |
| Chrome DevTools MCP E2E测试 | 端到端自动化测试 |
| 自动生成缺陷报告 | 结构化问题分析 |
| Hooks自动测试 | 代码变更后自动测试 |

### 不同角色的共同原则

1. **充分利用CLAUDE.md**
   - 记录规范
   - AI进化机制
   - 团队共享

2. **善用Plan模式**
   - 复杂任务先规划
   - 确认后再执行
   - 减少返工

3. **利用子代理并行处理**
   - 提高效率
   - 独立上下文
   - 互不干扰

4. **创建自定义Skills**
   - 封装专业知识
   - 提高复用性
   - 团队共享

---

## 实践练习（可选）

### 程序员练习

**练习1：使用Plan模式实现一个功能（15分钟）**

```bash
# 1. 进入Plan模式
# 2. 描述一个你想要的功能
# 3. 查看Claude生成的计划
# 4. 修改并完善计划
# 5. 确认后执行
```

**练习2：创建团队CLAUDE.md（15分钟）**

```bash
# 1. 创建CLAUDE.md文件
# 2. 添加你团队的代码规范
# 3. 测试Claude是否遵守规范
# 4. 通过PR验证AI进化机制
```

### UI设计师练习

**练习1：创建brand-guidelines skill（20分钟）**

```bash
# 1. 下载官方brand-guidelines skill
# 2. 修改为你的品牌规范
# 3. 测试是否能正确应用规范
```

**练习2：使用Chrome DevTools MCP测试网页（15分钟）**

```bash
# 1. 启动你的项目
# 2. 使用Chrome DevTools MCP进行测试
# 3. 生成测试报告
```

### 测试人员练习

**练习1：生成单元测试（15分钟）**

```bash
# 1. 选择一个需要测试的模块
# 2. 使用Claude Code生成测试用例
# 3. 运行测试并检查覆盖率
```

**练习2：使用Chrome DevTools MCP进行E2E测试（20分钟）**

```bash
# 1. 编写E2E测试流程
# 2. 使用Chrome DevTools MCP执行
# 3. 生成测试报告
```
