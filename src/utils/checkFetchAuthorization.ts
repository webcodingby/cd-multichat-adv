import {type FetchBaseQueryError} from "@reduxjs/toolkit/query";
import kickOut from "@utils/kickOut";
const checkFetchAuthorization = ({status}: FetchBaseQueryError, ...args:any[]) => {
  if(status === 401) {
    kickOut()
    window.location.reload()
    window.location.replace('/auth')
  }
  console.log(...args)
}
export default checkFetchAuthorization;