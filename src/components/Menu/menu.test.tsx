import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import Menu, { MenuProps } from '.'

jest.mock('../Icon', () => {
  return () => {
    return <i className="fa" />
  }
})

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    },
  }
})

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4'],
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>active</Menu.Item>
      <Menu.Item disabled>disabled</Menu.Item>
      <Menu.Item>xyz</Menu.Item>
      <Menu.SubMenu title="dropdown">
        <Menu.Item>drop1</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="opened">
        <Menu.Item>opened1</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .bay-sub-menu {
      display: none;
    }
    .bay-sub-menu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test Menu and Menu.Item component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and Menu.Item based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('bay-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should show dropdown items when hover on Menu.SubMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
})

describe('test Menu and Menu.Item component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on Menu.SubMenu for vertical mode', () => {
    const dropDownItem = wrapper2.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(wrapper2.getByText('dropdown'))
    expect(dropDownItem).toBeVisible()
  })
  it('should show Menu.SubMenu dropdown when defaultOpenMenu.SubMenus contains Menu.SubMenu index', () => {
    expect(wrapper2.queryByText('opened1')).toBeVisible()
  })
})
