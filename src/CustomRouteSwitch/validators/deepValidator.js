import findValidChildren from './findValidChildren';

const deepValidator = (child, props) => {
  const { children } = child.props;

  if (!(child.type.WrappedComponent === CustomRouteSwitch && children)) return true;
  const validChild = findValidChildren(children, props);
  return !!validChild;
};

export default deepValidator;
