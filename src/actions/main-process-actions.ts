import { Id } from "../stores/generic-types";
import { IBrowserTab } from "../stores/tab-models";

export interface IBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type IBrowserViewAction =
  | { type: "createBrowserView"; value: { browserViewId: Id; primary: boolean } }
  | { type: "setBrowserView"; value: { browserViewId: Id; primary: boolean; hidden?: boolean; bounds?: IBounds } }
  | { type: "hideBrowserView"; value: { primary: boolean } }
  | { type: "closeBrowserView"; value: { browserViewId: Id } }
  | { type: "navigateToUrl"; value: { browserViewId: Id; url: string } }
  | { type: "stop"; value: { browserViewId: Id } }
  | { type: "reload"; value: { browserViewId: Id } }
  | { type: "closeWindow" };

export type IMainProcessActions = IBrowserViewAction;

export const createBrowserView = (tab: IBrowserTab, primary: boolean): IBrowserViewAction => ({
  type: "createBrowserView",
  value: { browserViewId: tab.id, primary },
});
export const setBrowserView = (browserViewId: Id, primary: boolean, bounds: IBounds): IBrowserViewAction => ({
  type: "setBrowserView",
  value: { browserViewId, primary, bounds },
});
export const hideBrowserView = (primary: boolean): IBrowserViewAction => ({
  type: "hideBrowserView",
  value: { primary },
});
export const closeBrowserView = (tab: IBrowserTab): IBrowserViewAction => ({
  type: "closeBrowserView",
  value: { browserViewId: tab.id },
});
export const navigateToUrlAction = (tab: IBrowserTab, url: string): IBrowserViewAction => ({
  type: "navigateToUrl",
  value: { browserViewId: tab.id, url },
});
export const stopAction = (browserViewId: Id): IBrowserViewAction => ({
  type: "stop",
  value: { browserViewId },
});
export const reloadAction = (browserViewId: Id): IBrowserViewAction => ({
  type: "reload",
  value: { browserViewId },
});
export const closeWindowAction = (): IBrowserViewAction => ({
  type: "closeWindow",
});
