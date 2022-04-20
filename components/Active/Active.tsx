const Active = ({
  status,
  label,
  handler
}: {
  status: boolean;
  label: string;
  handler: Function;
}) => {
  return (
    <button
      type="button"
      onClick={() => handler()}
      className="flex items-center focus:outline-0"
    >
      <div
        className={`mr-2 inline-block h-4 w-4 rounded-full ${
          status
            ? "border-2 border-white bg-sky-700"
            : "border border-slate-500"
        }`}
        style={{
          boxShadow: `${status ? "0 0 0 2px #0c7994" : "none"}`
        }}
      ></div>
      <span>{label}</span>
    </button>
  );
};

export default Active;
