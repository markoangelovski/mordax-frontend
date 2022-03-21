import { MicroLink } from "../../pages/locales";

interface PropsAll {
  items: MicroLink[];
}

interface PropsSingle {
  item: MicroLink;
}

const MicroLink = ({ item }: PropsSingle) => {
  return (
    <div className="pr-12 pb-3">
      <button
        onClick={item.action}
        className={`font-semibold tracking-wide hover:text-gray-500 ${
          item.active ? "text-sky-700" : ""
        }`}
      >
        <span>{item.label}</span>
      </button>
    </div>
  );
};

const MicroLinks = ({ items }: PropsAll) => {
  return (
    <div style={{ padding: "0 calc((100% - 1440px) / 2)" }}>
      <div className="flex flex-wrap px-6 pt-3.5">
        {items.map((item, i) => (
          <MicroLink key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MicroLinks;
