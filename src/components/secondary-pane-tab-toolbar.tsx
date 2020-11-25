import React from "react";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";
import SecondaryPaneInfo from "./secondary-pane-info";

interface Props {
  appTab: IAppTab;
  secondaryTab: ISecondaryTab;
  visible: boolean;
}

const SecondaryPaneTabToolbar: React.FC<Props> = ({ appTab, secondaryTab, visible }) => {
  return (
    <div className="secondary-pane-tab-toolbar">
      <SecondaryPaneInfo appTab={appTab} secondaryTab={secondaryTab} visible={visible} />
    </div>
  );
};

export default SecondaryPaneTabToolbar;
