import React from "react";
import { connect } from "utils";

import { Button } from "library";
import { Player } from "components";

import { rooms } from "model/game/props";

import { user } from "model/user/props";
import { players, gameVisibility } from "model/game/props";

import { exchangeCards, quitGame } from "model/game/actions";

import { classes, styles } from "./style";

const winner = (players) =>
  players[0].score > players[1].score ? players[0].name : players[1].name;

const Table = ({ gameVisibility, players, exchangeCards, quitGame, user, rooms }) => {
  
  const currentRoom = rooms.find(room => room.roomId === user.roomId);

  return (
    <div className={classes.container}>
      {players.map((player, index) => (
        <Player
          key={index}
          name={player.name}
          cards={player.cards}
          flag={index === 0}
        />
      ))}

      <div className={classes.buttonContainer}>
        <Button
          style={styles.evaluate}
          onClick={() => exchangeCards({ cards: players[0].cards })}
          disabled={players[0].hasNewCards || currentRoom.seatsLeft !== 0 }>
          {'Exchange Cards'}
        </Button>


        <Button
          style={styles.evaluate}
          onClick={() => quitGame({ id: user.id })}>
          {'Quit Game'}
        </Button>
      </div>


      {gameVisibility.isScoreVisible && (
        <div className={classes.score}>
          <div> winner: {winner(players)}</div>

          <div>
            {" "}
            {players[0].name}: {players[0].combination}
          </div>

          <div>
            {" "}
            {players[1].name}: {players[1].combination}
          </div>
        </div>
      )}

      {gameVisibility.isDealNextVisible && <button>Deal next hand</button>}
    </div>
  );
};

export default connect({
  players,
  gameVisibility,
  exchangeCards,
  quitGame,
  user,
  rooms,
})(Table);
