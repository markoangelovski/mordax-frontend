import Image from "next/image";
import { useRouter } from "next/router";

import { logo } from "../../lib/misc/logo";

import Menu from "../Menu/Menu";
import LocalesDropdown from "../LocalesDropdown/LocalesDropdown";
import User from "../User/User";

const Header: React.FC = () => {
  const router = useRouter();

  if (router.pathname === "/login") return null;

  return (
    <header className="flex flex-col pt-6 pl-6 pr-6">
      <div className="flex justify-between">
        <Menu />
        <div className="flex">
          <LocalesDropdown />
          <User />
        </div>
      </div>
      <div>
        <Image
          src={logo}
          alt="Mordax Logo"
          title="Mordax."
          width={32}
          height={32}
        />
        <span>Mordax.</span>
      </div>
    </header>
  );
};

export default Header;