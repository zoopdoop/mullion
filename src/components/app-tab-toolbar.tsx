import { app } from "electron";
import React from "react";
import { IAppTab } from "../stores/tab-models";
import PaneNavigation from "./pane-navigation";

interface Props {
  appTab: IAppTab;
}

const AppTabToolbar: React.FC<Props> = ({ appTab }) => {
  return (
    <div className="app-tab-toolbar">
      <PaneNavigation appTab={appTab} />
    </div>
  );
};

export default AppTabToolbar;
