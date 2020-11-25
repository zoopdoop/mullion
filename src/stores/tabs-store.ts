import produce, { Draft } from "immer";
import { WritableDraft } from "immer/dist/internal";

import { Id } from "./generic-types";
import { INewAppTab, INewSecondaryTab, ITabAction } from "../actions/tab-actions";
import { IAppTab, ISecondaryTab } from "./tab-models";
import {
  closeBrowserView,
  closeWindowAction,
  createBrowserView,
  navigateToUrlAction,
} from "../actions/main-process-actions";
import { electronContextBridge } from "../lib/get-electron-context-bridge";
import getId from "../lib/get-id";

export interface ITabsState {
  appTabs: IAppTab[];
  selectedAppTabId: Id | undefined;
}

export interface ITabsStateStore {
  state: ITabsState;
  dispatch: React.Dispatch<ITabAction>;
}

const createAppTab = (id: Id, newAppTab?: INewAppTab): IAppTab => {
  const firstSecondaryTab = newAppTab?.secondaryTabs ? newAppTab?.secondaryTabs[0] : undefined;
  return {
    id,
    title: newAppTab?.title || "New Tab",
    url: newAppTab?.url || null,
    secondaryTabs: newAppTab?.secondaryTabs || [],
    selectedSecondaryTabId: firstSecondaryTab?.id,
    splitter: {
      percentage: 50,
    },
  };
};

const createSecondaryTab = (id: Id, newSecondaryTab?: INewSecondaryTab): ISecondaryTab => {
  return {
    id,
    title: newSecondaryTab?.title || "New Tab",
    url: newSecondaryTab?.url || null,
  };
};

export const DefaultTabsState: ITabsState = {
  appTabs: [],
  selectedAppTabId: undefined,
};

export const tabsReducer = produce((draft: Draft<ITabsState>, action: ITabAction) => {
  const getAppTabIndex = (appTabId: Id) => draft.appTabs.findIndex(appTab => appTab.id === appTabId);
  const updateAppTab = (appTabId: Id, updater: (appTab: WritableDraft<IAppTab>) => void) => {
    const index = getAppTabIndex(appTabId);
    if (index !== -1) {
      updater(draft.appTabs[index]);
    }
  };

  switch (action.type) {
    case "addAppTab":
      const appTabId = getId();
      const appTab = createAppTab(appTabId, action.value.newAppTab);
      draft.appTabs.push(appTab);
      if (action.value.select || draft.appTabs.length === 1) {
        draft.selectedAppTabId = appTabId;
      }
      electronContextBridge?.sendActionToMainProcess(createBrowserView(appTab, true));
      break;

    case "addSecondaryTab":
      const secondaryId = getId();
      const secondaryTab = createSecondaryTab(secondaryId, action.value.newSecondaryTab);
      updateAppTab(action.value.appTabId, appTab => {
        appTab.secondaryTabs.push(secondaryTab);
        if (action.value.select || appTab.secondaryTabs.length === 1) {
          appTab.selectedSecondaryTabId = secondaryId;
        }
      });
      electronContextBridge?.sendActionToMainProcess(createBrowserView(secondaryTab, false));
      if (action.value.newSecondaryTab?.url) {
        electronContextBridge?.sendActionToMainProcess(
          navigateToUrlAction(secondaryTab, action.value.newSecondaryTab.url)
        );
      }
      break;

    case "selectAppTab":
      draft.selectedAppTabId = action.value.appTabId;
      break;

    case "closeAppTab":
      const numAppTabs = draft.appTabs.length;
      if (numAppTabs > 1) {
        const index = getAppTabIndex(action.value.appTabId);
        if (index !== -1) {
          const appTab = draft.appTabs[index];
          draft.appTabs.splice(index, 1);
          if (action.value.appTabId === draft.selectedAppTabId) {
            draft.selectedAppTabId = (draft.appTabs[index] || draft.appTabs[index - 1]).id;
          }
          electronContextBridge?.sendActionToMainProcess(closeBrowserView(appTab));
        }
      } else {
        electronContextBridge?.sendActionToMainProcess(closeWindowAction());
      }
      break;

    case "navigateToUrl":
      updateAppTab(action.value.appTabId, appTab => {
        electronContextBridge?.sendActionToMainProcess(navigateToUrlAction(appTab, action.value.url));
        appTab.url = action.value.url;
      });
      break;
  }

  return draft;
});
