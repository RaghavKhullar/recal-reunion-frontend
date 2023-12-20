import { Login, AdminLogin } from "../pages";

export const routes: RouteType[] = [
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
