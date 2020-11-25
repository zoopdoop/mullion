import { IRendererAction } from "../actions/renderer-actions";
import { IMainProcessActions } from "../actions/main-process-actions";
import { Id } from "../stores/generic-types";

export const SendActionFromMainProcessMessage = "send-action-from-main-process";
export const SendActionFromRendererProcessMessage = "send-action-from-renderer-process";

export interface IWrappedMainProcessAction {
  windowId: Id;
  action: IMainProcessActions;
}

export interface IElectronContextBridge {
  onActionFromMainProcess: (callback: (action: IRendererAction) => void) => void;
  sendActionToMainProcess: (action: IMainProcessActions) => void;
}
