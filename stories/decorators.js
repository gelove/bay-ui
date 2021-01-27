import React from 'react'

const centerStyle = {
  display: 'grid',
  placeItems: 'center',
  placeContent: 'center',
}

export const centerWrapper = (Story) => (
  <div style={centerStyle}>
    <Story />
  </div>
)
