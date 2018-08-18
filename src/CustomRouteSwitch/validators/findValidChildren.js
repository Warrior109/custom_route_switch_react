import { validators } from './index';

const findValidChildren = (children, props) => {
  return children.find ? children.find(ch => isValidChild(ch, props)) : children && isValidChild(children, props);
};

const isValidChild = (child, props) => {
  let isValid = true;
  validators.forEach(validator => {
    isValid = validator(child, props);
    if (!isValid) return false;
  });
  return true;
};

export default findValidChildren;
