import findValidChildren from './findValidChildren';
import CustomRouteSwitch from '../customRouteSwitch.js';

const deepValidator = (child, props) => {
  const { children } = child.props;

  if (!(child.type.WrappedComponent === CustomRouteSwitch && children)) return true;
  const validChild = findValidChildren(children, props);
  return !!validChild;
};

export default deepValidator;
