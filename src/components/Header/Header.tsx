import { Group, Box } from "@mantine/core";
import {
  IconUserSearch,
  IconBell,
  IconUserCircle,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Header = ({ toggleNavbar }: { toggleNavbar: () => void }) => {
  return (
    <Group className="flex px-[5%] justify-between items-center w-full h-full">
      <Box>Logo</Box>
      <Group gap={5}>
        <Group gap={40}>
          <Link to="/search">
            <IconUserSearch size={35} />
          </Link>

          <IconBell size={35} />
          <IconUserCircle onClick={toggleNavbar} size={35} />
        </Group>
        <IconTriangleInvertedFilled width={10} size={10} />
      </Group>
    </Group>
  );
};

export default Header;
