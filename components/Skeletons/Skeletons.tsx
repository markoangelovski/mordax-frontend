export const InputSkeleton = ({ className }: { className: string }) => {
  return (
    <div className={`animate-pulse last:mr-0  ${className}`}>
      <label className="mt-1 block h-5 w-32 bg-slate-500/[.13] text-xs font-semibold uppercase text-slate-500"></label>
      <div className="mt-1 mr-4 flex h-10 items-center overflow-hidden rounded border border-gray-300 bg-gray-200"></div>
    </div>
  );
};
