import { Cookies } from "typescript-cookie";
import { cookiesStorageKeys } from "./storageKeys";
import ROUTES from "@data/routes";

const {TOKEN} = cookiesStorageKeys

const unauthorize = () => {
  Cookies.remove(TOKEN)
  window.location.replace(ROUTES.authPage)
}

export default unauthorize;