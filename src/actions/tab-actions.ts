import { Id } from "../stores/generic-types";
import { IAppTab, IBrowserTab, ISecondaryTab } from "../stores/tab-models";

export type INewAppTab = Partial<Pick<IAppTab, "title" | "url" | "secondaryTabs">>;
export type INewSecondaryTab = Partial<Pick<ISecondaryTab, "title" | "url">>;

export type IBrowserViewEvent =
  | { name: "did-start-loading" }
  | { name: "did-stop-loading" }
  | { name: "will-navigate"; url: string }
  | { name: "did-navigate"; url: string; httpResponseCode: number };

export type ITabAction =
  | { type: "addAppTab"; value: { newAppTab?: INewAppTab; select?: boolean } }
  | { type: "selectAppTab"; value: { appTabId: Id } }
  | { type: "closeAppTab"; value: { appTabId: Id } }
  | { type: "navigateToUrl"; value: { browserViewId: Id; url: string } }
  | {
      type: "addSecondaryTab";
      value: {
        appTabId: Id;
        newSecondaryTab?: INewSecondaryTab;
        select?: boolean;
      };
    }
  | {
      type: "selectSecondaryTab";
      value: {
        appTabId: Id;
        secondaryTabId: Id;
      };
    }
  | {
      type: "closeSecondaryTab";
      value: {
        appTabId: Id;
        secondaryTabId: Id;
      };
    }
  | { type: "browserViewEvent"; value: { browserViewId: Id; event: IBrowserViewEvent } }
  | { type: "goBack"; value: { browserViewId: Id } }
  | { type: "goForward"; value: { browserViewId: Id } }
  | { type: "goHome"; value: { browserViewId: Id } }
  | { type: "stop"; value: { browserViewId: Id } }
  | { type: "reload"; value: { browserViewId: Id } };

export const addAppTabAction = (newAppTab?: INewAppTab): ITabAction => ({
  type: "addAppTab",
  value: { newAppTab },
});
export const addAndSelectAppTabAction = (newAppTab?: INewAppTab): ITabAction => ({
  type: "addAppTab",
  value: { newAppTab, select: true },
});
export const selectAppTabAction = (appTab: IAppTab): ITabAction => ({
  type: "selectAppTab",
  value: { appTabId: appTab.id },
});
export const closeAppTabAction = (appTab: IAppTab): ITabAction => ({
  type: "closeAppTab",
  value: { appTabId: appTab.id },
});
export const navigateToUrlAction = (tab: IBrowserTab, url: string): ITabAction => ({
  type: "navigateToUrl",
  value: { browserViewId: tab.id, url },
});
export const addSecondaryTabAction = (appTab: IAppTab, newSecondaryTab?: INewSecondaryTab): ITabAction => ({
  type: "addSecondaryTab",
  value: { appTabId: appTab.id, newSecondaryTab },
});
export const addAndSelectSecondaryTabAction = (appTab: IAppTab, newSecondaryTab?: INewSecondaryTab): ITabAction => ({
  type: "addSecondaryTab",
  value: { appTabId: appTab.id, newSecondaryTab, select: true },
});
export const selectSecondaryTabAction = (appTab: IAppTab, secondaryTab: ISecondaryTab): ITabAction => ({
  type: "selectSecondaryTab",
  value: { appTabId: appTab.id, secondaryTabId: secondaryTab.id },
});
export const closeSecondaryTabAction = (appTab: IAppTab, secondaryTab: ISecondaryTab): ITabAction => ({
  type: "closeSecondaryTab",
  value: { appTabId: appTab.id, secondaryTabId: secondaryTab.id },
});
export const browserViewEventAction = (browserViewId: Id, event: IBrowserViewEvent): ITabAction => ({
  type: "browserViewEvent",
  value: { browserViewId, event },
});
export const goBackAction = (browserViewId: Id): ITabAction => ({
  type: "goBack",
  value: { browserViewId },
});
export const goForwardAction = (browserViewId: Id): ITabAction => ({
  type: "goForward",
  value: { browserViewId },
});
export const goHomeAction = (browserViewId: Id): ITabAction => ({
  type: "goHome",
  value: { browserViewId },
});
export const stopAction = (browserViewId: Id): ITabAction => ({
  type: "stop",
  value: { browserViewId },
});
export const reloadAction = (browserViewId: Id): ITabAction => ({
  type: "reload",
  value: { browserViewId },
});

export const testSecondaryLinkFromPrimary = (appTabId: Id, newSecondaryTab?: INewSecondaryTab): ITabAction => ({
  type: "addSecondaryTab",
  value: { appTabId, newSecondaryTab, select: true },
});
