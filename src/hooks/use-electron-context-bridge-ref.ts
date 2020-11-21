import { useRef } from "react";
import { IElectronContextBridge } from "../lib/electron-context-bridge";

export const useElectronContextBridgeRef: () => React.MutableRefObject<IElectronContextBridge | undefined> = () => {
  const bridge = useRef<IElectronContextBridge | undefined>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (window as any).electron
  );
  return bridge;
};
