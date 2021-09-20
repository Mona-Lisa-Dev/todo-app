import { LOCALES } from 'i18n/locales';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.ITALIAN]: {
    slider_title: 'Gatti domestici',

    // login/signup form
    signup: 'Iscriviti',
    login: 'Accesso',

    name: 'Nome',
    name_required: 'Il nome è obbligatorio',
    name_err_msg: 'Il nome deve contenere almeno 3 caratteri',

    email: 'E-mail',
    email_required: "L'e-mail è obbligatoria",
    email_err_msg: "L'email non è valida",

    password: 'Password',
    password_required: "E 'richiesta la password",
    // password_visibility: 'Visibilità password',
    password_err_msg:
      'La password può contenere lettere, numeri, trattini e trattini bassi',
    password_short_err: 'La password deve essere di almeno 7 caratteri',
    password_long_err: 'La password deve contenere al massimo 18 caratteri',
    repeat_password: 'Ripeti la password',
    passwords_should_match: 'Le password dovrebbero corrispondere!',

    age: 'Età',
    age_required: "L'età è richiesta",
    age_err_msg: 'Il valore deve essere maggiore di 1',
    accept: "Accetto i termini dell'Accordo per gli utenti",

    // page todos
    add: 'Aggiungi attività',
    charts: 'Grafici',
    // todo назви в графіках, виконані і не виконані, селекти [object object]
    // chart_title: 'Attività completate e non completate'',
    confirm_delete_title: 'Sei sicuro di voler eliminare questa attività?',
    confirm_delete_text:
      'Non potrai ripristinare questa attività se la elimini.',
    cancel: 'Annulla',
    delete: 'Elimina',
    date_picker_label: 'Seleziona attività per data di creazione',
    languages: 'Lingue',
    save: 'Salva',
    done: 'Fatto',
    not_done: 'Non fatto',
    label_todo: 'Compito',
    todo_required: "Descrizione dell'attività richiesta",
    todo_short_msg: 'La descrizione deve contenere almeno 3 caratteri',
    todo_long_msg: 'La descrizione deve contenere al massimo 70 caratteri',
    slider: 'Cursore',
    todos: 'Compiti',
    search: 'Ricerca',
    status: 'Stato',
    // all: 'Tutto',
    // completed: 'Completato',
    // not_completed: 'Non completato',
    sort: 'Ordina',
    // by_default: 'Per impostazione predefinita'',
    // alphabetical: 'Alfabetico',
    // in_reverse: 'Alfabetico al contrario',
    description: 'Descrizione',
    actions: 'Azioni',
    welcome: 'Benvenuto',
    guest: 'Ospite',
    logout: 'Esci',
  },
};
