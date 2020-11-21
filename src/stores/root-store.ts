import produce, { Draft } from "immer"

import { createContext } from "react";
import { IRendererAction } from "../actions/renderer-actions";
import { DefaultTabsState, ITabsState, tabsReducer } from "./tabs-store";

export interface IRootState {
  tabs: ITabsState
}

export interface IRootStore {
  state: IRootState
  dispatch: React.Dispatch<IRendererAction>
}

export const DefaultRootState: IRootState = {
  tabs: DefaultTabsState
}

export const rootReducer = produce((draft: Draft<IRootState>, action: IRendererAction) => {
  draft.tabs = tabsReducer(draft.tabs, action)
  return draft
})

export const RootStoreContext = createContext<IRootStore>({state: DefaultRootState, dispatch: () => {}})
