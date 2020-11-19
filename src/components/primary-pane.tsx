import React from "react"
import DummyPane from "./dummy-pane"

interface Props {}

const PrimaryPane: React.FC<Props> = () => {
  return (
    <div className="primary-pane">
      <DummyPane />
    </div>
  )
}

export default PrimaryPane
