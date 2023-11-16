import styles from "./writerem.module.css";
import arrow from "../../assets/arrowRem.svg";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUserDetails";
import { Textarea, FileInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { postRem } from "../../utils/getRemDetails";
import remPin from "../../assets/remPin.svg";
import uploadImage from "../../assets/uploadImage.svg";
import graphic from "../../assets/writeRemGraphic1.svg";

const WriteRem = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [image, setImage] = useState(undefined);
    const [content, setContent] = useState<string>("");
    const [file, setFile] = useState<File | undefined>(undefined);

    const getName = async () => {
        let res = await getUser(id);
        setName(res.data.data.name);
        setImage(res.data.image);
    }

    useEffect(() => {
        getName();
    }, [])

    return (
        <>  <img src={graphic} style={{ position: "absolute", left: "45%" }} />
            <div className={styles.coverRem}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={arrow} style={{ width: '3rem', paddingBottom: "0.3rem", cursor: "pointer" }} onClick={() => { navigate("/home") }} /> <h1 className={styles.remheading}>WRITE A REM ABOUT <span className={styles.red}>{name}</span></h1>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ padding: "2rem", backgroundColor: "#A72343", marginTop: "2rem", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.35)", width: "34rem", height: "34rem" }}>
                            <img src={remPin} style={{ position: "absolute", left: "8rem", top: "15rem", width: "8rem", maxHeight: "8rem" }} />
                            <img src={file ? URL.createObjectURL(file) : image} style={{ maxWidth: "30rem", border: "0.2rem solid white", maxHeight: "30rem" }} />
                        </div>

                        <FileInput
                            accept="image/png,image/jpeg,image/jpg"
                            // @ts-ignore
                            onChange={(e) => setFile(e)}
                            // @ts-ignore
                            placeholder={<img src={uploadImage} />}
                            clearable
                            value={file}
                            style={{ marginTop: "2rem", width: "10rem", marginLeft: "auto", marginRight: "auto" }}
                            styles={{
                                input: { padding: 0 },
                            }}
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <h2 className={styles.textAreaHead}> A Few words about me</h2>
                        <Textarea onChange={(e) => setContent(e.target.value)} styles={{
                            input: { height: '25rem', width: "40rem", backgroundColor: "transparent", border: "3px solid #411D76", borderRadius: "10px", fontFamily: "'Fira Sans', sans-serif", fontSize: "1.5rem", overflowY: "auto" },
                        }} />
                        <button className={styles.remBtn} onClick={() => postRem(file, content, id)}>Submit</button>

                    </div>

                </div>

            </div>

        </>
    )
}


export default WriteRem;