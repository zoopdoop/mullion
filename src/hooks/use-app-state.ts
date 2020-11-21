import { createContext, useReducer } from "react";
import { IAppTab, INewAppTab } from "../models/app-tab";
import { Id } from "../models/generic-types";
import produce, { Draft } from "immer"
import { WritableDraft } from "immer/dist/internal";
import { INewSecondaryTab, ISecondaryTab } from "../models/secondary-tab";

export interface IAppState {
  appTabs: IAppTab[]
  nextTabId: Id
  selectedAppTabId: Id
}

const createAppTab = (id: Id, newAppTab?: INewAppTab): IAppTab => {
  return {
    id,
    title: newAppTab?.title || `New Tab (${id})`,
    url: newAppTab?.url || null,
    secondaryTabs: newAppTab?.secondaryTabs || [],
    selectedSecondaryTabId: newAppTab?.secondaryTabs[0]?.id || 0,
    splitter: {
      percentage: 50
    }
  }
}

const createSecondaryTab = (id: Id, newSecondaryTab?: INewSecondaryTab): ISecondaryTab => {
  return {
    id,
    title: newSecondaryTab?.title || `New Tab (${id})`,
    url: newSecondaryTab?.url || null
  }
}

const defaultAppState: IAppState = {
  appTabs: [createAppTab(1)],
  nextTabId: 2,
  selectedAppTabId: 1,
}

type IAction =
  | {type: "addAppTab", value: {newAppTab?: INewAppTab, select?: boolean}}
  | {type: "selectAppTab", value: {appTabId: Id}}
  | {type: "closeAppTab", value: {appTabId: Id}}
  | {type: "navigateToUrl", value: {appTabId: Id, url: string}}
  | {type: "addSecondaryTab", value: {appTabId: Id, newSecondaryTab?: INewSecondaryTab, select?: boolean}}

interface IAppStateStore {
  appState: IAppState
  dispatch: React.Dispatch<IAction>
}

export const addAppTabAction = (newAppTab?: INewAppTab): IAction => ({type: "addAppTab", value: {newAppTab}})
export const addAndSelectAppTabAction = (newAppTab?: INewAppTab): IAction => ({type: "addAppTab", value: {newAppTab, select: true}})
export const selectAppTabAction = (appTab: IAppTab): IAction => ({type: "selectAppTab", value: {appTabId: appTab.id}})
export const closeAppTabAction = (appTab: IAppTab): IAction => ({type: "closeAppTab", value: {appTabId: appTab.id}})
export const navigateToUrlAction = (appTab: IAppTab, url: string): IAction => ({type: "navigateToUrl", value: {appTabId: appTab.id, url}})
export const addSecondaryTabAction = (appTab: IAppTab, newSecondaryTab?: INewSecondaryTab): IAction => ({type: "addSecondaryTab", value: {appTabId: appTab.id, newSecondaryTab}})
export const addAndSelectSecondaryTabAction = (appTab: IAppTab, newSecondaryTab?: INewSecondaryTab): IAction => ({type: "addSecondaryTab", value: {appTabId: appTab.id, newSecondaryTab, select: true}})

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
      const appTabId = draft.nextTabId
      draft.nextTabId += 1
      draft.appTabs.push(createAppTab(appTabId, action.value.newAppTab))
      if (action.value.select || (draft.appTabs.length === 1)) {
        draft.selectedAppTabId = appTabId
      }
      // TODO: send message to create browser view
      break

    case "addSecondaryTab":
      const secondaryId = draft.nextTabId
      draft.nextTabId += 1
      updateAppTab(action.value.appTabId, (appTab) => {
        appTab.secondaryTabs.push(createSecondaryTab(secondaryId, action.value.newSecondaryTab))
        if (action.value.select || (appTab.secondaryTabs.length === 1)) {
          appTab.selectedSecondaryTabId = secondaryId
        }
      })
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
      updateAppTab(action.value.appTabId, (appTab) => appTab.url = action.value.url)
      // TODO: send message to navigate to url
      break
  }

  return draft
})

export const useAppStateStore = (): IAppStateStore => {
  const [appState, dispatch] = useReducer(appStateReducer, defaultAppState, () => defaultAppState)
  return { appState, dispatch }
}

export const AppStateStoreContext = createContext<IAppStateStore>({appState: defaultAppState, dispatch: () => {}})
