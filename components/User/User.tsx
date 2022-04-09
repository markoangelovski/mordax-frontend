import { useState } from "react";

import { UserIcon } from "./User.icons";

import useUser from "../../lib/hooks/useUser";
import useKey from "../../lib/hooks/useKey";

const User: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const user = useUser();

  const { removeKey } = useKey();

  return (
    <div className="ml-8 h-8 w-8">
      <button
        onClick={() => setIsOpen(open => !open)}
        className="border-grey-50 pointer m-0 flex h-full w-full items-center justify-center rounded-full border"
        // style={{ left: "-8px", top: "-3px" }}
      >
        <UserIcon className="h-4 w-4" />
      </button>

      {isOpen ? (
        <div className="relative">
          <div
            className="fixed inset-0 z-50 bg-black opacity-20"
            onClick={() => setIsOpen(false)}
          ></div>
          <aside
            className="absolute right-0 top-2 z-50	min-w-max rounded-lg bg-white pt-1 shadow-xl will-change-transform"
            // style={{
            //   transform: "translate3d(0px, 16px, 0px)",
            //   transition: "opacity 0.3s ease-in-out",
            // }}
          >
            <div className="relative min-w-[200px]">
              <span className="text-black-400 my-2 flex h-10 items-center px-5 ">
                {user?.issuedFor}
              </span>
              <span className="flex h-10 items-center px-5 text-gray-400 hover:bg-gray-100">
                Profile
              </span>
              <span
                onClick={() => {
                  removeKey();
                  // Make a hard refresh to clear all caches
                  window.location.href = "/login";
                }}
                className="my-2 flex h-10 cursor-pointer items-center px-5 text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </span>
              <div className="absolute -top-4 right-2 h-4 w-4 rotate-45 bg-white"></div>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default User;
