import React from "react";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";
import PaneNavigation from "./pane-navigation";

interface Props {
  appTab: IAppTab;
  secondaryTab: ISecondaryTab;
  visible: boolean;
}

const SecondaryPaneTabToolbar: React.FC<Props> = ({ appTab, secondaryTab, visible }) => {
  return (
    <div className="secondary-pane-tab-toolbar">
      <PaneNavigation tab={secondaryTab} />
    </div>
  );
};

export default SecondaryPaneTabToolbar;
