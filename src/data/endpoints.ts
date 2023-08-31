export const BASE_DOMAIN = 'https://api.cooldreamy.com/'
export const TEST_DOMAIN = 'http://admin.soultri.site/'

export const TEST_WS_DOMAIN = `admin.soultri.site`
export const BASE_WS_DOMAIN = 'api.cooldreamy.com'

export const API_PATH = `${BASE_DOMAIN}api/`

const endpoints = {
  auth: `${API_PATH}token`,

  getMessageChats: `${API_PATH}operators/chats`,
  getLetterChats: `${API_PATH}operators/letter`,

  getMessageChat: `${API_PATH}operators/chats`,
  getLetterChat: `${API_PATH}operators/letter`,

  getInboxList: `${API_PATH}operators/messages`,

  getLimitList: `${API_PATH}operators/limits`,

  getStickers: `${API_PATH}get_stickers`,
  getGifts: `${API_PATH}get_gifts`,

  getSelf: `${API_PATH}operators/me`,
  
  getWorkCurrentStatus: `${API_PATH}operators/working-shifts/get/current/status`,
  workStart: `${API_PATH}operators/working-shifts/work/start`,
  workStop: `${API_PATH}operators/working-shifts/work/stop`,

  getReports: `${API_PATH}operators/reports`,
  getLogs: `${API_PATH}operators/logs`,
  getFault: `${API_PATH}operators/fines`,

  createMessageChat: `${API_PATH}operators/chats/store/chat`,
  createLetterChat: `${API_PATH}operators/letter/store/letter`,

  uploadImages: `${API_PATH}operators/store/images/add`,
  deleteImages: `${API_PATH}operators/store/image/delete`,

  //stat
  getStatChatAvgTime: `${API_PATH}admin/statistics/operator/first/message/avg/time`,
  getStatChatAvgTimeList: `${API_PATH}admin/statistics/operator/first/message/chat/time`,
  getStatMessageCount: `${API_PATH}admin/statistics/operator/count/message`,
  getStatMessageCountOperatorAnket: `${API_PATH}admin/statistics/operator/count/message/ancet`,
}

export default endpoints;