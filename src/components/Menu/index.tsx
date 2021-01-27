import React, {createContext, CSSProperties, FC, useState} from 'react'
import classNames from 'classnames'
import SubMenu, {SubMenuProps} from './subMenu'
import MenuItem, {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string
  className?: string
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode
  style?: CSSProperties
  /**点击菜单项触发的回掉函数 */
  onSelect?: (selectedIndex: string) => void
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: (selectedIndex: string) => void
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ```js
 * import { Menu } from 'bay-ui'
 * // or
 * import Menu from 'bay-ui/dist/components/Menu'
 * ```
 */
const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props
  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('bay-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (['SubMenu', 'MenuItem'].includes(childElement.type.name)) {
        return React.cloneElement(childElement, {
          index: index.toString(),
        })
      } else {
        console.error(
          `Warning: Menu has a child[${childElement.type.name}] which is not a SubMenu or MenuItem`
        )
        return null
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu
export default TransMenu
