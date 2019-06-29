import React from "react";
import { connect } from "utils";
import "./css/cards.css";

import { pickCard } from "model/game/actions";
import { cardsVisibility } from 'model/game/props';

const CardSimple = ({
  id,
  rank,
  suit,
  player,
  pickCard,
  cardsVisibility,
}) => {
  const cardStyle = player || cardsVisibility.isFrontSideVisible
    ? `card rank-${rank.toLowerCase()} ${suit}`
    : `card back`;

  return (
    <div onClick={() => pickCard(id)} className={cardStyle}>
      <span className="rank">{rank}</span>
      <span
        className="suit"
        dangerouslySetInnerHTML={{ __html: `&${suit};` }}
      />
    </div>
  );
};

const Card = props => {
  const card = <CardSimple {...props} />;
  return props.isPicked ? <strong>{card}</strong> : card;
};

export default connect({
  pickCard,
  cardsVisibility,
})(Card);
