import { matchPath, Redirect } from 'react-router-dom';

const pathValidator = (child, props) => {
  const { match, location } = props;
  const { exact, strict, sensitive } = child.props;
  const childPath = child.type === Redirect ? child.props.from : child.props.path;
  return !!matchPath(
    location.pathname,
    { path: childPath, exact, strict, sensitive },
    match
  );
};

export default pathValidator;
