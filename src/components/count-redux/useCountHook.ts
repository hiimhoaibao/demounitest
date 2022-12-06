import { useAppDispatch, useAppSelector } from "@/services";
import { actions } from "@/store/slices/App";

type UseCountHookResponseType = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

const useCountHook = (): UseCountHookResponseType => {
  const count = useAppSelector((state) => state.app.count);
  const dispatch = useAppDispatch();

  return {
    count,
    increase: () => dispatch(actions.increase()),
    decrease: () => dispatch(actions.decrease()),
  };
};

export default useCountHook;
