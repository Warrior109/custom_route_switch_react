import React, {
  Fragment, useState, useEffect, useCallback,
} from 'react';
import { node, func } from 'prop-types';

import findValidChildrenChain from './findValidChildrenChain';
import CustomRouteSwitchContext from './context';

const propTypes = {
  children: node.isRequired,
  Route: func.isRequired,
  component: node,
};
const defaultProps = {
  component: null,
};

const CustomRouteSwitch = (props) => {
  const [validChildrenChain, setValidChildrenChain] = useState([]);
  const { Route } = props;
  const [currentChild, ...validChildren] = validChildrenChain;

  useEffect(() => {
    const newValidChildrenChain = findValidChildrenChain(props.children, props);
    if (newValidChildrenChain !== validChildrenChain) setValidChildrenChain(newValidChildrenChain);
  }, [props]);

  // eslint-disable-next-line react/no-multi-comp
  const getComponent = useCallback(() => {
    const { component } = props;
    const WrapperComponent = component || Fragment;

    return (
      <WrapperComponent>
        { currentChild }
      </WrapperComponent>
    );
  }, [currentChild]);

  return (
    <CustomRouteSwitchContext.Provider value={validChildren}>
      <Route component={getComponent} />
    </CustomRouteSwitchContext.Provider>
  );
};
CustomRouteSwitch.propTypes = propTypes;
CustomRouteSwitch.defaultProps = defaultProps;

export default CustomRouteSwitch;
