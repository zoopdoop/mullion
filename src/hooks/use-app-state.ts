import { createContext, useReducer } from "react";
import { IAppTab, INewAppTab } from "../models/app-tab";
import { Id } from "../models/generic-types";
import produce, { Draft } from "immer"
import { WritableDraft } from "immer/dist/internal";

export interface IAppState {
  appTabs: IAppTab[]
  nextAppTabId: Id
  selectedAppTabId: Id
}

const createAppTab = (id: Id, newAppTab?: INewAppTab): IAppTab => {
  return {
    id,
    title: newAppTab?.title || `New Tab (${id})`,
    primaryUrl: newAppTab?.primaryUrl || null,
    secondaryUrls: newAppTab?.secondaryUrls || [],
    splitter: {
      percentage: 50
    }
  }
}

const defaultAppState: IAppState = {
  appTabs: [createAppTab(1)],
  nextAppTabId: 2,
  selectedAppTabId: 1,
}

type IAction =
  | {type: "addAppTab", value: {newAppTab?: INewAppTab, select?: boolean}}
  | {type: "selectAppTab", value: {appTabId: Id}}
  | {type: "closeAppTab", value: {appTabId: Id}}
  | {type: "navigateToUrl", value: {appTabId: Id, url: string}}

interface IAppStateStore {
  state: IAppState
  dispatch: React.Dispatch<IAction>
}

export const addAppTabAction = (newAppTab?: INewAppTab): IAction => ({type: "addAppTab", value: {newAppTab}})
export const addAndSelectAppTabAction = (newAppTab?: INewAppTab): IAction => ({type: "addAppTab", value: {newAppTab, select: true}})
export const selectAppTabAction = (appTab: IAppTab): IAction => ({type: "selectAppTab", value: {appTabId: appTab.id}})
export const closeAppTabAction = (appTab: IAppTab): IAction => ({type: "closeAppTab", value: {appTabId: appTab.id}})
export const navigateToUrlAction = (appTab: IAppTab, url: string): IAction => ({type: "navigateToUrl", value: {appTabId: appTab.id, url}})

const appStateReducer = produce((draft: Draft<IAppState>, action: IAction) => {
  const getAppTabIndex = (appTabId: Id) => draft.appTabs.findIndex(appTab => appTab.id === appTabId)
  const updateAppTab = (appTabId: Id, updater: (appTab: WritableDraft<IAppTab>) => void) => {
    const index = getAppTabIndex(appTabId)
    if (index !== -1) {
      updater(draft.appTabs[index])
    }
  }

  switch (action.type) {
    case "addAppTab":
      const id = draft.nextAppTabId
      draft.nextAppTabId += 1
      draft.appTabs.push(createAppTab(id, action.value.newAppTab))
      if (action.value.select) {
        draft.selectedAppTabId = id
      }
      // TODO: send message to create browser view
      break

    case "selectAppTab":
      draft.selectedAppTabId = action.value.appTabId
      break

    case "closeAppTab":
      const numAppTabs = draft.appTabs.length
      if (numAppTabs > 1) {
        const index = getAppTabIndex(action.value.appTabId)
        if (index !== -1) {
          draft.appTabs.splice(index, 1)
          if (action.value.appTabId === draft.selectedAppTabId) {
            draft.selectedAppTabId = (draft.appTabs[index] || draft.appTabs[index - 1]).id
          }
        }
        // TODO: send message to delete browser views
      } else {
        // TODO: close message window
      }      
      break

    case "navigateToUrl":
      updateAppTab(action.value.appTabId, (appTab) => appTab.primaryUrl = action.value.url)
      // TODO: send message to navigate to url
      break
  }

  return draft
})

export const useAppStateStore = (): IAppStateStore => {
  const [state, dispatch] = useReducer(appStateReducer, defaultAppState, () => defaultAppState)
  return { state, dispatch }
}

export const AppStateStoreContext = createContext<IAppStateStore>({state: defaultAppState, dispatch: () => {}})
