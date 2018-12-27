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
import { connect } from 'react-redux';

import CustomRouteSwitch from './customRouteSwitch';
    
const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user,
  isAuthenticated: state.currentUser.authenticationStatus
});

export default connect(mapStateToProps, {})(CustomRouteSwitch);
```

This props will be available inside `props` atrribute in validators.

After this customization you can start to use it:
```js
import CustomRouteSwitch from 'src/myEditedCustomRouteSwitch';

const Layouts = () => (
  <CustomRouteSwitch component={ App } >
    <CustomRouteSwitch path='/test' component={ MySuperSecondLayout } >
      <CustomRouteSwitch component={ MyThirdLayout } superman >
        <Route path='/test/path/1' component={ MyScreen1 } />
        <Route path='/test/path/2' component={ MyScreen2 } />
      </CustomRouteSwitch>
      <CustomRouteSwitch path='/test/batman' component={ MyFourthLayout } batman >
        <Route path='/test/batman/1' component={ MyScreen3 } />
        <Route path='/test/super/2' component={ MyScreen4 } />
      </CustomRouteSwitch>
      <Route component={ NotFound } />
    </CustomRouteSwitch>
  </CustomRouteSwitch>
)

export default Layouts;
```

Props, which you throw in CustomRouteSwitch component you can retrieve from `child.props` inside validators. But take a look, that not every child will have this props. Thats why in validators you should check if this props present.

`CustomRouteSwitch` already have two basics validators: path and deep. Thats why you can write path props. In case above, if your path will be `/test/path/1` you will render `MyScreen1`. In case, if you path will be `/test/batman/1` you will render `MyScreen3`. If your path will be `/test/super/2` you will render `NotFound` component inside `MySuperSecondLayout`, because pathValidations in `CustomRouteSwitch` with batman validation will fail.  

License
-------
[MIT License](https://github.com/Warrior109/custom_route_switch_redux/blob/master/LICENSE)
