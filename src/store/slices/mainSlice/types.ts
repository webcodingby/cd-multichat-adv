interface MainStore {
  token: any,
  adminData:any
  currentUser: any,
  currentOperator: any
  newMessageOrLetter: null | {
    type: 'letter' | 'message',
    body: any
  }
}

export default MainStore;