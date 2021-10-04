import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from 'react-router';

import AppBar from 'components/AppBar';
import Container from 'components/Container';
import AdminTemplate from 'templates/AdminTemplate';
import BasicTemplate from 'templates/BasicTemplate';

import { ThemeContext } from 'Context';
import { getCurrentUser } from 'redux/auth/auth-operations';
// import {
//   getIsAuthorized,
//   getStatusLoadingUser,
// } from 'redux/auth/auth-selectors';
import { getIsAdmin } from 'redux/admin/admin-selectors';
import { I18nProvider, LOCALES } from 'i18n';

import './scss/_main.scss';

const App = () => {
  // const location = useLocation();
  // const condition = () => {
  //   if (
  //     location?.state?.from?.pathname.includes('todos') ||
  //     location?.state?.from?.pathname.includes('slider')
  //   ) {
  //     return 'user';
  //   }
  //   if (
  //     location?.state?.from?.pathname === `${routes.allTasks}` ||
  //     location?.state?.from?.pathname === `${routes.allUsers}`
  //   ) {
  //     return 'admin';
  //   }
  // };

  const [theme, setTheme] = useState('light');
  const [locale, setLocal] = useState(LOCALES.ENGLISH);
  const [adminPanel, setAdminPanel] = useState('user');
  // const [adminPanel, setAdminPanel] = useState(condition() || 'user');

  // const isAuthorized = useSelector(getIsAuthorized);
  const isAdmin = useSelector(getIsAdmin);
  // const isLoadingUser = useSelector(getStatusLoadingUser);
  const dispatch = useDispatch();

  // const history = useHistory();

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
    const admin = window.localStorage.getItem('admin');

    localTheme
      ? setTheme(localTheme)
      : window.localStorage.setItem('theme', 'light');

    localeLanguage
      ? setLocal(localeLanguage)
      : window.localStorage.setItem('locale', LOCALES.ENGLISH);

    admin
      ? setAdminPanel(admin)
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
            {isAdmin ? <AdminTemplate /> : <BasicTemplate />}
            {/* <Suspense fallback={null}>
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
           */}
          </Container>
        </div>
      </I18nProvider>
    </ThemeContext.Provider>
  );
};

export default App;
