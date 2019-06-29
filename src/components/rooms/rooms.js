import React, { useEffect } from "react";
import { connect } from "utils";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "library";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/AddRounded";

import { updateRooms, dealCards, fetchRooms } from "model/game/actions";
import { rooms } from "model/game/props";

import { openModal } from "model/modal/actions";

import { user } from "model/user/props";
import { updateUser } from "model/user/actions";

import { classes } from "./style";

function Rooms({ updateRooms, openModal, rooms, user, dealCards, fetchRooms, updateUser }) {
  useEffect(() => {
    rooms.length === 0 && fetchRooms();
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Poker Rooms</TableCell>
            <TableCell>Creator</TableCell>
            <TableCell>Max Seats</TableCell>
            <TableCell>Seats Left</TableCell>
            <TableCell>
              <AddIcon
                className={classes.icon}
                onClick={() =>
                  openModal({
                    action: data => updateRooms.epic({ type: "ADD", ...data }),
                    content: "ADD_ROOM_MODAL"
                  })
                }
              />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rooms.map(room => (
            <TableRow key={room.roomId}>
              <TableCell
                onClick={() => {
                  room.seatsLeft > 0 && dealCards({ roomId: room.roomId });
                  room.seatsLeft > 0 && updateUser({ roomId: room.roomId });
                }}>
                {room.roomName}
              </TableCell>
              <TableCell>{room.creator}</TableCell>
              <TableCell>{2}</TableCell>
              <TableCell>{room.seatsLeft}</TableCell>
              <TableCell>
                {user.id === room.creatorId && (
                  <DeleteIcon
                    onClick={() =>
                      updateRooms.epic({ type: "DELETE", roomId: room.roomId })
                    }
                    className={classes.icon}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default connect({
  updateRooms,
  openModal,
  rooms,
  user,
  dealCards,
  fetchRooms,
  updateUser,
})(Rooms);
