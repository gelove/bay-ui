import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Choice, { IChoiceProps } from '../src/components/Choice'
import { centerWrapper } from './decorators'

export default {
  title: 'TestBay/Choice',
  component: Choice,
  decorators: [centerWrapper],
  argTypes: {
    onSelect: { action: 'onSelect', control: { disable: true } },
    answerCount: { control: { type: 'number', min: 1, max: 4 } },
  },
} as Meta

const data = ['far away', 'hidden', 'partly visible', 'discovered']

const Template: Story<IChoiceProps> = (args) => (
  <Choice {...args}>
    {data.map((item) => {
      return <Choice.Item key={item}>{item}</Choice.Item>
    })}
  </Choice>
)

export const DefaultChoice = Template.bind({})
DefaultChoice.args = {
  content: 'The word "out of sight" in the passage is closest in meaning to',
  userAnswers: [2],
  answerCount: 1,
}
DefaultChoice.parameters = {
  backgrounds: {
    values: [
      { name: 'story-red', value: 'pink' },
      { name: 'story-green', value: 'olive' },
    ],
  },
}

export const ReviewSingleChoice = Template.bind({})
ReviewSingleChoice.args = {
  content: 'The word "out of sight" in the passage is closest in meaning to',
  isReview: true,
  answers: [1],
  userAnswers: [2],
  answerCount: 1,
}
ReviewSingleChoice.parameters = {
  backgrounds: {
    values: [
      { name: 'story-red', value: 'pink' },
      { name: 'story-green', value: 'olive' },
    ],
  },
}

export const ReviewMultiChoice = Template.bind({})
ReviewMultiChoice.args = {
  content: 'The word "out of sight" in the passage is closest in meaning to',
  isReview: true,
  answers: [1, 2],
  userAnswers: [1, 3],
  answerCount: 2,
}
ReviewMultiChoice.parameters = {
  backgrounds: {
    values: [
      { name: 'story-red', value: 'pink' },
      { name: 'story-green', value: 'olive' },
    ],
  },
}
