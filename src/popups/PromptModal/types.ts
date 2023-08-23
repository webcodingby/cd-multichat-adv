import { ModalFuncProps } from "antd"

interface I extends ModalFuncProps {
  data?: {
    title?: string,
    onAccept?: (...args:any) => any,
    onReject?: (...args:any) => any,
  }
}

export default I;