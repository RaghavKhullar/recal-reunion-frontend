import style from "./remAdapter.module.css";
import { Image } from "@mantine/core";
import React, { useEffect, useState } from "react";
import defaultImage from "../../assets/defaultImage.png"

import { fetchUser } from "../../utils/getRemDetails";

interface Rem {
	_id: string;
	from: string;
	to: string;
	content: string;

	user: {
		name: string;
		image: string;
	};
}

const RemAdapter: React.FC<{ rem: Rem, writtenRems: boolean }> = ({ rem, writtenRems }) => {
	const [userImage, setUserImage] = useState("");
	const fetchUserData = async () => {
		try {
			const response = await fetchUser(writtenRems === true ? rem.to : rem.from);
			setUserImage(response.data.image);
		} catch (error) {
			console.error("Error fetching user image:", error);
		}
	};
	useEffect(() => {
		fetchUserData();
	}, [rem._id]);

	return (
		<div className={style.remField}>
			<Image className={style.image} src={userImage} fallbackSrc={defaultImage} />
			<div className={style.rem}>{rem.content}</div>
		</div>
	);
};

export default RemAdapter;
