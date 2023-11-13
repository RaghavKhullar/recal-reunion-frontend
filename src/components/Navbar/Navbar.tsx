import { Box, Group } from "@mantine/core";
import ProfileSection from "../ProfileSection/ProfileSection";
import { IconX } from "@tabler/icons-react";

const Navbar = ({ toggleNavbar }: { toggleNavbar: () => void }) => {
  return (
    <Box className="bg-black bg-opacity-40 w-full h-full flex flex-row-reverse ">
      <IconX
        onClick={toggleNavbar}
        size={35}
        stroke={3}
        className="absolute top-[2%] right-[2%] z-50 cursor-pointer"
      />
      <ProfileSection isUser={true} />
    </Box>
  );
};

export default Navbar;
