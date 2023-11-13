import "../card/card.css";

import img from "../../assets/arrow.svg";
import RemAdapter from "./remAdapter";

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
}

const Card: React.FC<CardProps> = ({ remDetails, head1, head2 }) => {
	return (
		<div className="card">
			<div className="card-header">
				<h1 className="Head1">{head1}</h1>
				<h2 className="Head2">{head2}</h2>
			</div>
			<div className="scrollable-content">
				{remDetails.map((rem) => (
					<RemAdapter key={rem._id} rem={rem} />
				))}
			</div>
			<div className="arrow">
				<h3 className="see-more">See more</h3>
				<img src={img} alt="Arrow" />
			</div>
		</div>
	);
};

export default Card;
