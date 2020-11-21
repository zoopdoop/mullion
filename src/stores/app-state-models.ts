import { Id, Url } from "./generic-types"

export interface IAppTab {
  id: Id
  title: string | null
  url: Url
  secondaryTabs: ISecondaryTab[]
  selectedSecondaryTabId: Id
  splitter: {
    position?: number
    percentage: number
  }
}

export interface ISecondaryTab {
  id: Id
  title: string | null
  url: Url
}

export type INewAppTab = Partial<Pick<IAppTab, "title" | "url" | "secondaryTabs">>
export type INewSecondaryTab = Partial<Pick<ISecondaryTab, "title" | "url">>
