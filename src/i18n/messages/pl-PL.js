import { LOCALES } from 'i18n/locales';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.POLISH]: {
    slider_title: 'Koty domowe',

    // login/signup form
    signup: 'Zapisz się',
    login: 'Zaloguj sie',

    name: 'Imię',
    name_required: 'Imię jest wymagane',
    name_err_msg: 'Imię musi mieć co najmniej 3 znaki',

    email: 'Email',
    email_required: 'Email jest wymagany',
    email_err_msg: 'Adres email jest nieprawidłowy',

    password: 'Hasło',
    password_required: 'Wymagane jest hasło',
    // password_visibility: 'Widoczność hasła',
    password_err_msg:
      'Hasło może zawierać litery, cyfry, łączniki i podkreślenia',
    password_short_err: 'Hasło musi mieć co najmniej 7 znaków',
    password_long_err: 'Hasło musi mieć maksymalnie 18 znaków',
    repeat_password: 'Powtórz hasło',
    passwords_should_match: 'Hasła powinny się zgadzać!',

    age: 'Wiek',
    age_required: 'Wiek jest wymagany',
    age_err_msg: 'Wartość musi być większa niż 1',
    accept: 'Akceptuję warunki Umowy użytkownika',

    // page todos
    add: 'Dodaj zadanie',
    charts: 'Wykresy',
    // todo назви в графіках, виконані і не виконані, селекти [object object]
    // chart_title: 'Zakończone i nieukończone zadania',
    confirm_delete_title: 'Czy na pewno chcesz usunąć to zadanie?',
    confirm_delete_text:
      'Nie będziesz w stanie przywrócić tego zadania, jeśli je usuniesz.',
    cancel: 'Anuluj',
    delete: 'Usuń',
    date_picker_label: 'Wybierz zadanie według daty utworzenia',
    languages: 'Języki',
    save: 'Zapisz',
    done: 'Gotowe',
    not_done: 'Nie zrobione',
    label_todo: 'Zadanie',
    todo_required: 'Wymagany jest opis zadania',
    todo_short_msg: 'Opis musi mieć co najmniej 3 znaki',
    todo_long_msg: 'Opis musi mieć maksymalnie 70 znaków',
    slider: 'Suwak',
    todos: 'Zadania',
    search: 'Szukaj',
    status: 'Status',
    // all: 'Wszystko',
    // completed: 'Zakończono',
    // not_completed: 'Nieukończone',
    sort: 'Sortuj',
    // by_default: 'Domyślnie',
    // alphabetical: 'Alfabetycznie',
    // in_reverse: 'Alfabetycznie w odwrotnej kolejności',
    description: 'Opis',
    actions: 'Akcje',
    welcome: 'Witamy',
    guest: 'Gość',
    logout: 'Wyloguj',
  },
};
