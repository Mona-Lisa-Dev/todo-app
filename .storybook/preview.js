import { useContext, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from 'redux/store';
import { ThemeContext } from 'Context';
import { I18nProvider, LOCALES } from 'i18n';

import 'scss/_main.scss';

let modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.querySelector('body').appendChild(modalRoot);

export const decorators = [
  (Story, context) => {
    const theme = useContext(ThemeContext);

    console.log('context', context);

    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeContext.Provider value={theme}>
            <I18nProvider locale={context.args.locale || LOCALES.ENGLISH}>
              <Suspense fallback={null}>
                <Story />
              </Suspense>
            </I18nProvider>
          </ThemeContext.Provider>
        </BrowserRouter>
      </Provider>
    );
  },
];

export const parameters = {
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'grey',
        value: '#787780;',
      },
      {
        name: 'white',
        value: '#ffffff',
      },
    ],
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
