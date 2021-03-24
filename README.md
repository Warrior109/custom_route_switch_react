# custom_route_switch_react
Routing layouts and custom validators systems for react.

Installation
-----------
Using [npm](https://www.npmjs.com/):

    $ npm install --save custom_route_switch_react

Or [yarn](https://yarnpkg.com/):

    $ yarn add custom_route_switch_react

Usage
-----
import `CustomRouteSwitch` in some file and add validators to it like this:
```js
import CustomRouteSwitch, { createValidator } from 'custom_route_switch_react';

const batmanValidator = (child, props) => {
  const { currentUser } = props,
    { batman } = child.props;
   
  if (batman) return currentUser.type === 'Batman';
  return true;
};
   
const supermanValidator = (child, props) => {
  const { currentUser } = props,
    { superman } = child.props;
   
  if (superman) return currentUser.type === 'Superman';
  return true;
};

createValidator(supermanValidator);
createValidator(batmanValidator);

export default CustomRouteSwitch;
```  
If you need, you can throw props to validators throught connect:
```js
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CustomRouteSwitch from './customRouteSwitch';
    
const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user,
  isAuthenticated: state.currentUser.authenticationStatus,
  Route
});

export default connect(mapStateToProps, {})(withRouter(CustomRouteSwitch));
```
Make sure that you wrap `CustomRouteSwitch` with `withRouter` method and add Route component to the props;
This props will be available inside `props` atrribute in validators.

After this customization you can start to use it:
```js
import CustomRouteSwitch from 'src/myEditedCustomRouteSwitch';
import CustomRouteCase from 'custom_route_switch_react';

const Layouts = () => (
  <CustomRouteSwitch>
    <CustomRouteCase component={ App } >
      <CustomRouteCase path='/test' component={ MySuperSecondLayout } >
        <CustomRouteCase component={ MyThirdLayout } superman >
          <Route path='/test/path/1' component={ MyScreen1 } />
          <Route path='/test/path/2' component={ MyScreen2 } />
        </CustomRouteCase>
        <CustomRouteCase path='/test/batman' component={ MyFourthLayout } batman >
          <Route path='/test/batman/1' component={ MyScreen3 } />
          <Route path='/test/super/2' component={ MyScreen4 } />
        </CustomRouteCase>
        <Route component={ NotFound } />
      </CustomRouteCase>
    </CustomRouteCase>
  </CustomRouteSwitch>
)

export default Layouts;
```

Props, which you throw in CustomRouteCase component you can retrieve from `child.props` inside validators. But take a look, that not every child will have this props. Thats why in validators you should check if this props present.

`CustomRouteSwitch` already have two basics validators: path and deep. Thats why you can write path props. In case above, if your path will be `/test/path/1` you will render `MyScreen1`. In case, if you path will be `/test/batman/1` you will render `MyScreen3`. If your path will be `/test/super/2` you will render `NotFound` component inside `MySuperSecondLayout`, because pathValidations in `CustomRouteSwitch` with batman validation will fail.  

License
-------
[MIT License](https://github.com/Warrior109/custom_route_switch_react/blob/master/LICENSE)
