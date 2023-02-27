import { ReactComponent as ProductListIcon } from "@/assets/images/product-list.svg";
import { ReactComponent as Logo } from "@/assets/images/logo.svg";

const SideBar = () => {
  return (
    <aside className="sidebar sidebar-default navs-rounded-all sidebar-white">
      <div className="sidebar-header d-flex align-items-center justify-content-start">
        <a href="/" className="navbar-brand">
          <Logo />
          <h4 className="logo-title">Stock System</h4>
        </a>
      </div>
      <div className="sidebar-body pt-0 data-scrollbar">
        <div className="sidebar-list">
          <ul className="navbar-nav iq-main-menu" id="sidebar-menu">
            <li className="nav-item">
              <a className="nav-link " aria-current="page" href="/">
                <i className="icon">
                  <ProductListIcon />
                </i>
                <span className="item-name">Product List</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
