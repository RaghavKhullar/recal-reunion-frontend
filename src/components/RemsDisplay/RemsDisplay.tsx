import {
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { Rem } from "../../pages/MyRems/MyRems";
import { Link, useNavigate } from "react-router-dom";

const RemCard = ({ author, content, image, id }: Rem) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        minWidth: "180px",
        minHeight: "200px",
        borderRadius: "16px",
        background: "#EBD18D",
        boxShadow: "20px 20px 80px 0px rgba(0, 0, 0, 0.20)",
      }}
    >
      <Card.Section className="h-[190px]  sm:h-[300px] overflow-hidden">
        <BackgroundImage src={image} className="w-full h-[190px] sm:w-full sm:h-[300px]">
          <Center
            style={{
              background:
                "linear-gradient(180deg, #000 -42.73%, rgba(0, 0, 0, 0.00) 100%)",
            }}
            className="w-full px-4 sm:px-5 pt-2 sm:pt-5 h-full items-start  justify-between"
          >
            <Center className="gap-1 sm:gap-3">
              <img
                className="w-[20px] h-[20px] sm:w-[40px] sm:h-[40px] rounded-full"
                src={author?.profilePicture}
                alt={author?.name}
              />
              <Text className=" font-bebus tracking-wider text-white">
                {author?.name}
              </Text>
            </Center>
            <Center className="h-[20px] sm:h-[40px]">
              <Button
                to={author?.link as string}
                component={Link}
                size="compact-xs"
                color="white"
                variant="outline"
              >
                Profile
              </Button>
            </Center>
          </Center>
        </BackgroundImage>
      </Card.Section>
      <Card.Section
        className="p-3 w-[190px] sm:w-full"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/viewRem/" + id)}
      >
        <Text
          lineClamp={5}
          className=" text-black font-fira-sans text-base font-normal leading-[23px] tracking-[0.5px]"
        >
          {content}
        </Text>
      </Card.Section>
    </Card>
  );
};

const RemsDisplay = ({
  heading,
  subheading,
  rems,
}: {
  heading: string;
  subheading: string;
  rems: Rem[];
}) => {
  return (
    <Box className="w-full h-full max-w-[1500px] overflow-y-auto overflow-x-visible scrollbar-hide px-2 sm:px-60 pb-20">
      <Box className="w-full h-[20%] overflow-x-visible">
        <Text
          className="text-black font-bebas-neue text-3xl sm:text-4xl xl:text-6xl font-normal text-center"
        >
          {heading}
        </Text>
        <Text
          className="text-black font-fira-sans text-[1rem] sm:text-base font-normal text-center"
        >
          {subheading}
        </Text>
      </Box>
      <SimpleGrid className="grid-cols-2 sm:grid-cols-3 w-full overflow-x-visible">
        {rems.map((rem, i) => (
          <RemCard key={i} {...rem} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RemsDisplay;
