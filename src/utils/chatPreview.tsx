import MS_TYPES from "@data/messageTypes";
import LinesEllipsis from "react-lines-ellipsis";

const chatPreview = ({
  messageType,
  body
}: {
  messageType?: any,
  body?: any
}) => {
  switch(messageType) {
    case messageType === MS_TYPES.messageText:
      if(typeof body === 'string') {
        return (
          <LinesEllipsis
            maxLine={2}
            >
            {body}
          </LinesEllipsis>
        )
      } else {
        return (
          <span style={{color: 'var(--red_1)'}}>API ERROR</span>
        )
      }
    case messageType === MS_TYPES.messageImage:
      return 'Картинка'
    case messageType === MS_TYPES.messageGift:
      return 'Подарок'
    case messageType === MS_TYPES.messageSticker:
      return 'Стикер'
    case messageType === MS_TYPES.messageWink:
      return 'Подмигивание'
    case messageType === MS_TYPES.letterText:
      if(typeof body === 'string') {
        return (
          <LinesEllipsis
            maxLine={2}
            >
            {body}
          </LinesEllipsis>
        )
      } else {
        return (
          <span style={{color: 'var(--red_1)'}}>API ERROR</span>
        )
      }
    case messageType === MS_TYPES.letterImage:
      return 'Картинка'
    default: 
      return (
        <span style={{color: 'var(--red_1)'}}>
          NEW TYPE or API ERROR
        </span>
      )
  }
}

export default chatPreview;