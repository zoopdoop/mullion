import { IAppTab, INewAppTab, INewSecondaryTab } from "./app-state-models";
import { Id } from "./generic-types";

export type IAction =
  | {type: "addAppTab", value: {newAppTab?: INewAppTab, select?: boolean}}
  | {type: "selectAppTab", value: {appTabId: Id}}
  | {type: "closeAppTab", value: {appTabId: Id}}
  | {type: "navigateToUrl", value: {appTabId: Id, url: string}}
  | {type: "addSecondaryTab", value: {appTabId: Id, newSecondaryTab?: INewSecondaryTab, select?: boolean}}

export const addAppTabAction = (newAppTab?: INewAppTab): IAction => ({type: "addAppTab", value: {newAppTab}})
export const addAndSelectAppTabAction = (newAppTab?: INewAppTab): IAction => ({type: "addAppTab", value: {newAppTab, select: true}})
export const selectAppTabAction = (appTab: IAppTab): IAction => ({type: "selectAppTab", value: {appTabId: appTab.id}})
export const closeAppTabAction = (appTab: IAppTab): IAction => ({type: "closeAppTab", value: {appTabId: appTab.id}})
export const navigateToUrlAction = (appTab: IAppTab, url: string): IAction => ({type: "navigateToUrl", value: {appTabId: appTab.id, url}})
export const addSecondaryTabAction = (appTab: IAppTab, newSecondaryTab?: INewSecondaryTab): IAction => ({type: "addSecondaryTab", value: {appTabId: appTab.id, newSecondaryTab}})
export const addAndSelectSecondaryTabAction = (appTab: IAppTab, newSecondaryTab?: INewSecondaryTab): IAction => ({type: "addSecondaryTab", value: {appTabId: appTab.id, newSecondaryTab, select: true}})
