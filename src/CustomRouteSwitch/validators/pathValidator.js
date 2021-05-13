import { useRouteMatch, Redirect } from 'react-router-dom';

const pathValidator = (child, props) => {
  const { exact, strict, sensitive } = child.props;
  const childPath = (child.type === Redirect ? child.props.from : child.props.path) || '';
  return !!useRouteMatch(path: childPath, exact, strict, sensitive);
};

export default pathValidator;
