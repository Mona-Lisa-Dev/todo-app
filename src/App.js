import { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import { useLocation } from 'react-router';

import AppBar from 'components/AppBar';
import Container from 'components/Container';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { ThemeContext } from 'Context';

import { getCurrentUser } from 'redux/auth/auth-operations';
import {
  getIsAuthorized,
  getStatusLoadingUser,
} from 'redux/auth/auth-selectors';
import { getIsAdmin } from 'redux/admin/admin-selectors';
import { I18nProvider, LOCALES } from 'i18n';

import routes from 'routes';
import './scss/_main.scss';

const AllUsersPage = lazy(() =>
  import('./pages/AllUsersPage' /* webpackChunkName: "AllUsersPage" */),
);
const AllTasksPage = lazy(() =>
  import('./pages/AllTasksPage' /* webpackChunkName: "AllTasksPage" */),
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "LoginPage" */),
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage" */),
);
const TodosPage = lazy(() =>
  import('./pages/TodosPage' /* webpackChunkName: "TodosPage" */),
);
const SliderPage = lazy(() =>
  import('./pages/SliderPage' /* webpackChunkName: "SliderPage" */),
);

const App = () => {
  const [theme, setTheme] = useState('light');
  const [locale, setLocal] = useState(LOCALES.ENGLISH);
  const [adminPanel, setAdminPanel] = useState('user');

  const isAuthorized = useSelector(getIsAuthorized);
  const isAdmin = useSelector(getIsAdmin);
  const isLoadingUser = useSelector(getStatusLoadingUser);
  const dispatch = useDispatch();

  // const history = useHistory();
  const location = useLocation();

  const classNameApp = theme === 'light' ? 'lightTheme' : 'darkTheme';
  const themeToggler = () => {
    if (theme === 'light') {
      setTheme('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      window.localStorage.setItem('theme', 'light');
    }
  };

  const handleChangeLocale = code => {
    setLocal(code);
    window.localStorage.setItem('locale', code);
  };

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
    const localTheme = window.localStorage.getItem('theme');
    const localeLanguage = window.localStorage.getItem('locale');
    const adminPanel = window.localStorage.getItem('admin');

    localTheme
      ? setTheme(localTheme)
      : window.localStorage.setItem('theme', 'light');

    localeLanguage
      ? setLocal(localeLanguage)
      : window.localStorage.setItem('locale', LOCALES.ENGLISH);

    adminPanel
      ? setAdminPanel(adminPanel)
      : window.localStorage.setItem('admin', 'admin');
  }, []);

  useEffect(() => dispatch(getCurrentUser()), [dispatch]);

  return (
    <ThemeContext.Provider value={theme}>
      <I18nProvider locale={locale}>
        <div className={classNameApp}>
          <AppBar
            themeToggler={themeToggler}
            locale={locale}
            onChange={handleChangeLocale}
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

                  {isAdmin && (
                    <PrivateRoute
                      path={routes.allUsers}
                      exact
                      component={AllUsersPage}
                      redirectTo={routes.login}
                    />
                  )}
                  {isAdmin && (
                    <PrivateRoute
                      path={routes.allTasks}
                      exact
                      component={AllTasksPage}
                      redirectTo={routes.login}
                    />
                  )}

                  <PublicRoute
                    path={routes.signup}
                    redirectTo={routes.todos}
                    restricted
                    component={RegisterPage}
                  />
                  <PublicRoute
                    path={routes.login}
                    redirectTo={
                      location?.state?.from?.pathname || isAdmin
                        ? routes.allUsers
                        : routes.todos
                    }
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
        </div>
      </I18nProvider>
    </ThemeContext.Provider>
  );
};

export default App;
