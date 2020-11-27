import React, { useContext, useEffect, useRef } from "react";
import { navigateToUrlAction } from "../../actions/tab-actions";
import { generateSearchUrl } from "../../lib/generate-search-url";
import { IBrowserTab } from "../../stores/tab-models";
import { RootStoreContext } from "../../stores/root-store";

interface Props {
  tab: IBrowserTab;
}

const InternalStartPane: React.FC<Props> = ({ tab }) => {
  const { dispatch } = useContext(RootStoreContext);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        dispatch(navigateToUrlAction(tab, generateSearchUrl("google", searchRef.current?.value)));
        break;

      case "Escape":
        if (searchRef.current) {
          searchRef.current.value = "";
        }
        break;
    }
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchRef]);

  return (
    <div className="internal-start-pane" key={tab.id}>
      <div>
        <h1>Mullion</h1>
      </div>
      <div>
        <input
          type="text"
          spellCheck={false}
          placeholder="Search via Google ..."
          ref={searchRef}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default InternalStartPane;
