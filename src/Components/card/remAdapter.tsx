import "../card/remAdapter.css";

import React, { useEffect,useState } from "react";

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

const RemAdapter: React.FC<{ rem: Rem }> = ({ rem }) => {
	const [userImage, setUserImage] = useState("");

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const { userImage } = await fetchUser(rem.from);
				setUserImage(userImage);
			} catch (error) {
				console.error("Error fetching user image:", error);
			}
		};

		fetchUserData();
	}, [rem.from]);

	return (
		<div className="remField">
			<img className="image" src={userImage} alt="profile photo" />
			<p className="rem">{rem.content}</p>
		</div>
	);
};

export default RemAdapter;
