import {
  Card,
  Group,
  Badge,
  Button,
  Image,
  Box,
  BackgroundImage,
  Text,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const getSocialIcon = (name: string) => {
  switch (name) {
    case "Facebook":
      return <IconBrandFacebook color="white" size={20} />;

    case "LinkedIn":
      return <IconBrandLinkedin color="white" size={20} />;

    case "X":
      return <IconBrandX color="white" size={20} />;
  }
};
type Friend = {
  id: string;
  imageURL: string;
  department: string;
  name: string;
  socials: {
    name: string;
    link: string;
  }[];
};
const ProfileCard = ({ user }: { user: Friend }) => {
  return (
    <Card className=" h-[260px] w-[250px] rounded-[19px] p-[10px] bg-[#A72343]">
      <BackgroundImage
        className="h-[100%] w-[100%] overflow-hidden rounded-[10px] backdrop-brightness-0 flex flex-col justify-end"
        src={user.imageURL}
        radius="sm"
      >
        <Box className="h-[100%] pl-2 pb-2 w-[100%] flex flex-col justify-end bg-black bg-opacity-40">
          <Text className="text-3xl font-bebus text-white">
            {user.name.toUpperCase()}
          </Text>
          <Group>
            {user.socials.map((social) => (
              <a href={social.link} target="_blank">
                {getSocialIcon(social.name)}
              </a>
            ))}
          </Group>
        </Box>
      </BackgroundImage>
    </Card>
  );
};

export default ProfileCard;
