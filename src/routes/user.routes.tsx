import {
  Home,
  MyRems,
  OtherUserProfile,
  RemsByMe,
  Search,
  WriteRem,
} from "../pages";
import RemsByOthersForSomeone from "../pages/RemsByOthersForSomeone/RemsByOthersForSomeone";
import RemsBySomeoneForOthers from "../pages/RemsBySomeoneForOthers/RemsBySomeoneForOthers";

export const userRoutes: RouteType[] = [
  {
    path: "/home",
    element: <Home />,
    title: "Home",
    description: "Home Page of App",
  },
  {
    path: "/search",
    element: <Search />,
    title: "Search",
    description: "Search for your batchmates!",
  },
  {
    path: "/writeRem/:id",
    element: <WriteRem />,
    title: "Write Rem",
    description: "Search for your batchmates!",
  },
  {
    path: "/user/:id",
    element: <OtherUserProfile />,
    title: "Profile",
    description: "Search for your batchmates!",
  },
  {
    path: "/myRems",
    element: <MyRems />,
    title: "Rems",
    description: "Read Rems!",
  },
  {
    path: "/remsByMe",
    element: <RemsByMe />,
    title: "Rems",
    description: "Read Rems!",
  },
  {
    path: "/remsBy/:id",
    element: <RemsBySomeoneForOthers />,
    title: "Rems",
    description: "Read Rems!",
  },
  {
    path: "/remsFor/:id",
    element: <RemsByOthersForSomeone />,
    title: "Rems",
    description: "Read Rems!",
  },
];
