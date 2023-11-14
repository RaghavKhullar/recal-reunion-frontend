import style from "./card.module.css"

import img from "../../assets/arrow.svg";
import RemAdapter from "../RemAdapter/RemAdapter";

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

interface CardProps {
	remDetails: Rem[];
	head1: string;
	head2: string;
	writtenRems: boolean;
}

const Card: React.FC<CardProps> = ({ remDetails, head1, head2, writtenRems }) => {
	return (
		<div className={style.card}>
			<div className={style.cardHeader}>
				<h1 className={style.head1}>{head1}</h1>
				<h2 className={style.head2}>{head2}</h2>
			</div>
			<div className={style.scrollableContent}>
				{remDetails.map((rem, i) => (
					<RemAdapter key={rem._id} rem={rem} writtenRems={writtenRems} />
				))}
			</div>
			<div className={style.arrow}>
				<div className={style.seeMore}>See more -{">"}</div>
			</div>
		</div>
	);
};

export default Card;
