import React, { Fragment, Component } from 'react';
import { any, string, object, bool, oneOfType, func } from 'prop-types';
import { Route, matchPath, Redirect } from 'react-router-dom';

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
    const {
      findValidChildren,
      props: { children }
    } = this;

    const currentChild = findValidChildren(children, this.props);
    this.setState({ currentChild });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { findValidChildren } = this;
    const { children } = nextProps;

    const currentChild = findValidChildren(children, nextProps);
    this.setState({ currentChild });
  };

  findValidChildren = (children, props) => {
    const { isValidChild } = this;

    return children.find ? children.find(ch => isValidChild(ch, props)) : children && isValidChild(children, props);
  };

  isValidChild = (child, props) => {
    const {
      pathValidator,
      deepValidator
    } = this;

    return pathValidator(child, props) &&
      deepValidator(child, props);
  };

  pathValidator = (child, props) => {
    const { match } = props,
      { exact, strict, sensitive } = child.props,
      childPath = child.type === Redirect ? child.props.from : child.props.path;
    return matchPath(
      location.pathname,
      { path: childPath, exact, strict, sensitive },
      match
    );
  };

  deepValidator = (child, props) => {
    const { children } = child.props,
      { findValidChildren } = this;

    if (!(child.type.WrappedComponent === CustomRouteSwitch && children)) return true;
    const validChild = findValidChildren(children, props);
    return !!validChild;
  };

  render() {
    const {
      isValidChild,
      state: { currentChild },
      props: { path, component }
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
};

CustomRouteSwitch.defaultProps = {
  path: ''
};
CustomRouteSwitch.propTypes = propTypes;

export default CustomRouteSwitch;
