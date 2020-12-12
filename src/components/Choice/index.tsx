import { FC } from 'react'
import Choice from './choice'
import ChoiceItem from './choiceItem'
import { IChoiceItemProps, IChoiceProps } from './interface'

export interface IChoiceComponent extends FC<IChoiceProps> {
  Item: FC<IChoiceItemProps>
}

const TransChoice = Choice as IChoiceComponent

TransChoice.Item = ChoiceItem

export default TransChoice
