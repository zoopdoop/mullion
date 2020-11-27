import { Id } from "../stores/generic-types";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";

export type INewAppTab = Partial<Pick<IAppTab, "title" | "url" | "secondaryTabs">>;
export type INewSecondaryTab = Partial<Pick<ISecondaryTab, "title" | "url">>;

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
    };

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
export const navigateToUrlAction = (tab: IAppTab | ISecondaryTab, url: string): ITabAction => ({
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

export const testSecondaryLinkFromPrimary = (appTabId: Id, newSecondaryTab?: INewSecondaryTab): ITabAction => ({
  type: "addSecondaryTab",
  value: { appTabId, newSecondaryTab, select: true },
});
