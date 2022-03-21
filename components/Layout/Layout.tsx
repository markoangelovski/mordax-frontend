import Menu from "../Menu/Menu";
import LocalesDropdown from "../LocalesDropdown/LocalesDropdown";
import User from "../User/User";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <main
        className="min-h-screen"
        // style={{ padding: "0 calc((100% - 1440px) / 2)" }}
      >
        <Header />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
