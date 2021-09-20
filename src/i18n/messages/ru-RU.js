import { LOCALES } from 'i18n/locales';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.RUSSIAN]: {
    slider_title: 'Домашние кошки',

    // login/signup form
    signup: 'Регистрация',
    login: 'Вход',

    name: 'Имя',
    name_required: 'Имя обязательно',
    name_err_msg: 'Имя должно состоять не менее чем из 3 символов',

    email: 'Эл. почта',
    email_required: 'Эл. почта обязательна',
    email_err_msg: 'Эл. почта не является допустимой',

    password: 'Пароль',
    password_required: 'Пароль обязателен',
    // password_visibility: 'Видимость пароля',
    password_err_msg:
      'Пароль может содержать буквы, цифры, дефисы и символы подчеркивания',
    password_short_err: 'Пароль должен состоять не менее чем из 7 символов',
    password_long_err: 'Пароль должен состоять не более чем из 18 символов',
    repeat_password: 'Повторите пароль',
    passwords_should_match: 'Пароли должны совпадать!',

    age: 'Возраст',
    age_required: 'Требуется возраст',
    age_err_msg: 'Значение должно быть больше 1',
    accept: 'Я принимаю условия Пользовательского соглашения',

    // page todos
    add: 'Добавить задачу',
    charts: 'Графики',
    // todo назви в графіках, виконані і не виконані, селекти [object object]
    // chart_title: 'Завершенные и незавершенные задачи',
    confirm_delete_title: 'Вы действительно хотите удалить эту задачу?',
    confirm_delete_text:
      'Вы не сможете восстановить эту задачу, если удалите ее.',
    cancel: 'Отмена',
    delete: 'Удалить',
    date_picker_label: 'Выбрать задачу по дате создания',
    languages: 'Выберите язык',
    save: 'Сохранить',
    done: 'Выполнено',
    not_done: 'Не выполнено',
    label_todo: 'Задача',
    todo_required: 'Требуется описание задачи',
    todo_short_msg: 'Описание должно содержать не менее 3 символов',
    todo_long_msg: 'Описание должно содержать не более 70 символов',
    slider: 'Слайдер',
    todos: 'Задачи',
    search: 'Поиск',
    status: 'Статус',
    // all: 'Все',
    // completed: 'Завершено',
    // not_completed: 'Не завершено',
    sort: 'Сортировать',
    // by_default: 'По умолчанию',
    // alphabetical: 'По алфавиту',
    // in_reverse: 'По алфавиту в обратном порядке',
    description: 'Описание',
    actions: 'Действия',
    welcome: 'Добро пожаловать',
    guest: 'Гость',
    logout: 'Выйти',
  },
};
