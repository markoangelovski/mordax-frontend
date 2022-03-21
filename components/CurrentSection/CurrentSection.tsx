const CurrentSection = ({ label }: { label: string }) => {
  return (
    <div
      className="border-t border-slate-200 bg-slate-50"
      style={{ padding: "0 calc((100% - 1440px) / 2)" }}
    >
      <div className="px-6 pb-4 pt-5">
        <h2 className="text-4xl font-light">
          <span>{label}</span>
        </h2>
      </div>
    </div>
  );
};

export default CurrentSection;
