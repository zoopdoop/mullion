import React from "react";
import SecondaryPaneTabToolbar from "./secondary-pane-tab-toolbar";
import DummyPane from "./dummy-pane";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";
import generateClassName from "../lib/generate-classname";

interface Props {
  appTab: IAppTab;
  secondaryTab: ISecondaryTab;
  visible: boolean;
}

const SecondaryPaneTab: React.FC<Props> = ({ appTab, secondaryTab, visible }) => {
  const className = generateClassName("secondary-pane-tab", { hidden: !visible });
  return (
    <div className={className}>
      <SecondaryPaneTabToolbar appTab={appTab} secondaryTab={secondaryTab} visible={visible} />
      <DummyPane tab={appTab} secondaryTab={secondaryTab} url={secondaryTab.url} visible={visible} />
    </div>
  );
};

export default SecondaryPaneTab;
