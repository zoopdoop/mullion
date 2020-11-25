import React, { useEffect, useRef } from "react";
import { useClientRect } from "../hooks/use-client-rect";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";
import { electronContextBridge } from "../lib/get-electron-context-bridge";
import { setBrowserView } from "../actions/main-process-actions";
import { Url } from "../stores/generic-types";

interface Props {
  appTab: IAppTab;
  secondaryTab?: ISecondaryTab;
  url: Url;
  visible: boolean;
}

const DummyPane: React.FC<Props> = ({ appTab, secondaryTab, url, visible }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clientRect = useClientRect(containerRef);

  useEffect(() => {
    if (visible) {
      const primary = !secondaryTab;
      const id = secondaryTab ? secondaryTab.id : appTab.id;
      electronContextBridge?.sendActionToMainProcess(setBrowserView(id, primary, clientRect));
    }
  }, [appTab, secondaryTab, visible, clientRect]);

  return (
    <div key={appTab.id} className="dummy-pane" ref={containerRef} role="button" tabIndex={0}>
      {url}
    </div>
  );
};

export default DummyPane;
