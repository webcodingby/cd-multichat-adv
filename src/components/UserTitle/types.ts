import { CSSProperties } from "react";

interface I {
  name?: string,
  age?: string | number,
  state?: string,
  country?: string,
  isOnline?: boolean,
  style?: {
    wrapperStyle?: CSSProperties,
    mainStyle?: CSSProperties,
    locationStyle?: CSSProperties
  }
}

export default I;