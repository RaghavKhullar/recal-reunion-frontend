import { useSelector } from "react-redux";
import RemsDisplay from "../../components/RemsDisplay/RemsDisplay";
import { userSelector } from "../../redux/reducer";
import { Center, Loader } from "@mantine/core";
import { BACKEND_URL } from "../../../config";

export type Rem = {
  author?: {
    profilePicture: string;
    name: string;
    link: string;
  };
  content: string;
  image: string;
  id: string;
};

const MyRems = () => {
  const state = useSelector(userSelector);

  if (
    !state.currentUser ||
    !state.currentUser.writtenForUser ||
    !state.currentUser.writtenForUser.rems ||
    state.currentUser.writtenForUser.isFetching
  ) {
    return (
      <Center className="w-full h-full">
        <Loader />
      </Center>
    );
  }

  const rems = state.currentUser.writtenForUser.rems.map((rem) => ({
    author: {
      profilePicture: BACKEND_URL + "/images/profiles/" + (rem.from?.image || "temp"),
      name: rem.from?.name || "",
      link: "/user/" + rem.from?._id,
    },
    content: rem.content || "",
    image: BACKEND_URL + "/images/memory/" + (rem.image || "temp"),
    id: rem.id
  }));

  return (
    <Center className="w-full h-full">
      <RemsDisplay
        heading="Here’s what we think of you"
        subheading="A collection of thoughts and memories from your friends and by your friends"
        rems={rems}
      />
    </Center>
  );
};

export default MyRems;
