import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'utils';
import { data } from 'model/spinner/props';
import { classes } from './style';

const LoadingSpinner = ({data}) => {
  return data.isVisible && 
  <div className={classes.container}>
    <CircularProgress />
  </div>
}

export default connect({
  data,
})(LoadingSpinner);