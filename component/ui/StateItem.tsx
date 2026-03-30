 const StatItem = ({ number, label }: { number: string, label: string }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{number}</div>
    <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">{label}</div>
  </div>
);

export default StatItem;