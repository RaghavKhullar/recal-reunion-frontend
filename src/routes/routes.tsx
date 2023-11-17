import { Landing, Login } from "../pages";

export const routes: RouteType[] = [
	{
		path: "/",
		element: <Landing />,
		title: "Landing",
		description: "Landing Page of App",
	},
	{
		path: "/login",
		element: <Login />,
		title: "Login",
		description: "Login Page of App",
	},
];
