0.2.0
-----
Add supporting of new react-router version(4.4.0). That's why we should make some breaking changes.
For now, it's important to wrap `CustomRouteSwitch` with the `withRouter` function.
Before 0.2.0 we do it on our side, but with new context system in the React we should require it from the client side.

0.2.1
-----
Fix bug with undefined match inside the layouts components if a path in the layout defined.
That's why we should make on breaking changes.
For now, you should add Route component to the Custom Route Switch props

0.3.0
-----
Added `CustomRouteCase` component. Now `CustomRouteSwitch` - only should be a parent for all `CustomRouteCase` components, and load needed props for validators.
This change allows to run validations just once, and after it render all valid `CustomRouteCase`.
