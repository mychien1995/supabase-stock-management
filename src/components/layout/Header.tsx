import { supabase } from "@/services/supabaseClient";
import { useEffect, useState } from "react";
const Header = () => {
  const [userName, setUserName] = useState<string>("");
  const getUser = async () => {
    const user = await supabase.auth.getUser();
    setUserName(user.data.user?.email || "");
  };

  useEffect(() => {
    getUser().catch(console.error);
  }, []);

  return (
    <nav className="nav navbar navbar-expand-lg navbar-light iq-navbar navs-sticky">
      <div className="container-fluid navbar-inner">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="py-0 nav-link d-flex align-items-center"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="caption ms-3 d-none d-md-block ">
                  <h6 className="mb-0 caption-title">{userName}</h6>
                  <p className="mb-0 caption-sub-title">Supabase User</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
