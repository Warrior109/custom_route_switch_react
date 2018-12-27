import React, { Fragment, Component } from 'react';
import { any, string, object, bool, oneOfType, func } from 'prop-types';
import { Route } from 'react-router-dom';
import { findValidChildren } from './validators';

const propTypes = {
  children: any,
  path: string,
  match: object.isRequired,
  component: oneOfType([ object, func ])
};

class CustomRouteSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChild: {}
    };
  };

  UNSAFE_componentWillMount() {
    const { children } = this.props;

    const currentChild = findValidChildren(children, this.props);
    this.setState({ currentChild });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { children } = nextProps;

    const currentChild = findValidChildren(children, nextProps);
    this.setState({ currentChild });
  };

  getComponent = () => {
    const {
      state: { currentChild },
      props: { component }
    } = this;

    const WrapperComponent = component || Fragment;
    const ChildComponent = currentChild && currentChild.type;

    return (
      <WrapperComponent>
        {
          currentChild && currentChild.props ?
            <ChildComponent { ...currentChild.props } />
            :
            ''
        }
      </WrapperComponent>
    );
  };

  render() {
    const {
      getComponent,
      props: { path }
    } = this;

    return (
      <Route path={ path } component={ getComponent } />
    );
  };
};

CustomRouteSwitch.defaultProps = {
  path: ''
};
CustomRouteSwitch.propTypes = propTypes;

export default CustomRouteSwitch;
