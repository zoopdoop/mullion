import React from "react";
import { IAppTab } from "../stores/tab-models";
import SecondaryPaneTabBar from "./secondary-pane-tab-bar.tsx";
import SecondaryPaneTabs from "./secondary-pane-tabs";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const SecondaryPanes: React.FC<Props> = ({ appTab, visible }) => {
  return (
    <div className="secondary-pane">
      <SecondaryPaneTabBar key={`secondary-pane-toolbar-${appTab.id}`} appTab={appTab} visible={visible} />
      <SecondaryPaneTabs key={`secondary-pane-tabs-${appTab.id}`} appTab={appTab} visible={visible} />
    </div>
  );
};

export default SecondaryPanes;
