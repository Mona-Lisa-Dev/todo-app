import styles from './TodosContentWrapper.module.scss';

const TodosContentWrapper = ({ children }) => {
  return <div className={styles.todosContentWrapper}>{children}</div>;
};

export default TodosContentWrapper;
