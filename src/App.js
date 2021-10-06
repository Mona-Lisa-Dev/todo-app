import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AdminTemplate from 'templates/AppTemplates/AdminTemplate';
import BasicTemplate from 'templates/AppTemplates/BasicTemplate';

import { ThemeContext } from 'Context';
import { getCurrentUser } from 'redux/auth/auth-operations';

import { getIsAdmin } from 'redux/admin/admin-selectors';
import { I18nProvider, LOCALES } from 'i18n';

import './scss/_main.scss';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [locale, setLocal] = useState(LOCALES.ENGLISH);
  const isAdmin = useSelector(getIsAdmin);
  const dispatch = useDispatch();

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

  useEffect(() => dispatch(getCurrentUser()), [dispatch]);

  return (
    <ThemeContext.Provider value={theme}>
      <I18nProvider locale={locale}>
        <div className={classNameApp}>
          {isAdmin ? (
            <AdminTemplate
              themeToggler={themeToggler}
              locale={locale}
              onChange={handleChangeLocale}
            />
          ) : (
            <BasicTemplate
              themeToggler={themeToggler}
              locale={locale}
              onChange={handleChangeLocale}
            />
          )}
        </div>
      </I18nProvider>
    </ThemeContext.Provider>
  );
};

export default App;
