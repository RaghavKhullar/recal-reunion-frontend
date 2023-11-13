import { Box, Center, Container, Image, SimpleGrid } from "@mantine/core";

const ProfileSection = ({ isUser }: { isUser: boolean }) => {
  const profileImage =
    "https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80";
  return (
    <Container
      style={{
        borderRadius: "25px 0px 0px 25px",
      }}
      className="bg-[#e7e6b6] w-[45%] h-full m-0 p-0 overflow-y-hidden"
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
      <SimpleGrid
        cols={1}
        className={"w-full h-[90%] -top-[16%] relative justify-center"}
      >
        <Center className="h-[20vh] w-full">
          <Image
            className="h-[20vh] w-[20vh] rounded-full border-black border-[1px]"
            src={profileImage}
          />
        </Center>
      </SimpleGrid>
    </Container>
  );
};

export default ProfileSection;
