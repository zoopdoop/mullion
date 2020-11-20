import { useEffect, useRef } from "react";
import { IElectronContextBridge } from "../lib/electron-context-bridge";

export const useElectronContextBridge: () => IElectronContextBridge | undefined = () => {
  const bridge = useRef<IElectronContextBridge|undefined>(undefined)

  useEffect(() => {
    bridge.current = (window as any).electron as IElectronContextBridge;
  }, [])

  return bridge.current
}
