import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from '../src/components/Menu'

export const component = () => (
  <Menu defaultIndex="0" onSelect={action('onSelect')}>
    <Menu.Item>cool link</Menu.Item>
    <Menu.Item disabled>disabled</Menu.Item>
    <Menu.Item>cool link 2</Menu.Item>
  </Menu>
)

storiesOf('Menu Component', module).add('Menu', component)
