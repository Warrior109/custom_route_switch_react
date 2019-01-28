import { validators } from './index';

const findValidChildren = (children, props) => {
  return children.find ? children.find(ch => isValidChild(ch, props)) : isValidChild(children, props) && children;
};

const isValidChild = (child, props) => {
  return validators.every(validator => {
    return validator(child, props);
  });
};

export default findValidChildren;
