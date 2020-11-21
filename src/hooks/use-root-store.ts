import { useReducer } from "react";
import { rootReducer, DefaultRootState, IRootStore } from "../stores/root-store";

export const useRootStore = (): IRootStore => {
  const [state, dispatch] = useReducer(rootReducer, DefaultRootState, () => DefaultRootState);
  return { state, dispatch };
};
