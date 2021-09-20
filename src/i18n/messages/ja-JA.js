import { LOCALES } from 'i18n/locales';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [LOCALES.JAPANESE]: {
    slider_title: '飼い猫',

    // login/signup form
    signup: 'サインアップ',
    login: 'ログイン',

    name: '名前',
    name_required: '名前が必要です',
    name_err_msg: '名前は3文字以上である必要があります',

    email: 'Eメール',
    email_required: 'メールが必要です',
    email_err_msg: 'Eメールは無効です',

    password: 'パスワード',
    password_required: 'パスワードが必要です',
    // password_visibility: 'パスワードの可視性',
    password_err_msg:
      'パスワードには、文字、数字、ハイフン、アンダースコアを含めることができます',
    password_short_err: 'パスワードは7文字以上である必要があります',
    password_long_err: 'パスワードは18文字以内である必要があります',
    repeat_password: 'パスワードを再度入力してください',
    passwords_should_match: 'パスワードは一致する必要があります！',

    age: '年',
    age_required: '年齢が必要です',
    age_err_msg: '値は1より大きくなければなりません',
    accept: 'ユーザー契約の条件に同意します',

    // page todos
    add: 'タスクを追加',
    charts: 'チャート',
    // chart_title: '完了したタスクと完了していないタスク',
    confirm_delete_title: 'このタスクを削除してもよろしいですか？',
    confirm_delete_text: 'このタスクを削除すると、復元できなくなります。',
    cancel: 'キャンセル',
    delete: '削除',
    date_picker_label: '作成日でタスクを選択',
    languages: '言語',
    save: '保存',
    done: '完了',
    not_done: '未完了',
    label_todo: 'タスク',
    todo_required: 'タスクの説明が必要です',
    todo_short_msg: '説明は3文字以上である必要があります',
    todo_long_msg: '説明は最大70文字である必要があります',
    slider: 'スライダー',
    todos: 'タスク',
    search: '検索',
    status: 'ステータス',
    // all: 'すべて',
    // completed: '完了',
    // not_completed: '未完了',
    sort: '並べ替え',
    // by_default: 'デフォルトでは',
    // alphabetical: 'アルファベット順',
    // in_reverse: 'アルファベット順逆',
    description: '説明',
    actions: 'アクション',
    welcome: 'いらっしゃいませ',
    guest: 'ゲスト',
    logout: 'ログアウト',
  },
};
