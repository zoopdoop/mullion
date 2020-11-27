import React, { useEffect } from "react";
import { hideBrowserView } from "../actions/main-process-actions";
import { electronContextBridge } from "../lib/get-electron-context-bridge";
import { INTERNAL_START_URL, isInternalUrl } from "../lib/internal-urls";
import { IBrowserTab } from "../stores/tab-models";
import DummyPane from "./dummy-pane";
import InternalPane from "./internal-pane";

interface Props {
  tab: IBrowserTab;
  visible: boolean;
  primary: boolean;
}

const getUrl = (url: string | null) => url || INTERNAL_START_URL;

const Pane: React.FC<Props> = ({ tab, visible, primary }) => {
  useEffect(() => {
    if (visible && isInternalUrl(getUrl(tab.url))) {
      electronContextBridge?.sendActionToMainProcess(hideBrowserView(primary));
    }
  }, [tab, visible, primary]);

  const renderPane = () => {
    const url = getUrl(tab.url);
    if (isInternalUrl(url)) {
      return <InternalPane key={tab.id} tab={tab} url={url} />;
    }
    return <DummyPane key={tab.id} tab={tab} visible={visible} primary={primary} />;
  };

  return (
    <div className="pane" key={tab.id}>
      {renderPane()}
    </div>
  );
};

export default Pane;
