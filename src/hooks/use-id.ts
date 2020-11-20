import { useRef, useState } from "react"
import { Id } from "../models/generic-types"

export const useId = (startingId: Id) => {
  const id = useRef(startingId)

  const getNextId = () => {
    const nextId = id.current
    id.current++
    return nextId
  }

  return getNextId
}