import type { PusherPrivateChannel } from "laravel-echo/dist/channel"

interface MainStore {
  token: any,
  adminData:any
  currentUser: any,
  currentOperator: any
  newMessageOrLetter: null | {
    type: 'letter' | 'message',
    body: any
  },
  socket: null | PusherPrivateChannel,

  chatData: {
    chatType: string | null
    currentChatId: string | null,
    dialogUsers: {
      girl?: any,
      man?: any
    } | null
    limits: any[],

    messagesStore: {
      chatId: string,
      body: any[]
    }[],
    lettersStore: {
      chatId: string,
      body: any[]
    }[],

    messageChats: any[],
    letterChats: any[],
    inbox: any[]
    history:any[],


    isEndInbox: boolean,
    isEndMessageChats: boolean,
  },

  messageChatsPage: number,
  letterChatPage: number,
  inboxPage: number,
  historyPage: number,

  newMessage: {
    chatId: number | string, 
    body: any,
    type: 'UPDATE' | 'NEW'
  } | null,

  newLetter: {
    chatId: number | string,
    body: any
  } | null,
  createChatData: any,

  newMessagesCount: number,
  newLettersCount: number,
  totalInboxCount: number
  
}

export default MainStore;