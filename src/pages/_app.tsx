import 'src/styles/reset.scss';
import 'src/styles/global.scss';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { CustomAppPage } from 'next/app';

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <MantineProvider>
      <NotificationsProvider>
        {getLayout(<Component {...pageProps} />)}
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
