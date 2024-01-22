import {
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Flex,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { Rem } from "../../pages/MyRems/MyRems";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

const RemCard = ({ author, content, image, id }: Rem) => {
  const isMobile = useMediaQuery("max-width:600px");
  const navigate = useNavigate();
  return (
    <Card
      style={{
        minWidth: "180px",
        width: isMobile ? "70vw" : "30vh",
        minHeight: "20vh",
        borderRadius: "16px",
        background: "#EBD18D",
        boxShadow: "20px 20px 80px 0px rgba(0, 0, 0, 0.20)",
        margin: "20px 20px"
      }}
    >
      <Card.Section className="h-[19vh] sm:h-[30vh] overflow-hidden">
        <BackgroundImage
          src={image}
          className="w-full h-[19vh] sm:w-full sm:h-[30vh]"
        >
          <Center
            style={{
              background:
                "linear-gradient(180deg, #000 -42.73%, rgba(0, 0, 0, 0.00) 100%)",
            }}
            className="w-full px-2 sm:px-3 pt-2 sm:pt-5 h-full items-start  justify-between"
          >
            <Center className="gap-1 sm:gap-3 w-[80%]">
              <img
                className="w-[20px] h-[20px] sm:w-[40px] sm:h-[40px] rounded-full"
                src={author?.profilePicture}
                alt={author?.name}
              />
              <Text truncate="end" className=" font-bebus tracking-wider text-white">
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
        className="p-3 w-[30vw] sm:w-full"
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
    <Box className="w-full h-full overflow-y-auto overflow-x-visible scrollbar-hide px-10 pb-20 pt-10">
      <Box className="w-full h-[20%] overflow-x-visible mb-5">
        <Text className="text-black font-bebas-neue text-3xl sm:text-4xl xl:text-6xl font-normal text-center">
          {heading}
        </Text>
        <Text className="text-black font-fira-sans text-[1rem] sm:text-base font-normal text-center">
          {subheading}
        </Text>
      </Box>
      <Flex className="flex-wrap justify-evenly w-full overflow-x-visible">
        {rems.map((rem, i) => (
          <RemCard key={i} {...rem} />
        ))}
      </Flex>
    </Box>
  );
};

export default RemsDisplay;
