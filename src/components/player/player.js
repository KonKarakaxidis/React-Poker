import React from "react";
import { Card } from 'components/card'

const Player = ({ name, cards, flag }) => (
  <div>
    <div>
      <h4>{name}</h4>
      <div className="playingCards simpleCards">
        {cards.map(({ rank, suit, isPicked, id }, index) => (
          <Card
            rank={rank}
            suit={suit}
            key={`Hand-Id-${index}`}
            player={flag}
            isPicked={isPicked}
            id={id}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Player;
