import 'src/styles/reset.scss';
import 'src/styles/global.scss';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { CustomAppPage } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'src/reducks/store/store';
// import { authApi } from 'src/reducks/authStore';
// import { useAppDispatch } from "src/reducks/store/hooks";

const App: CustomAppPage = ({ Component, pageProps }) => {
  // const dispatch = useAppDispatch();
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  // axios.defaults.withCredentials = true
  // useEffectOnce(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/csrf`
  //     )
  //     axios.defaults.headers.common['csrf-token'] = data.csrfToken
  //     // const data= await dispatch(authApi.endpoints.getCsrf.initiate());
  //     console.log(data);
  //     // axios.defaults.headers.common['csrf-token'] = data.csrf
  //   }
  //   getCsrfToken()
  // })

  return (
    <Provider store={store}>
      <MantineProvider>
        <NotificationsProvider>
          {getLayout(<Component {...pageProps} />)}
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
};

export default App;
