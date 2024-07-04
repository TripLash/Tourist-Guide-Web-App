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
import AdminsList from "../components/Admin Dashboard/AdminsList";
import UserDetails from "../components/Admin Dashboard/userDetails";
import FavList from "../components/Admin Dashboard/FavList";
import AllFavouriteLists from "../components/Admin Dashboard/FavouriteList";
import Profile from "../components/Admin Dashboard/profile";
import TourApplications from "../components/Admin Dashboard/TourApplications";
import TourAppDetails from "../components/Admin Dashboard/TourAppDetails";
import TourGuideAppDetails from "../components/Admin Dashboard/GuideAppDetails";
import GuideAppDetails from "../components/Admin Dashboard/GuideAppDetails";
import Dashboard from "../components/Admin Dashboard/Dashboard";
import TourGuideInfo from "../components/TourGuide/TourGuideInfo";

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
        path: "/",
        element: <Home />,
      },
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
        path: "/",
        element: (
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <Dashboard /> },
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
