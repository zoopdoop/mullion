import React from "react";
import SecondaryPaneTabToolbar from "./secondary-pane-tab-toolbar";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";
import generateClassName from "../lib/generate-classname";
import Pane from "./pane";

interface Props {
  appTab: IAppTab;
  secondaryTab: ISecondaryTab;
  visible: boolean;
}

const SecondaryPaneTab: React.FC<Props> = ({ appTab, secondaryTab, visible }) => {
  const className = generateClassName("secondary-pane-tab", { hidden: !visible });
  return (
    <div className={className}>
      <SecondaryPaneTabToolbar
        key={`secondary-pane-tab-toolbar-${appTab.id}`}
        appTab={appTab}
        secondaryTab={secondaryTab}
        visible={visible}
      />
      <Pane tab={secondaryTab} key={`secondary-pane-${secondaryTab.id}`} visible={visible} primary={false} />
    </div>
  );
};

export default SecondaryPaneTab;
