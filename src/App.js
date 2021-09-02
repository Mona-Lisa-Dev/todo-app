import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import Homepage from 'pages/Homepage';
import RegisterPage from 'pages/RegisterPage';
import LoginPage from 'pages/LoginPage';
import TodosPage from 'pages/TodosPage';
import AppBar from 'components/AppBar';
import Container from 'components/Container';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

import { getCurrentUser } from 'redux/auth/auth-operations';
import { getIsAuthorized } from 'redux/auth/auth-selectors';

import routes from 'routes';
import './scss/_main.scss';

const App = () => {
  const isAuthorized = useSelector(getIsAuthorized);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getCurrentUser()), [dispatch]);

  return (
    <>
      <AppBar />
      <Container>
        <Switch>
          {/* <PublicRoute path={routes.home} exact component={Homepage} /> */}
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
      </Container>
    </>
  );
};

export default App;
