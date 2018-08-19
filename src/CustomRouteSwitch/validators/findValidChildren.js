import { validators } from './index';

const findValidChildren = (children, props) => {
  return children.find ? children.find(ch => isValidChild(ch, props)) : isValidChild(children, props) && children;
};

const isValidChild = (child, props) => {
  let isValid = true;
  validators.some(validator => {
    isValid = validator(child, props);
    return !isValid;
  });
  return isValid;
};

export default findValidChildren;
