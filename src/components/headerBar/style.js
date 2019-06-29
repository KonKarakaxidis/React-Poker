import { createStyleSheet } from 'utils';

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: '16px'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const classes = createStyleSheet(styles);

export {
  classes,
  styles,
}