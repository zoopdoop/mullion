import React from "react";
import { IAppTab } from "../stores/tab-models";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const SecondaryPaneTabBar: React.FC<Props> = () => {
  return <div className="secondary-pane-tab-bar">Secondary Pane Tab Bar</div>;
};

export default SecondaryPaneTabBar;
