import { useCallback, useEffect, useState } from "react";
import { IAppTab, INewAppTab } from "../models/app-tab";
import { Id } from "../models/generic-types";
import { useId } from "./use-id";

export const useAppState = () => {
  const [appTabs, _setAppTabs] = useState<IAppTab[]>([])
  const [selectedAppTabId, _selectAppTabId] = useState<Id|undefined>(undefined)
  const getNextAppTabId = useId(1)

  const addAppTab = (newTab?: INewAppTab) => {
    const id = getNextAppTabId()
    const newAppTab: IAppTab = {
      id,
      title: newTab?.title || `New Tab (${id})`,
      primaryUrl: newTab?.primaryUrl || null,
      secondaryUrls: newTab?.secondaryUrls || [],
      splitter: {
        percentage: 50
      }
    }
    _setAppTabs(_appTabs => [..._appTabs, newAppTab])

    // TODO: send message to create browser views
    return newAppTab
  }

  const selectAppTab = (appTab: IAppTab) => {
    _selectAppTabId(appTab.id)

    // TODO: send message to show browser views
  }

  const closeAppTab = (appTab: IAppTab) => {
    const numAppTabs = appTabs.length
    if (numAppTabs > 1) {
      const index = appTabs.indexOf(appTab)
      _setAppTabs(_appTabs => {
        const otherTabs = _appTabs.filter(_appTab => _appTab !== appTab)
        if (appTab.id === selectedAppTabId) {
          selectAppTab(otherTabs[index] || otherTabs[index - 1])
        }
        return otherTabs
      })

      // TODO: send message to delete browser views
    } else {
      // TODO: close message window
    }
  }

  const navigateToUrl = (appTab: IAppTab, url: string) => {
    _updateAppTab(appTab, {primaryUrl: url})
    // TODO: send message to navigate to url
  }

  const _updateAppTab = (appTab: IAppTab, updates: Partial<IAppTab>) => {
    _setAppTabs(_appTabs => _appTabs.map(_appTab => _appTab === appTab ? {...appTab, ...updates} : _appTab))
  }

  useEffect(() => {
    selectAppTab(addAppTab())
  }, [])

  return {
    appTabs,
    selectedAppTabId,
    addAppTab,
    selectAppTab,
    closeAppTab,
    navigateToUrl
  }
}