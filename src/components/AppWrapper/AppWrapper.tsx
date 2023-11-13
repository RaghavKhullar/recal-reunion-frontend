import { useDisclosure } from "@mantine/hooks";
import { AppShell, Container } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const AppWrapper = () => {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(false);
  return (
    <AppShell
      classNames={{
        root: "bg-transparent",
        header: "bg-transparent h-[10vh] border-none",
        main: "bg-transparent h-[100vh] p-0 pt-[10vh] min-h-[100vh]",
        aside: "bg-transparent w-full border-none",
      }}
      aside={{
        width: "100%",
        breakpoint: "",
        collapsed: {
          desktop: !navbarOpened,
        },
      }}
    >
      <AppShell.Header>
        <Header toggleNavbar={toggleNavbar} />
      </AppShell.Header>
      <AppShell.Aside>
        <Navbar toggleNavbar={toggleNavbar} />
      </AppShell.Aside>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppWrapper;
