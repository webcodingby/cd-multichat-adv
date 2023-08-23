const PREFIX = 'cooldreamy-multichat-';
const storageKeys = {
  localStorageKeys: {},
  cookiesStorageKeys: {
    TOKEN: `${PREFIX}auth-token`,
    ADMIN: `${PREFIX}admin-data`,
    USER_ID: `${PREFIX}user-id`,
    USER_ROLE: `${PREFIX}user-role`,
    USER_EMAIL: `${PREFIX}user-email`
  }
}
export const {
  localStorageKeys,
  cookiesStorageKeys
} = storageKeys;
export default storageKeys;