// import React from 'react'
// import '../src/styles/index.scss'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// library.add(fas)

// const wrapperStyle: React.CSSProperties = {
//   padding: '20px 40px',
// }
// const storyWrapper = (stroyFn: any) => (
//   <div style={wrapperStyle}>
//     <h3>组件演示</h3>
//     {stroyFn()}
//   </div>
// )
// addDecorator(storyWrapper)
// addParameters({ info: { inline: true, header: false } })

module.exports = {
  stories: ['../stories/**/*.story.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
}
