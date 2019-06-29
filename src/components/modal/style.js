import { createStyleSheet } from 'utils';

const styles = {
  content:{
    display: 'flex',
    flexDirection: 'column',
  },
  icon:{
    cursor: 'pointer',
  }
};

const classes = createStyleSheet(styles);

export {
  classes,
  styles,
}