import React, { useEffect } from "react";
import PrimaryPane from "./primary-pane";
import Splitter from "./splitter";
import SecondaryPane from "./secondary-pane";
import { IAppTab } from "../stores/tab-models";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const AppTabPanes: React.FC<Props> = ({ appTab, visible }) => {
  useEffect(() => {
    if (visible && appTab.secondaryTabs.length === 0) {
      // TODO: report secondary pane hidden
    }
  }, [appTab.secondaryTabs, visible]);

  const renderPanes = () => {
    if (appTab.secondaryTabs.length === 0) {
      return <PrimaryPane appTab={appTab} visible={visible} />;
    }

    return (
      <>
        <PrimaryPane appTab={appTab} visible={visible} />
        <Splitter />
        <SecondaryPane />
      </>
    );
  };

  return <div className="app-tab-panes">{renderPanes()}</div>;
};

export default AppTabPanes;
