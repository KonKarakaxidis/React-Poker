import { createStyleSheet } from 'utils';

const styles = {
  root: {
    width: '100%',
    marginTop: '32px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  icon:{
    borderRadius: '50px',
    cursor: 'pointer',
  }
};

const classes = createStyleSheet(styles);

export {
  classes,
  styles,
}