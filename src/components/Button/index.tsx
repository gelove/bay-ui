import React, {
  FC,
  ReactNode,
  MouseEventHandler,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'md' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  /** 设置 Button 的名称(children优先) */
  label?: string
  /** 设置 Button 的子节点 */
  children: ReactNode
  /** 自定义 Button 的css类 */
  className?: string
  /** 自定义 Button 的背景色 */
  backgroundColor?: string
  /** 设置 Button 的禁用 */
  disabled?: boolean
  /** 设置 Button 的尺寸 */
  size?: ButtonSize
  /** 设置 Button 的类型 */
  btnType?: ButtonType
  /** A标签地址(btnType=link 时才有效) */
  href?: string
  /** 设置 Button 的点击事件 */
  // onClick?: MouseEventHandler<HTMLElement>
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 *
 * ### 引用方法
 *
 * ```js
 * import { Button } from 'bay-ui'
 * // or
 * import Button from 'bay-ui/dist/components/Button'
 * ```
 */
const Button: FC<ButtonProps> = (props) => {
  const {
    label,
    btnType,
    style,
    className,
    backgroundColor,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  })
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children || label}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        style={{ ...style, backgroundColor }}
        disabled={disabled}
        {...restProps}
      >
        {children || label}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}
export default Button
