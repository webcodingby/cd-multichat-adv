import { createSlice, current } from "@reduxjs/toolkit";
import initState from "./initState";
import {sortingDialogList, sortingChatList, sortingMailChatList} from '@utils/chatSorting';


const mainSlice = createSlice({
  name: 'main',
  initialState:initState,
  reducers: {
    main_addToken: (state,action) => {
      state.token = action.payload
    },
    main_deleteToken: (state) => {state.token = null},
    main_updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    main_updateCurrentOperator: (state,action) => {
      state.currentOperator = action.payload
    },
    main_addNewMessageOrLetter: (state,action) => {
      state.newMessageOrLetter = action.payload
    },
    main_clearNewMessageOrLeter: (state) => {state.newMessageOrLetter = null} ,
    main_updateToSocketChanel: (state, action) => {state.socket = action.payload},
    main_updateAdminData: (state,action) => {state.adminData = action.payload},
    main_updateSocket: (state,action) => {state.socket = action.payload},


    main_incMessageChatsPage: (state) => {
      state.messageChatsPage = state.messageChatsPage + 1
    },
    main_incLetterChatsPage: (state) => {
      state.letterChatPage = state.letterChatPage + 1
    },

    main_incInboxPage: (state) => {
      state.inboxPage = state.inboxPage + 1
    },

    main_initChatData: (state,action) => {state.chatData = action.payload},
    
    main_initChatDataMessageChats: (state, action) => {state.chatData = {...state.chatData, messageChats: action.payload}},
    main_initChatDataLetterChats: (state, action) => {state.chatData = {...state.chatData, letterChats: action.payload}},
    main_initChatDataInbox: (state,action) => {state.chatData = {...state.chatData, inbox: action.payload}},
    main_initChatDataLimits: (state, action) => {state.chatData = {...state.chatData, limits: action.payload}},
    
    // main_updateChatDataMessagesStore: (state, action: {payload: {id:string, body:any[]}}) => {
    //   const chatId = action.payload.id
    //   const list = state.chatData.messagesStore;
    //   const findChat = list.find(i => i.chatId == chatId)
    //   const findChatIndex = list.findIndex(i => i.chatId == chatId)
    //   if(findChat) {
    //     const m = list;
    //     const rm = m.splice(
    //       findChatIndex, 
    //       1, 
    //       {
    //         chatId: list[findChatIndex].chatId, 
    //         body: [...list[findChatIndex].body, ...action.payload.body]
    //       }
    //     )
    //     state.chatData = {
    //       ...state.chatData,
    //       messagesStore: [...m]
    //     }
    //   } else {
    //     state.chatData = {
    //       ...state.chatData,
    //       messagesStore: [
    //         ...state.chatData.messagesStore,
    //         {
    //           chatId: chatId,
    //           body: action.payload.body
    //         }
    //       ]
    //     }
    //   }
    // },

    // main_updateChatDataMessagesStoreElement: (state, action: {payload: {id: string, message: any}}) => {
    //   const chatId = action.payload?.id;
    //   const message = action.payload?.message
    //   const findChat = state.chatData.messagesStore.find(i => i.chatId == chatId)
    //   const findIndex = state.chatData.messagesStore.findIndex(i => i.chatId == chatId)

    //   if(findChat && findIndex !== -1) {
    //     if(state.chatData.messagesStore[findIndex].body?.length > 0) {
          
    //       const findMessageIndex = state.chatData.messagesStore[findIndex].body.findIndex(i => i?.id == message?.id)
    //       if(findMessageIndex !== -1) {
    //         state.chatData.messagesStore[findIndex].body[findMessageIndex] = message
    //       } else {
    //         state.chatData.messagesStore[findIndex].body = [
    //           ...state.chatData.messagesStore[findIndex].body,
    //           action.payload?.message
    //         ]
    //       }
    //     }
    //   }
    // },

    // main_updateChatDataLetterStore: (state, action: {payload: {id:string, body:any[]}}) => {
    //   const chatId = action.payload.id
    //   const list = state.chatData.lettersStore;
    //   const findChat = list.find(i => i.chatId == chatId)
    //   const findChatIndex = list.findIndex(i => i.chatId == chatId)
    //   if(findChat) {
    //     const m = list;
    //     const rm = m.splice(
    //       findChatIndex, 
    //       1, 
    //       {
    //         chatId: list[findChatIndex].chatId, 
    //         body: [...list[findChatIndex].body, ...action.payload.body]
    //       }
    //     )
    //     state.chatData = {
    //       ...state.chatData,
    //       lettersStore: [...m]
    //     }
    //   } else {
    //     state.chatData = {
    //       ...state.chatData,
    //       lettersStore: [
    //         ...state.chatData.lettersStore,
    //         {
    //           chatId: chatId,
    //           body: action.payload.body
    //         }
    //       ]
    //     }
    //   }
    // },

    // main_updateChatDataLettersStoreElement: (state, action: {payload: {id: string, message: any}}) => {
    //   const chatId = action.payload?.id;
    //   const message = action.payload?.message
    //   const findChat = state.chatData.lettersStore.find(i => i.chatId == chatId)
    //   const findIndex = state.chatData.lettersStore.findIndex(i => i.chatId == chatId)

    //   if(findChat) {
    //     if(state.chatData.lettersStore[findIndex].body?.length > 0) {
    //       const findMessageIndex = state.chatData.lettersStore[findIndex].body.findIndex(i => i?.id == message?.id)
    //       if(findMessageIndex !== -1) {
    //         state.chatData.lettersStore[findIndex].body[findMessageIndex] = message
    //       } else {
    //         state.chatData.lettersStore[findIndex].body = [
    //           ...state.chatData.lettersStore[findIndex].body,
    //           action.payload?.message
    //         ]
    //       }
    //     }
    //   }
    // },

    main_addChatDataMessageChats: (state, action) => {
      state.chatData.messageChats = sortingDialogList([...state.chatData.messageChats, ...action.payload])
    },
    main_addChatDataLetterChats: (state, action) => {
      state.chatData.letterChats = sortingDialogList([...state.chatData.letterChats, ...action.payload])
    },


    main_updateChatDataMessageChats: (state, action) => {
      const chatId = action.payload?.id
      const find = state.chatData.messageChats.find(i => i.id == chatId)
      const findIndex = state.chatData.messageChats.findIndex(i => i.id == chatId)

      if(find) {
        
        const m = state.chatData.messageChats
        const rm = m.splice(findIndex, 1, 
          {
            ...find, 
            ...action.payload,
            available_limit: find?.available_limit > 0 ? find?.available_limit - 1 : 0,
          }
        )
        state.chatData = {
          ...state.chatData,
          messageChats: sortingDialogList([...m])
        }
      } else {
        state.chatData = {
          ...state.chatData,
          messageChats: sortingDialogList([...state.chatData.messageChats, action.payload])
        }
      }
    },

    main_updateChatDataLetterChats: (state, action) => {
      const chatId = action.payload?.id
      const find = state.chatData.letterChats.find(i => i.id == chatId)
      const findIndex = state.chatData.letterChats.find(i => i.id == chatId)

      if(find) {
        const m = state.chatData.letterChats
        const rm = m.splice(findIndex, 1, action.payload)
        state.chatData = {
          ...state.chatData,
          letterChats: sortingDialogList([...m])
        }
      } else {
        state.chatData = {
          ...state.chatData,
          letterChats: sortingDialogList([...state.chatData.letterChats, action.payload])
        }
      }
    },

    main_updateChatDataInbox: (state, action) => {
      const id = action.payload?.id
      const type = action.payload?.type_of_model
      const find = state.chatData.inbox.find(i => i?.id == id && i?.type_of_model == type)
      const findIndex = state.chatData.inbox.findIndex(i => i?.id == id && i?.type_of_model == type)

      if(find) {
        const m = state.chatData.inbox;
        const rm = m.splice(findIndex, 1, action.payload)
        state.chatData = {
          ...state.chatData,
          inbox: sortingDialogList([...m])
        }
      } else {
        state.chatData = {
          ...state.chatData,
          inbox: sortingDialogList([...state.chatData.inbox, action.payload])
        }
      }
    },

    main_removeChatDataInbox: (state, action: {payload: {id: string, type: string}}) => {
      const id = action.payload.id
      const type = action.payload.type

      const find = state.chatData.inbox.find(i => i?.id == id && i?.type_of_model == type)
      const findIndex = state.chatData.inbox.findIndex(i => i?.id == id && i?.type_of_model == type)

      if(find) {
        const m = state.chatData.inbox
        const rm = m.splice(findIndex, 1)
        state.chatData = {
          ...state.chatData,
          inbox: [...m]
        }
      }
    },

    main_updateChatDataLimits: (state, action) => {
      const id = action.payload?.id
      const find = state.chatData.limits.find(i => i.id == id)
      const findIndex = state.chatData.limits.find(i => i.id == id)

      if(find) {
        const m = state.chatData.limits
        const rm = m.splice(findIndex, 1, action.payload)
        state.chatData = {
          ...state.chatData,
          limits: sortingDialogList([...m])
        }
      } else {
        state.chatData = {
          ...state.chatData,
          limits: sortingDialogList([...state.chatData.limits, action.payload])
        }
      }
    },

    main_removeChatDataLimits: (state, action: {payload: {id: string}}) => {
      const id = action.payload.id

      const find = state.chatData.limits.find(i => i?.id == id)
      const findIndex = state.chatData.limits.findIndex(i => i?.id == id)

      if(find) {
        const m = state.chatData.limits
        const rm = m.splice(findIndex, 1)
        state.chatData = {
          ...state.chatData,
          limits: [...m]
        }
      }
    },

    main_updateCurrentChatId: (state, action) => {state.chatData = {...state.chatData, currentChatId: action.payload}},
    main_updateDialogUsers: (state, action: {payload: {man: any, girl: any} | null}) => {state.chatData = {...state.chatData, dialogUsers: action.payload}},
    main_updateChatType: (state, action: {payload: string | null}) => {state.chatData = {...state.chatData, chatType: action.payload}},





    main_incNewMessagesCount: (state) => {state.newMessagesCount = state.newMessagesCount + 1},
    main_decNewMessagesCount: (state) => {state.newMessagesCount = (state.newMessagesCount - 1) > 0 ? state.newMessagesCount - 1 : 0},

    main_incNewLettersCount: (state) => {state.newLettersCount = state.newLettersCount + 1},
    main_decNewLettersCount: (state) => {state.newLettersCount = (state.newLettersCount - 1) > 0 ? state.newLettersCount - 1 : 0},

    main_updateNewMessage: (state, action) => {state.newMessage = action.payload},
    main_updateNewLetter: (state, action) => {state.newLetter = action.payload},

    main_updateCreateChatData: (state, action) => {state.createChatData = action.payload}
  }
})

