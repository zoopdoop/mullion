import { useRef } from "react";
import { IElectronContextBridge } from "../lib/electron-context-bridge";

export const useElectronContextBridgeRef: () => React.MutableRefObject<IElectronContextBridge | undefined> = () => {
  const bridge = useRef<IElectronContextBridge|undefined>((window as any).electron)
  return bridge
}
