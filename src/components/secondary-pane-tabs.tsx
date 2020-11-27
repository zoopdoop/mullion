import React from "react";
import { IAppTab } from "../stores/tab-models";
import SecondaryPaneTab from "./secondary-pane-tab";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const SecondaryPaneTabs: React.FC<Props> = ({ appTab, visible }) => {
  return (
    <div className="secondary-pane-tabs">
      {appTab.secondaryTabs.map(secondaryTab => (
        <SecondaryPaneTab
          key={`secondary-pane-tab-${secondaryTab.id}`}
          appTab={appTab}
          secondaryTab={secondaryTab}
          visible={visible && appTab.selectedSecondaryTabId === secondaryTab.id}
        />
      ))}
    </div>
  );
};

export default SecondaryPaneTabs;
