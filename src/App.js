import { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import AppBar from 'components/AppBar';
import Container from 'components/Container';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

import { getCurrentUser } from 'redux/auth/auth-operations';
import { getIsAuthorized } from 'redux/auth/auth-selectors';

import routes from 'routes';
import './scss/_main.scss';

const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "LoginPage" */),
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage" */),
);
const TodosPage = lazy(() =>
  import('./pages/TodosPage' /* webpackChunkName: "TodosPage" */),
);

const App = () => {
  const isAuthorized = useSelector(getIsAuthorized);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getCurrentUser()), [dispatch]);

  return (
    <>
      <AppBar />
      <Container>
        <Suspense fallback={null}>
          <Switch>
            <PrivateRoute
              path={routes.todos}
              redirectTo={routes.login}
              component={TodosPage}
            />
            <PublicRoute
              path={routes.signup}
              redirectTo={routes.todos}
              restricted
              component={RegisterPage}
            />
            <PublicRoute
              path={routes.login}
              redirectTo={routes.todos}
              restricted
              component={LoginPage}
            />

            <Route
              path={routes.home}
              render={props =>
                isAuthorized ? (
                  <Redirect to={routes.todos} />
                ) : (
                  <Redirect to={routes.login} />
                )
              }
            />

            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
};

export default App;
