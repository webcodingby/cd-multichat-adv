export const BASE_DOMAIN = 'https://api2.cooldreamy.com/'
export const TEST_DOMAIN = 'http://admin.soultri.site/'

export const TEST_WS_DOMAIN = `admin.soultri.site`
export const BASE_WS_DOMAIN = 'api2.cooldreamy.com'

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
  getWorkStatusList: `${API_PATH}operators/working-shifts/get/status/list`,
  workStart: `${API_PATH}operators/working-shifts/work/start`,
  workStop: `${API_PATH}operators/working-shifts/work/stop`,
  workPausedStart: `${API_PATH}operators/working-shifts/paused/start`,
  workPausedStop: `${API_PATH}operators/working-shifts/paused/stop`,

  getReports: `${API_PATH}operators/reports`,
  getLogs: `${API_PATH}operators/logs`,
  getFault: `${API_PATH}operators/fines`,

  createMessageChat: `${API_PATH}operators/chats/store/chat`,
  createLetterChat: `${API_PATH}operators/letter/store/letter`,

  uploadImages: `${API_PATH}operators/store/images/add`,
  deleteImages: `${API_PATH}operators/store/image/delete`,

  //stat

  //средне время ответа на сообщение по операторам 
  getStatChatAvgTime: `${API_PATH}admin/statistics/operator/first/message/avg/time`,

  //средне время ответа на сообщение по чатам операторам
  getStatChatAvgTimeList: `${API_PATH}admin/statistics/operator/first/message/chat/time`,

  //общее количество сообщений по операторам 
  getStatMessageCount: `${API_PATH}admin/statistics/operator/count/message`,

  //общее количество сообщений по анкетам  оператора
  getStatMessageCountOperatorAnket: `${API_PATH}admin/statistics/operator/count/message/ancet`,

  getStatAnketCount: `${API_PATH}admin/statistics/operator/count/anket`,

  
}

export default endpoints;