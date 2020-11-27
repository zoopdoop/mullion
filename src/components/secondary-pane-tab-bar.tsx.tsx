import React, { useContext } from "react";
import {
  addAndSelectSecondaryTabAction,
  closeSecondaryTabAction,
  selectSecondaryTabAction,
} from "../actions/tab-actions";
import { RootStoreContext } from "../stores/root-store";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";
import TabBar from "./tab-bar";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const SecondaryPaneTabBar: React.FC<Props> = ({ appTab, visible }) => {
  const { dispatch } = useContext(RootStoreContext);

  const handleAddSecondaryTab = () => dispatch(addAndSelectSecondaryTabAction(appTab));
  const handleSelectSecondaryTab = (secondaryTab: IAppTab | ISecondaryTab) =>
    dispatch(selectSecondaryTabAction(appTab, secondaryTab as ISecondaryTab));
  const handleCloseSecondaryTab = (secondaryTab: IAppTab | ISecondaryTab) =>
    dispatch(closeSecondaryTabAction(appTab, secondaryTab as ISecondaryTab));

  return (
    <div className="secondary-pane-tab-bar" key={`secondary-pane-tab-bar-${appTab.id}`}>
      <TabBar
        tabs={appTab.secondaryTabs}
        selectedTabId={appTab.selectedSecondaryTabId}
        onAddTab={handleAddSecondaryTab}
        onSelectTab={handleSelectSecondaryTab}
        onCloseTab={handleCloseSecondaryTab}
      />
    </div>
  );
};

export default SecondaryPaneTabBar;
