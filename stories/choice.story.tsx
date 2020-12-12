import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Choice from '../src/components/Choice'

export const component = () => {
  const content =
    'The word "out of sight" in the passage is closest in meaning to'
  return (
    <Choice content={content} onSelect={action('onSelect')}>
      <Choice.Item>far away</Choice.Item>
      <Choice.Item>hidden</Choice.Item>
      <Choice.Item>partly visible</Choice.Item>
      <Choice.Item>discovered</Choice.Item>
    </Choice>
  )
}

storiesOf('Choice Component', module).add('Choice', component)
