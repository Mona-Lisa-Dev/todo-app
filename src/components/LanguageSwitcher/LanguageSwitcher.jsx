import { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactFlagsSelect from 'react-flags-select';
import { useIntl } from 'react-intl';

import { languages } from 'i18n';
import { ThemeContext } from 'Context';

import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = ({ locale, onChange }) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);
  const classNameBtn =
    theme === 'light'
      ? `${styles.btn_flag} ${styles.lightBtnFlags}`
      : `${styles.btn_flag} ${styles.darkBtnFlags}`;

  return (
    <div className={styles.switcher}>
      <ReactFlagsSelect
        selected={locale.slice(3)}
        onSelect={codeFlag => {
          const select = languages.find(({ code }) => code.includes(codeFlag));
          onChange(select.code);
        }}
        optionsSize={14}
        selectedSize={14}
        countries={['US', 'UA', 'RU', 'PL', 'FR', 'DE', 'IT', 'JP']}
        customLabels={{
          US: 'English',
          UA: 'Українська',
          RU: 'Русский',
          PL: 'Polskie',
          FR: 'Français',
          DE: 'Deutsche',
          IT: 'Italiano',
          JP: '日本語',
        }}
        placeholder="Select Language"
        searchable
        searchPlaceholder={intl.formatMessage({ id: 'languages' })}
        className={styles.menu_flags}
        selectButtonClassName={classNameBtn}
      />
    </div>
  );
};

LanguageSwitcher.propTypes = {
  locale: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LanguageSwitcher;
