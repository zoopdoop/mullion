import React, { useEffect } from "react";
import Pane from "./pane";
import Splitter from "./splitter";
import SecondaryPanes from "./secondary-panes";
import { IAppTab } from "../stores/tab-models";
import { hideBrowserView } from "../actions/main-process-actions";
import { electronContextBridge } from "../lib/get-electron-context-bridge";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const AppTabPanes: React.FC<Props> = ({ appTab, visible }) => {
  useEffect(() => {
    if (visible && appTab.secondaryTabs.length === 0) {
      electronContextBridge?.sendActionToMainProcess(hideBrowserView(false));
    }
  }, [appTab.secondaryTabs, visible]);

  const renderPanes = () => {
    if (appTab.secondaryTabs.length === 0) {
      return <Pane key={appTab.id} tab={appTab} visible={visible} primary={true} />;
    }

    return (
      <>
        <Pane key={`primary-pane-${appTab.id}`} tab={appTab} visible={visible} primary={true} />
        <Splitter key={`splitter-${appTab.id}`} />
        <SecondaryPanes key={`secondary-pane-${appTab.id}`} appTab={appTab} visible={visible} />
      </>
    );
  };

  return <div className="app-tab-panes">{renderPanes()}</div>;
};

export default AppTabPanes;
