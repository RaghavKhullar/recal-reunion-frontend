import { Center, Loader } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../config";
import RemsDisplay from "../../components/RemsDisplay/RemsDisplay";
import { getPublicRemsOfUser } from "../../redux/actions";
import { useAppDispatch } from "../../redux/store/hooks";
import { useEffect, useState } from "react";
import { showNotification } from "../../helpers/helpers";

const RemsByOthersForSomeone = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [remDetailsForUser, setRemDetailsForUser] = useState<Rem[] | null>(
    null
  );

  useEffect(() => {
    const fetchPublicRems = async (id: string) => {
      const getPublicRemsOfUserDispatch = await dispatch(
        getPublicRemsOfUser(id)
      );
      if (getPublicRemsOfUser.fulfilled.match(getPublicRemsOfUserDispatch)) {
        if (getPublicRemsOfUserDispatch.payload.status === 200) {
          if (
            Array.isArray(
              getPublicRemsOfUserDispatch.payload.data.writtenForUser
            )
          ) {
            setRemDetailsForUser(
              getPublicRemsOfUserDispatch.payload.data.writtenForUser
            );
          }
        } else {
          showNotification(
            "Error",
            "Error occured while fetching rems",
            "error"
          );
          navigate("/home");
        }
      }
    };
    fetchPublicRems(id || "");
  }, [id]);

  if (!remDetailsForUser) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  const rems = remDetailsForUser.map((rem) => {
    return {
      author: {
        profilePicture: BACKEND_URL + "/images/profiles/" + rem.to?.image || "",
        name: rem.to?.name || "",
        link: "/user/" + rem.to?._id,
      },
      content: rem.content || "",
      image: BACKEND_URL + "/images/memory/" + (rem.image || ""),
    };
  });

  return (
    <Center className="w-full h-full">
      <RemsDisplay
        heading="Here’s what people think of them"
        subheading="A collection of all the memories they've shared"
        rems={rems}
      />
    </Center>
  );
};

export default RemsByOthersForSomeone;
