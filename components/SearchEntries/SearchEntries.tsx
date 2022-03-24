import React from "react";

import { MagnifierGlass } from "./SearchEntries.icons";

const SearchEntries: React.FC = () => {
  return (
    <div className="box-content w-96 ">
      <div className="relative">
        <MagnifierGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <input
          type="search"
          name="search"
          id="search"
          className="w-full rounded-3xl border border-slate-200 py-2 pr-2 pl-10 tracking-wide focus:outline-none"
          placeholder="Search stuff..."
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default SearchEntries;
