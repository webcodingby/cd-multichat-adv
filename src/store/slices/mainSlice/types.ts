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
    
    currentChatId: string | null,
    dialogUsers: {
      selfUser?: any,
      otherUser?: any
    } | null

    limits: any[],
    messages: any[],
    chats: any[],
    inbox: any[]
    
  },
}

export default MainStore;