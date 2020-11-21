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
