import React, { MouseEventHandler, useState } from "react";
import Button from "../Button/Button";

const RefreshSellerMatches = ({
  className,
  active,
  isRsLoading,
  refreshSellersMsg,
  handler
}: {
  className: string;
  active: boolean;
  isRsLoading: boolean;
  refreshSellersMsg: string;
  handler: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className={className}>
      <Button
        className={`mr-4 mt-7 h-10 grow ${
          active
            ? "text-sky-700 hover:border-sky-900 hover:text-sky-900"
            : "bg-gray-100 text-gray-400"
        }`}
        label="Refresh seller matches"
        handler={handler}
        disabled={!active}
        showSpinner={isRsLoading}
      />
      <div className="relative">
        {refreshSellersMsg === "true" ? (
          <span className="absolute text-sm text-green-600/50">
            Sellers refreshed successfully.
          </span>
        ) : null}
        {refreshSellersMsg === "false" ? (
          <span className="absolute text-sm text-red-600/50">
            Error occurred while refreshing sellers.
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default RefreshSellerMatches;
