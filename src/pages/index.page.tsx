import type { CustomNextPage } from 'next';
import { AppLayout } from 'src/layout';
import { selectCount } from 'src/reducks/CounterStore';
import { decrement, increment } from 'src/reducks/CounterStore/slices';
import { useAppDispatch, useAppSelector } from 'src/reducks/store/hooks';


const Index: CustomNextPage = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>index</div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => {
            return dispatch(increment());
          }}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => {
            return dispatch(decrement());
          }}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

Index.getLayout = AppLayout;

export default Index;
