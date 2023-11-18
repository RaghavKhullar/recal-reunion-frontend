import style from "./remAdapter.module.css";
import { Image } from "@mantine/core";
import React from "react";
import { BACKEND_URL } from "../../../config";



const RemAdapter: React.FC<{ rem: Rem, writtenRems: boolean }> = ({ rem, writtenRems }) => {
	return (
		<div className={style.remField}>
			<Image className={style.image} src={BACKEND_URL + '/images/profiles/' + (writtenRems === true ? rem.to?.image : rem.from?.image)} draggable={false} />
			<div className={style.rem}>{rem.content}</div>
		</div>
	);
};

export default RemAdapter;
