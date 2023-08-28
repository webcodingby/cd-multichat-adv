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
          per_page = 10,
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
        url: endpoints.getMessageChats + `?page=${page}&per_page=${per_page}&search=${search}&filter_type=${filter_type}`,
        headers: setHeaderWithToken(token)
      }),
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
          per_page = 10,
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
      })
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
      })
    }),

    getLetterChat: builder.query({
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
          id: number | string,
          page: number,
          per_page?: number
        }
      }) => ({
        url: endpoints.getLetterChat + `/${id}?page=${page}&per_page=${per_page}`,
        headers: setHeaderWithToken(token)
      })
    }),

    getInboxList: builder.query({
      query: ({
        token,
        body: {
          page,
          per_page = 10,
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
        url: endpoints.getInboxList + `?page=${page}&per_page=${per_page}&search=${search}`,
        headers: setHeaderWithToken(token)
      })
    }),

    getLimitsList: builder.query({
      query: ({
        token,
        body: {
          page
        }
      }: {
        token:any,
        body: {
          page: number
        }
      }) => ({
        url: endpoints.getLimitList + `?page=${page}`,
        headers: setHeaderWithToken(token)
      })
    }),

    getStickers: builder.query({
      query: ({
        token,
      }: {
        token:any,
      }) => ({
        url: endpoints.getStickers,
        headers: setHeaderWithToken(token)
      })
    }),

    getGifts: builder.query({
      query: ({
        token
      }: {
        token:any
      }) => ({
        url: endpoints.getGifts,
        headers: setHeaderWithToken(token)
      })
    }),

    getSelf: builder.query({
      query: (token: any) => ({
        url: endpoints.getSelf,
        headers: setHeaderWithToken(token)
      })
    }),

    getWorkCurrentStatus: builder.query({
      query: (token:any) => ({
        url:endpoints.getWorkCurrentStatus,
        headers: setHeaderWithToken(token)
      })
    }),

    workStart: builder.mutation({
      query: (token:any) => ({
        method: "POST",
        url:endpoints.workStart,
        headers: setHeaderWithToken(token),
      })
    }),

    workStop: builder.mutation({
      query: (token:any) => ({
        method: "POST",
        url:endpoints.workStop,
        headers: setHeaderWithToken(token),
      })
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
      })
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
      })
    }),

    getLogs: builder.query({
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
        url: endpoints.getLogs + `?page=${page}&per_page=${per_page}&date=${date}`,
        headers: setHeaderWithToken(token)
      })
    }),
    
    getFaults: builder.query({
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
        url: endpoints.getFault + `?page=${page}&per_page=${per_page}&date=${date}`,
        headers: setHeaderWithToken(token)
      })
    }),

    getMedia: builder.query({
      query: ({
        token,
        body: {
          id,
          page,
          category_id
        }
      }: {
        token: any,
        body: {
          id: string | number,
          page?: number,
          category_id?: number
        }
      }) => ({
        url: `${API_PATH}operators/ancets/${id}/media?page=${page}&category_id=${category_id}`,
        headers: setHeaderWithToken(token)
      })
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
      })
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
      })
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
      })
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
      })
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
      })
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
      })
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
      })
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
        url: `operators/chats/${id}/send/sticker/${sticker_id}`,
        method: "POST",
        headers: setHeaderWithToken(token),
      })
    }),

    sendGift: builder.mutation({
      query: ({
        token,
        body: {
          id,
          gift_id
        }
      }: {
        token:any,
        body: {
          id: number | string,
          gift_id: number | string
        }
      }) => ({
        url: `operators/chats/${id}/send/gift/${gift_id}`,
        method: "POST",
        headers: setHeaderWithToken(token)
      })
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
      })
    }),

    getStatChatAvgTimeList: builder.query({
      query: ({
        token,
      }: {
        token:any
      }) => ({
        url: endpoints.getStatChatAvgTimeList,
        headers: setHeaderWithToken(token)
      })
    }),

    getStatMessageCount: builder.query({
      query: ({
        token
      }: {
        token:any
      }) => ({
        url: endpoints.getStatMessageCount,
        headers: setHeaderWithToken(token)
      })
    }),
    
    getStatMessageCountOperatorAnket: builder.query({
      query: ({
        token
      }: {
        token:any
      }) => ({
        url: endpoints.getStatMessageCountOperatorAnket,
        headers: setHeaderWithToken(token)
      })
    }),

  })
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
  useWorkStartMutation,
  useWorkStopMutation,

  //stat
  useGetStatChatAvgTimeListQuery,
  useGetStatChatAvgTimeQuery,
  useGetStatMessageCountOperatorAnketQuery,
  useGetStatMessageCountQuery,
} = apiSlice

export default apiSlice;