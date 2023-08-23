import { HTMLProps } from "react";

export type iconButtonVariantsType = 'default' | 'danger' | 'green'
interface I extends HTMLProps<HTMLButtonElement> {
  variant?: iconButtonVariantsType
}

export default I;