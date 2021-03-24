import React, {
  Fragment, useState, useEffect,
} from 'react';
import { node } from 'prop-types';

import findValidChildrenChain from './findValidChildrenChain';
import CustomRouteSwitchContext from './context';

const propTypes = {
  children: node.isRequired,
  component: node,
};
const defaultProps = {
  component: null,
};

const CustomRouteSwitch = (props) => {
  const [validChildrenChain, setValidChildrenChain] = useState([]);
  const { component } = props;
  const Wrapper = component || Fragment;
  const [currentChild, ...validChildren] = validChildrenChain;

  useEffect(() => {
    const newValidChildrenChain = findValidChildrenChain(props.children, props);
    if (newValidChildrenChain !== validChildrenChain) setValidChildrenChain(newValidChildrenChain);
  }, [props]);

  return (
    <Wrapper>
      <CustomRouteSwitchContext.Provider value={validChildren}>
        { currentChild }
      </CustomRouteSwitchContext.Provider>
    </Wrapper>
  );
};
CustomRouteSwitch.propTypes = propTypes;
CustomRouteSwitch.defaultProps = defaultProps;

export default CustomRouteSwitch;
