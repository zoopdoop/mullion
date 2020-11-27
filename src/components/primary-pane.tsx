import React, { useEffect } from "react";
import { hideBrowserView } from "../actions/main-process-actions";
import { electronContextBridge } from "../lib/get-electron-context-bridge";
import { INTERNAL_START_URL, isInternalUrl } from "../lib/internal-urls";
import { IAppTab } from "../stores/tab-models";
import DummyPane from "./dummy-pane";
import InternalPane from "./internal-pane";

interface Props {
  appTab: IAppTab;
  visible: boolean;
}

const getUrl = (url: string | null) => url || INTERNAL_START_URL;

const PrimaryPane: React.FC<Props> = ({ appTab, visible }) => {
  useEffect(() => {
    if (visible && isInternalUrl(getUrl(appTab.url))) {
      electronContextBridge?.sendActionToMainProcess(hideBrowserView(true));
    }
  }, [appTab, visible]);

  const renderPane = () => {
    const url = getUrl(appTab.url);
    if (isInternalUrl(url)) {
      return <InternalPane key={appTab.id} tab={appTab} url={url} />;
    }
    return <DummyPane key={appTab.id} tab={appTab} visible={visible} />;
  };

  return (
    <div className="primary-pane" key={appTab.id}>
      {renderPane()}
    </div>
  );
};

export default PrimaryPane;
