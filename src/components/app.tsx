import React, { useEffect } from "react";
import AppTabBar from "./app-tab-bar";
import AppTabs from "./app-tabs";

import { useRootStore } from "../hooks/use-root-store";
import { RootStoreContext } from "../stores/root-store";
import { electronContextBridge } from "../lib/get-electron-context-bridge";
import { addAndSelectAppTabAction } from "../actions/tab-actions";

interface Props {}

const App: React.FC<Props> = () => {
  const rootStore = useRootStore();
  const {
    state: {
      tabs: { appTabs, selectedAppTabId },
    },
    dispatch,
  } = rootStore;

  useEffect(() => {
    electronContextBridge?.onActionFromMainProcess(dispatch);
    dispatch(addAndSelectAppTabAction());
  }, [dispatch]);

  return (
    <RootStoreContext.Provider value={rootStore}>
      <div className="app">
        {selectedAppTabId ? <AppTabBar tabs={appTabs} selectedAppTabId={selectedAppTabId} /> : undefined}
        {selectedAppTabId ? <AppTabs appTabs={appTabs} selectedAppTabId={selectedAppTabId} /> : undefined}
      </div>
    </RootStoreContext.Provider>
  );
};

export default App;
