import React, { useEffect, useState } from "react";
import circle from "../../assets/circle.svg";
import down from "../../assets/down.svg";
import up from "../../assets/up.svg";
import { Card } from "../../components";
import style from "./otherUserProfile.module.css";
import { showNotification } from "../../helpers/helpers";
import { useAppDispatch } from "../../redux/store/hooks";
import { getOtherUserFromId, getPublicRemsOfUser, getRemOfPair } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { userSelector } from "../../redux/reducer";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../config";
import { Button, Center } from "@mantine/core";

const OtherUserProfile: React.FC = () => {
  const [remDetailsForUser, setRemDetailsForUser] = useState<Rem[]>([]);
  const [remDetailsByUser, setRemDetailsByUser] = useState<Rem[]>([]);
  const [otherUserDetails, setOtherUserDetails] =
    useState<GetUserDetailsResponse>();
  const state = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [remExistBetweenPair, setRemExistBetweenPair] = useState<boolean>(false);
  const { id } = useParams();
  const [remId, setRemId] = useState<String>("");

  const fetchPublicRems = async (id: string) => {
    const getPublicRemsOfUserDispatch = await dispatch(getPublicRemsOfUser(id));
    if (getPublicRemsOfUser.fulfilled.match(getPublicRemsOfUserDispatch)) {
      if (getPublicRemsOfUserDispatch.payload.status === 200) {
        if (
          Array.isArray(getPublicRemsOfUserDispatch.payload.data.writtenForUser)
        ) {
          setRemDetailsForUser(
            getPublicRemsOfUserDispatch.payload.data.writtenForUser
          );
        }
        if (
          Array.isArray(getPublicRemsOfUserDispatch.payload.data.writtenByUser)
        ) {
          setRemDetailsByUser(
            getPublicRemsOfUserDispatch.payload.data.writtenByUser
          );
        }
      } else {
        showNotification("Error", "Error occured while fetching rems", "error");
        navigate("/home");
      }
    }
  };
  const fetchOtherUserDetails = async (id: string) => {
    const otherUserDetailsDispatch = await dispatch(getOtherUserFromId(id));
    if (getOtherUserFromId.fulfilled.match(otherUserDetailsDispatch)) {
      if (otherUserDetailsDispatch.payload.status === 200) {
        setOtherUserDetails(otherUserDetailsDispatch.payload.data);
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

  const getWrittenRemOfPair = async (id: string) => {
    const getRemOfPairDispatch = await dispatch(getRemOfPair(id));
    if (getRemOfPair.fulfilled.match(getRemOfPairDispatch)) {
      if (getRemOfPairDispatch.payload.status === 200) {
        setRemId(getRemOfPairDispatch.payload.data.data._id)
        setRemExistBetweenPair(true);
      } else if (getRemOfPairDispatch.payload.status !== 400) {
        setRemExistBetweenPair(false);
        setRemId("");
      } else {
        setRemExistBetweenPair(false);
        setRemId("");
      }
    } else {
      setRemId("");
      setRemExistBetweenPair(false);
    }
  };

  useEffect(() => {
    if (id === state.currentUser?.user?._id) {
      navigate("/home");
      return;
    }
    if (id === undefined) {
      showNotification("Warning", "Invalid User", "warning");
      navigate("/home");
      return;
    }
    fetchOtherUserDetails(id);
    fetchPublicRems(id);
    getWrittenRemOfPair(id);
  }, [id]);

  return (
    <>
      <div className={style.upper}>
        <div className={style.batch}>
          <div className={style.batchName}>
            Batch of ‘99
            <div className={style.strokeBatchName}>Batch of ‘99</div>
          </div>
          <div className={style.frame}>
            {otherUserDetails &&
              otherUserDetails.oldRem &&
              otherUserDetails.oldRem.image &&
              otherUserDetails.oldRem.image.length !== 0 && (
                <div className={style.before}>
                  <img className={style.anchorCircle} src={circle} />
                  <div className={style.internal}>
                    <div>
                      <img
                        src={`${BACKEND_URL}/images/profiles/${otherUserDetails.oldRem.image}`}
                      />
                    </div>
                  </div>
                  <p className={style.textBefore}>Before</p>
                </div>
              )}
            {otherUserDetails &&
              otherUserDetails.user &&
              otherUserDetails.user.image &&
              otherUserDetails.user.image.length !== 0 && (
                <div className={style.after}>
                  <img className={style.anchorCircle} src={circle} />
                  <div className={style.internal}>
                    <div>
                      <img
                        src={`${BACKEND_URL}/images/profiles/${otherUserDetails.user.image}`}
                      />
                    </div>
                  </div>
                  <p className={style.textBefore}>After</p>
                </div>
              )}
          </div>
        </div>


        <div className={style.quote}>
          <Center className="w-full absolute z-[5] justify-evenly -top-10">
            {remExistBetweenPair && remId !== "" && <Button color="#a72343" component="a" href={'/viewRem/' + remId}>
              View Rem
            </Button>}

            <Button color="#a72343" component="a" href={(remExistBetweenPair ? '/editRem/' : '/writeRem/') + id}>
              {remExistBetweenPair ? "Edit Rem" : "Write Rem"}
            </Button>
          </Center>
          {otherUserDetails && otherUserDetails.oldRem && (
            <>
              <div style={{ fontSize: "6.5vw", color: "#411D76" }}>“</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img className={style.up} src={up} />
                <div style={{ textAlign: "center" }}>
                  {otherUserDetails.oldRem.content}
                </div>
                <img className={style.dowm} src={down} />
              </div>
              <div style={{ fontSize: "6.5vw", color: "#411D76" }}>”</div>
            </>
          )}
        </div>

      </div>
      {((otherUserDetails !== undefined && remDetailsForUser.length !== 0) ||
        remDetailsByUser.length !== 0) && (
          <div className={style.background}>
            <div className={style.dome}>
              <div className={style.domeShape}></div>
            </div>
            <div className={style.cardBackground}>
              {remDetailsForUser.length !== 0 && (
                <Card
                  remDetails={remDetailsForUser.slice(
                    0,
                    Math.min(remDetailsForUser.length, 6)
                  )}
                  head1={`Here’s what ${otherUserDetails?.user.name}'s friends think`}
                  head2={`Thoughts from ${otherUserDetails?.user.name}'s friends`}
                  writtenRems={false}
                  isCurrentUser={false}
                  id={id as string}
                />
              )}

              {remDetailsByUser.length !== 0 && (
                <Card
                  remDetails={remDetailsByUser.slice(
                    0,
                    Math.min(remDetailsByUser.length, 6)
                  )}
                  head1={`Here’s what ${otherUserDetails?.user.name} think of others`}
                  head2={`Memories written by ${otherUserDetails?.user.name}`}
                  writtenRems={true}
                  isCurrentUser={false}
                  id={id as string}
                />
              )}
            </div>
          </div>
        )}
    </>
  );
};

export default OtherUserProfile;
