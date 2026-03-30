import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgClass?: string
  hoverClass?: string
  border?:boolean
  borderClass?: string
  textClass?: string
  shadow?:boolean,
  shadowClass?:string,
  hoverShadowClass?:string,
  shadowSize?:string
  icon?: ReactNode
}

export default function Button({
  bgClass = "bg-gray-950",
  hoverClass = "hover:bg-violet-700",
  textClass = "text-white",

  border = true,
  borderClass = "border-gray-400",

  shadow = true,
  shadowClass = "shadow-purple-200",
  hoverShadowClass = "hover:shadow-purple-300",
  shadowSize = "shadow-lg",

  icon,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`
        group
        ${bgClass}
        ${hoverClass}
        ${textClass}
        ${border ? `border ${borderClass}` : "border-none"}
        font-medium px-8 py-3.5 rounded-full
        flex items-center gap-2 hover:gap-3 cursor-pointer
        dark:shadow-none
        ${shadow ? `${shadowSize} ${shadowClass} ${hoverShadowClass}` : "shadow-none"}
        transition-all duration-300 ease-in-out
      `}
    >
      {children}
      {icon}
    </button>
  )
}


