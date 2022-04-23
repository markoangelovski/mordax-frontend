import SearchEntries from "../SearchEntries/SearchEntries";

interface Props {
  type: string;
  sortItem: { label: string; sort: boolean };
  skip: number;
  minEntriesCount: number;
  fetchedEntries: number;
  total: number;
}

const SortSummary = ({
  type,
  sortItem,
  skip,
  minEntriesCount,
  fetchedEntries,
  total
}: Props) => {
  return (
    <div className="box-content flex h-14 items-center justify-between bg-slate-100 px-4 text-sm tracking-wide">
      <div className="flex items-center">
        <div className="text-sm tracking-wide">
          <span>
            {`${skip ? skip : minEntriesCount} - ${
              skip ? skip + fetchedEntries : fetchedEntries
            } of ${total} ${type}`}
          </span>
        </div>
        <div className="ml-2 box-content h-6 border-l border-slate-300 pl-2 leading-6">
          <span>
            Sort: {sortItem.label}, {sortItem.sort ? "A–Z" : "Z-A"}
          </span>
        </div>
      </div>
      <SearchEntries />
    </div>
  );
};

export default SortSummary;
