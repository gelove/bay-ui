export const decorators = []

export const parameters = {
  // controls: { expanded: true }, // 显示文档
  actions: { argTypesRegex: '^on[A-Z].*' }, // 监听以 on 开头的事件
  // backgrounds: { // 背景色
  //   values: [
  //     { name: 'global-red', value: 'red' },
  //     { name: 'global-green', value: 'green' },
  //   ],
  // },
  options: {
    storySort: {
      method: 'alphabetical',
      // locales: 'en-US',
      // order: ['Docs', 'TestBay'],
    }, // 排序
  },
}
