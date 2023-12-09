import { Box } from "@mantine/core";
import ProfileSection from "../ProfileSection/ProfileSection";
import { IconX } from "@tabler/icons-react";

const Navbar = ({
  isNavbarOpen,
  isNotificationOpen,
  toggleNavbar,
  toggleNotification,
}: {
  isNavbarOpen: boolean;
  isNotificationOpen: boolean;
  toggleNavbar: () => void;
  toggleNotification: () => void;
}) => {
  return (
    <Box className="bg-black bg-opacity-40 w-full h-full flex flex-row-reverse ">
      {isNavbarOpen === true && (
        <>
          <IconX
            onClick={toggleNavbar}
            size={35}
            stroke={3}
            className="absolute top-[2%] right-[2%] z-50 cursor-pointer"
          />
          <ProfileSection
            isUser={true}
            toggleNavbar={toggleNavbar}
            toggleNotification={toggleNotification}
          />
        </>
      )}
      {isNotificationOpen === true && (
        <>
          <IconX
            onClick={toggleNotification}
            size={35}
            stroke={3}
            className="absolute top-[2%] right-[2%] z-50 cursor-pointer"
          />
          <ProfileSection
            isUser={false}
            toggleNavbar={toggleNavbar}
            toggleNotification={toggleNotification}
          />
        </>
      )}
    </Box>
  );
};

export default Navbar;
