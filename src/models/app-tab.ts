import { Id, Url } from "./generic-types"
import { ISecondaryTab } from "./secondary-tab"

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

export type INewAppTab = Partial<Pick<IAppTab, "title" | "url" | "secondaryTabs">>
