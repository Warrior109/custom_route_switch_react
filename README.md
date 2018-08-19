# custom_route_switch_redux
Routing layouts and custom validators systems for react and redux.

Installation
-----------
Using [npm](https://www.npmjs.com/):

    $ npm install --save custom_route_switch_redux

Or [yarn](https://yarnpkg.com/):

    $ yarn add custom_route_switch_redux

Usage
-----
import `CustomRouteSwitch` in some file and add validators to it like this:
```js
import CustomRouteSwitch, { createValidator } from 'custom_route_switch_redux';

const authenticationValidator = (child, props) => {
  const { isAuthenticated } = props;
  if (child.props.auth) return isAuthenticated;
  return true;
};
    
const doctorValidator = (child, props) => {
  const { currentUser } = props,
    { doctor } = child.props;
   
  if (doctor) return currentUser.type === 'Doctor';
  return true;
};
   
const patientValidator = (child, props) => {
  const { currentUser } = props,
    { patient } = child.props;
   
  if (patient) return currentUser.type === 'Patient';
  return true;
};

createValidator(patientValidator);
createValidator(doctorValidator);
createValidator(authenticationValidator);

export default CustomRouteSwitch;
```  
If you need, you can throw props to validators throught connect:
```js
import { connect } from 'react-redux';

import CustomRouteSwitch from './customRouteSwitch';
    
const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user,
  isAuthenticated: state.currentUser.authenticationStatus
});

export default connect(mapStateToProps, {})(CustomRouteSwitch);
```

This props will be available inside `props` atrribute in validators

License
-------
[MIT License](https://github.com/Warrior109/custom_route_switch_redux/blob/master/LICENSE)
