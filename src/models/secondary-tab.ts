import { Id, Url } from "./generic-types"

export interface ISecondaryTab {
  id: Id
  title: string | null
  url: Url
}

export type INewSecondaryTab = Partial<Pick<ISecondaryTab, "title" | "url">>
