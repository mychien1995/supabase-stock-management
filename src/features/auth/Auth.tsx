import { useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { ReactComponent as AppLogo } from "@/assets/images/logo.svg";
import BgImage from "@/assets/images/auth/01.png";
import { useAppSelector } from "@/app/hooks";
import { isAuthenticated } from "./userSlice";
const LoginForm = () => {
  const [error, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const isLoggedIn = useAppSelector(isAuthenticated);

  const doLogin = async (e: any, email: string) => {
    setErrors([]);
    e.preventDefault();
    const loginResponse = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (loginResponse.error) setErrors([loginResponse.error.message]);
    else setSuccess(true);
  };

  return !isLoggedIn ? (
    <section className="login-content">
      <div className="row m-0 align-items-center bg-white vh-100">
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                <div className="card-body">
                  <a
                    href="/"
                    className="navbar-brand d-flex align-items-center mb-3"
                  >
                    <AppLogo width={30} viewBox="0 0 30 30" />
                    <h4 className="logo-title ms-3">Stock Management</h4>
                  </a>
                  <h2 className="mb-2 text-center">Sign In</h2>
                  <p className="text-center">Login to stay connected.</p>
                  {error.map((e) => (
                    <div>{e}</div>
                  ))}
                  {!success ? (
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="form-label">
                              Enter your email to receive magic link
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              id="email"
                              placeholder=" "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          onClick={(e) => doLogin(e, email)}
                          className="btn btn-primary"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p>
                      You will receive a magic link sent to your email to login.
                      You can close this page now
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
          <img
            src={BgImage}
            className="img-fluid gradient-main animated-scaleX"
            alt="images"
          />
        </div>
      </div>
    </section>
  ) : (
    <div></div>
  );
};

export default LoginForm;
