import React from "react";
import SecondaryPaneTabToolbar from "./secondary-pane-tab-toolbar";
import DummyPane from "./dummy-pane";

interface Props {}

const SecondaryPaneTab: React.FC<Props> = () => {
  return (
    <div className="secondary-pane-tab">
      <SecondaryPaneTabToolbar />
      <DummyPane />
    </div>
  );
};

export default SecondaryPaneTab;
