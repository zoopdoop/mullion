import React from "react";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";

interface Props {
  appTab: IAppTab;
  secondaryTab: ISecondaryTab;
  visible: boolean;
}

const SecondaryPaneInfo: React.FC<Props> = () => {
  return <div className="secondary-pane-info">Secondary Pane Info</div>;
};

export default SecondaryPaneInfo;
