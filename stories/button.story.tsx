import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from '../src/components/Button'
import { centerWrapper } from './decorators'

export default {
  title: 'TestBay/Button',
  component: Button,
  decorators: [centerWrapper],
  argTypes: {
    label: { control: 'text' },
    size: { control: { type: 'inline-radio' } },
    btnType: { control: { type: 'inline-radio' } },
    // btnType: { control: { type: 'select' } },
    // size: { table: { disable: true } }, // 禁止显示 size
    // btnType: { control: { disable: true } }, // 禁止控制 btnType
    backgroundColor: { control: 'color' }, // 可控制色板
    onClick: { action: 'onClick', control: { disable: true } }, // 事件
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'story-red', value: 'pink' },
        { name: 'story-green', value: 'olive' },
      ],
    },
  },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  label: 'Primary',
}
Primary.parameters = {
  backgrounds: {
    values: [
      { name: 'story-red', value: 'DarkRed' },
      { name: 'story-green', value: 'DarkGreen' },
    ],
  },
}

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  label: 'Large',
}

export const Anchor = Template.bind({})
Anchor.args = {
  btnType: 'link',
  href: 'https://baidu.com',
  children: 'Anchor',
}

export const CustomControls = Template.bind({})
CustomControls.args = { children: <span>CustomControls</span> }
CustomControls.argTypes = {
  size: { table: { disable: true } }, // 禁止显示 size
  btnType: { control: { disable: true } }, // 禁止控制 btnType
}
