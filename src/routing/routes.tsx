// routes.tsx
import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../components/Authentication/Login";
import SignIn from "../components/Authentication/SignIn";
import OTPVerification from "../components/Authentication/OTPVerification";
import ChangePassword from "../components/Authentication/ChangePassword";
import ForgetPassword from "../components/Authentication/ForgetPassword";
import FavouriteLists from "../components/Nav Bar/FavouriteLists";
import AdminProtectedRoute from "../components/Admin Dashboard/AdminProtectedRoute";
import AdminDashboard from "../components/Admin Dashboard/AdminDashboard";
import Home from "../components/Main/Home";
import App from "../App";
import { AuthProvider } from "../components/Authentication/AuthContext";
import PrivateRoute from "../components/Nav Bar/PrivateRoute";
import TourGuideApplications from "../components/Admin Dashboard/TourGuideApplications";
import UserList from "../components/Admin Dashboard/UserList";
import TourGuideList from "../components/Admin Dashboard/TourGuideList";
import FavouriteList from "../components/Admin Dashboard/FavouriteList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        path: "/TourGuideInfo",
        element: <TourGuideInfo />,
      },
      {
        path: "/",
        element: <Home />,
      },
      { path: "/Tour", element: <Tour /> },
      { path: "/Login", element: <Login /> },
      { path: "/SignIn", element: <SignIn /> },
      { path: "/ForgetPassword", element: <ForgetPassword /> },
      { path: "/OTPVerification", element: <OTPVerification /> },
      { path: "/changePassword", element: <ChangePassword /> },
      {
        path: "/TourGuideInfo",
        element: <TourGuideInfo />,
      },
      {
        path: "/FavouriteLists",
        element: (
          <PrivateRoute>
            <FavouriteLists />
          </PrivateRoute>
        ),
      },
      {
        path: "/AdminDashboard",
        element: (
          <AuthProvider>
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          </AuthProvider>
        ),
        children: [
          { path: "users", element: <UserList /> },
          { path: "user/:userId", element: <UserDetails /> },
          { path: "tour-guides", element: <TourGuideList /> },
          { path: "admins", element: <AdminsList /> },
          { path: "profile", element: <Profile /> },
          {
            path: "tour-guide-applications",
            element: <TourGuideApplications />,
          },
          { path: "/guide-application/:appId", element: <GuideAppDetails /> },
          {
            path: "tour-applications",
            element: <TourApplications />,
          },
          { path: "/application/:appId", element: <TourAppDetails /> },
          { path: "favourites", element: <AllFavouriteLists /> },
          { path: "list/:listId", element: <FavList /> },
        ],
      },
    ],
  },
]);

export default router;
