import MainStore from "./types";
import { Cookies } from "typescript-cookie";
import { cookiesStorageKeys } from "@utils/storageKeys";
const {TOKEN, ADMIN} = cookiesStorageKeys

const userData = Cookies.get(ADMIN)
const parsedUserData = (userData && typeof userData === 'string') ? JSON.parse(userData) : null

const initState:MainStore = {
  token: Cookies.get(TOKEN) ? Cookies.get(TOKEN) : null,
  adminData: parsedUserData,
  currentUser: null,
  currentOperator: null,
  newMessageOrLetter: null,
  socket: null,

  chatData: {
    chatType: null,
    currentChatId: null,
    dialogUsers: null,
    limits: [],
    inbox: [],
    letterChats: [],
    messageChats: [],
    messagesStore: [],
    lettersStore: [],
    history: []
  },

  messageChatsPage: 1,
  letterChatPage: 1,
  inboxPage: 1,
  historyPage: 1,

  newLetter: null,
  newMessage: null,
  createChatData: null,

  newMessagesCount: 0,
  newLettersCount: 0,
}

export default initState;