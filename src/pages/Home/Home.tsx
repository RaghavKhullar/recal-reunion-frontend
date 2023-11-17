import React, { useEffect, useState } from "react";
import circle from "../../assets/circle.svg";
import down from "../../assets/down.svg";
import up from "../../assets/up.svg";
import { Card } from "../../components";
import style from "./home.module.css";
import { showNotification } from "../../helpers/helpers";
import { useAppDispatch } from "../../redux/store/hooks";
import { getCurrentUser, getRemsWrittenByMe, getRemsWrittenForMe } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../redux/reducer/User/UserReducer";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../config";

const Home: React.FC = () => {
	const [remDetailsForMe, setRemDetailsForMe] = useState<any[]>([]);
	const [remDetailsByMe, setRemDetailsByMe] = useState<any[]>([]);
	const [userDetails, setUserDetails] = useState<any>();
	const state = useSelector(userSelector);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const fetchWrittenRemsForMe = async () => {
		const getWrittenRemsByForDispatch = await dispatch(getRemsWrittenForMe());
		if (getRemsWrittenForMe.fulfilled.match(getWrittenRemsByForDispatch)) {
			if (getWrittenRemsByForDispatch.payload.status === 200) {
				if (Array.isArray(getWrittenRemsByForDispatch.payload.data.data)) {
					setRemDetailsForMe(getWrittenRemsByForDispatch.payload.data.data);
				} else {
					showNotification("Error", "Error fetching the rems", "error")
				}
			} else if (getWrittenRemsByForDispatch.payload.status !== 400) {
				showNotification("Error", "Error fetching the rems", "error")
			} else {
				showNotification("Error", "Error occured while fetching rems", "error");
				navigate('/login');
			}
		}
	};

	const fetchWrittenRemsByMe = async () => {
		const getWrittenRemsByMeDispatch = await dispatch(getRemsWrittenByMe());
		if (getRemsWrittenByMe.fulfilled.match(getWrittenRemsByMeDispatch)) {
			if (getWrittenRemsByMeDispatch.payload.status === 200) {
				if (Array.isArray(getWrittenRemsByMeDispatch.payload.data.data)) {
					setRemDetailsByMe(getWrittenRemsByMeDispatch.payload.data.data);
				} else {
					showNotification("Error", "Error fetching the rems", "error")
				}
			} else if (getWrittenRemsByMeDispatch.payload.status !== 400) {
				showNotification("Error", "Error fetching the rems", "error")
			} else {
				showNotification("Error", "Error occured while fetching rems", "error");
				navigate('/login');
			}
		}
	};

	const fetchUserDetails = async () => {
		const loginDispatch = await dispatch(getCurrentUser());
		if (getCurrentUser.fulfilled.match(loginDispatch)) {
			if (loginDispatch.payload.status === 200) {
				setUserDetails(loginDispatch.payload.data);
			} else {
				showNotification("Error", "User not found", "error");
				navigate('/login');
			}
		} else {
			showNotification("Error", "Error occured while fetching user details", "error");
			navigate('/login');
		}
	};

	useEffect(() => {
		fetchUserDetails();
	}, []);

	useEffect(() => {
		fetchWrittenRemsForMe();
		fetchWrittenRemsByMe();
	}, [state.loggedIn]);

	return (
		<>
			<div className={style.upper}>
				<div className={style.batch}>
					<h1 className={style.batchName}>Batch of ‘99</h1>
					<div className={style.strokeBatchName}>Batch of ‘99</div>
					<div className={style.frame}>
						{
							userDetails && userDetails.oldRem && userDetails.oldRem.image && userDetails.oldRem.image.length !== 0 &&
							<div className={style.before}>
								<img className={style.anchorCircle} src={circle} />
								<div className={style.internal}>
									<img src={`${BACKEND_URL}/images/profiles/${userDetails.oldRem.image}`} />
								</div>
								<p className={style.textBefore}>Before</p>
							</div>
						}
						{
							userDetails && userDetails.user && userDetails.user.image && userDetails.user.image.length !== 0 &&
							< div className={style.after}>
								<img className={style.anchorCircle} src={circle} />
								<div className={style.internal}>
									<img src={`${BACKEND_URL}/images/profiles/${userDetails.user.image}`} />
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

			</div >
			{(remDetailsForMe.length !== 0 || remDetailsByMe.length !== 0) &&
				<div className={style.background}>
					<div className={style.dome}>
						<div className={style.domeShape}></div>
					</div>
					<div className={style.cardBackground}>
						{remDetailsForMe.length !== 0 && <Card
							remDetails={remDetailsForMe.slice(0, Math.min(remDetailsForMe.length, 6))}
							head1="Here’s what your friends think of you"
							head2="Thoughts from your friends"
							writtenRems={false}
						/>}

						{remDetailsByMe.length !== 0 && <Card
							remDetails={remDetailsByMe.slice(0, Math.min(remDetailsByMe.length, 6))}
							head1="Here’s what you think of them"
							head2="Personal or Personalized?"
							writtenRems={true}
						/>}
					</div>
				</div>
			}
		</>
	);
};

export default Home;
