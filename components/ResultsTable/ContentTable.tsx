import Link from "next/link";
import { urlRgx } from "../../lib/misc/regex";
import { CheckMark } from "./ContenTable.icons";

import { Arrow } from "./ContentTable.icons";

const HeadItem = ({ label }: { label: string }) => (
  <th className="h-12 whitespace-nowrap border-y border-slate-700 pl-4 text-left leading-6	tracking-wide">
    <button className="inline-flex h-full w-full items-center justify-start font-semibold tracking-wide">
      <span>{label}</span>
      <Arrow asc={true} />
    </button>
  </th>
);

const Row = ({ row }: any) => {
  return (
    <tr className="even:bg-gray-50 hover:bg-slate-100">
      {Object.values(row || {}).map((rowItem: any, i) => {
        const { label, endpoint } = rowItem || {};
        return (
          <RowItem
            key={i}
            label={label ? label : rowItem}
            endpoint={endpoint ? endpoint : ""}
          />
        );
      })}
    </tr>
  );
};

const RowItem = ({ label, endpoint }: { label: string; endpoint?: string }) => {
  return (
    <td className="h-12 border-t border-white py-4 pl-4 leading-6">
      <div
        className={`flex overflow-hidden ${
          endpoint && urlRgx.test(endpoint) ? "max-w-xs" : ""
        }  ${typeof label === "boolean" && "justify-center"}`}
      >
        <div className="min-w-0 shrink grow-0">
          {endpoint?.length ? (
            <Link href={endpoint}>
              <a
                title={label}
                className="block overflow-hidden overflow-hidden text-ellipsis whitespace-nowrap text-sky-700"
              >
                {/* rlRgx.test(endpoint) added to recalculate max width in ancestor div. Otherwise it always defaulted to false and max width was not set. */}
                {urlRgx.test(endpoint)}
                {label}
              </a>
            </Link>
          ) : (
            <span className="whitespace-nowrap">
              {typeof label === "boolean" ? <CheckMark bool={label} /> : label}
            </span>
          )}
        </div>
      </div>
    </td>
  );
};

const ResultsTable = ({ data }: any) => {
  const titles = Object.keys(data?.[0] || {});
  return (
    <div className="max-w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="w-f">
            <tr className="">
              {titles?.map((title: string, i: number) => (
                <HeadItem key={i} label={title} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row: object, i: number) => {
              return <Row key={i} row={row} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
