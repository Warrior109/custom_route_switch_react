import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomRouteSwitch from './customRouteSwitch';

export default withRouter(CustomRouteSwitch);
export { findValidChildren, validators, createValidator } from './validators';
