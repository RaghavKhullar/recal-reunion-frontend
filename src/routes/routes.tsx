import { Landing, Search } from "../pages";

export const routes: RouteType[] = [
  {
    path: "",
    element: <Landing />,
    title: "Landing",
    description: "Welcome, Batch of 1999!",
  },
  {
    path: "search",
    element: <Search />,
    title: "Search",
    description: "Search for your batchmates!",
  },
];
