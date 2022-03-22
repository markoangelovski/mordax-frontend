interface Props {
  label: string;
  action: () => void;
}

const AddEntryButton = ({ label, action }: Props) => {
  return (
    <button
      onClick={action}
      className="ml-4 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-none tracking-wide text-cyan-700 before:mr-1 before:content-['+']"
    >
      <span>{label}</span>
    </button>
  );
};

export default AddEntryButton;
