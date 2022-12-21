import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, onlyUnAuth = false, ...rest }) {
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const isAuthChecked = useSelector(store => store.registerLoginUser.authChecked);
  const isUserLoaded = useSelector(store => store.registerLoginUser.loginSuccess);

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && isUserLoaded) {
    return (
      <Redirect
        to={{
          pathname: from.pathname,
          state: { from: location }
        }}
      />
    )
  }

  if (!onlyUnAuth && !isUserLoaded) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
          children
      }
    />
  );
}
