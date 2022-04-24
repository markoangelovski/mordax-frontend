export const InputSkeleton = ({ className }: { className: string }) => {
  return (
    <div className={`animate-pulse last:mr-0  ${className}`}>
      <label className="mt-1 block h-5 w-32 bg-slate-500/[.13] text-xs font-semibold uppercase text-slate-500"></label>
      <div className="mt-1 mr-4 flex h-10 items-center overflow-hidden rounded border border-gray-300 bg-slate-500/[.13]"></div>
    </div>
  );
};

export const TableSkeleton = ({ numRows }: { numRows: number }) => {
  return (
    <div className="mt-5 animate-pulse">
      {Array.from({ length: numRows }, (_, i) => (
        <div key={i} className="h-12 odd:bg-slate-500/[.13]"></div>
      ))}
    </div>
  );
};

export const LinesSkeleton = ({ numRows }: { numRows: number }) => {
  return (
    <div className="mt-5 animate-pulse">
      {Array.from({ length: numRows }, (_, i) => (
        <div key={i} className="mt-2 h-4 bg-slate-500/[.13]"></div>
      ))}
    </div>
  );
};

export const MetadaSkeleton: React.FC = () => (
  <div className="mt-2 flex animate-pulse justify-between">
    <div className="h-48 w-48 bg-slate-500/[.13]"></div>
    <div className="mx-4 flex-1">
      <div className="h-8 bg-slate-500/[.13]"></div>
      <div className="my-4 h-24 bg-slate-500/[.13]"></div>
      <div className="flex h-8 justify-between">
        <div className="h-full w-40 bg-slate-500/[.13]"></div>
        <div className="h-full w-40 bg-slate-500/[.13]"></div>
      </div>
    </div>
    <div className="w-[490px]">
      <div className="h-8 bg-slate-500/[.13]"></div>
      <div className="my-4 h-36 bg-slate-500/[.13]"></div>
    </div>
  </div>
);

export const LocaleStatsSkeleton: React.FC = () => (
  <div className="flex h-6 w-full animate-pulse justify-between">
    <div className="w-28 bg-slate-500/[.13]"></div>
    <div className="w-28 bg-slate-500/[.13]"></div>
    <div className="w-28 bg-slate-500/[.13]"></div>
    <div className="w-28 bg-slate-500/[.13]"></div>
    <div className="w-28 bg-slate-500/[.13]"></div>
    <div className="w-28 bg-slate-500/[.13]"></div>
    <div className="w-28 bg-slate-500/[.13]"></div>
    <div className="w-28 bg-slate-500/[.13]"></div>
    <div className="w-28 bg-slate-500/[.13]"></div>
  </div>
);
