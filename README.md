## bay-ui component library

```bash
[![Build Status](https://travis-ci.com/allen/bay-ui.svg?token=acmscsqinbuynolkvpiyt&branch=master)](https://travis-ci.com/allen/bay-ui)
```

bay-ui 使用 React Hooks 和 Typescript
[bay-ui.alin.app](https://bay-ui.alin.app)

### 安装组件库

```bash
npm install bay-ui --save
or
yarn add bay-ui
```

### 使用

```bash
// 加载样式
import 'bay-ui/dist/index.css'
// 引入组件
import { Button } from 'bay-ui'
```

### 亮点

- 🔥 Typescript with React Hooks
- ⛑️ 使用 react-testing-library 完成单元测试
- 📚 使用 storybook 生成文档页面
- 📦 使用第三方库扩展 icon 和动画
- 🌹 使用 Sass 组织 CSS
- 🎉 npm publish, husky 提交发布前验证, travis CI/CD 集成, 发布文档站点

### 一些本地开发命令

```bash
//启动本地环境
yarn stroybook

//跑单元测试
yarn test

//build可发布静态文件
yarn build

//发布到 npm
npm publish
```
