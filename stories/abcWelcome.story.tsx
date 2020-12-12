import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 bay-ui 组件库</h1>
        <h3>安装组件库</h3>
        <code>npm install bay-ui --save</code>
      </>
    )
  },
  { info: { disable: true } }
)
