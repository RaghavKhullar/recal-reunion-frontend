import React, { useEffect, useState } from "react";
import circle from "../../assets/circle.svg";
import down from "../../assets/down.svg";
import up from "../../assets/up.svg";
import Card from "../../Components/card/card";
import style from "./home.module.css";
import {
	getWrittenRemsByMe,
	getWrittenRemsForMe,
	getUserDetails
} from "../../utils/getRemDetails";
import { showNotification } from "../../utils/helpers";
const Home: React.FC = () => {
	const [remDetailsForMe, setRemDetailsForMe] = useState([]);
	const [remDetailsByMe, setRemDetailsByMe] = useState([]);
	const [userDetails, setUserDetails] = useState<any>();

	const fetchWrittenRemsForMe = async () => {
		try {
			const response = await getWrittenRemsForMe();
			if (response.status === 200) {
				setRemDetailsForMe(response.data);
			} else if (response.status !== 400) {
				showNotification("Error", "Error fetching the rems", "error")
			}
		} catch (error) {
			showNotification("Error", "Error occured while fetching rems", "error")
		}
	};

	const fetchWrittenRemsByMe = async () => {
		try {
			const response = await getWrittenRemsByMe();
			if (response.status === 200) {
				setRemDetailsByMe(response.data);
			} else if (response.status !== 400) {
				showNotification("Error", "Error fetching the rems", "error")
			}
		} catch (error) {
			showNotification("Error", "Error occured while fetching rems", "error")
		}
	};

	const fetchUserDetails = async () => {
		try {
			const response = await getUserDetails();
			if (response.status === 200) {
				setUserDetails(response.data);
			} else {
				showNotification("Error", "User not found", "error")
			}
		} catch (error) {
			showNotification("Error", "Error occured while fetching user details", "error")
		}
	};

	useEffect(() => {
		fetchWrittenRemsForMe();
		fetchWrittenRemsByMe();
		fetchUserDetails();
	}, []);

	return (
		<>
			<div className={style.upper}>
				<div className={style.batch}>
					<div className={style.batchName}>Batch of ‘99</div>
					<div className={style.dummy}>Batch of ‘99</div>
					<div className={style.frame}>
						<div className={style.before}>
							<img src={circle} alt="group" />
							<div className={style.internal}></div>
							<text className={style.textBefore}>Before</text>
						</div>
						<div className={style.after}>
							<img src={circle} alt="group" />
							<div className={style.internal}></div>
							<text className={style.textBefore}>After</text>
						</div>
					</div>
				</div>
				{userDetails && userDetails.oldRem &&
					<div className={style.quote}>
						<div style={{ fontSize: "6.5vw", color: "#411D76" }}>“</div>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<img className={style.up} src={up} alt="up" />
							<div style={{ textAlign: "center" }}>
								{userDetails.oldRem.content}
							</div>
							<img className={style.dowm} src={down} alt="down" />
						</div>
						<div style={{ fontSize: "6.5vw", color: "#411D76" }}>”</div>
					</div>}

			</div>

			<div className={style.background}>
				<div className={style.dome}>
					<div className={style.domeShape}></div>
				</div>
				<div className={style.cardBackground}>
					<Card
						remDetails={remDetailsForMe}
						head1="Here’s what your friends think of you"
						head2="Thoughts from your friends"
					/>
					<Card
						remDetails={remDetailsByMe}
						head1="Here’s what you think of them"
						head2="Personal or Personalized?"
					/>
				</div>
			</div>
		</>
	);
};

export default Home;
