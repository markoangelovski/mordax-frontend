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
      <br />
      <Link href={`/inspect-xml-sitemap?l=${router.query.l}`}>
        XML Sitemap Inspector
      </Link>
      <br />
      <Link href={`/binlite?l=${router.query.l}`}>BIN Lite Inspector</Link>
      <br />
      <Link href={`/smartcommerce?l=${router.query.l}`}>
        SmartCommerce Inspector
      </Link>{" "}
      <br />
      <Link href={`/pricespider?l=${router.query.l}`}>
        PriceSpider Inspector
      </Link>
    </div>
  );
};

export default Menu;
