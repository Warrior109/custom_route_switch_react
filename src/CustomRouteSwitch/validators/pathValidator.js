import { matchPath, Redirect } from 'react-router-dom';

const pathValidator = (child, props) => {
  const { match } = props,
    { exact, strict, sensitive } = child.props,
    childPath = child.type === Redirect ? child.props.from : child.props.path;
  return !!matchPath(
    location.pathname,
    { path: childPath, exact, strict, sensitive },
    match
  );
};

export default pathValidator;
