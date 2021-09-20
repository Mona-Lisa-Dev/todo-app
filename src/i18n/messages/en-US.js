import { LOCALES } from 'i18n/locales';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.ENGLISH]: {
    slider_title: 'Domestic cats',

    // login/signup form
    signup: 'Sign up',
    login: 'Log in',

    name: 'Name',
    name_required: 'Name is required',
    name_err_msg: 'Name must be at least 3 characters',

    email: 'E-mail',
    email_required: 'E-mail is required',
    email_err_msg: 'E-mail is not valid',

    password: 'Password',
    password_required: 'Password is required',
    // password_visibility: 'Password visibility',
    password_err_msg:
      'Password can contain letters, numbers, hyphens and underscores',
    password_short_err: 'Password must be at least 7 characters',
    password_long_err: 'Password must be at most 18 characters',
    repeat_password: 'Repeat password',
    passwords_should_match: 'Passwords should match!',

    age: 'Age',
    age_required: 'Age is required',
    age_err_msg: 'Value must be greater than 1',
    accept: 'I accept the terms of the User Agreement',

    // page todos
    add: 'Add todo',
    charts: 'Charts',
    // todo назви в графіках, виконані і не виконані, селекти [object object]
    // chart_title: 'Completed and not completed todos',
    confirm_delete_title: 'Are you sure you want to delete this task?',
    confirm_delete_text:
      "You'll not be able to restore this task if you delete it.",
    cancel: 'Cancel',
    delete: 'Delete',
    date_picker_label: 'Select todo by creation date',
    languages: 'Languages',
    save: 'Save',
    done: 'Done',
    not_done: 'Not done',
    label_todo: 'Todo',
    todo_required: 'Description of task is required',
    todo_short_msg: 'Description must be at least 3 characters',
    todo_long_msg: 'Description must be at most 70 characters',
    slider: 'Slider',
    todos: 'Todos',
    search: 'Search',
    status: 'Status',
    // all: 'All',
    // completed: 'Completed',
    // not_completed: 'Not completed',
    sort: 'Sort',
    // by_default: 'By default',
    // alphabetical: 'Alphabetical',
    // in_reverse: 'Alphabetical in reverse',
    description: 'Name',
    actions: 'Actions',
    welcome: 'Welcome',
    guest: 'Guest',
    logout: 'Logout',
  },
};
