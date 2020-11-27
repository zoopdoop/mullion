import React, { useEffect, useRef } from "react";
import { useClientRect } from "../hooks/use-client-rect";
import { IBrowserTab, ISecondaryTab } from "../stores/tab-models";
import { electronContextBridge } from "../lib/get-electron-context-bridge";
import { setBrowserView } from "../actions/main-process-actions";
import { Url } from "../stores/generic-types";

interface Props {
  tab: IBrowserTab;
  secondaryTab?: ISecondaryTab;
  visible: boolean;
}

const DummyPane: React.FC<Props> = ({ tab, secondaryTab, visible }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clientRect = useClientRect(containerRef);

  useEffect(() => {
    if (visible) {
      const primary = !secondaryTab;
      const id = secondaryTab ? secondaryTab.id : tab.id;
      electronContextBridge?.sendActionToMainProcess(setBrowserView(id, primary, clientRect));
    }
  }, [tab, secondaryTab, visible, clientRect]);

  return <div key={tab.id} className="dummy-pane" ref={containerRef} role="button" tabIndex={0} />;
};

export default DummyPane;
