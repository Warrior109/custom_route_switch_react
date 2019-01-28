0.2.0
-----
Add supporting of new react-router version(4.4.0). That's why we should make some breaking changes.
For now, it's important to wrap `CustomRouteSwitch` with the `withRouter` function.
Before 0.2.0 we do it on our side, but with new context system in the React we should require it from the client side.

