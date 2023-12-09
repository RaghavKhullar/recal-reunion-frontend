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
        minWidth: "300px",
        minHeight: "500px",
        borderRadius: "16px",
        background: "#EBD18D",
        boxShadow: "20px 20px 80px 0px rgba(0, 0, 0, 0.20)",
      }}
    >
      <Card.Section className="h-[300px]">
        <BackgroundImage src={image} className="h-[300px]">
          <Center
            style={{
              background:
                "linear-gradient(180deg, #000 -42.73%, rgba(0, 0, 0, 0.00) 100%)",
            }}
            className="w-full px-5 pt-5 h-full items-start  justify-between"
          >
            <Center className="gap-3">
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={author?.profilePicture}
                alt={author?.name}
              />
              <Text className=" font-bebus tracking-wider text-white">
                {author?.name}
              </Text>
            </Center>
            <Center className="h-[40px]">
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
        className="p-5"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/viewRem/" + id)}
      >
        <Text
          lineClamp={5}
          style={{
            color: "#000",
            fontFamily: "Fira Sans",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "23px",
            letterSpacing: "0.5px",
          }}
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
    <Box className="w-full h-full max-w-[1500px] overflow-y-auto overflow-x-visible scrollbar-hide px-60 pb-20">
      <Box className="w-full h-[20%] overflow-x-visible">
        <Text
          style={{
            color: "#000",
            fontFamily: "Bebas Neue",
            fontSize: "80px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          {heading}
        </Text>
        <Text
          style={{
            color: "#000",
            fontFamily: "Fira Sans",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          {subheading}
        </Text>
      </Box>
      <SimpleGrid className="w-full overflow-x-visible" cols={3}>
        {rems.map((rem, i) => (
          <RemCard key={i} {...rem} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RemsDisplay;
