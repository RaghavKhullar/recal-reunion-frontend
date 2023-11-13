import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.tsx";
import { AdminHome } from "./pages/AdminHome.tsx";
import { AdminLogin } from "./pages/AdminLogin.tsx";
import { Home } from "./pages/Home.tsx";
import { UserHome } from "./pages/UserHome.tsx";
import { UserLogin } from "./pages/UserLogin.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MantineProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/home" element={<Home />} />
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route path="/admin" element={<AdminHome />} />
					<Route path="/user/login" element={<UserLogin />} />
					<Route path="/user" element={<UserHome />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	</React.StrictMode>
);
