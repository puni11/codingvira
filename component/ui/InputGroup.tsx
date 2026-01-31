const InputGroup = ({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm  text-slate-900">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-200 px-6 py-3.5 text-slate-600 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-white"
      />
    </div>
  );
};

export default InputGroup;
