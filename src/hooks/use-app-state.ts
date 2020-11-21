import { useReducer } from "react";
import { appStateReducer, defaultAppState, IAppStateStore } from "../stores/app-state-store";

export const useAppStateStore = (): IAppStateStore => {
  const [appState, dispatch] = useReducer(appStateReducer, defaultAppState, () => defaultAppState)
  return { appState, dispatch }
}
