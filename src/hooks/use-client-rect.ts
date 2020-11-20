import { useEffect, useState } from "react"

export interface IClientRect {
  x: number
  y: number
  width: number
  height: number
}

export const useClientRect = (ref: React.MutableRefObject<HTMLElement>) => {
  const [rect, setRect] = useState<IClientRect>({x: 0, y: 0, width: 0, height: 0})

  const updateRect = () => {
    if (ref.current) {
      const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = ref.current
      setRect({x: offsetLeft, y: offsetTop, width: offsetWidth, height: offsetHeight})
    } else {
      setRect({x: 0, y: 0, width: 0, height: 0})
    }
  }

  useEffect(() => {
    updateRect()
    window.addEventListener("resize", updateRect)
    return () => window.removeEventListener("resize", updateRect)
  }, [ref.current])

  return rect
}