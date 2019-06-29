import { createStyleSheet } from 'utils';

const styles = {
  container:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  evaluate:{
    backgroundColor:'#e5e3e3',
    marginTop: '32px',
  },
  buttonContainer:{
    justifyContent: 'space-between',
    width: '30%',
    display:'flex',
  },
  score:{
    marginTop: '16px',
    fontSize: '16px',
    fontFamily: 'Ubuntu',
    textAlign:'center',
    '& > div':{
      marginBottom: '8px',
    }
  }
};

const classes = createStyleSheet(styles);

export {
  classes,
  styles,
}