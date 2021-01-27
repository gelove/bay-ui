import { FC, useContext, useCallback } from 'react'
import classNames from 'classnames'
import { IChoiceOptionProps, ChoiceChildrenContext } from '.'

const ChoiceOption: FC<IChoiceOptionProps> = (props) => {
  const {
    index,
    isCorrect,
    isIncorrect,
    isSelected,
    className,
    style,
    children,
  } = props
  const context = useContext(ChoiceChildrenContext)
  const classes = classNames('bay-choice-option', className, {
    'is-selected': isSelected,
    'is-correct': isCorrect,
    'is-incorrect': isIncorrect,
  })

  const handleClick = useCallback(() => {
    index !== undefined && context.onClick && context.onClick(index)
  }, [context, index])

  return (
    <li className={classes} style={style} onClick={handleClick}>
      <div className='bay-choice-option-selector' />
      <div className='bay-choice-option-text'>{children}</div>
    </li>
  )
}

export default ChoiceOption
