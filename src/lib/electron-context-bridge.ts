import { IRendererAction } from "../actions/renderer-actions";
import { IMainProcessActions } from "../actions/main-process-actions";

export const SendActionFromMainProcessMessage = "send-action-from-main-process";
export const SendActionFromRendererProcessMessage = "send-action-from-renderer-process";

export interface IElectronContextBridge {
  onActionFromMainProcess: (callback: (action: IRendererAction) => void) => void;
  sendActionToMainProcess: (action: IMainProcessActions) => void;
}
