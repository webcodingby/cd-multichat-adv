const checkFetchAuthorization = (res: Response) => {
  
  let pr = new Promise((resolve, reject) => {
    if(res.status === 401) {
      window.location.replace(window.location.origin + '/auth')
      reject()
    } else {
      resolve(res)
    }
  })  
  return pr;
}

export default checkFetchAuthorization;