import type { RootState } from 'src/reducks/store';

export const selectCount = (state: RootState) => {
  return state.counter.value;
};
