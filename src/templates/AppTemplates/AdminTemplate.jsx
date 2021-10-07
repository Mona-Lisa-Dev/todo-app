import { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Container from 'components/Container';
import { AppBarAdminTemplate } from 'templates/AppBarTemplates';

import {
  getIsAuthorized,
  getStatusLoadingUser,
} from 'redux/auth/auth-selectors';

import routes from 'routes';

const AllUsersPage = lazy(() =>
  import('../../pages/AllUsersPage' /* webpackChunkName: "AllUsersPage" */),
);
const AllTasksPage = lazy(() =>
  import('../../pages/AllTasksPage' /* webpackChunkName: "AllTasksPage" */),
);
const LoginPage = lazy(() =>
  import('../../pages/LoginPage' /* webpackChunkName: "LoginPage" */),
);
const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage' /* webpackChunkName: "RegisterPage" */),
);
const TodosPage = lazy(() =>
  import('../../pages/TodosPage' /* webpackChunkName: "TodosPage" */),
);
const SliderPage = lazy(() =>
  import('../../pages/SliderPage' /* webpackChunkName: "SliderPage" */),
);
const ProfilePage = lazy(() =>
  import('../../pages/ProfilePage' /* webpackChunkName: "ProfilePage" */),
);

const AdminTemplate = ({ themeToggler, locale, onChange }) => {
  const location = useLocation();

  const [adminPanel, setAdminPanel] = useState('');
  const isAuthorized = useSelector(getIsAuthorized);
  const isLoadingUser = useSelector(getStatusLoadingUser);

  const adminToggler = () => {
    if (adminPanel === 'admin') {
      setAdminPanel('user');
      window.localStorage.setItem('admin', 'user');
    } else {
      setAdminPanel('admin');
      window.localStorage.setItem('admin', 'admin');
    }
  };

  useEffect(() => {
    const admin = window.localStorage.getItem('admin');

    admin
      ? setAdminPanel(admin)
      : window.localStorage.setItem('admin', 'admin');
  }, []);

  return (
    <>
      <AppBarAdminTemplate
        themeToggler={themeToggler}
        locale={locale}
        onChange={onChange}
        adminToggler={adminToggler}
        adminPanel={adminPanel}
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
                path={routes.slider}
                component={SliderPage}
                redirectTo={routes.login}
              />

              <PrivateRoute
                path={routes.profile}
                redirectTo={routes.login}
                exact
                component={ProfilePage}
              />

              <PrivateRoute
                path={routes.allUsers}
                exact
                component={AllUsersPage}
                redirectTo={routes.login}
              />

              <PrivateRoute
                path={routes.allTasks}
                exact
                component={AllTasksPage}
                redirectTo={routes.login}
              />

              <PublicRoute
                path={routes.signup}
                redirectTo={routes.todos}
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

export default AdminTemplate;
