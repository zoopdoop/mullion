import React, { useContext } from "react";
import { addAndSelectAppTabAction, closeAppTabAction, selectAppTabAction } from "../actions/tab-actions";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";
import { Id } from "../stores/generic-types";
import { RootStoreContext } from "../stores/root-store";
import TabBar from "./tab-bar";

interface Props {
  tabs: IAppTab[];
  selectedAppTabId: Id;
}

const AppTabBar: React.FC<Props> = ({ tabs, selectedAppTabId }) => {
  const { dispatch } = useContext(RootStoreContext);

  const handleAddAppTab = () => dispatch(addAndSelectAppTabAction());
  const handleSelectAppTab = (appTab: IAppTab | ISecondaryTab) => dispatch(selectAppTabAction(appTab as IAppTab));
  const handleCloseAppTab = (appTab: IAppTab | ISecondaryTab) => dispatch(closeAppTabAction(appTab as IAppTab));

  return (
    <div className="app-tab-bar">
      <TabBar
        tabs={tabs}
        selectedTabId={selectedAppTabId}
        onAddTab={handleAddAppTab}
        onSelectTab={handleSelectAppTab}
        onCloseTab={handleCloseAppTab}
      />
    </div>
  );
};

export default AppTabBar;
