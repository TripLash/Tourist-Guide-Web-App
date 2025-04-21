import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Nav Bar/NavBar";

import { AuthContext } from "./components/Authentication/AuthContext";
import AdminNavBar from "./components/Admin Dashboard/adminNavBar";

function App() {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const [ShowNavBar, setShowNavBar] = useState(true);

  const noNavBarRoutes = [
    "/Login",
    "/SignIn",
    "/ForgetPassword",
    "/OTPVerification",
    "/changePassword",
  ];

  useEffect(() => {
    if (!authContext) {
      return;
    }
    const { isAdmin } = authContext;

    setShowNavBar(!noNavBarRoutes.includes(location.pathname) && !isAdmin);
  }, [location, authContext]);

  if (!authContext) {
    return null;
  }

  const { isAdmin } = authContext;

  return (
    <>
      {ShowNavBar ? <NavBar /> : null}
      <Outlet />
    </>
  );
}

export default App;
