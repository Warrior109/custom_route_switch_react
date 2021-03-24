import React, { Fragment, useRef, useContext } from 'react';
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
  const wrapperRef = useRef(component || Fragment);
  const validChildren = useContext(CustomRouteSwitchContext);
  const currentChild = children.find((child) => validChildren.includes(child));

  return (
    <wrapperRef.current>
      { currentChild || children }
    </wrapperRef.current>
  );
};
CustomRouteCase.propTypes = propTypes;
CustomRouteCase.defaultProps = defaultProps;

export default CustomRouteCase;
