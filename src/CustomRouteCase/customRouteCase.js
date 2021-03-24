import React, { Fragment, useContext } from 'react';
import { any } from 'prop-types';

import CustomRouteSwitchContext from '../CustomRouteSwitch/context';

const propTypes = {
  component: any,
  children: any,
};
const defaultProps = {
  component: null,
  children: [],
};

const CustomRouteCase = ({ component, children }) => {
  const validChildren = useContext(CustomRouteSwitchContext);
  const currentChild = children.find
    ? children.find((child) => validChildren.includes(child))
    : children;
  const Wrapper = component || Fragment;

  return (
    <Wrapper>
      { currentChild }
    </Wrapper>
  );
};
CustomRouteCase.propTypes = propTypes;
CustomRouteCase.defaultProps = defaultProps;

export default CustomRouteCase;
