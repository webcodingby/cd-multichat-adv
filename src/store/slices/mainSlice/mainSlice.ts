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
    main_clearNewMessageOrLeter: (state) => {state.newMessageOrLetter = null} 
  }
})

const {actions, reducer} = mainSlice

export const {
  main_addToken,
  main_deleteToken,
  main_updateCurrentUser,
  main_updateCurrentOperator,
  main_addNewMessageOrLetter,
  main_clearNewMessageOrLeter
} = actions
export default reducer;