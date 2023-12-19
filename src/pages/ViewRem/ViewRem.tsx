import styles from "./viewrem.module.css";
import arrow from "../../assets/arrowRem.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import remPin from "../../assets/remPin.svg";
import graphic from "../../assets/writeRemGraphic1.svg";
import { showNotification } from "../../helpers/helpers";
import { useAppDispatch } from "../../redux/store/hooks";
import { getRemFromId } from "../../redux/actions";
import { BACKEND_URL } from "../../../config";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducer";
const ViewRem = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [toName, setToName] = useState<string>("");
  const [fromName, setFromName] = useState<string>("");
  const userId = useSelector(userSelector).currentUser.user?._id;
  const [image, setImage] = useState("");
  const [content, setContent] = useState<string>("");
  const dispatch = useAppDispatch();

  const getRemDetails = async () => {
    if (id === undefined) {
      showNotification("Warning", "No rem exists", "warning");
      navigate("/home");
      return;
    }

    const getRemFromIdDispatch = await dispatch(getRemFromId(id));
    if (getRemFromId.fulfilled.match(getRemFromIdDispatch)) {
      if (getRemFromIdDispatch.payload.status === 200) {
        setFromName(
          userId == getRemFromIdDispatch.payload.data.from._id
            ? "You"
            : getRemFromIdDispatch.payload.data.from.name
        );
        setToName(
          userId == getRemFromIdDispatch.payload.data.to._id
            ? "You"
            : getRemFromIdDispatch.payload.data.to.name
        );
        // This should be changed to default rem image or the existing rem image
        setImage(getRemFromIdDispatch.payload.data.rem.image);
        setContent(getRemFromIdDispatch.payload.data.rem.content);
      } else if (getRemFromIdDispatch.payload.status === 400) {
        showNotification(
          "Warning",
          getRemFromIdDispatch.payload.data.message,
          "warning"
        );
        navigate(`/home`);
      } else {
        showNotification("Error", "Error occured while fetching rem", "error");
        navigate(`/home`);
      }
    } else {
      showNotification("Error", "Error occured while fetching rem", "error");
      navigate(`/home`);
    }
  };

  useEffect(() => {
    getRemDetails();
  }, [id]);

  return (
    <>
      <div className={styles.parent}>
        <div className={styles.coverRem}>
          <div style={{ display: "flex", alignItems: "center",gap:"35px" }}>
            <img
              src={arrow}
              style={{
                width: "3rem",
                paddingBottom: "0.3rem",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/home");
              }}
            />{" "}
            <h1 className={styles.remheading}>
              VIEW A REM ABOUT <span className={styles.red}>{toName}</span>
            </h1>
          </div>
          <div className={styles.remPinParent}>
            <div className={styles.remProfileImage}>
              <div className={styles.remImage}>
                <div className={styles.pinOverlay}>
                  <img src={remPin} className={styles.remPinImage} />
                </div>
                <div className={styles.profilePicOverlay}>
                  <img
                    src={
                      BACKEND_URL +
                      "/images/memory/" +
                      (image && image.length > 0 ? image : "temp")
                    }
                    className={styles.remProfileImage}
                  />
                </div>
              </div>
            </div>
            <img src={graphic} className={styles.arrow} />
            <div style={{ textAlign: "center" }}>
              <h2 className={styles.textAreaHead}>
                {" "}
                A Few words from {fromName}
              </h2>
              <div className={styles.remContent}>{content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRem;
