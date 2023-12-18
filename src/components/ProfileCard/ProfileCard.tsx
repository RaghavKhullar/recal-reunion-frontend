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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <Card
      className=" h-[44vmin] w-[44vmin] lg:h-[32vmin] sm:w-[32vmin] rounded-[19px] p-[10px] bg-[#A72343] cursor-pointer"
      onClick={() => navigate("/user/" + user.id)}
    >
      <BackgroundImage
        className="h-[100%] w-[100%] overflow-hidden rounded-[10px] backdrop-brightness-0 flex flex-col justify-end"
        src={user.imageURL}
        radius="sm"
      >
        <Box className="h-[100%] pl-2 pb-2 w-[100%] flex flex-col justify-end bg-black bg-opacity-40">
          <Text className="text-3xl font-bebus text-white text-elipsis">
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
