import style from "./card.module.css";

import RemAdapter from "../RemAdapter/RemAdapter";
import { Link } from "react-router-dom";

interface CardProps {
  remDetails: Rem[];
  head1: string;
  head2: string;
  writtenRems: boolean;
  isCurrentUser: boolean;
  id?: string;
}

const Card: React.FC<CardProps> = ({
  remDetails,
  head1,
  head2,
  writtenRems,
  isCurrentUser,
  id = "",
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
          to={
            writtenRems
              ? isCurrentUser
                ? "/remsByMe"
                : `/remsBy/${id}`
              : isCurrentUser
                ? "/myRems"
                : `/remsFor/${id}`
          }
          className={style.seeMore}
        >
          See more -{">"}
        </Link>
      </div>
    </div>
  );
};

export default Card;
