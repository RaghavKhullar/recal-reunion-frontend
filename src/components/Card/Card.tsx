import style from "./card.module.css";

import RemAdapter from "../RemAdapter/RemAdapter";
import { Link } from "react-router-dom";

interface CardProps {
  remDetails: Rem[];
  head1: string;
  head2: string;
  writtenRems: boolean;
}

const Card: React.FC<CardProps> = ({
  remDetails,
  head1,
  head2,
  writtenRems,
}) => {
  return (
    <div className={style.card}>
      <div className={style.cardHeader}>
        <h1 className={style.head1}>{head1}</h1>
        <h2 className={style.head2}>{head2}</h2>
      </div>
      <div className={style.scrollableContent}>
        {remDetails.map(
          (rem, i) =>
            rem !== null &&
            rem !== undefined && (
              <RemAdapter key={rem.id} rem={rem} writtenRems={writtenRems} />
            )
        )}
      </div>
      <div className={style.arrow}>
        <Link
          to={head1.endsWith("you") ? "/myRems" : "/remsByMe"}
          className={style.seeMore}
        >
          See more -{">"}
        </Link>
      </div>
    </div>
  );
};

export default Card;
