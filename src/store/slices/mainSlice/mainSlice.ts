import { createSlice } from "@reduxjs/toolkit";
import initState from "./initState";

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

    main_initChatData: (state,action) => {state.chatData = action.payload},
    
    main_initChatDataLimits: (state, action) => {state.chatData = {...state.chatData, limits: action.payload}},
    main_initChatDatatMessages: (state,action) => {state.chatData = {...state.chatData, messages: action.payload}},
    main_initChatDataChats: (state,action) => {state.chatData = {...state.chatData, chats: action.payload}},
    main_initChatDataInbox: (state,action) => {state.chatData = {...state.chatData, inbox: action.payload}},

    main_updateChatDataLimits: (state, action) => {
      // state.chatData = {
        
      // }
    }
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
  main_updateSocket
} = actions
export default reducer;