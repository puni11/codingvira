import { MouseEvent, ReactNode } from "react";

interface SmallCircleIconProps {
  icon: ReactNode;
  bgClass?: string;
  colorClass?:string
  roundedClass?: string;
  onClick?: (data: string) => void
}

export default function SmallCircleIcon({
  icon,
  bgClass = "bg-gray-200",
  roundedClass = "rounded-full",
  colorClass='text-gray-50',
  onClick
}: SmallCircleIconProps) {
  return (
    <button
    onClick={()=>onClick?.('puneet')}
      className={`w-12 h-12 flex hover:scale-105 items-center justify-center ${colorClass} ${bgClass} ${roundedClass} transform transition-all cursor-pointer`}
    >
      {icon}
    </button>
  );
}
