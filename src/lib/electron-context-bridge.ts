import { IRendererAction } from "../actions/renderer-actions";

export const ActionFromMainProcessMessage = "action-from-main-process";

export interface IElectronContextBridge {
  onActionFromMainProcess: (
    callback: (action: IRendererAction) => void
  ) => void;
}
