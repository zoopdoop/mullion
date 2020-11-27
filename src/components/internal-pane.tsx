import React from "react";
import { INTERNAL_START_URL } from "../lib/internal-urls";
import { IBrowserTab } from "../stores/tab-models";
import InternalStartPane from "./internal-panes/internal-start-pane";
import InternalUnknownPane from "./internal-panes/internal-unknown-pane";

interface Props {
  tab: IBrowserTab;
  url: string;
}

const InternalPane: React.FC<Props> = ({ tab, url }) => {
  const renderInternalPane = () => {
    switch (url) {
      case INTERNAL_START_URL:
        return <InternalStartPane tab={tab} />;

      default:
        return <InternalUnknownPane tab={tab} url={url} />;
    }
  };

  return <div className="internal-pane">{renderInternalPane()}</div>;
};

export default InternalPane;
