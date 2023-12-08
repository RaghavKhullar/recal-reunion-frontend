import styles from "./viewrem.module.css";
import arrow from "../../assets/arrowRem.svg";
import { useParams } from 'react-router-dom';
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
            navigate('/home');
            return;
        }
        
        const getRemFromIdDispatch = await dispatch(getRemFromId(id));
        if (getRemFromId.fulfilled.match(getRemFromIdDispatch)) {
            if (getRemFromIdDispatch.payload.status === 200) {
                setFromName(userId == getRemFromIdDispatch.payload.data.from._id ? "You" : getRemFromIdDispatch.payload.data.from.name);
                setToName(userId == getRemFromIdDispatch.payload.data.to._id ? "You" : getRemFromIdDispatch.payload.data.to.name);
                // This should be changed to default rem image or the existing rem image
                setImage(getRemFromIdDispatch.payload.data.rem.image);
                setContent(getRemFromIdDispatch.payload.data.rem.content);
            } else if (getRemFromIdDispatch.payload.status === 400) {
                showNotification("Warning", getRemFromIdDispatch.payload.data.message, "warning");
                navigate(`/home`);
            } else {
                showNotification("Error", "Error occured while fetching rem", "error");
                navigate(`/home`);
            }
        } else {
            showNotification("Error", "Error occured while fetching rem", "error");
            navigate(`/home`);
        }
    }

    useEffect(() => {
        getRemDetails();
    }, [id]);

    return (
        <>
            <img src={graphic} style={{ position: "absolute", left: "45%" }} />
            <div className={styles.coverRem}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={arrow} style={{ width: '3rem', paddingBottom: "0.3rem", cursor: "pointer" }} onClick={() => { navigate("/home") }} /> <h1 className={styles.remheading}>VIEW A REM ABOUT <span className={styles.red}>{toName}</span></h1>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ padding: "2rem", backgroundColor: "#A72343", marginTop: "2rem", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.35)", width: "34rem", height: "34rem" }}>
                            <img src={remPin} style={{ position: "absolute", left: "8rem", top: "15rem", width: "8rem", maxHeight: "8rem" }} />
                            <img src={BACKEND_URL + '/images/memory/' + (image && image.length > 0 ? image : "temp")} style={{ maxWidth: "30rem", border: "0.2rem solid white", maxHeight: "30rem" }} />
                        </div>

                    </div>
                    <div style={{ textAlign: "center" }}>
                        <h2 className={styles.textAreaHead}> A Few words from {fromName}</h2>
                        <div style={
                            { height: '32rem', width: "40rem", backgroundColor: "transparent", border: "3px solid #411D76", borderRadius: "10px", fontFamily: "'Fira Sans', sans-serif", fontSize: "1.5rem", overflowY: "auto", textAlign: "left" }
                        } >
                            {content}
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}


export default ViewRem;