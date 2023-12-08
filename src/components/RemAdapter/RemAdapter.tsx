import style from "./remAdapter.module.css";
import { Image } from "@mantine/core";
import React from "react";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";


const RemAdapter: React.FC<{ rem: Rem, writtenRems: boolean }> = ({ rem, writtenRems }) => {
	const navigate = useNavigate();
	return (
		<div className={style.remField}>
			<Image className={style.image} onClick={() => navigate('/user/' + (writtenRems === true ? rem.to?._id : rem.from?._id))} src={BACKEND_URL + '/images/profiles/' + ((writtenRems === true ? rem.to?.image : rem.from?.image) || "temp.png")} draggable={false} />
			<div onClick={() => navigate('/viewRem/' + (rem.id))} className={style.rem}>{rem.content}</div>
		</div>
	);
};

export default RemAdapter;
