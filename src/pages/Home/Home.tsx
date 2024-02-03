import React, { useEffect, useState } from "react";
import circle from "../../assets/circle.svg";
import down from "../../assets/down.svg";
import up from "../../assets/up.svg";
import { Card } from "../../components";
import style from "./home.module.css";
import { showNotification } from "../../helpers/helpers";
import { useAppDispatch } from "../../redux/store/hooks";
import {
  getCurrentUser,
  getRemsWrittenByMe,
  getRemsWrittenForMe,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../redux/reducer";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../config";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Text } from "@mantine/core";
// @ts-ignore
import { MapInteractionCSS } from "react-map-interaction";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
const ImageModal = ({
  url,
  opened,
  close,
  setImgUrl,
}: {
  url: string;
  opened: boolean;
  close: () => void;
  setImgUrl: (url: string) => void;
}) => {
  return (
    <Modal
      centered
      opened={opened && url.length > 0}
      size={"xl"}
      onClose={() => {
        setImgUrl("");
        close();
      }}
      title="Zoom in or out image"
    >
      <MapInteractionCSS>
        <img src={url} />
      </MapInteractionCSS>
    </Modal>
  );
};

const Home: React.FC = () => {
  const [remDetailsForMe, setRemDetailsForMe] = useState<Rem[]>([]);
  const [remDetailsByMe, setRemDetailsByMe] = useState<Rem[]>([]);
  const [userDetails, setUserDetails] = useState<GetUserDetailsResponse>();
  const state = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const fetchWrittenRemsForMe = async () => {
    const getWrittenRemsByForDispatch = await dispatch(getRemsWrittenForMe());
    if (getRemsWrittenForMe.fulfilled.match(getWrittenRemsByForDispatch)) {
      if (getWrittenRemsByForDispatch.payload.status === 200) {
        if (Array.isArray(getWrittenRemsByForDispatch.payload.data.data)) {
          setRemDetailsForMe(getWrittenRemsByForDispatch.payload.data.data);
        } else {
          showNotification("Error", "Error fetching the rems", "error");
        }
      } else if (getWrittenRemsByForDispatch.payload.status !== 400) {
        showNotification("Error", "Error fetching the rems", "error");
      } else {
        showNotification("Error", "Error occured while fetching rems", "error");
        navigate("/login");
      }
    }
  };

  const fetchWrittenRemsByMe = async () => {
    const getWrittenRemsByMeDispatch = await dispatch(getRemsWrittenByMe());
    if (getRemsWrittenByMe.fulfilled.match(getWrittenRemsByMeDispatch)) {
      if (getWrittenRemsByMeDispatch.payload.status === 200) {
        if (Array.isArray(getWrittenRemsByMeDispatch.payload.data.data)) {
          setRemDetailsByMe(getWrittenRemsByMeDispatch.payload.data.data);
        } else {
          showNotification("Error", "Error fetching the rems", "error");
        }
      } else if (getWrittenRemsByMeDispatch.payload.status !== 400) {
        showNotification("Error", "Error fetching the rems", "error");
      } else {
        showNotification("Error", "Error occured while fetching rems", "error");
        navigate("/login");
      }
    }
  };

  const fetchUserDetails = async () => {
    const loginDispatch = await dispatch(getCurrentUser());
    if (getCurrentUser.fulfilled.match(loginDispatch)) {
      if (loginDispatch.payload.status === 200) {
        setUserDetails(loginDispatch.payload.data);
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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (state.loggedIn && !state.isFetching) {
      fetchWrittenRemsForMe();
      fetchWrittenRemsByMe();
    }
  }, [state.loggedIn]);
  const getSocialIcon = (name: string) => {
    switch (name) {
      case "Facebook":
        return <IconBrandFacebook color="black" size={40} />;

      case "LinkedIn":
        return <IconBrandLinkedin color="black" size={40} />;

      case "X":
        return <IconBrandX color="black" size={40} />;

      case "Instagram":
        return <IconBrandInstagram color="black" size={40} />;
    }
  };
  return (
    <>
      <div className={style.upper}>
        <div className={style.batch}>
          <div className={style.batchName}>
            Batch of ‘99
            <div className={style.strokeBatchName}>Batch of ‘99</div>
          </div>
          <div className={style.frame}>
            {userDetails &&
              userDetails.oldRem &&
              userDetails.oldRem.image &&
              userDetails.oldRem.image.length !== 0 && (
                <div className={style.before}>
                  <img className={style.anchorCircle} src={circle} />
                  <div className={style.internal}>
                    <div>
                      <img
                        src={`${BACKEND_URL}/images/memory/${userDetails.oldRem.image}`}
                        className="cursor-pointer object-contain "
                        onClick={() => {
                          setImgUrl(
                            `${BACKEND_URL}/images/memory/${
                              userDetails.oldRem
                                ? userDetails.oldRem.image
                                : "defaultImage.jpg"
                            }`
                          );
                          open();
                        }}
                      />
                    </div>
                  </div>
                  <p className={style.textBefore}>Before</p>
                </div>
              )}
            {userDetails &&
              userDetails.user &&
              userDetails.user.image &&
              userDetails.user.image.length !== 0 && (
                <div className={style.after}>
                  <img className={style.anchorCircle} src={circle} />
                  <div className={style.internal}>
                    <div>
                      <img
                        src={`${BACKEND_URL}/images/profiles/${userDetails.user.image}`}
                        className="cursor-pointer object-contain "
                        onClick={() => {
                          setImgUrl(
                            `${BACKEND_URL}/images/profiles/${userDetails.user.image}`
                          );
                          open();
                        }}
                      />
                    </div>
                  </div>
                  <p className={style.textBefore}>After</p>
                </div>
              )}
          </div>
        </div>
        {userDetails && userDetails.oldRem && (
          <div className={style.quote}>
            <div style={{ fontSize: "6.5vw", color: "#411D76" }}>“</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img className={style.up} src={up} />
              <div style={{ textAlign: "center" }}>
                {userDetails.oldRem.content}
              </div>
              <img className={style.dowm} src={down} />
            </div>
            <div style={{ fontSize: "6.5vw", color: "#411D76" }}>”</div>
          </div>
        )}
        {userDetails && userDetails.user && (
          <div className={style.quote} style={{ marginTop: "5vh" }}>
            <div style={{ fontSize: "6.5vw", color: "#411D76" }}>“</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img className={style.up} src={up} />
              <div className={style.userDetails}>
                <div>
                  {userDetails.user.name.length > 0 && (
                    <Text truncate className="font-fira">
                      <span
                        style={{ color: "red", textTransform: "uppercase" }}
                      >
                        Name:{" "}
                      </span>
                      {userDetails.user.name}
                    </Text>
                  )}
                  {userDetails.user.email.length > 0 && (
                    <Text truncate className="font-fira">
                      <span
                        style={{ color: "red", textTransform: "uppercase" }}
                      >
                        Email:{" "}
                      </span>
                      {userDetails.user.email}
                    </Text>
                  )}
                  {userDetails.user.department.length > 0 && (
                    <Text truncate className="font-fira">
                      <span
                        style={{ color: "red", textTransform: "uppercase" }}
                      >
                        Department:{" "}
                      </span>
                      {userDetails.user.department}
                    </Text>
                  )}

                  {userDetails.user.dateOfBirth.length > 0 && (
                    <Text truncate className="font-fira">
                      <span
                        style={{ color: "red", textTransform: "uppercase" }}
                      >
                        DOB:{" "}
                      </span>
                      {userDetails.user.dateOfBirth}
                    </Text>
                  )}
                  <div className={style.socials}>
                    {userDetails.user.facebook &&
                      userDetails.user.facebook.length > 0 &&
                      (userDetails.user.facebook.includes("facebook.com") ? (
                        <a href={userDetails.user.facebook} target="_blank">
                          {getSocialIcon("Facebook")}
                        </a>
                      ) : (
                        <a
                          href={
                            "https://facebook.com/" + userDetails.user.facebook
                          }
                          target="_blank"
                        >
                          {getSocialIcon("Facebook")}
                        </a>
                      ))}
                    {userDetails.user.linkedin &&
                      userDetails.user.linkedin.length > 0 &&
                      (userDetails.user.linkedin.includes("linkedin.com") ? (
                        <a href={userDetails.user.linkedin} target="_blank">
                          {getSocialIcon("LinkedIn")}
                        </a>
                      ) : (
                        <a
                          href={
                            "https://linkedin.com/in/" +
                            userDetails.user.linkedin
                          }
                          target="_blank"
                        >
                          {getSocialIcon("LinkedIn")}
                        </a>
                      ))}
                    {userDetails.user.x &&
                      userDetails.user.x.length > 0 &&
                      (userDetails.user.x.includes("twitter.com") ? (
                        <a href={userDetails.user.x} target="_blank">
                          {getSocialIcon("X")}
                        </a>
                      ) : (
                        <a
                          href={"https://twitter.com/" + userDetails.user.x}
                          target="_blank"
                        >
                          {getSocialIcon("X")}
                        </a>
                      ))}
                    {userDetails.user.instagram &&
                      userDetails.user.instagram.length > 0 &&
                      (userDetails.user.instagram.includes("instagram.com") ? (
                        <a href={userDetails.user.instagram} target="_blank">
                          {getSocialIcon("Instagram")}
                        </a>
                      ) : (
                        <a
                          href={
                            "https://instagram.com/" +
                            userDetails.user.instagram
                          }
                          target="_blank"
                        >
                          {getSocialIcon("Instagram")}
                        </a>
                      ))}
                  </div>
                </div>
                <div>
                  <Text className="font-fira text-transform">
                    <span style={{ color: "red", textTransform: "uppercase" }}>
                      Bio:{" "}
                    </span>
                    {userDetails.user.aboutMe}
                  </Text>
                </div>
              </div>
              <img className={style.dowm} src={down} />
            </div>
            <div style={{ fontSize: "6.5vw", color: "#411D76" }}>”</div>
          </div>
        )}
      </div>
      {(remDetailsForMe.length !== 0 || remDetailsByMe.length !== 0) && (
        <div className={style.background}>
          <div className={style.dome}>
            <div className={style.domeShape}></div>
          </div>
          <div className={style.cardBackground}>
            {remDetailsForMe.length !== 0 && (
              <Card
                remDetails={remDetailsForMe.slice(
                  0,
                  Math.min(remDetailsForMe.length, 6)
                )}
                head1="Here’s what your friends wrote about you"
                head2="Thoughts from your friends"
                writtenRems={false}
                isCurrentUser={true}
              />
            )}

            {remDetailsByMe.length !== 0 && (
              <Card
                remDetails={remDetailsByMe.slice(
                  0,
                  Math.min(remDetailsByMe.length, 6)
                )}
                head1="Here’s what you think of your friends"
                head2="Memories written by you"
                writtenRems={true}
                isCurrentUser={true}
              />
            )}
          </div>
        </div>
      )}
      <ImageModal
        url={imgUrl}
        close={close}
        opened={opened}
        setImgUrl={setImgUrl}
      />
    </>
  );
};

export default Home;
