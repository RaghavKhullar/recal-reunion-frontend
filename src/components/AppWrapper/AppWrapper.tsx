import { useDisclosure } from "@mantine/hooks";
import { AppShell, Button } from "@mantine/core";
import { Outlet } from "react-router-dom";

const AppWrapper = () => {
	const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(false);
	return (
		<AppShell
			classNames={{
				root: "bg-transparent",
				header: "bg-transparent",
			}}
			padding="md"
			header={{ height: 60 }}
			aside={{
				width: window.innerWidth / 2,
				breakpoint: "lg",
				collapsed: {
					desktop: !navbarOpened,
				},
			}}
		>
			<AppShell.Header></AppShell.Header>
			<AppShell.Aside>Navbar</AppShell.Aside>
			<AppShell.Main>
				<Outlet />
				<Button onClick={toggleNavbar}>Toggle navbar</Button>
			</AppShell.Main>
		</AppShell>
	);
};

export default AppWrapper;
