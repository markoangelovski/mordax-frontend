import Link from "next/link";
import { useRouter } from "next/router";

const Menu: React.FC = () => {
  const router = useRouter();

  if (router.pathname === "/login") return null;
  return (
    <div>
      <div>Menu</div>
      <Link href={`/locales?l=${router.query.l}`}>Locales</Link>
      <br />
      <Link href={`/pages?l=${router.query.l}`}>Pages</Link>
    </div>
  );
};

export default Menu;
