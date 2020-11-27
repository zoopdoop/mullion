import React, { useEffect } from "react";
import PrimaryPane from "./primary-pane";
import Splitter from "./splitter";
import SecondaryPane from "./secondary-pane";
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
      return <PrimaryPane key={appTab.id} appTab={appTab} visible={visible} />;
    }

    return (
      <>
        <PrimaryPane key={`primary-pane-${appTab.id}`} appTab={appTab} visible={visible} />
        <Splitter key={`splitter-${appTab.id}`} />
        <SecondaryPane key={`secondary-pane-${appTab.id}`} appTab={appTab} visible={visible} />
      </>
    );
  };

  return <div className="app-tab-panes">{renderPanes()}</div>;
};

export default AppTabPanes;
