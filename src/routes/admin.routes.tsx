import { AdminDashboard } from "../pages";

export const adminRoutes: RouteType[] = [
  {
    path: "/admin/home",
    element: <AdminDashboard />,
    title: "Admin Dashboard",
    description: "Home page of admin",
  },
];
