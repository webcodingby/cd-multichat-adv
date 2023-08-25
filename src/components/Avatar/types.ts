import { CSSProperties } from "react"

interface I {
  image?: string,
  size?: string | number
  isOnline?: boolean,
  isRound?: boolean,
  style?: CSSProperties,
  isActive?: boolean
}

export default I