interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
  icon?: React.ReactNode;
}

export default function Input({
  icon,
  ...props
}: InputProps) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black/10 outline-none"
      />
    </div>
  );
}