import React, { FC, useContext, useCallback } from 'react'
import classNames from 'classnames'
import { IChoiceItemProps, ChoiceChildrenContext } from './interface'

const ChoiceItem: FC<IChoiceItemProps> = (props) => {
  const { index, className, style, children } = props
  const context = useContext(ChoiceChildrenContext)
  const classes = classNames('choice-item', className, {
    'is-selected': index !== undefined && context.selected.includes(index),
  })

  const handleClick = useCallback(() => {
    index !== undefined && context.onClick && context.onClick(index)
  }, [context, index])

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

ChoiceItem.displayName = 'ChoiceItem'
export default ChoiceItem
