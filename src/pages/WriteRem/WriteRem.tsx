import styles from "./writerem.module.css";
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
const WriteRem = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [image, setImage] = useState("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const dispatch = useAppDispatch();
  const userId = useSelector(userSelector).currentUser.user?._id;

  const getDetails = async () => {
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
        showNotification("Info", "Already Written rem", "info");
        navigate(`/editRem/` + id);
      } else if (getRemOfPairDispatch.payload.status !== 400) {
        showNotification(
          "Error",
          "Error occured while fetching rem details",
          "error"
        );
        navigate(`/user/` + id);
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
        writeRem({ file: file, content: content, to: to, isFileUpdated: true })
      );
      if (writeRem.fulfilled.match(writeRemDispatch)) {
        if (writeRemDispatch.payload.status === 200) {
          showNotification("Success", "Rem written successfully", "success");
          navigate("/user/" + id);
        } else {
          showNotification("Error", "Some error occured", "error");
          navigate(`/user/` + id);
        }
      } else {
        showNotification("Error", "Error occured while writing rem", "error");
        navigate(`/user/` + id);
      }
    }
  };

  return (
    <>
      <img src={graphic} style={{ position: "absolute", left: "45%" }} />
      <div className={styles.coverRem}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={arrow}
            style={{
              width: "3rem",
              paddingBottom: "0.3rem",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/user/" + id);
            }}
          />{" "}
          <h1 className={styles.remheading}>
            WRITE A REM ABOUT <span className={styles.red}>{name}</span>
          </h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                padding: "2rem",
                backgroundColor: "#A72343",
                marginTop: "2rem",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.35)",
                width: "34rem",
                height: "34rem",
              }}
            >
              <img
                src={remPin}
                style={{
                  position: "absolute",
                  left: "8rem",
                  top: "15rem",
                  width: "8rem",
                  maxHeight: "8rem",
                }}
              />
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : BACKEND_URL + "/images/profiles/" + image
                }
                style={{
                  maxWidth: "30rem",
                  border: "0.2rem solid white",
                  maxHeight: "30rem",
                }}
              />
            </div>

            <FileInput
              accept="image/png,image/jpeg,image/jpg"
              // @ts-ignore
              onChange={(e) => setFile(e)}
              // @ts-ignore
              placeholder={<img src={uploadImage} />}
              clearable
              value={file}
              style={{
                marginTop: "2rem",
                width: "10rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              styles={{
                input: { padding: 0 },
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h2 className={styles.textAreaHead}> A Few words about me</h2>
            <Textarea
              onChange={(e) => setContent(e.target.value)}
              styles={{
                input: {
                  height: "25rem",
                  width: "40rem",
                  backgroundColor: "transparent",
                  border: "3px solid #411D76",
                  borderRadius: "10px",
                  fontFamily: "'Fira Sans', sans-serif",
                  fontSize: "1.5rem",
                  overflowY: "auto",
                },
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
    </>
  );
};

export default WriteRem;
