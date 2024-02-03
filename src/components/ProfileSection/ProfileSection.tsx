import {
  Box,
  Center,
  Container,
  Group,
  Image,
  Text,
  SimpleGrid,
} from "@mantine/core";
import NotificationAdapter from "../NotificationAdapter/NotificationAdapter";
import { userSelector } from "../../redux/reducer";
import { useSelector } from "react-redux";
import { BACKEND_URL, FRONTEND_URL } from "../../../config";
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandXFilled,
  IconBuildingBank,
  IconCalendar,
  IconEdit,
  IconLogout,
  IconShare,
} from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import { useEffect, useState } from "react";
import { showNotification } from "../../helpers/helpers";
import { useAppDispatch } from "../../redux/store/hooks";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions";

const ProfileSection = ({
  isUser,
  toggleNavbar,
  toggleNotification,
}: {
  isUser: boolean;
  toggleNavbar: () => void;
  toggleNotification: () => void;
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const state = useSelector(userSelector);
  const [remsWrittenForMe, setWrittenRemsForMe] = useState<Rem[]>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isUser) {
    useEffect(() => {
      setWrittenRemsForMe(state.currentUser.writtenForUser.rems);
    }, [state.currentUser.writtenForUser.rems]);
  }

  const logout = async () => {
    const logoutDispatch = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(logoutDispatch)) {
      if (logoutDispatch.payload.status === 200) {
        showNotification("Success", "Logged out successfully", "success");
        navigate("/login");
      } else {
        showNotification("Error", "Some error occured", "error");
        navigate(`/home`);
      }
    } else {
      showNotification(
        "Error",
        "Error occured while fetching user details",
        "error"
      );
      navigate(`/home`);
    }
    toggleNavbar();
  };

  const profileImage =
    BACKEND_URL +
    "/images/profiles/" +
    (state.currentUser.user?.image || "temp");
  return (
    <>
      {isUser === true ? (
        <>
          <UpdateProfile opened={opened} close={close} />
          <Container
            style={{
              borderRadius: "25px 0px 0px 25px",
            }}
            className={`bg-[#e7e6b6] ${
              isMobile ? "w-[100%]" : "w-[45%] max-w-[600px]"
            } h-full m-0 p-0 overflow-y-hidden`}
          >
            <Box className="w-full border-b-black border-b-[1px] overflow-hidden h-[26%]">
              <Image
                classNames={{
                  root: "w-full h-full scale-125",
                }}
                className="blur-sm"
                src={profileImage}
              />
            </Box>
            <Group className={"w-full px-3 mt-5 sticky justify-end z-50"}>
              <IconEdit
                className="cursor-pointer"
                onClick={() => open()}
                size={30}
              />
              <IconShare
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${FRONTEND_URL}/user/${state.currentUser.user?._id || ""}|`
                  );
                  showNotification(
                    "Success",
                    "Link copied to clipboard",
                    "success"
                  );
                }}
                size={30}
              />
              <IconLogout
                onClick={logout}
                className="cursor-pointer"
                size={30}
              />
            </Group>
            <Center className={"w-full z-10 -top-[20%] relative"}>
              <Center className="w-full max-w-[500px] z-10 flex-col justify-between">
                <Image
                  className="h-[25vh] w-[25vh] rounded-full border-black border-[1px]"
                  src={profileImage}
                />
                <Center className="w-full max-w-[500px] flex-col justify-between">
                  <Text className="text-3xl mt-10 font-bold font-bebus">
                    {state.currentUser.user?.name}
                  </Text>
                  <Text className=" font-fira">
                    {state.currentUser.user?.email}
                  </Text>
                  <Center className="w-full max-w-[500px] flex-col h-[50vh] px-10">
                    <Text className="w-full mt-2 text-2xl font-bebus">
                      ABOUT ME
                    </Text>
                    <Center className="w-full items-start border-[3.78px] border-black font-fira rounded-md h-[40vh] overflow-y-auto pl-[7px]">
                      {state.currentUser.user?.aboutMe}
                    </Center>
                    <Center className="w-full mt-2 flex-col h-[20vh]">
                      <Box className="flex flex-row items-center w-full pl-[30%]">
                        <IconBuildingBank size={40} />
                        <Text className="ml-2 font-fira mt-1">
                          {state.currentUser.user?.department +
                            " " +
                            state.currentUser.user?.section}
                        </Text>
                      </Box>
                      <Box className="flex flex-row items-center w-full pl-[30%]">
                        <IconCalendar size={40} />
                        <Text className="ml-2 font-fira mt-1">
                          {state.currentUser.user?.dateOfBirth}
                        </Text>
                      </Box>
                    </Center>
                    <Center className="gap-5">
                      {state.currentUser.user?.x && (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={state.currentUser.user?.x}
                        >
                          <IconBrandXFilled size={40} />
                        </a>
                      )}
                      {state.currentUser.user?.linkedin && (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={state.currentUser.user?.linkedin}
                        >
                          <IconBrandLinkedin size={40} />
                        </a>
                      )}
                      {state.currentUser.user?.facebook && (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={state.currentUser.user?.facebook}
                        >
                          <IconBrandFacebookFilled size={40} />
                        </a>
                      )}
                      {state.currentUser.user?.instagram && (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={state.currentUser.user?.instagram}
                        >
                          <IconBrandInstagram size={40} />
                        </a>
                      )}
                    </Center>
                  </Center>
                </Center>
              </Center>
            </Center>
          </Container>
        </>
      ) : (
        <Container
          style={{
            borderRadius: "25px 0px 0px 25px",
          }}
          className={`bg-[#e7e6b6] ${
            isMobile ? "w-[100%]" : "w-[45%]"
          } h-full m-0 p-0 overflow-y-hidden`}
        >
          <div
            style={{
              height: "15vh",
              fontFamily: "'Bebas Neue', sans-serif",
              textAlign: "center",
            }}
            className="text-5xl pt-[7vh]"
          >
            {" "}
            Approve the rems
          </div>
          <div className="mt-[4vh] h-[80vh] w-[100%] overflow-y-auto scrollbar-hide">
            {remsWrittenForMe.map((rem: Rem, i: number) => {
              return (
                <div
                  key={i}
                  style={{
                    width: "100%",
                    height: "15vh",
                    display: "flex",
                  }}
                >
                  <NotificationAdapter
                    rem={rem}
                    toggleNotification={toggleNotification}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
};

export default ProfileSection;
