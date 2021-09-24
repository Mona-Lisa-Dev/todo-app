import { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

// import { useHistory, useLocation, useRouteMatch } from 'react-router';

import AppBar from 'components/AppBar';
import Container from 'components/Container';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { ThemeContext } from 'Context';

import { getCurrentUser } from 'redux/auth/auth-operations';
import { getIsAuthorized } from 'redux/auth/auth-selectors';
import { I18nProvider, LOCALES } from 'i18n';

import routes from 'routes';
import './scss/_main.scss';

const HomePage = lazy(() =>
  import('./pages/Homepage' /* webpackChunkName: "HomePage" */),
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

  // const history = useHistory();
  // const location = useLocation();

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
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    const localeLanguage = window.localStorage.getItem('locale');

    localTheme
      ? setTheme(localTheme)
      : window.localStorage.setItem('theme', 'light');

    localeLanguage
      ? setLocal(localeLanguage)
      : window.localStorage.setItem('locale', LOCALES.ENGLISH);
  }, []);

  const handleChangeLocale = code => {
    setLocal(code);
    window.localStorage.setItem('locale', code);
  };

  const isAuthorized = useSelector(getIsAuthorized);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getCurrentUser()), [dispatch]);

  return (
    <ThemeContext.Provider value={theme}>
      <I18nProvider locale={locale}>
        <div className={classNameApp}>
          <AppBar
            themeToggler={themeToggler}
            locale={locale}
            onChange={handleChangeLocale}
          />

          <Container>
            <Suspense fallback={null}>
              <Switch>
                <PrivateRoute
                  path={routes.todos}
                  redirectTo={routes.login}
                  exact
                  component={TodosPage}
                />

                <Route
                  path={`${routes.todos}/sortBy`}
                  render={props =>
                    isAuthorized ? (
                      <TodosPage {...props} chooseSort="sortBy" />
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route
                  path={`${routes.todos}/sortByDesc`}
                  render={props =>
                    isAuthorized ? (
                      <TodosPage {...props} chooseSort="sortByDesc" />
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route
                  path={`${routes.todos}/completed`}
                  exact
                  render={props =>
                    isAuthorized ? (
                      <TodosPage
                        {...props}
                        chooseStatus={true}
                        chooseCompleted={true}
                      />
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route
                  path={`${routes.todos}/completed/sortBy`}
                  render={props =>
                    isAuthorized ? (
                      <TodosPage
                        {...props}
                        chooseStatus={true}
                        chooseCompleted={true}
                        chooseSort="sortBy"
                      />
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route
                  path={`${routes.todos}/completed/sortByDesc`}
                  render={props =>
                    isAuthorized ? (
                      <TodosPage
                        {...props}
                        chooseStatus={true}
                        chooseCompleted={true}
                        chooseSort="sortByDesc"
                      />
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route
                  path={`${routes.todos}/not_completed`}
                  exact
                  render={props =>
                    isAuthorized ? (
                      <TodosPage
                        {...props}
                        chooseStatus={true}
                        chooseCompleted={false}
                      />
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route
                  path={`${routes.todos}/not_completed/sortBy`}
                  render={props =>
                    isAuthorized ? (
                      <TodosPage
                        {...props}
                        chooseStatus={true}
                        chooseCompleted={false}
                        chooseSort="sortBy"
                      />
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route
                  path={`${routes.todos}/not_completed/sortByDesc`}
                  render={props =>
                    isAuthorized ? (
                      <TodosPage
                        {...props}
                        chooseStatus={true}
                        chooseCompleted={false}
                        chooseSort="sortByDesc"
                      />
                    ) : (
                      <LoginPage />
                    )
                  }
                />

                <Route
                  path={routes.slider}
                  render={props =>
                    isAuthorized ? <SliderPage {...props} /> : <LoginPage />
                  }
                />

                {/* <PrivateRoute
                  path={routes.slider}
                  component={SliderPage}
                  redirectTo={routes.login}
                /> */}

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
                    isAuthorized ? <Redirect to={routes.todos} /> : <HomePage />
                  }
                />

                <Redirect to={routes.home} />
              </Switch>
            </Suspense>
          </Container>
        </div>
      </I18nProvider>
    </ThemeContext.Provider>
  );
};

export default App;
