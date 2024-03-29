import styles from "./editrem.module.css";
import arrow from "../../assets/arrowRem.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Textarea, FileInput } from "@mantine/core";
import { useEffect, useState } from "react";
import remPin from "../../assets/remPin.svg";
import uploadImage from "../../assets/uploadImage.svg";
import graphic from "../../assets/writeRemGraphic1.svg";
import { showNotification } from "../../helpers/helpers";
import { useAppDispatch } from "../../redux/store/hooks";
import { getRemOfPair, writeRem } from "../../redux/actions";
import { getOtherUserFromId } from "../../redux/actions/User/UserAction";
import { BACKEND_URL } from "../../../config";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducer";
const EditRem = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [image, setImage] = useState("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const dispatch = useAppDispatch();
  const userId = useSelector(userSelector).currentUser.user?._id;
  const [isFileUpdated, setIsFileUpdated] = useState<boolean>(false);

  const getDetails = async () => {
    if (id === userId) {
      navigate("/home");
      return;
    }
    if (id === undefined) {
      showNotification("Warning", "Invalid User", "warning");
      navigate("/home");
      return;
    }
    const getOtherUserFromIdDispatch = await dispatch(getOtherUserFromId(id));
    if (getOtherUserFromId.fulfilled.match(getOtherUserFromIdDispatch)) {
      if (getOtherUserFromIdDispatch.payload.status === 200) {
        setName(getOtherUserFromIdDispatch.payload.data.user.name);
        // This should be changed to default rem image or the existing rem image
        setImage(getOtherUserFromIdDispatch.payload.data.user.image);
      } else {
        showNotification("Error", "Some error occured", "error");
        navigate(`/home`);
      }
    } else {
      showNotification(
        "Error",
        "Error occured while fetching user details",
        "error"
      );
      navigate(`/home`);
    }
  };

  const getWrittenRemOfPair = async () => {
    if (id === userId) {
      showNotification("Warning", "Cant'edit rem for yourself", "warning");
      navigate("/home");
      return;
    }
    if (id === undefined) {
      showNotification("Warning", "Invalid User", "warning");
      navigate("/home");
      return;
    }

    const getRemOfPairDispatch = await dispatch(getRemOfPair(id));
    if (getRemOfPair.fulfilled.match(getRemOfPairDispatch)) {
      if (getRemOfPairDispatch.payload.status === 200) {
        setContent(getRemOfPairDispatch.payload.data.data.content);
        if (
          getRemOfPairDispatch.payload.data.data.image &&
          getRemOfPairDispatch.payload.data.data.image.length > 0
        ) {
          try {
            const response = await fetch(
              BACKEND_URL +
                "/images/memory/" +
                getRemOfPairDispatch.payload.data.data.image,
              { method: "get", mode: "cors" }
            );
            const blob = await response.blob();
            // Change the image name here
            const file = new File([blob], "image.jpg", { type: blob.type });
            setFile(file);
          } catch (error) {
            showNotification(
              "Error",
              "Error occured while fetching rem image",
              "error"
            );
          }
        }
      } else if (getRemOfPairDispatch.payload.status !== 400) {
        showNotification(
          "Error",
          "Error occured while fetching rem details",
          "error"
        );
        navigate(`/user/` + id);
      } else {
        showNotification("Info", "No rem written for the user", "info");
        navigate(`/writeRem/` + id);
      }
    } else {
      showNotification(
        "Error",
        "Error occured while fetching rem details",
        "error"
      );
      navigate(`/user/` + id);
    }
  };

  useEffect(() => {
    getWrittenRemOfPair();
    getDetails();
  }, []);

  const postRem = async (
    file: File | undefined,
    content: string,
    to: string | undefined
  ) => {
    if (content.length === 0) {
      showNotification("Warning", "Content of Rem can't be empty", "warning");
      return;
    } else if (to === undefined || to === null) {
      showNotification("Warning", "Invalid user", "warning");
      navigate("/home");
      return;
    } else {
      const writeRemDispatch = await dispatch(
        writeRem({
          file: file,
          content: content,
          to: to,
          isFileUpdated: isFileUpdated,
        })
      );
      if (writeRem.fulfilled.match(writeRemDispatch)) {
        if (writeRemDispatch.payload.status === 200) {
          showNotification("Success", "Rem updated successfully", "success");
          navigate("/user/" + id);
        } else {
          showNotification("Error", "Some error occured", "error");
          navigate(`/user/` + id);
        }
      } else {
        showNotification("Error", "Error occured while updating rem", "error");
        navigate(`/user/` + id);
      }
    }
  };

  return (
    <>
      <div className={styles.parent}>
        <div className={styles.coverRem}>
          <div style={{ display: "flex", alignItems: "center", gap: "35px" }}>
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
              EDIT A REM ABOUT <span className={styles.red}>{name}</span>
            </h1>
          </div>
          <div className={styles.remPinParent}>
            <div className={styles.remProfileImageDiv}>
              <div className={styles.remImage}>
                <div className={styles.pinOverlay}>
                  <img src={remPin} className={styles.remPinImage} />
                </div>
                <div className={styles.profilePicOverlay}>
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : BACKEND_URL +
                          "/images/profiles/" +
                          (image && image.length > 0 ? image : "temp")
                    }
                    className={styles.remProfileImage}
                  />
                </div>
              </div>
              <div
                style={{
                  width: "fit-content",
                  alignSelf: "center",
                  display: "flex",
                  marginTop: "7px",
                }}
              >
                <FileInput
                  accept="image/png,image/jpeg,image/jpg"
                  // @ts-ignore
                  onChange={(e) => {
                    setFile(e === null ? undefined : e);
                    if (!isFileUpdated) {
                      // Send the file only when file is updated
                      setIsFileUpdated(true);
                    }
                  }}
                  // @ts-ignore
                  placeholder={<img src={uploadImage} />}
                  clearable
                  value={file}
                  styles={{
                    input: { padding: 0 },
                  }}
                />
              </div>
            </div>
            <img src={graphic} className={styles.arrow} />
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <h2 className={styles.textAreaHead}> A Few words about me</h2>
              <Textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                classNames={{
                  input: styles.remContent,
                }}
              />
              <button
                className={styles.remBtn}
                onClick={() => postRem(file, content, id)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRem;
