import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Icon, { IconProps } from '../src/components/Icon'
import { centerWrapper } from './decorators'

export default {
  title: 'TestBay/Icon',
  component: Icon,
  decorators: [centerWrapper],
  argTypes: {
    theme: { control: { type: 'inline-radio' } },
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


const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Primary = Template.bind({})
Primary.args = {
  icon: 'search',
  title: 'title-search',
}

export const Secondary = Template.bind({})
Secondary.args = {
  icon: 'search',
  title: 'title-search',
  theme: 'secondary',
}
