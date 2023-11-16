import { Landing, Home, Login, Search, WriteRem } from "../pages";

export const routes: RouteType[] = [
	{
		path: "/",
		element: <Landing />,
		title: "Landing",
		description: "Landing Page of App",
	},
	{
		path: "/home",
		element: <Home />,
		title: "Home",
		description: "Home Page of App",
	},
	{
		path: "/login",
		element: <Login />,
		title: "Login",
		description: "Login Page of App",
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
 
];
