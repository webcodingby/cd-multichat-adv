export type messageType = 
'App\\Models\\ChatWinkMessage' |
'App\\Models\\ChatStickerMessage' |
'App\\Models\\ChatGiftMessage' |
'App\\Models\\ChatImageMessage' |
'App\\Models\\ChatTextMessage'

export type letterType = 
'App\\Models\\LetterStickerMessage' |
'App\\Models\\LetterGiftMessage' |
'App\\Models\\LetterImageMessage' | 
'App\\Models\\LetterTextMessage'

export type msMessageType = {
  messageText: Extract<messageType, 'App\\Models\\ChatTextMessage'>,
  messageImage: Extract<messageType, 'App\\Models\\ChatImageMessage'>,
  messageGift: Extract<messageType, 'App\\Models\\ChatGiftMessage'>,
  messageSticker: Extract<messageType, 'App\\Models\\ChatStickerMessage'>,
  messageWink: Extract<messageType, 'App\\Models\\ChatWinkMessage'>
}

export type msLetterType = {
  letterText: Extract<letterType, 'App\\Models\\LetterTextMessage'>,
  letterImage: Extract<letterType, 'App\\Models\\LetterImageMessage'>
}

export const MS_MESSAGE_TYPES: msMessageType = {
  messageText: 'App\\Models\\ChatTextMessage',
  messageImage: 'App\\Models\\ChatImageMessage',
  messageGift: 'App\\Models\\ChatGiftMessage',
  messageSticker: 'App\\Models\\ChatStickerMessage',
  messageWink: 'App\\Models\\ChatWinkMessage'
}

export const MS_LETTER_TYPES: msLetterType = {
  letterImage: 'App\\Models\\LetterImageMessage',
  letterText: 'App\\Models\\LetterTextMessage'
}

export const MS_TYPES: msLetterType & msMessageType = {
  ...MS_MESSAGE_TYPES,
  ...MS_LETTER_TYPES
}

export default MS_TYPES;