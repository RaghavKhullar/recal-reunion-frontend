import { Group, Box } from "@mantine/core";
import {
  IconUserSearch,
  IconBell,
  IconUserCircle,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Header = ({
  toggleNavbar,
  toggleNotification,
}: {
  toggleNavbar: () => void;
  toggleNotification: () => void;
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [scrollY]);

  return (
    <Group
      className={
        "flex px-[5%] justify-between items-center w-full h-full  shadow-lg backdrop-blur-lg"
      }
    >
      <Box>
        <Link to="/home">
          <img src={logo} alt="" draggable={false} />
        </Link>
      </Box>
      <Group gap={5}>
        <Group gap={40}>
          <Link to="/search">
            <IconUserSearch size={35} />
          </Link>

          <IconBell
            cursor="pointer"
            onClick={() => {
              toggleNotification();
            }}
            size={35}
          />
          <IconUserCircle cursor="pointer" onClick={toggleNavbar} size={35} />
        </Group>
        <IconTriangleInvertedFilled width={10} size={10} />
      </Group>
    </Group>
  );
};

export default Header;
