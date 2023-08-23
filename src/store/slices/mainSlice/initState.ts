import MainStore from "./types";
import { Cookies } from "typescript-cookie";
import { cookiesStorageKeys } from "@utils/storageKeys";
const {TOKEN, ADMIN} = cookiesStorageKeys

const initState:MainStore = {
  token: Cookies.get(TOKEN) ? Cookies.get(TOKEN) : null,
  adminData: Cookies.get(ADMIN) ? Cookies.get(ADMIN) : null,
  currentUser: null,
  currentOperator: null,
  newMessageOrLetter: null
}

export default initState;