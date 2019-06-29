import { createStyleSheet } from 'utils';

const styles = {
  container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
    zIndex: 9999,
  },

};

const classes = createStyleSheet(styles);

export {
  classes,
  styles,
}