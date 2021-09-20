import { InputLabel, FormControl, Select } from '@material-ui/core';

import { languages, translate } from 'i18n';

import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = ({ locale, onChange }) => {
  return (
    <div className={styles.switcher}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="code">{translate('languages')}</InputLabel>
        <Select
          native
          value={locale}
          onChange={e => {
            onChange(e.target.value);
            console.log(e);
          }}
          label={translate('languages')}
          inputProps={{
            name: 'code',
            id: 'code',
          }}
        >
          {languages.map(({ name, code }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* {translate('languages')}
      <select value={locale} onChange={e => onChange(e.target.value)}>
        {languages.map(({ name, code }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default LanguageSwitcher;
