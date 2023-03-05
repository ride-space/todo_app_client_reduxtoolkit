import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { createWrapper } from 'next-redux-wrapper';
import { serverApi } from 'src/pages/service/serverApi';
import { CounterReducer } from 'src/reducks/CounterStore';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(serverApi.middleware);
  },
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    counter: CounterReducer,
  },
});

// export type AppStore = ReturnType<typeof store>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

// export const wrapper = createWrapper<AppStore>(store, { debug: true });
