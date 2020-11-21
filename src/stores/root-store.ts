import produce, { Draft } from "immer"

import { createContext } from "react";
import { ITabsAction } from "./tabs-actions";
import { DefaultTabsState, ITabsState, tabsReducer } from "./tabs-store";

export interface IRootState {
  tabs: ITabsState
}

export interface IRootStore {
  state: IRootState
  dispatch: React.Dispatch<ITabsAction>
}

export const DefaultRootState: IRootState = {
  tabs: DefaultTabsState
}

export const rootReducer = produce((draft: Draft<IRootState>, action: ITabsAction) => {
  draft.tabs = tabsReducer(draft.tabs, action)
  return draft
})

export const RootStoreContext = createContext<IRootStore>({state: DefaultRootState, dispatch: () => {}})
