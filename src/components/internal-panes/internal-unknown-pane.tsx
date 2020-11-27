import React from "react";
import { IBrowserTab } from "../../stores/tab-models";

interface Props {
  tab: IBrowserTab;
  url: string;
}

const InternalUnknownPane: React.FC<Props> = ({ tab, url }) => {
  return (
    <div className="internal-unknown-pane" key={tab.id}>
      Unknown internal url: {url}
    </div>
  );
};

export default InternalUnknownPane;
