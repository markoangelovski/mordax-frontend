import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toStdCase } from "../../lib/helpers/utils";
import { usePages } from "../../lib/hooks/usePage";
import { urlRgx } from "../../lib/misc/regex";
import { CheckMark } from "./ContentTable.icons";

import { Arrow } from "./ContentTable.icons";

const HeadItem = ({
  label,
  sortItem,
  setSortItem,
  sortLabel,
  sortDisabled
}: {
  label: string;
  sortItem: { label: string; sort: boolean };
  setSortItem: Function;
  sortLabel: string;
  sortDisabled: boolean;
}) => {
  return (
    <th className="h-12 whitespace-nowrap border-y border-slate-700 pl-4 text-left leading-6	tracking-wide">
      <button
        type="button"
        onClick={() => setSortItem({ label: sortLabel, sort: !sortItem?.sort })}
        className="inline-flex h-full w-full items-center justify-start font-semibold tracking-wide"
        disabled={sortDisabled || /matches/gi.test(label) ? true : false} // Disables the sorting option for Seller matches
      >
        <span>{label}</span>
        <Arrow
          className={`${
            sortDisabled || sortItem?.label !== sortLabel ? "invisible" : ""
          }`}
          asc={sortItem?.sort}
        />
      </button>
    </th>
  );
};

const Row = ({ row, index }: any) => {
  return (
    <tr className="even:bg-gray-50 hover:bg-slate-100">
      {Object.values(row).length ? (
        <td className="h-12 border-t border-white py-4 pl-4 leading-6 text-slate-400">
          {index}
        </td>
      ) : null}
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
          endpoint && urlRgx.test(endpoint) ? "max-w-xs" : "max-w-3xl"
        } ${typeof label === "boolean" ? "justify-center" : ""}`}
      >
        <div
          className="min-w-0 shrink grow-0"
          title={typeof label !== "boolean" ? label : ""}
        >
          {endpoint?.length ? ( // Displays a label with an endpoint as a link
            <Link href={endpoint}>
              <a
                title={label}
                className="block overflow-hidden text-ellipsis whitespace-nowrap text-sky-700"
              >
                {/* rlRgx.test(endpoint) added to recalculate max width in ancestor div. Otherwise it always defaulted to false and max width was not set. */}
                {urlRgx.test(endpoint)}
                {label}
              </a>
            </Link>
          ) : /.svg/gi.test(label) ? ( // To display logos from SmartCommerce
            <div className="h-[36px] w-[172px]">
              <Image src={label} alt="Seller Logo" width={172} height={36} />
            </div>
          ) : /data:image\/png\;base64/gi.test(label) ? ( // To display logos from BIN Lite
            <div className="h-[36px] w-[108px]">
              <Image src={label} alt="Seller Logo" width={108} height={36} />{" "}
            </div>
          ) : (
            // Displays normal label or CheckMark icon for boolean values
            <span className="max-w-5xl select-all text-ellipsis whitespace-nowrap whitespace-nowrap">
              {typeof label === "boolean" ? <CheckMark bool={label} /> : label}
            </span>
          )}
        </div>
      </div>
    </td>
  );
};

const ContentTable = ({
  data,
  sortItem,
  setSortItem,
  sortLabels,
  sortDisabled
}: any) => {
  const titles = Object.keys(data?.[0] || {});
  return (
    <div className="max-w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr className="">
              {titles.length ? (
                <th className="h-12 whitespace-nowrap border-y border-slate-700 pl-4 text-left leading-6	tracking-wide">
                  <span className="inline-flex h-full w-full items-center justify-start font-semibold tracking-wide">
                    {"#"}
                  </span>
                </th>
              ) : null}
              {titles?.map((title: string, i: number) => (
                <HeadItem
                  key={i}
                  label={title}
                  sortItem={sortItem}
                  setSortItem={setSortItem}
                  sortLabel={sortLabels?.[i]}
                  sortDisabled={sortDisabled}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row: object, i: number) => {
              return <Row key={i} index={i + 1} row={row} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentTable;
