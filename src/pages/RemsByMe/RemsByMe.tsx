import { useSelector } from "react-redux";
import RemsDisplay from "../../components/RemsDisplay/RemsDisplay";
import { userSelector } from "../../redux/reducer";
import { Center, Loader } from "@mantine/core";
import { BACKEND_URL } from "../../../config";

export type Rem = {
  author?: {
    profilePicture: string;
    name: string;
  };
  content: string;
  image: string;
};

const RemsByMe = () => {
  const state = useSelector(userSelector);

  if (
    !state.currentUser ||
    !state.currentUser.writtenByUser ||
    !state.currentUser.writtenByUser.rems ||
    state.currentUser.writtenByUser.isFetching
  ) {
    return (
      <Center className="w-full h-full">
        <Loader />
      </Center>
    );
  }

  const rems = state.currentUser.writtenByUser.rems.map((rem) => ({
    author: {
      profilePicture: BACKEND_URL + "/images/profiles/" + rem.to?.image || "",
      name: rem.to?.name || "",
      link: "/user/" + rem.to?._id,
    },
    content: rem.content || "",
    image: BACKEND_URL + "/images/memory/" + (rem.image || ""),
  }));

  return (
    <Center className="w-full h-full">
      <RemsDisplay
        heading="Here’s what you think of them"
        subheading="A collection of all the memories you’ve shared"
        rems={rems}
      />
    </Center>
  );
};

export default RemsByMe;
