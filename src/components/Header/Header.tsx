import { Group, ActionIcon, Center } from "@mantine/core";
import {
  IconUserSearch,
  IconBell,
  IconUserCircle,
  IconTriangleInvertedFilled,
  IconCircleArrowLeft,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducer";
import { useMediaQuery } from "@mantine/hooks";

const Header = ({
  toggleNavbar,
  toggleNotification,
}: {
  toggleNavbar: () => void;
  toggleNotification: () => void;
}) => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const { loggedIn } = useSelector(userSelector);
  useEffect(() => {
    const handler = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [scrollY]);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isSmallMobile = useMediaQuery("(max-width: 325px)");

  return (
    <Group
      className={
        "flex px-[5%] justify-between items-center w-full h-auto  shadow-lg backdrop-blur-lg"
      }
    >
      <Center className="flex-row gap-3">
        <Link to="/home">
          <img
            src={logo}
            style={isSmallMobile ? { maxWidth: "90px" } : {}}
            alt=""
            draggable={false}
          />
        </Link>

        <ActionIcon onClick={() => navigate(-1)} variant={"subtle"}>
          <IconCircleArrowLeft color="black" size={isSmallMobile ? 25 : 35} />
        </ActionIcon>
      </Center>
      {loggedIn === true && (
        <Group gap={5}>
          <Group gap={isMobile ? (isSmallMobile ? 25 : 30) : 40}>
            <Link to="/search">
              <IconUserSearch size={isSmallMobile ? 25 : 35} />
            </Link>

            <IconBell
              cursor="pointer"
              onClick={() => {
                toggleNotification();
              }}
              size={isSmallMobile ? 25 : 35}
            />
            <IconUserCircle
              cursor="pointer"
              onClick={toggleNavbar}
              size={isSmallMobile ? 25 : 35}
            />
          </Group>
          <IconTriangleInvertedFilled width={10} size={10} />
        </Group>
      )}
    </Group>
  );
};

export default Header;
