import React from "react";
import AppTabToolbar from "./app-tab-toolbar";
import AppTabPanes from "./app-tab-panes";
import { IAppTab } from "../stores/tab-models";
import generateClassName from "../lib/generate-classname";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const AppTab: React.FC<Props> = ({ appTab, visible }) => {
  const className = generateClassName("app-tab", { hidden: !visible });
  return (
    <div className={className}>
      <AppTabToolbar key={`app-tab-toolbar-${appTab.id}`} appTab={appTab} />
      <AppTabPanes key={`app-tab-panes-${appTab.id}`} appTab={appTab} visible={visible} />
    </div>
  );
};

export default AppTab;
