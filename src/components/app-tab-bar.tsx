import React, { useContext } from "react";
import {
  addAndSelectAppTabAction,
  closeAppTabAction,
  selectAppTabAction,
} from "../actions/tab-actions";
import { IAppTab } from "../stores/tab-models";
import { Id } from "../stores/generic-types";
import { RootStoreContext } from "../stores/root-store";
import AppTabBarTab from "./app-tab-bar-tab";

interface Props {
  tabs: IAppTab[];
  selectedAppTabId: Id;
}

const AppTabBar: React.FC<Props> = ({ tabs, selectedAppTabId }) => {
  const { dispatch } = useContext(RootStoreContext);

  const addTab = () => dispatch(addAndSelectAppTabAction());
  const selectAppTab = (appTab: IAppTab) =>
    dispatch(selectAppTabAction(appTab));
  const closeAppTab = (appTab: IAppTab) => dispatch(closeAppTabAction(appTab));

  return (
    <div className="app-tab-bar">
      {tabs.map((tab) => (
        <AppTabBarTab
          key={tab.id}
          appTab={tab}
          selected={tab.id === selectedAppTabId}
          selectAppTab={selectAppTab}
          closeAppTab={closeAppTab}
        />
      ))}
      <button className="app-tab-bar-add-button" onClick={addTab}>
        +
      </button>
    </div>
  );
};

export default AppTabBar;
