import React, {createContext, CSSProperties, FC, PureComponent, useEffect, useState,} from 'react'
import classNames from 'classnames'

import ChoiceOption from './choiceOption'

export type HandelSelect = (list: number[]) => void
export type HandelClick = (index: number) => void

export interface IChoiceProps {
  /** 是否为回顾模式 */
  isReview: boolean
  /** 选择题题干 */
  content: string
  /** 真实答案索引 */
  answers: number[]
  /** 用户答案索引 */
  userAnswers: number[]
  /** 答案数量 */
  answerCount: number
  style?: CSSProperties
  className?: string
  /** 选中事件回调函数 */
  onSelect?: HandelSelect
  onWarning?: () => {}
}

export interface IChoiceOptionProps {
  index?: number
  isCorrect?: boolean
  isIncorrect?: boolean
  isSelected?: boolean
  style?: CSSProperties
  className?: string
}

export interface IChoiceChildrenContext {
  onClick?: HandelClick
}

export const ChoiceChildrenContext = createContext<IChoiceChildrenContext>({})

const Choice: FC<IChoiceProps> = (props) => {
  const {
    isReview,
    content,
    answers,
    userAnswers,
    answerCount,
    children,
    className,
    onSelect,
    onWarning,
    ...rest
  } = props

  const classes = classNames('bay-choice-wrapper', className, {
    'is-checkbox': answerCount > 1,
  })

  const [selected, setSelected] = useState<number[]>(userAnswers)

  useEffect(() => {
    onSelect && onSelect(selected)
  }, [onSelect, selected])

  const handleSelect = (val: number) => {
    if (isReview) {
      return
    }
    setSelected((prev) => {
      let list: number[] = []
      const i = prev.indexOf(val)
      if (answerCount === 1) {
        list = i > -1 ? prev : [val]
        return list
      }
      if (i > -1) {
        prev.splice(i, 1)
        list = [...prev]
        return list
      }
      if (prev.length >= answerCount) {
        onWarning && onWarning()
        return prev
      }
      list = [...prev, val]
      return list
    })
  }

  const ChildrenContext: IChoiceChildrenContext = {
    onClick: handleSelect,
  }

  return (
    <div className={classes} {...rest}>
      <span className='choice-stem'>{content}</span>
      <ul>
        <ChoiceChildrenContext.Provider value={ChildrenContext}>
          {React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<IChoiceOptionProps>
            if (childElement.type.name !== 'ChoiceOption') {
              console.error(
                `Warning: Choice has a child[${childElement.type.name}] which is not a ChoiceOption component`
              )
              return null
            }
            const isSelected = selected.includes(index)
            const isAnswer = answers.includes(index)
            return React.cloneElement(childElement, {
              index,
              isCorrect: isReview && isSelected && isAnswer,
              isIncorrect: isReview && isSelected && !isAnswer,
              isSelected: !isReview && isSelected,
            })
          })}
        </ChoiceChildrenContext.Provider>
      </ul>
    </div>
  )
}

/**
 * 选择题组件
 *
 * ### 引用方法
 *
 * ```js
 * import { Choice  } from 'bay-ui'
 * // or
 * import Choice  from 'bay-ui/dist/components/Choice'
 * ```
 */
class ChoiceContainer extends PureComponent<IChoiceProps> {
  static Item: FC<IChoiceOptionProps> = ChoiceOption
  static defaultProps: Partial<IChoiceProps> = {
    content: '',
    isReview: false,
    answerCount: 1,
    answers: [],
    userAnswers: [],
  }

  render() {
    return <Choice {...this.props} />
  }
}

// 以下写法不支持 docs
// export type IChoiceChoiceContainer = FC<IChoiceProps> & {
//   Item: FC<IChoiceOptionProps>
// }

// const ChoiceContainer: IChoiceChoiceContainer = (props) => {
//   return <Choice {...props} />
// }

// ChoiceContainer.Item = ChoiceOption
// ChoiceContainer.defaultProps = {
//   content: '',
//   isReview: false,
//   answerCount: 1,
//   answers: [],
//   userAnswers: [],
// }

export default ChoiceContainer
