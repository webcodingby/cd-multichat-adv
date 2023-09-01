import {cookiesStorageKeys} from "@utils/storageKeys";
import {Cookies} from 'typescript-cookie';
const kickOut = () => {
  Cookies.remove(cookiesStorageKeys.ADMIN)
  Cookies.remove(cookiesStorageKeys.TOKEN)
  Cookies.remove(cookiesStorageKeys.USER_EMAIL)
  Cookies.remove(cookiesStorageKeys.USER_ID)
  Cookies.remove(cookiesStorageKeys.USER_ROLE)
}
export default kickOut;