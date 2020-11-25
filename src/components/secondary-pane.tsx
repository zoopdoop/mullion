import React from "react";
import { IAppTab } from "../stores/tab-models";
import SecondaryPaneTabBar from "./secondary-pane-tab-bar.tsx";
import SecondaryPaneTabs from "./secondary-pane-tabs";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const SecondaryPane: React.FC<Props> = ({ appTab, visible }) => {
  return (
    <div className="secondary-pane">
      <SecondaryPaneTabBar appTab={appTab} visible={visible} />
      <SecondaryPaneTabs appTab={appTab} visible={visible} />
    </div>
  );
};

export default SecondaryPane;
