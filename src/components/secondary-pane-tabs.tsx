import React from "react";
import { IAppTab } from "../stores/tab-models";
import SecondaryPaneTab from "./secondary-pane-tab";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const SecondaryPaneTabs: React.FC<Props> = ({ appTab, visible }) => {
  // TODO: fix visible check when pane tabs control is done
  return (
    <div className="secondary-pane-tabs">
      {appTab.secondaryTabs.map((secondaryTab, index) => (
        <SecondaryPaneTab
          key={secondaryTab.id}
          appTab={appTab}
          secondaryTab={secondaryTab}
          visible={visible && index === appTab.secondaryTabs.length - 1}
        />
      ))}
    </div>
  );
};

export default SecondaryPaneTabs;
