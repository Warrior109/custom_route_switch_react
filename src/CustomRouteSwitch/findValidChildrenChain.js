import { validators } from './validators';
import CustomRouteCase from '../CustomRouteCase';

const findValidChildrenChain = (children, props) => {
  const validChildrenChain = [];

  const deepValidator = (child) => {
    const { children: nestedChildren } = child.props;

    if (!(child.type === CustomRouteCase && nestedChildren)) return true;
    // eslint-disable-next-line no-use-before-define
    const validNestedChild = findValidChildren(nestedChildren, props);
    if (validNestedChild) validChildrenChain.unshift(validNestedChild);
    return !!validNestedChild;
  };

  const isValidChild = (child) => (
    [...validators, deepValidator].every((validator) => validator(child, props))
  );

  const findValidChildren = (childrenToCheck) => (
    childrenToCheck.find
      ? childrenToCheck.find((ch) => isValidChild(ch, props))
      : isValidChild(childrenToCheck, props) && childrenToCheck
  );

  const validChild = findValidChildren(children);
  if (validChild) {
    validChildrenChain.unshift(validChild);
    return validChildrenChain;
  }

  return null;
};

export default findValidChildrenChain;
