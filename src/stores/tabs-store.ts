import produce, { Draft } from "immer";
import { WritableDraft } from "immer/dist/internal";

import { Id } from "./generic-types";
import { INewAppTab, INewSecondaryTab, ITabAction } from "../actions/tab-actions";
import { IAppTab, IBrowserTab, ISecondaryTab } from "./tab-models";
import {
  closeBrowserView,
  closeWindowAction,
  createBrowserView,
  navigateToUrlAction,
  reloadAction,
  stopAction,
} from "../actions/main-process-actions";
import { electronContextBridge } from "../lib/get-electron-context-bridge";
import getId from "../lib/get-id";
import { INTERNAL_START_URL } from "../lib/internal-urls";

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
  const url = newAppTab?.url || INTERNAL_START_URL;
  const history = [url];
  return {
    id,
    title: newAppTab?.title || "New Tab",
    url,
    history,
    historyIndex: 0,
    state: "loaded",
    secondaryTabs: newAppTab?.secondaryTabs || [],
    selectedSecondaryTabId: firstSecondaryTab?.id,
    splitter: {
      percentage: 50,
    },
  };
};

const createSecondaryTab = (id: Id, newSecondaryTab?: INewSecondaryTab): ISecondaryTab => {
  const url = newSecondaryTab?.url || INTERNAL_START_URL;
  const history = [url];
  return {
    id,
    title: newSecondaryTab?.title || "New Tab",
    url,
    history,
    historyIndex: 0,
    state: "loaded",
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

  // TODO: redo with map in state
  const getBrowserTab = (tabId: Id): IBrowserTab | undefined => {
    for (let appTabIndex = 0; appTabIndex < draft.appTabs.length; appTabIndex++) {
      if (draft.appTabs[appTabIndex].id === tabId) {
        return draft.appTabs[appTabIndex];
      }
      for (
        let secondaryTabIndex = 0;
        secondaryTabIndex < draft.appTabs[appTabIndex].secondaryTabs.length;
        secondaryTabIndex++
      ) {
        if (draft.appTabs[appTabIndex].secondaryTabs[secondaryTabIndex].id === tabId) {
          return draft.appTabs[appTabIndex].secondaryTabs[secondaryTabIndex];
        }
      }
    }
    return undefined;
  };

  const updateBrowserTab = (tabId: Id, updater: (tab: WritableDraft<IBrowserTab>) => void) => {
    const browserTab = getBrowserTab(tabId);
    if (browserTab) {
      updater(browserTab);
    }
  };

  const addToHistory = (tab: IBrowserTab, url: string): void => {
    if (tab.history[tab.historyIndex] !== url) {
      tab.historyIndex = Math.min(tab.historyIndex + 1, tab.history.length);
      tab.history.splice(tab.historyIndex, tab.history.length);
      tab.history[tab.historyIndex] = url;
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

    case "selectSecondaryTab":
      updateAppTab(action.value.appTabId, appTab => (appTab.selectedSecondaryTabId = action.value.secondaryTabId));
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

    case "closeSecondaryTab":
      updateAppTab(action.value.appTabId, appTab => {
        const index = appTab.secondaryTabs.findIndex(secondaryTab => secondaryTab.id === action.value.secondaryTabId);
        if (index !== -1) {
          const secondaryTab = appTab.secondaryTabs[index];
          appTab.secondaryTabs.splice(index, 1);
          if (action.value.secondaryTabId === appTab.selectedSecondaryTabId) {
            if (appTab.secondaryTabs.length > 0) {
              appTab.selectedSecondaryTabId = (appTab.secondaryTabs[index] || appTab.secondaryTabs[index - 1]).id;
            } else {
              appTab.selectedSecondaryTabId = undefined;
            }
          }
          electronContextBridge?.sendActionToMainProcess(closeBrowserView(secondaryTab));
        }
      });
      break;

    case "navigateToUrl":
      updateBrowserTab(action.value.browserViewId, tab => {
        electronContextBridge?.sendActionToMainProcess(navigateToUrlAction(tab, action.value.url));
        tab.url = action.value.url;
        addToHistory(tab, action.value.url);
      });
      break;

    case "browserViewEvent":
      updateBrowserTab(action.value.browserViewId, tab => {
        switch (action.value.event.name) {
          case "did-start-loading":
            tab.state = "loading";
            break;
          case "did-stop-loading":
            tab.state = "loaded";
            break;
          case "will-navigate":
            // on initial navigation update url and save to history to update ui
            tab.url = action.value.event.url;
            addToHistory(tab, action.value.event.url);
            break;
          case "did-navigate":
            // on forward/back update url
            tab.url = action.value.event.url;
            break;
        }
      });
      break;

    case "goBack":
      updateBrowserTab(action.value.browserViewId, tab => {
        if (tab.historyIndex - 1 >= 0) {
          tab.historyIndex--;
          electronContextBridge?.sendActionToMainProcess(navigateToUrlAction(tab, tab.history[tab.historyIndex]));
        }
      });
      break;

    case "goForward":
      updateBrowserTab(action.value.browserViewId, tab => {
        if (tab.historyIndex + 1 < tab.history.length) {
          tab.historyIndex++;
          electronContextBridge?.sendActionToMainProcess(navigateToUrlAction(tab, tab.history[tab.historyIndex]));
        }
      });
      break;

    case "goHome":
      updateBrowserTab(action.value.browserViewId, tab => {
        electronContextBridge?.sendActionToMainProcess(navigateToUrlAction(tab, INTERNAL_START_URL));
      });
      break;

    case "reload":
      electronContextBridge?.sendActionToMainProcess(reloadAction(action.value.browserViewId));
      break;

    case "stop":
      electronContextBridge?.sendActionToMainProcess(stopAction(action.value.browserViewId));
      break;
  }

  return draft;
});
