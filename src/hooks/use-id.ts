import { useState } from "react"
import { Id } from "../models/generic-types"

export const useId = (startingId: Id) => {
  const [id, setId] = useState(startingId)

  const getNextId = () => {
    const nextId = id
    setId(id => id + 1)
    return nextId
  }

  return getNextId
}