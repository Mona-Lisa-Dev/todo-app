import { LOCALES } from 'i18n/locales';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.UKRAINIAN]: {
    slider_title: 'Домашні кішки',

    // login/signup form
    signup: 'Реєстрація',
    login: 'Вхід',

    name: 'Ім’я',
    name_required: 'Ім’я обов’язкове',
    name_err_msg: 'Ім’я має містити не менше 3 символів',

    email: 'Електронна пошта',
    email_required: 'Потрібна електронна пошта',
    email_err_msg: 'Електронна пошта недійсна',

    password: 'Пароль',
    password_required: 'Необхідний пароль',
    // password_visibility: 'Видимість пароля',
    password_err_msg:
      'Пароль може містити букви, цифри, дефіси та підкреслення',
    password_short_err: 'Пароль повинен містити не менше 7 символів',
    password_long_err: 'Пароль повинен містити не більше 18 символів',
    repeat_password: 'Повторити пароль',
    passwords_should_match: 'Паролі повинні збігатися!',

    age: 'Вік',
    age_required: 'Вік обов’язковий',
    age_err_msg: 'Значення має бути більше 1',
    accept: 'Я приймаю умови Угоди користувача',

    // page todos
    add: 'Додати завдання',
    charts: 'Діаграми',
    // todo назви в графіках, виконані і не виконані, селекти [object object]
    // chart_title: 'Виконані та невиконані завдання',
    confirm_delete_title: 'Ви впевнені, що хочете видалити це завдання?',
    confirm_delete_text:
      'Ви не зможете відновити це завдання, якщо видалите його.',
    cancel: 'Скасувати',
    delete: 'Видалити',
    date_picker_label: 'Виберіть завдання за датою створення',
    languages: 'Виберіть мову',
    save: 'Зберегти',
    done: 'Готово',
    not_done: 'Не зроблено',
    label_todo: 'Завдання',
    todo_required: 'Потрібен опис завдання',
    todo_short_msg: 'Опис має містити принаймні 3 символи',
    todo_long_msg: 'Опис має містити не більше 70 символів',
    slider: 'Слайдер',
    todos: 'Завдання',
    search: 'Пошук',
    status: 'Статус',
    // all: 'Усі',
    // completed: 'Завершено',
    // not_completed: 'Не завершено',
    sort: 'Сортувати',
    // by_default: 'За замовчуванням',
    // alphabetical: 'За алфавітом',
    // in_reverse: 'В оберненому порядку',
    description: 'Опис',
    actions: 'Дії',
    welcome: 'Ласкаво просимо',
    guest: 'Гість',
    logout: 'Вихід',
  },
};
