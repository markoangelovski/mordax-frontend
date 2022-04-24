import SearchEntries from "../SearchEntries/SearchEntries";

interface Props {
  type: string;
  sortItem: { label: string; sort: boolean };
  skipped: number;
  minEntriesCount: number;
  fetchedEntries: number;
  total: number;
  setPerPage: Function;
}

const SortSummary = ({
  type,
  sortItem,
  skipped,
  minEntriesCount,
  fetchedEntries,
  total,
  setPerPage
}: Props) => {
  return (
    <div className="box-content flex h-14 items-center justify-between bg-slate-100 px-4 text-sm tracking-wide">
      <div className="flex items-center">
        <div className="text-sm tracking-wide">
          <span>
            {`${skipped ? skipped : minEntriesCount} - ${
              skipped ? skipped + fetchedEntries : fetchedEntries
            } of ${total} ${type}`}
          </span>
        </div>
        <div className="mx-2 box-content h-6 border-l border-slate-300 pl-2 leading-6">
          <span>
            Sort: {sortItem.label}, {sortItem.sort ? "A–Z" : "Z-A"}
          </span>
        </div>
        <select
          name="pets"
          id="pet-select"
          className="w-16 cursor-pointer border-l border-slate-300 bg-slate-100 pl-2 focus:outline-none"
          onChange={e => setPerPage(e.currentTarget.value)}
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={200}>200</option>
          <option value={500}>500</option>
        </select>
      </div>
      <SearchEntries />
    </div>
  );
};

export default SortSummary;
