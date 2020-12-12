import { CSSProperties, createContext } from 'react'

export type HandelSelect = (list: number[]) => void
export type HandelClick = (index: number) => void

export interface IChoiceProps {
  content: string
  style?: CSSProperties
  className?: string
  onSelect?: HandelSelect
}

export interface IChoiceChildrenContext {
  selected: number[]
  onClick?: HandelClick
}

export interface IChoiceItemProps {
  index?: number
  style?: React.CSSProperties
  className?: string
}

export const ChoiceChildrenContext = createContext<IChoiceChildrenContext>({
  selected: [],
})
