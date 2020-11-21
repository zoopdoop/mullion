import React from "react";
import { INTERNAL_START_URL, isInternalUrl } from "../lib/internal-urls";
import { IAppTab } from "../stores/tab-models";
import DummyPane from "./dummy-pane";
import InternalPane from "./internal-pane";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const PrimaryPane: React.FC<Props> = ({ appTab, visible }) => {
  const renderPane = () => {
    const url = appTab.url || INTERNAL_START_URL;
    if (isInternalUrl(url)) {
      return <InternalPane appTab={appTab} url={url} />;
    }
    return <DummyPane appTab={appTab} url={url} visible={visible} isPrimary={true} />;
  };

  return <div className="primary-pane">{renderPane()}</div>;
};

export default PrimaryPane;
