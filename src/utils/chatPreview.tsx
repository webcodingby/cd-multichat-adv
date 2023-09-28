import MS_TYPES from "@data/messageTypes";
import LinesEllipsis from "react-lines-ellipsis";

const chatPreview = ({
  messageType,
  body,
  bodyEx
}: {
  messageType?: any,
  body?: any,
  bodyEx?:any
}) => {
  switch(messageType) {
    case MS_TYPES.messageText:
      return (
        <LinesEllipsis
          maxLine={2}
          text={body?.chat_messageable?.text || bodyEx?.text}
        />
      )
    case MS_TYPES.messageImage:
      return 'Картинка'
    case MS_TYPES.messageGift:
      return 'Подарок'
    case MS_TYPES.messageSticker:
      return 'Стикер'
    case MS_TYPES.messageWink:
      return 'Подмигивание'
    case MS_TYPES.letterText:
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
    case MS_TYPES.letterImage:
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