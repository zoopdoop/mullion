import { Id, Url } from "./generic-types";

export interface IAppTab {
  id: Id;
  title: string | null;
  primaryUrl: Url;
  secondaryUrls: Url[];
  splitter: {
    position?: number;
    percentage: number;
  }
}

export type INewAppTab = Pick<IAppTab, "title" | "primaryUrl" | "secondaryUrls">
