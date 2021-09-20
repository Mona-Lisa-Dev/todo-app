import { LOCALES } from 'i18n/locales';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.GERMAN]: {
    slider_title: 'Hauskatzen',

    // login/signup form
    signup: 'Anmelden',
    login: 'Einloggen',

    name: 'Name',
    name_required: 'Name ist erforderlich',
    name_err_msg: 'Name muss mindestens 3 Zeichen lang sein',

    email: 'E-Mail',
    email_required: 'E-Mail ist erforderlich',
    email_err_msg: 'Email ist ungültig',

    password: 'Passwort',
    password_required: 'Passwort wird benötigt',
    // password_visibility: 'Passwortsichtbarkeit',
    password_err_msg:
      'Das Passwort kann Buchstaben, Zahlen, Bindestriche und Unterstriche enthalten',
    password_short_err: 'Das Passwort muss mindestens 7 Zeichen lang sein',
    password_long_err: 'Das Passwort darf höchstens 18 Zeichen lang sein',
    repeat_password: 'Passwort wiederholen',
    passwords_should_match: 'Passwörter sollten übereinstimmen!',

    age: 'Alter',
    age_required: 'Alter ist erforderlich',
    age_err_msg: 'Der Wert muss größer als 1 sein',
    accept: 'Ich akzeptiere die Bedingungen der Benutzervereinbarung',

    // page todos
    add: 'Aufgabe hinzufügen',
    charts: 'Diagramme',
    // todo назви в графіках, виконані і не виконані, селекти [object object]
    // chart_title: 'Abgeschlossene und noch nicht erledigte Aufgaben',
    confirm_delete_title:
      'Sind Sie sicher, dass Sie diese Aufgabe löschen möchten?',
    confirm_delete_text:
      'Sie können diese Aufgabe nicht wiederherstellen, wenn Sie sie löschen.',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    date_picker_label: 'Aufgabe nach Erstellungsdatum auswählen',
    languages: 'Sprachen',
    save: 'Speichern',
    done: 'Fertig',
    not_done: 'Nicht erledigt',
    label_todo: 'Aufgabe',
    todo_required: 'Beschreibung der Aufgabe ist erforderlich',
    todo_short_msg: 'Beschreibung muss mindestens 3 Zeichen lang sein',
    todo_long_msg: 'Beschreibung darf höchstens 70 Zeichen lang sein',
    slider: 'Schieber',
    todos: 'Aufgaben',
    search: 'Suche',
    status: 'Status',
    // all: 'alles',
    // completed: 'Abgeschlossen',
    // not_completed: 'Nicht abgeschlossen',
    sort: 'Sortieren',
    // by_default: 'Standardmäßig',
    // alphabetical: 'Alphabetisch',
    // in_reverse: 'Alphabetisch rückwärts',
    description: 'Beschreibung',
    actions: 'Aktionen',
    welcome: 'Wilkommen',
    guest: 'Gast',
    logout: 'Abmelden',
  },
};