const {actions, reducer} = mainSlice

export const {
  main_addToken,
  main_deleteToken,
  main_updateCurrentUser,
  main_updateCurrentOperator,
  main_addNewMessageOrLetter,
  main_clearNewMessageOrLeter,
  main_updateAdminData,
  main_updateSocket,

  main_initChatData,
  main_initChatDataInbox,
  main_initChatDataLetterChats,
  main_initChatDataLimits,
  main_initChatDataMessageChats,
  main_removeChatDataInbox,
  main_removeChatDataLimits,
  main_updateChatDataInbox,
  main_updateChatDataLetterChats,

  // main_updateChatDataMessagesStore,
  // main_updateChatDataLetterStore,
  // main_updateChatDataLettersStoreElement,
  // main_updateChatDataMessagesStoreElement,

  main_updateChatDataLimits,
  main_updateChatDataMessageChats,
  main_updateCurrentChatId,
  main_updateDialogUsers,
  main_updateToSocketChanel,
  main_updateChatType,
  
  main_addChatDataMessageChats,
  main_addChatDataLetterChats,
  main_incMessageChatsPage,
  main_incLetterChatsPage,
  main_incInboxPage,


  main_decNewLettersCount,
  main_decNewMessagesCount,
  main_incNewLettersCount,
  main_incNewMessagesCount,
  main_updateNewLetter,
  main_updateNewMessage,
  main_updateCreateChatData
} = actions
export default reducer;