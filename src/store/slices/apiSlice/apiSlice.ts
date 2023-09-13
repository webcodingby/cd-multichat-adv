import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import endpoints, { API_PATH, BASE_DOMAIN } from '../../../data/endpoints';
import { jsonHeaders as headers } from '../../../data/headers';
import checkFetchAuthorization from '@utils/checkFetchAuthorization';


const setHeaderWithToken = (token: any) => ({...headers,'Authorization': `Bearer ${token}`})

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: BASE_DOMAIN}),
  endpoints: builder => ({

    auth: builder.mutation({
      query: (body: {
        email:string,
        password:string
      }) => ({
        method: "POST",
        url: endpoints.auth,
        headers,
        body:JSON.stringify(body)
      })
    }),

    getMessageChats: builder.query({
      query: ({
        token,
        body: {
          page = 1,
          per_page = 1000,
          search = '',
          filter_type
        }
      }: {
        token:any,
        body: {
          page: number,
          per_page?: number,
          search?: string,
          filter_type?: any
        }
      }) => ({
        url: endpoints.getMessageChats + `?page=${page}&per_page=${per_page}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName
      // },
      // forceRefetch: ({currentArg, previousArg}) => {
      //   return currentArg !== previousArg
      // }
    }),

    getLetterChats: builder.query({
      query: ({
        token,
        body: {
          page = 1,
          per_page = 1000,
          search = '',
          filter_type
        }
      }: {
        token: any,
        body: {
          page: number,
          per_page?: number,
          search?: string,
          filter_type?: any
        }
      }) => ({
        url: endpoints.getLetterChats + `?page=${page}&per_page=${per_page}&search=${search}&filter_type=${filter_type}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getMessageChat: builder.query({
      query: ({
        token, 
        body: {
          id,
          page,
          per_page = 10
        }
      }: {
        token: any,
        body: {
          id: any,
          page: number,
          per_page?: number
        }
      }) => ({
        url: endpoints.getMessageChat + `/${id}?page=${page}&per_page=${per_page}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getLetterChat: builder.query({
      query: ({
        token,
        body: {
          id,
          page,
          per_page = 1000
        }
      }: {
        token: any,
        body: {
          id: number | string,
          page: number,
          per_page?: number
        }
      }) => ({
        url: endpoints.getLetterChat + `/${id}?page=${page}&per_page=${per_page}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getInboxList: builder.query({
      query: ({
        token,
        body: {
          page,
          per_page = 1000,
          search
        }
      }: {
        token:any, 
        body: {
          page: number,
          per_page?: number,
          search?: string 
        }
      }) => ({
        url: endpoints.getInboxList + `?page=${page}&per_page=${per_page}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getLimitsList: builder.query({
      query: ({
        token,
        body: {
          page,
          per_page = 1000
        }
      }: {
        token:any,
        body: {
          page: number,
          per_page?: number
        }
      }) => ({
        url: endpoints.getLimitList + `?page=${page}&per_page=${per_page}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getStickers: builder.query({
      query: ({
        token,
      }: {
        token:any,
      }) => ({
        url: endpoints.getStickers,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getGifts: builder.query({
      query: ({
        token
      }: {
        token:any
      }) => ({
        url: endpoints.getGifts,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getSelf: builder.query({
      query: (token: any) => ({
        url: endpoints.getSelf,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getWorkCurrentStatus: builder.query({
      query: (token:any) => ({
        url:endpoints.getWorkCurrentStatus,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),
    
    getWorkStatusList: builder.query({
      query: (token:any) => ({
        url: endpoints.getWorkStatusList,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    workStart: builder.mutation({
      query: (token:any) => ({
        method: "POST",
        url:endpoints.workStart,
        headers: setHeaderWithToken(token),
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    workStop: builder.mutation({
      query: (token:any) => ({
        method: "POST",
        url:endpoints.workStop,
        headers: setHeaderWithToken(token),
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    workPausedStart: builder.mutation({
      query: (token:any) => ({
        method: "POST",
        url: endpoints.workPausedStart,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    workPausedStop: builder.mutation({
      query: (token:any) => ({
        method: "POST",
        url: endpoints.workPausedStop,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getReports: builder.query({
      query: ({
        token,
        body: {
          page,
          per_page,
          date = ''
        }
      }: {
        token: any,
        body: {
          page: number,
          per_page: number,
          date?: string
        }
      }) => ({
        url: endpoints.getReports + `?page=${page}&per_page=${per_page}&date=${date}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    deleteReport: builder.mutation({
      query: ({
        token,
        id
      }: {
        token:any,
        id: number | string
      }) => ({
        method: "DELETE",
        url:endpoints.getReports + `/${id}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getLogs: builder.query({
      query: ({
        token,
        body: {
          page,
          per_page = 1000,
          date = ''
        }
      }: {
        token: any,
        body: {
          page: number,
          per_page: number,
          date?: string
        }
      }) => ({
        url: endpoints.getLogs + `?page=${page}&per_page=${per_page}&date=${date}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),
    
    getFaults: builder.query({
      query: ({
        token,
        body: {
          page,
          per_page = 1000,
          date = ''
        }
      }: {
        token: any,
        body: {
          page: number,
          per_page: number,
          date?: string
        }
      }) => ({
        url: endpoints.getFault + `?page=${page}&per_page=${per_page}&date=${date}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getMedia: builder.query({
      query: ({
        token,
        body: {
          id,
          page,
          per_page = 7,
          category_id
        }
      }: {
        token: any,
        body: {
          id: string | number,
          page?: number,
          category_id?: number | string,
          per_page?: number
        }
      }) => ({
        url: `${API_PATH}operators/ancets/${id}/media?page=${page}&category_id=${category_id}&per_page=${per_page}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    sendMediaMessageChat: builder.mutation({
      query: ({
        token,
        id,
        body
      }: {
        token:any,
        id: number | string,
        body: {
          thumbnail_url: string,
          image_url: string
        }
      }) => ({
        url: `${API_PATH}operators/chats/${id}/send/image`,
        method: "POST",
        headers: setHeaderWithToken(token),
        body: JSON.stringify(body)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    createMessageChat: builder.mutation({
      query: ({
        token,
        body
      }: {
        token: any,
        body: {
          anket_id: any, 
          man_id: any,
          operator_chat_limit_id: any
        }
      }) => ({
        url: endpoints.createMessageChat,
        method: "POST",
        headers: setHeaderWithToken(token),
        body: JSON.stringify(body)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    createLetterChat: builder.mutation({
      query: ({
        token,
        body
      }: {
        token: any,
        body: {
          anket_id: any, 
          man_id: any, 
          operator_chat_limit_id: any
        }
      }) => ({
        url: endpoints.createLetterChat,
        method: "POST",
        headers: setHeaderWithToken(token),
        body: JSON.stringify(body)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    sendMessage: builder.mutation({
      query: ({
        token,
        id,
        body
      } : {
        token:any,
        id:any
        body: {text:string} 
      }) => ({
        url: `/api/operators/chats/${id}/send/message`,
        method: "POST",
        headers: setHeaderWithToken(token),
        body: JSON.stringify(body)
      }),
      // transformErrorResponse: checkFetchAuthorization,
    }),

    sendLetter: builder.mutation({
      query: ({
        token,
        id,
        body
      }: {
        token:any,
        id: number | string
        body: {
          text: string,
          images?: any[]
        }
      }) => ({
        url: `operators/letter/${id}/send/message`,
        method: "POST",
        headers: setHeaderWithToken(token),
        body: JSON.stringify(body)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    uploadImages: builder.mutation({
      query: ({
        token,
        body
      }: {
        token: any,
        body: FormData
      }) => ({
        url: endpoints.uploadImages,
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    deleteImages: builder.mutation({
      query: ({
        token,
        body
      }: {
        token: any,
        body: {
          image_id: any,
          user_id: number | string,
        }
      }) => ({
        url: endpoints.deleteImages,
        method: "DELETE",
        headers: setHeaderWithToken(token),
        body: JSON.stringify(body)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    sendSticker: builder.mutation({
      query: ({
        token,
        body: {
          id,
          sticker_id
        }
      }: {
        token: any, 
        body: {
          id: string | number,
          sticker_id: string | number
        }
      }) => ({
        url: `${API_PATH}operators/chats/${id}/send/sticker/${sticker_id}`,
        method: "POST",
        headers: setHeaderWithToken(token),
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    sendGift: builder.mutation({
      query: ({
        token,
        body: {
          // id,
          gift_id,
          to_id,
          from_id
        }
      }: {
        token:any,
        body: {
          // id: number | string,
          gift_id: number | string,
          from_id?:number | string,
          to_id?: number | string
        }
      }) => ({
        url: `${API_PATH}operators/chats/${from_id}/${to_id}/send/gift/${gift_id}`,
        method: "POST",
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),



    ///stats
    getStatChatAvgTime: builder.query({
      query: ({
        token,
      }: {
        token:any
      }) => ({
        url: endpoints.getStatChatAvgTime,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getStatChatAvgTimeList: builder.query({
      query: ({
        token,
      }: {
        token:any
      }) => ({
        url: endpoints.getStatChatAvgTimeList,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getStatMessageCount: builder.query({
      query: ({
        token
      }: {
        token:any
      }) => ({
        url: endpoints.getStatMessageCount,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),
    
    getStatMessageCountOperatorAnket: builder.query({
      query: ({
        token,
        page
      }: {
        token:any,
        page: number
      }) => ({
        url: endpoints.getStatMessageCountOperatorAnket + `?page=${page}`,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    getStatAnketCount: builder.query({
      query: ({
        token
      }: {token:any}) => ({
        url: endpoints.getStatAnketCount,
        headers: setHeaderWithToken(token)
      }),
      // transformErrorResponse: checkFetchAuthorization
    }),

    readMessage: builder.mutation({
      query: ({
        token,
        body: {
          chatId,
          messageId
        }
      }: {
        token:any,
        body: {
          chatId: any,
          messageId:any
        }
      }) => ({
        url: `${API_PATH}operators/chats/${chatId}/read/${messageId}`,
        headers: setHeaderWithToken(token),
        method: "POST"
      }),
      // transformErrorResponse: checkFetchAuthorization,
    }),
    // getIndicators: builder.query({

    // })
  }),
})

export const {
  useAuthMutation,
  useGetLetterChatsQuery,
  useGetMessageChatsQuery,
  useGetLetterChatQuery,
  useGetMessageChatQuery,
  useGetInboxListQuery,
  useGetLimitsListQuery,
  useGetSelfQuery,
  useSendMessageMutation,
  useSendMediaMessageChatMutation,
  useUploadImagesMutation,
  useDeleteImagesMutation,
  useSendStickerMutation,
  useSendGiftMutation,
  useSendLetterMutation,
  useCreateMessageChatMutation,
  useCreateLetterChatMutation,
  useGetWorkCurrentStatusQuery,
  useGetWorkStatusListQuery,
  useWorkStartMutation,
  useWorkStopMutation,
  useWorkPausedStartMutation,
  useWorkPausedStopMutation,
  useReadMessageMutation,

  //stat
  useGetStatChatAvgTimeListQuery,
  useGetStatChatAvgTimeQuery,
  useGetStatMessageCountOperatorAnketQuery,
  useGetStatMessageCountQuery,
  useGetStatAnketCountQuery
} = apiSlice

export default apiSlice;