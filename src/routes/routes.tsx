import { Navigate } from "react-router-dom";
import { Login, AdminLogin } from "../pages";

export const routes: RouteType[] = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
    title: "Welcome",
    description: "Welcome Page of App",
  },
  {
    path: "/login",
    element: <Login />,
    title: "Login",
    description: "Login Page of App",
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
    title: "Admin Login",
    description: "Admin Login",
  },
];
