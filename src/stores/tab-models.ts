import { Id, Url } from "./generic-types";

export interface IBrowserTab {
  id: Id;
  title: string | null;
  url: Url;
  history: Url[];
  historyIndex: number;
  state: "loading" | "loaded";
}

export interface IAppTab extends IBrowserTab {
  secondaryTabs: ISecondaryTab[];
  selectedSecondaryTabId?: Id;
  splitter: {
    position?: number;
    percentage: number;
  };
}

export interface ISecondaryTab extends IBrowserTab {}
