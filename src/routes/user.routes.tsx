import { Home, OtherUserProfile, Search, WriteRem } from "../pages";

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

];
