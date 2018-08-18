import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomRouteSwitch from './customRouteSwitch';

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(withRouter(CustomRouteSwitch));
export { findValidChildren, validators, createValidator } from './validators';
