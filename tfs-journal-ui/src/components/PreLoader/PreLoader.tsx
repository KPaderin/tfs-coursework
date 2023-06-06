import styles from './PreLoader.module.css';

interface Props {
  loading?: boolean;
}

function PreLoader({ loading }: Props) {
  return <>{loading && <h3 className={styles.loader}>Загрузка</h3>}</>;
}

export default PreLoader;
