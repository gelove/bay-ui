import React, {
    FC,
    CSSProperties,
    useState,
    useEffect,
    createContext,
  } from 'react'
  import classNames from 'classnames'
  
  
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
    style?: React.CSSProperties
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
              const childElement = child as React.FunctionComponentElement<
                IChoiceOptionProps
              >
              const { displayName } = childElement.type
              if (displayName !== 'ChoiceOption') {
                console.error(
                  'Warning: Choice has a child which is not a ChoiceOption component'
                )
                return null
              }
              return React.cloneElement(childElement, {
                index,
                isCorrect:
                  isReview && selected.includes(index) && answers.includes(index),
                isIncorrect:
                  isReview &&
                  selected.includes(index) &&
                  !answers.includes(index),
                isSelected: !isReview && selected.includes(index),
              })
            })}
          </ChoiceChildrenContext.Provider>
        </ul>
      </div>
    )
  }
  
  export type IChoiceComponent = FC<IChoiceProps> & { Item: FC<IChoiceOptionProps> }
  
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
//   class ChoiceContainer extends React.PureComponent<IChoiceProps> {
//     static Item = null
//     static defaultProps: IChoiceProps = {
//       content: '',
//       isReview: false,
//       answerCount: 1,
//       answers: [],
//       userAnswers: [],
//     }
  
//     render() {
//       return <Choice {...this.props} />
//     }
//   }
  
  