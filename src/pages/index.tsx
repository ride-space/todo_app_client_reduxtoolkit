import type { CustomNextPage } from 'next';
import { AppLayout } from 'src/layout';

import styles from './index.module.scss';

type TestString = string;

const Index: CustomNextPage = () => {
  const foo: TestString = 'index';
  return <div className={styles.test}>{foo}</div>;
};

Index.getLayout = AppLayout;

export default Index;
