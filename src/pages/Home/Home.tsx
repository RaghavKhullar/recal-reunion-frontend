import React, { useEffect, useState } from "react";
import circle from "../../assets/circle.svg";
import down from "../../assets/down.svg";
import up from "../../assets/up.svg";
import Card from "../../Components/Card/Card";
import style from "./home.module.css";
import {
	getWrittenRemsByMe,
	getWrittenRemsForMe,
	getUserDetails
} from "../../utils/getRemDetails";
import { showNotification } from "../../utils/helpers";

const Home: React.FC = () => {
	const [remDetailsForMe, setRemDetailsForMe] = useState<any[]>([]);
	const [remDetailsByMe, setRemDetailsByMe] = useState<any[]>([]);
	const [userDetails, setUserDetails] = useState<any>();

	const fetchWrittenRemsForMe = async () => {
		try {
			const response = await getWrittenRemsForMe();
			if (response.status === 200) {
				if (Array.isArray(response.data.data)) {
					setRemDetailsForMe(response.data.data);
				}
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
				if (Array.isArray(response.data.data)) {
					setRemDetailsByMe(response.data.data);
				}
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
					<div className={style.strokeBatchName}>Batch of ‘99</div>
					<div className={style.frame}>
						{
							userDetails && userDetails.oldRem && userDetails.oldRem.image &&
							<div className={style.before}>
								<img src={circle} />
								<div className={style.internal}>
									<img src={userDetails.oldRem.image} />
								</div>
								<p className={style.textBefore}>Before</p>
							</div>
						}
						{
							userDetails && userDetails.image.length &&
							<div className={style.after}>
								<img src={circle} />
								<div className={style.internal}>
									<img src={userDetails.image} />
								</div>
								<p className={style.textBefore}>After</p>
							</div>}
					</div>
				</div>
				{userDetails && userDetails.oldRem &&
					<div className={style.quote}>
						<div style={{ fontSize: "6.5vw", color: "#411D76" }}>“</div>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<img className={style.up} src={up} />
							<div style={{ textAlign: "center", fontSize: "1.5vw" }}>
								{userDetails.oldRem.content}
							</div>
							<img className={style.dowm} src={down} />
						</div>
						<div style={{ fontSize: "6.5vw", color: "#411D76" }}>”</div>
					</div>}

			</div>

			<div className={style.background}>
				<div className={style.dome}>
					<div className={style.domeShape}></div>
				</div>
				<div className={style.cardBackground}>
					{remDetailsForMe.length && <Card
						remDetails={remDetailsForMe.slice(0,Math.min(remDetailsForMe.length,6))}
						head1="Here’s what your friends think of you"
						head2="Thoughts from your friends"
						writtenRems={false}
					/>}

					{remDetailsByMe.length && <Card
						remDetails={remDetailsByMe.slice(0,Math.min(remDetailsByMe.length,6))}
						head1="Here’s what you think of them"
						head2="Personal or Personalized?"
						writtenRems={true}
					/>}
				</div>
			</div>
		</>
	);
};

export default Home;
