import AddTodoBtn from 'components/AddTodoBtn';

export default {
  component: AddTodoBtn,
  title: 'Components/AddTodoBtn',
  argTypes: {
    createTodo: { control: '' },
  },
};

const Template = args => <AddTodoBtn {...args} />;

export const Default = Template.bind({});
