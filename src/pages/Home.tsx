import "../pages/Home.css";

import React, { useEffect,useState } from "react";

import Account from "../../src/assets/account.svg";
import ArrowDown from "../../src/assets/arrowDown.svg";
import Group from "../../src/assets/Group.svg";
import circle from "../assets/circle.svg";
import down from "../assets/down.svg";
import up from "../assets/up.svg";
import Card from "../Components/card/card";
import {
	getWrittenRemsByMe,
	getWrittenRemsForMe,
} from "../utils/getRemDetails";

const Home: React.FC = () => {
	const [remDetailsForMe, setRemDetailsForMe] = useState([]);
	useEffect(() => {
		fetchWrittenRemsForMe();
	}, []);

	const fetchWrittenRemsForMe = async () => {
		try {
			const response = await getWrittenRemsForMe();
			if (response.data) {
				setRemDetailsForMe(response.data);
			} else {
				console.error("Error fetching rem details:", response);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const [remDetailsByMe, setRemDetailsByMe] = useState([]);
	useEffect(() => {
		fetchWrittenRemsByMe();
	}, []);

	const fetchWrittenRemsByMe = async () => {
		try {
			const response = await getWrittenRemsByMe();
			if (response) {
				setRemDetailsByMe(response);
			} else {
				console.error("Error fetching rem details:", response);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<>
			<div className="upper">
				<div className="logo">
					<h2 className="logo-text">LOGO</h2>
					<div className="content">
						<img src={Account} alt="account" />
						<img src={Group} alt="group" />
						<img src={ArrowDown} alt="arrowDown" />
					</div>
				</div>
				<div className="batch">
					<h1 className="batch-name">Batch of ‘99</h1>
					<div className="frame">
						<div className="before">
							<img src={circle} alt="group" />
							<div className="internal"></div>
							<text className="text-before">before</text>
						</div>
						<div className="after">
							<img src={circle} alt="group" />
							<div className="internal"></div>
							<text className="text-after">after</text>
						</div>
					</div>
				</div>
				<div className="quote">
					<h1 style={{ fontSize: "6.5vw" }}>“</h1>
					<div>
						<img className="up" src={up} alt="up" />
						<h2 style={{ textAlign: "center", fontSize: "2.5vw" }}>
							DAMN THIS DESIGN LOOKS GOOD, WONDER WHO DID IT
						</h2>
						<img className="down" src={down} alt="down" />
					</div>
					<h1 style={{ fontSize: "6.5vw" }}>”</h1>
				</div>
			</div>

			<div className="bacground">
				<div className="dome">
					<div className="dome-shape"></div>
				</div>
				<div className="card-backgound">
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

export { Home };
