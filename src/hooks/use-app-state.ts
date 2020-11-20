import { useEffect, useState } from "react";
import { IAppTab, INewAppTab } from "../models/app-tab";
import { useId } from "./use-id";

export const useAppState = () => {
  const [appTabs, _setAppTabs] = useState<IAppTab[]>([])
  const [selectedAppTab, _selectAppTab] = useState<IAppTab|undefined>(undefined)
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
    _selectAppTab(appTab)

    // TODO: send message to show browser views
  }

  const closeAppTab = (appTab: IAppTab) => {
    const numAppTabs = appTabs.length
    if (numAppTabs > 1) {
      const index = appTabs.indexOf(appTab)
      _setAppTabs(_appTabs => {
        const otherTabs = _appTabs.filter(_appTab => _appTab !== appTab)
        if (appTab === selectedAppTab) {
          selectAppTab(otherTabs[index] || otherTabs[index - 1])
        }
        return otherTabs
      })

      // TODO: send message to delete browser views
    } else {
      // TODO: close message window
    }
  }

  useEffect(() => {
    selectAppTab(addAppTab())
  }, [])

  return {
    appTabs,
    addAppTab,
    selectedAppTab,
    selectAppTab,
    closeAppTab
  }
}