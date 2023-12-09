import { Image, Button } from "@mantine/core";
import style from "./style.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config";
import { useAppDispatch } from "../../redux/store/hooks";
import { changePrivacy } from "../../redux/actions/";
import { showNotification } from "../../helpers/helpers";
const imageParentCss = {
  border: "2px solid #411D76",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  borderRadius: "50%",
  overflow: "hidden",
};

const NotificationAdapter = ({
  rem,
  toggleNotification,
}: {
  rem: Rem;
  toggleNotification: () => void;
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const changeRemPrivacy = async () => {
    setIsFetching(true);
    const changeRemPrivacyDispatch = await dispatch(
      changePrivacy({ id: rem.id, privacy: rem.isPrivate })
    );
    if (changePrivacy.fulfilled.match(changeRemPrivacyDispatch)) {
      if (changeRemPrivacyDispatch.payload.status === 200) {
        showNotification("Success", "Privacy of rem changed", "success");
      } else if (changeRemPrivacyDispatch.payload.status !== 400) {
        showNotification(
          "Error",
          changeRemPrivacyDispatch.payload.data.message,
          "error"
        );
      } else {
        showNotification("Error", "No rem exists", "error");
      }
    } else {
      showNotification("Error", "Error occuredu", "error");
    }
    setIsFetching(false);
  };

  return (
    <>
      <div className={style.remField}>
        <Link
          style={{ ...imageParentCss, width: "calc(10%)" }}
          to={"/user/" + rem.from?._id}
          className={style.imageParent}
        >
          <Image
            className={style.image}
            src={
              BACKEND_URL +
              "/images/profiles/" +
              (rem.from?.image || "temp.png")
            }
            draggable={false}
          />
        </Link>
        <div
          onClick={() => {
            navigate("/viewRem/" + rem.id);
            toggleNotification();
          }}
          onMouseOver={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          className={style.rem}
        >
          <span>{rem.from?.name} wrote: </span> <br />"{rem.content}"
        </div>
        <div className={style.button}>
          {isVisible === true ? (
            <div style={{ ...imageParentCss, width: "50%" }}>
              <Image
                className={style.image}
                src={
                  BACKEND_URL +
                  "/images/memory/" +
                  (rem.image && rem.image.length > 0 ? rem.image : "temp.png")
                }
                draggable={false}
              />{" "}
            </div>
          ) : (
            <Button
              color="#A72343"
              onClick={changeRemPrivacy}
              disabled={isFetching}
            >
              {rem.isPrivate ? "Approve ?" : "Disapprove ?"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationAdapter;
