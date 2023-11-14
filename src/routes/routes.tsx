import { Landing, Home, Login, Search } from "../pages";

export const routes: RouteType[] = [
  {
    path: "",
    element: <Landing />,
    title: "Landing",
    description: "Landing Page of App",
  },
  {
    path: "home",
    element: <Home />,
    title: "Home",
    description: "Home Page of App",
  },
  {
    path: "login",
    element: <Login />,
    title: "Login",
    description: "Login Page of App",
  },
  {
    path: "search",
    element: <Search />,
    title: "Search",
    description: "Search for your batchmates!",
  },
];
