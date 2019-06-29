import React, { useState, useEffect } from 'react';
import { connect } from 'utils';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from 'library';

import { closeModal } from 'model/modal/actions';
import { data } from 'model/modal/props';
import { AddRoomDialog } from './content'

function FormDialog({ closeModal, data }) {
  const [state, setState] = useState({});
  const [title, setTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  useEffect(() => {
    switch (data.content) {
      case 'ADD_ROOM_MODAL':
        setDialogContent(<AddRoomDialog state={state} setState={setState} />)
        setTitle('Add Room')
        break;
      default:
        break;
    }
  }, [data.content, state])

  return (
    <Dialog
      open={data.isOpen}
      onClose={() => closeModal()}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>

      {dialogContent}

      <DialogActions>
        <Button
          onClick={() => {
            closeModal();
            setState({});
          }}
          color="primary">
          {'Cancel'}
        </Button>

        <Button
          onClick={() => {
            data.action && data.action(state);
            closeModal();
            setState({});
          }}
          color="primary">
          {'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect({
  closeModal,
  data,
})(FormDialog);