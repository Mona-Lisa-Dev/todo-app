import React from 'react';
import UserMenu from 'components/UserMenu';

export default {
  component: UserMenu,
  title: 'Components/UserMenu',
};

const Template = args => <UserMenu {...args} />;

export const Default = Template.bind({});

// Default.args = {
//   name: 'Guest',
//   avatar: 'My avatar',
// };
