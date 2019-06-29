import React from 'react';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { classes } from './style';

function AddRoomDialog({ state, setState }) {
  return (
    <DialogContent className={classes.content}>
      <TextField
        label="Room Name"
        type="text"
        value={state.roomName || ''}
        onChange={(event) => setState({...state, roomName: event.target.value})}
      />
      <TextField
        label="Creator"
        type="text"
        value={state.creator || ''}
        onChange={(event) => setState({...state, creator: event.target.value})}
      />
    </DialogContent>
  )
}

export default AddRoomDialog;