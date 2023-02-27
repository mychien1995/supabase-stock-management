import SideBar from "./SideBar";
import Header from "./Header";
import TopBanner from "./TopBanner";
import PropTypes from "prop-types";
const AppLayout = ({ children } : any) => {
  return (
    <div>
      <SideBar />
      <main className="main-content">
        <div className="position-relative iq-banner">
          <Header />
          <TopBanner />
        </div>
        {children}
      </main>
    </div>
  );
};
AppLayout.propTypes = {
  children: PropTypes.element,
};
export default AppLayout;
