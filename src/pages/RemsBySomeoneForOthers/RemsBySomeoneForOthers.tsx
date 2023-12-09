import { Center, Loader } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../config";
import RemsDisplay from "../../components/RemsDisplay/RemsDisplay";
import { getOtherUserFromId, getPublicRemsOfUser } from "../../redux/actions";
import { useAppDispatch } from "../../redux/store/hooks";
import { useEffect, useState } from "react";
import { showNotification } from "../../helpers/helpers";
import { userSelector } from "../../redux/reducer";
import { useSelector } from "react-redux";

const RemsBySomeoneForOthers = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [remDetailsForUser, setRemDetailsForUser] = useState<Rem[] | null>(
    null
  );
  const state = useSelector(userSelector);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (id === state.currentUser?.user?._id) {
      navigate("/remsByMe");
      return;
    }
    if (id === undefined) {
      showNotification("Warning", "Invalid User", "warning");
      navigate("/home");
      return;
    }

    const fetchPublicRems = async (id: string) => {
      const getPublicRemsOfUserDispatch = await dispatch(
        getPublicRemsOfUser(id)
      );
      if (getPublicRemsOfUser.fulfilled.match(getPublicRemsOfUserDispatch)) {
        if (getPublicRemsOfUserDispatch.payload.status === 200) {
          if (
            Array.isArray(
              getPublicRemsOfUserDispatch.payload.data.writtenByUser
            )
          ) {
            setRemDetailsForUser(
              getPublicRemsOfUserDispatch.payload.data.writtenByUser
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

    const fetchOtherUserDetails = async (id: string) => {
      const otherUserDetailsDispatch = await dispatch(getOtherUserFromId(id));
      if (getOtherUserFromId.fulfilled.match(otherUserDetailsDispatch)) {
        if (otherUserDetailsDispatch.payload.status === 200) {
          setName(otherUserDetailsDispatch.payload.data.user.name);
        } else {
          showNotification("Error", "User not found", "error");
          navigate("/login");
        }
      } else {
        showNotification(
          "Error",
          "Error occured while fetching user details",
          "error"
        );
        navigate("/login");
      }
    };

    fetchPublicRems(id);
    fetchOtherUserDetails(id);
  }, [id, state.currentUser.user?._id]);

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
        profilePicture:
          BACKEND_URL + "/images/profiles/" + (rem.to?.image || "temp"),
        name: rem.to?.name || "",
        link: "/user/" + rem.to?._id,
      },
      content: rem.content || "",
      image: BACKEND_URL + "/images/memory/" + (rem.image || "temp"),
      id: rem.id,
    };
  });

  return (
    <Center className="w-full h-full">
      <RemsDisplay
        heading={`Here’s what ${name} think of people`}
        subheading="A collection of all the memories they've shared"
        rems={rems}
      />
    </Center>
  );
};

export default RemsBySomeoneForOthers;
