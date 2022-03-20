import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { Hamburger, HamburgerOpen } from "./Menu.icons";

interface Props {
  label: string;
  endpoint: string;
  pathname: string;
  l: string;
}

const MenuItem = ({ label, endpoint, pathname, l }: Props) => (
  <Link href={`/${endpoint}?l=${l}`}>
    <span
      className={`flex h-10 cursor-pointer items-center px-5 hover:bg-gray-100 ${
        pathname === `/${endpoint}`
          ? "text-sky-700 before:absolute before:-left-0 before:h-6 before:border-l-8 before:border-sky-700"
          : ""
      }`}
    >
      {label}
    </span>
  </Link>
);

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    pathname,
    query: { l },
  } = useRouter();

  if (pathname === "/login") return null;

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(open => !open)}
        className="pointer  m-0 flex w-24 items-center text-sm uppercase"
        // style={{ left: "-8px", top: "-3px" }}
      >
        {isOpen ? (
          <HamburgerOpen className="mr-2 h-3 w-3" />
        ) : (
          <Hamburger className="mr-2 h-3 w-3" />
        )}
        <span className="inline-block">Menu</span>
      </button>

      {isOpen ? (
        <div className="relative">
          <div
            className="fixed inset-0 z-50 bg-black opacity-20"
            onClick={() => setIsOpen(false)}
          ></div>
          <aside
            className="absolute top-2	z-50 rounded-lg bg-white pt-1 shadow-xl will-change-transform"
            // style={{
            //   transform: "translate3d(0px, 16px, 0px)",
            //   transition: "opacity 0.3s ease-in-out",
            // }}
          >
            <div className="relative">
              <div className="py-8">
                <MenuItem
                  label={"Locales"}
                  endpoint={"locales"}
                  pathname={pathname}
                  l={l as string}
                />

                <MenuItem
                  label={"Pages"}
                  endpoint={"pages"}
                  pathname={pathname}
                  l={l as string}
                />

                <MenuItem
                  label={"XML Sitemap Inspector"}
                  endpoint={"inspect-xml-sitemap"}
                  pathname={pathname}
                  l={l as string}
                />

                <MenuItem
                  label={"BIN Lite Inspector"}
                  endpoint={"binlite"}
                  pathname={pathname}
                  l={l as string}
                />

                <MenuItem
                  label={"SmartCommerce Inspector"}
                  endpoint={"smartcommerce"}
                  pathname={pathname}
                  l={l as string}
                />

                <MenuItem
                  label={"PriceSpider Inspector"}
                  endpoint={"pricespider"}
                  pathname={pathname}
                  l={l as string}
                />
              </div>
              <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-white"></div>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default Menu;
