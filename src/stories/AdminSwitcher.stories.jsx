import AdminSwitcher from 'components/AdminSwitcher';

export default {
  component: AdminSwitcher,
  title: 'Components/AdminSwitcher',
  argTypes: {
    adminToggler: { action: 'changed' },
    adminPanel: { options: ['user', 'admin'], control: { type: 'radio' } },
  },
};

// const Template = args => {
//   return <AdminSwitcher {...args} />;
// };

// export const Default = Template.bind({});
// Default.args = {
//   adminPanel: 'user',
// };
