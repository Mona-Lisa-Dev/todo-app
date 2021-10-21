import LanguageSwitcher from 'components/LanguageSwitcher';
import { LOCALES } from 'i18n';

export default {
  component: LanguageSwitcher,
  title: 'Components/LanguageSwitcher',
  argTypes: {
    // onChange: { action: 'changed' },
    locale: {
      options: [
        LOCALES.ENGlISH,
        LOCALES.UKRAINIAN,
        LOCALES.RUSSIAN,
        LOCALES.POLISH,
        LOCALES.ITALIAN,
        LOCALES.FRENCH,
        LOCALES.GERMAN,
        LOCALES.JAPANESE,
      ],
      control: { type: 'select' },
    },
  },
  parameters: {
    backgrounds: {
      default: 'grey',
    },
  },
};

const Template = args => <LanguageSwitcher {...args} />;

export const Default = Template.bind({});
Default.args = {
  locale: LOCALES.ENGlISH,
};
