import React, { FC, useState } from 'react'
import classNames from 'classnames'

import {
  IChoiceProps,
  IChoiceItemProps,
  IChoiceChildrenContext,
  ChoiceChildrenContext,
} from './interface'

const Choice: FC<IChoiceProps> = (props) => {
  const { content, children, className, onSelect, ...rest } = props

  const [selected, setSelected] = useState<number[]>([])

  const classes = classNames('allen-choice-wrapper', className, {
    // [`choice-size-${size}`]: size,
  })

  const handleSelect = (val: number) => {
    setSelected((prev) => {
      let list: number[] = []
      const i = prev.indexOf(val)
      if (~i) {
        prev.splice(i, 1)
        list = [...prev]
      } else {
        list = [...prev, val]
      }
      onSelect && onSelect(list)
      return list
    })
  }

  const ChildrenContext: IChoiceChildrenContext = {
    selected,
    onClick: handleSelect,
  }

  return (
    <div className={classes} {...rest}>
      <span>{content}</span>
      <ul>
        <ChoiceChildrenContext.Provider value={ChildrenContext}>
          {React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<
              IChoiceItemProps
            >
            const { displayName } = childElement.type
            if (displayName !== 'ChoiceItem') {
              console.error(
                'Warning: Choice has a child which is not a ChoiceItem component'
              )
              return null
            }
            return React.cloneElement(childElement, {
              index,
            })
          })}
        </ChoiceChildrenContext.Provider>
      </ul>
    </div>
  )
}

export default Choice
