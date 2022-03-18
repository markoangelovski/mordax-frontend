import Menu from "../Menu/Menu";
import LocalesDropdown from "../LocalesDropdown/LocalesDropdown";
import User from "../User/User";
import Footer from "../Footer/Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <main
        className="min-h-screen"
        style={{ padding: "0 calc((100% - 1440px) / 2)" }}
      >
        <header>
          <Menu />
          <LocalesDropdown />
          <User />
        </header>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
