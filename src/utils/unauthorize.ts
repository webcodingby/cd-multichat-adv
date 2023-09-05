import { Cookies } from "typescript-cookie";
import { cookiesStorageKeys } from "./storageKeys";
import ROUTES from "@data/routes";
import kickOut from "@utils/kickOut";
const {TOKEN} = cookiesStorageKeys

const unauthorize = () => {
  kickOut()
  window.location.replace(ROUTES.authPage)
}

export default unauthorize;