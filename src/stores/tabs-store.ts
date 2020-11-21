import produce, { Draft } from "immer"
import { WritableDraft } from "immer/dist/internal";

import { Id } from "./generic-types";
import { INewAppTab, INewSecondaryTab, ITabAction } from "../actions/tab-actions";
import { IAppTab, ISecondaryTab } from "./tab-models";

export interface ITabsState {
  appTabs: IAppTab[]
  nextTabId: Id
  selectedAppTabId: Id
}

export interface ITabsStateStore {
  state: ITabsState
  dispatch: React.Dispatch<ITabAction>
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

export const DefaultTabsState: ITabsState = {
  appTabs: [createAppTab(1)],
  nextTabId: 2,
  selectedAppTabId: 1,
}

export const tabsReducer = produce((draft: Draft<ITabsState>, action: ITabAction) => {
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
        // TODO: send message to close window
      }      
      break

    case "navigateToUrl":
      updateAppTab(action.value.appTabId, (appTab) => appTab.url = action.value.url)
      // TODO: send message to navigate to url
      break
  }

  return draft
})