import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Container from 'components/Container';
import { AppBarBasicTemplate } from 'components/AppBar';

import {
  getIsAuthorized,
  getStatusLoadingUser,
} from 'redux/auth/auth-selectors';

import routes from 'routes';

const LoginPage = lazy(() =>
  import('../pages/LoginPage' /* webpackChunkName: "LoginPage" */),
);
const RegisterPage = lazy(() =>
  import('../pages/RegisterPage' /* webpackChunkName: "RegisterPage" */),
);
const TodosPage = lazy(() =>
  import('../pages/TodosPage' /* webpackChunkName: "TodosPage" */),
);
const SliderPage = lazy(() =>
  import('../pages/SliderPage' /* webpackChunkName: "SliderPage" */),
);
const ProfilePage = lazy(() =>
  import('../pages/ProfilePage' /* webpackChunkName: "ProfilePage" */),
);
const WaitCompletedPage = lazy(() =>
  import(
    '../pages/WaitCompletedPage' /* webpackChunkName: "WaitCompletedPage" */
  ),
);

const BasicTemplate = ({ themeToggler, locale, onChange }) => {
  const isAuthorized = useSelector(getIsAuthorized);
  const isLoadingUser = useSelector(getStatusLoadingUser);

  const location = useLocation();

  return (
    <>
      <AppBarBasicTemplate
        themeToggler={themeToggler}
        locale={locale}
        onChange={onChange}
      />
      <Container>
        <Suspense fallback={null}>
          {isLoadingUser || (
            <Switch>
              <PrivateRoute
                path={routes.todos}
                redirectTo={routes.login}
                exact
                component={TodosPage}
              />
              <PrivateRoute
                path={`${routes.todos}/sortBy`}
                redirectTo={routes.login}
                component={props => (
                  <TodosPage {...props} chooseSort="sortBy" />
                )}
              />
              <PrivateRoute
                path={`${routes.todos}/sortByDesc`}
                redirectTo={routes.login}
                component={props => (
                  <TodosPage {...props} chooseSort="sortByDesc" />
                )}
              />
              <PrivateRoute
                path={`${routes.todos}/completed`}
                exact
                redirectTo={routes.login}
                component={props => (
                  <TodosPage
                    {...props}
                    chooseStatus={true}
                    chooseCompleted={true}
                  />
                )}
              />
              <PrivateRoute
                path={`${routes.todos}/completed/sortBy`}
                redirectTo={routes.login}
                component={props => (
                  <TodosPage
                    {...props}
                    chooseStatus={true}
                    chooseCompleted={true}
                    chooseSort="sortBy"
                  />
                )}
              />
              <PrivateRoute
                path={`${routes.todos}/completed/sortByDesc`}
                redirectTo={routes.login}
                component={props => (
                  <TodosPage
                    {...props}
                    chooseStatus={true}
                    chooseCompleted={true}
                    chooseSort="sortByDesc"
                  />
                )}
              />
              <PrivateRoute
                path={`${routes.todos}/not_completed`}
                exact
                redirectTo={routes.login}
                component={props => (
                  <TodosPage
                    {...props}
                    chooseStatus={true}
                    chooseCompleted={false}
                  />
                )}
              />
              <PrivateRoute
                path={`${routes.todos}/not_completed/sortBy`}
                redirectTo={routes.login}
                component={props => (
                  <TodosPage
                    {...props}
                    chooseStatus={true}
                    chooseCompleted={false}
                    chooseSort="sortBy"
                  />
                )}
              />
              <PrivateRoute
                path={`${routes.todos}/not_completed/sortByDesc`}
                redirectTo={routes.login}
                component={props => (
                  <TodosPage
                    {...props}
                    chooseStatus={true}
                    chooseCompleted={false}
                    chooseSort="sortByDesc"
                  />
                )}
              />

              <PrivateRoute
                path={routes.profile}
                redirectTo={routes.login}
                exact
                component={ProfilePage}
              />

              <PrivateRoute
                path={routes.slider}
                component={SliderPage}
                redirectTo={routes.login}
              />

              <Route
                path={routes.not_completed_profile}
                component={WaitCompletedPage}
              />

              <PublicRoute
                path={routes.signup}
                redirectTo={routes.not_completed_profile}
                restricted
                component={RegisterPage}
              />
              <PublicRoute
                path={routes.login}
                redirectTo={location?.state?.from?.pathname || routes.todos}
                restricted
                component={LoginPage}
              />
              <Route
                path={routes.home}
                render={() =>
                  isAuthorized ? (
                    <Redirect to={routes.todos} />
                  ) : (
                    <Redirect to={routes.login} />
                  )
                }
              />
              <Redirect to={routes.home} />
            </Switch>
          )}
        </Suspense>
      </Container>
    </>
  );
};

export default BasicTemplate;
