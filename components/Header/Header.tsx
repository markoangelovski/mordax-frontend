import Image from "next/image";
import { useRouter } from "next/router";

import { logo } from "../../lib/misc/logo";

import Menu from "../Menu/Menu";
import LocalesDropdown from "../LocalesDropdown/LocalesDropdown";
import User from "../User/User";
import { Container } from "../Containers/Containers";

const Header: React.FC = () => {
  const { pathname } = useRouter();

  if (pathname === "/login") return null;

  return (
    <header>
      <Container className="flex flex-col">
        <div className="flex flex-col px-6 pt-6">
          <div className="flex justify-between">
            <Menu />
            <div className="flex">
              {pathname === "/home" ? null : <LocalesDropdown />}
              <User />
            </div>
          </div>
          <div className="pb-5 pt-3">
            <span className="pr-1.5 align-middle">
              <Image
                src={logo}
                alt="Mordax Logo"
                title="Mordax."
                width={32}
                height={32}
              />
            </span>
            <span className="h-8 w-32 align-middle text-2xl font-semibold tracking-wide">
              Mordax.
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
