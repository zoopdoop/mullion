import { Id } from "./generic-types";
import { IAppTab, INewAppTab, INewSecondaryTab } from "./tabs-models";

export type ITabsAction =
  | {type: "addAppTab", value: {newAppTab?: INewAppTab, select?: boolean}}
  | {type: "selectAppTab", value: {appTabId: Id}}
  | {type: "closeAppTab", value: {appTabId: Id}}
  | {type: "navigateToUrl", value: {appTabId: Id, url: string}}
  | {type: "addSecondaryTab", value: {appTabId: Id, newSecondaryTab?: INewSecondaryTab, select?: boolean}}

export const addAppTabAction = (newAppTab?: INewAppTab): ITabsAction => ({type: "addAppTab", value: {newAppTab}})
export const addAndSelectAppTabAction = (newAppTab?: INewAppTab): ITabsAction => ({type: "addAppTab", value: {newAppTab, select: true}})
export const selectAppTabAction = (appTab: IAppTab): ITabsAction => ({type: "selectAppTab", value: {appTabId: appTab.id}})
export const closeAppTabAction = (appTab: IAppTab): ITabsAction => ({type: "closeAppTab", value: {appTabId: appTab.id}})
export const navigateToUrlAction = (appTab: IAppTab, url: string): ITabsAction => ({type: "navigateToUrl", value: {appTabId: appTab.id, url}})
export const addSecondaryTabAction = (appTab: IAppTab, newSecondaryTab?: INewSecondaryTab): ITabsAction => ({type: "addSecondaryTab", value: {appTabId: appTab.id, newSecondaryTab}})
export const addAndSelectSecondaryTabAction = (appTab: IAppTab, newSecondaryTab?: INewSecondaryTab): ITabsAction => ({type: "addSecondaryTab", value: {appTabId: appTab.id, newSecondaryTab, select: true}})
