import { CSSProperties, MouseEventHandler, ReactEventHandler } from "react"

interface I {
  image?: string,
  size?: string | number
  isOnline?: boolean,
  isError?: boolean
  isRound?: boolean,
  style?: CSSProperties,
  isActive?: boolean,
  onClick?: MouseEventHandler
}

export default I