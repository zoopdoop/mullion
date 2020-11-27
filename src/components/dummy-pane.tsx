import React, { useEffect, useRef } from "react";
import { useClientRect } from "../hooks/use-client-rect";
import { IBrowserTab } from "../stores/tab-models";
import { electronContextBridge } from "../lib/get-electron-context-bridge";
import { setBrowserView } from "../actions/main-process-actions";

interface Props {
  tab: IBrowserTab;
  visible: boolean;
  primary: boolean;
}

const DummyPane: React.FC<Props> = ({ tab, visible, primary }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clientRect = useClientRect(containerRef);

  useEffect(() => {
    if (visible) {
      electronContextBridge?.sendActionToMainProcess(setBrowserView(tab.id, primary, clientRect));
    }
  }, [tab, visible, primary, clientRect]);

  return <div key={tab.id} className="dummy-pane" ref={containerRef} role="button" tabIndex={0} />;
};

export default DummyPane;
