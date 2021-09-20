import { LOCALES } from 'i18n/locales';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.FRENCH]: {
    slider_title: 'Chats domestiques',

    // login/signup form
    signup: "S'inscrire",
    login: 'Connexion',

    name: 'Nom',
    name_required: 'Le nom est requis',
    name_err_msg: 'Le nom doit comporter au moins 3 caractères',

    email: 'E-mail',
    email_required: 'Un e-mail est requis',
    email_err_msg: "L'email n'est pas valide",

    password: 'Mot de passe',
    password_required: 'Mot de passe requis',
    // password_visibility: 'Visibilité du mot de passe',
    password_err_msg:
      "Le mot de passe peut contenir des lettres, des chiffres, des traits d'union et des traits de soulignement",
    password_short_err: 'Le mot de passe doit comporter au moins 7 caractères',
    password_long_err: 'Le mot de passe ne doit pas dépasser 18 caractères',
    repeat_password: 'Répéter le mot de passe',
    passwords_should_match: 'Les mots de passe doivent correspondre!',

    age: 'Âge',
    age_required: "L'âge est requis",
    age_err_msg: 'La valeur doit être supérieure à 1',
    accept: "J'accepte les termes du contrat d'utilisation",

    // page todos
    add: 'Ajouter une tâche',
    charts: 'Graphiques',
    // todo назви в графіках, виконані і не виконані, селекти [object object]
    // chart_title: 'Tâches terminées et non terminées',
    confirm_delete_title: 'Voulez-vous vraiment supprimer cette tâche?',
    confirm_delete_text:
      'Vous ne pourrez pas restaurer cette tâche si vous la supprimez.',
    cancel: 'Annuler',
    delete: 'Supprimer',
    date_picker_label: 'Sélectionner la tâche par date de création',
    languages: 'Langues',
    save: 'Enregistrer',
    done: 'Fait',
    not_done: 'Pas fait',
    label_todo: 'Tâche',
    todo_required: 'La description de la tâche est requise',
    todo_short_msg: 'La description doit comporter au moins 3 caractères',
    todo_long_msg: 'La description doit comporter au plus 70 caractères',
    slider: 'Curseur',
    todos: 'Tâches',
    search: 'Chercher',
    status: 'Statut',
    // all: 'Tous',
    // completed: 'Terminé',
    // not_completed: 'Non terminé',
    sort: 'Trier',
    // by_default: 'Par défaut',
    // alphabetical: 'Alphabétique',
    // in_reverse: 'Alphabétique à l'envers',
    description: 'Description',
    actions: 'Actions',
    welcome: 'Bienvenue',
    guest: 'Invité',
    logout: 'Déconnexion',
  },
};
