import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ClaudeCode 培训',
  description: 'ClaudeCode 完整培训文档 - 从入门到精通',
  base: '/claudecode-docs/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '培训大纲', link: '/outline' },
      { text: 'GitHub', link: 'https://github.com/yourusername/claudecode-docs' }
    ],

    sidebar: [
      {
        text: '快速入门',
        items: [
          { text: '第一章：ClaudeCode快速入门', link: '/chapter-1' }
        ]
      },
      {
        text: '核心功能',
        items: [
          { text: '第二章：ClaudeCode核心功能', link: '/chapter-2' }
        ]
      },
      {
        text: '最佳实践',
        items: [
          { text: '第三章：针对不同角色的最佳实践', link: '/chapter-3' }
        ]
      },
      {
        text: '实用技巧',
        items: [
          { text: '第四章：实用技巧与工作流', link: '/chapter-4' }
        ]
      },
      {
        text: '实操演示',
        items: [
          { text: '第五章：实操演示', link: '/chapter-5' }
        ]
      },
      {
        text: '总结',
        items: [
          { text: '第六章：Q&A与总结', link: '/chapter-6' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/claudecode-docs' }
    ],

    search: {
      provider: 'local'
    }
  }
})
