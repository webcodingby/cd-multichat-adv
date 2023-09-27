import getClassNames from '@utils/getClassNames';
import styles from './StatTable.module.scss';
import { FC, useEffect, useState, useRef } from 'react'
import tableHead from './data/tableHead';
import {Row, Col, DatePicker} from 'antd';
import CardAnkets from '../cards/CardAnkets/CardAnkets';
import CardReps from '../cards/CardReps/CardReps';
import CardBalance from '../cards/CardBalance/CardBalance';
import CardAvg from '../cards/CardAvg/CardAvg';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import apiSlice from '@store/slices/apiSlice/apiSlice';
import Loader from '@components/Loader/Loader';
import moment from 'moment';
import dayjs from 'dayjs';

const {RangePicker} = DatePicker


interface IStatItem {
  ancet_without_message?:any
  avg_time?:any
  count_ancet?:any
  count_inactive?:any
  count_message?:any
  created_at?:any
  day_work?:any
  id?:any
  man_whith_limit?:any
  name?:any
  time_paused?:any
  time_work?:any,
  ancet_with_message?:any
}

interface IstatData {
  totalAncet?: number,
  ancetInWork?: number,
  totalSendMessages?: number,
  totalSendLetters?: number,
  avgAnswerTime?: string,
  avgIdleTime?: string
}

const StatTable:FC<any> = () => {
  const {token} = useAppSelector(s => s.mainSlice)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const [getStatChatAvgTime] = apiSlice.endpoints.getStatChatAvgTime.useLazyQuery()
  const [getStatChatAvgTimeList] = apiSlice.endpoints.getStatChatAvgTimeList.useLazyQuery()
  const [getStatMessageCount] = apiSlice.endpoints.getStatMessageCount.useLazyQuery()
  const [getStatMessageCountOperatorAnket] = apiSlice.endpoints.getStatMessageCountOperatorAnket.useLazyQuery()
  const [getStatAnketCount] = apiSlice.endpoints.getStatAnketCount.useLazyQuery()
  const [getStatAnketWorkCount] = apiSlice.endpoints.getStatAnketWorkCount.useLazyQuery()
  const [getStatAnketMessagesCount] = apiSlice.endpoints.getStatAnketMessageCount.useLazyQuery()
  const [getList, getListRes] = apiSlice.endpoints.getAdminStat.useLazyQuery();

  const [data, setData] = useState<IstatData>({
    totalAncet: undefined,
    ancetInWork: undefined,
    totalSendLetters: undefined,
    totalSendMessages: undefined,
    avgAnswerTime: undefined,
    avgIdleTime: undefined
  })
  
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<IStatItem[]>([])

  const [date, setDate] = useState<{from: any, to: any}>({from: dayjs(Date.now()), to:  dayjs(Date.now())})

  const getAnkets = () => {
    if(token && date) {
      getList({token, date_from: dayjs(date.from).format(), date_to: dayjs(date.to).format()})
    }
  }

  useEffect(() => {
    getAnkets()
  }, [token, date])

  useEffect(() => {
    const {isLoading, data, isSuccess} = getListRes
    setLoading(isLoading)
    if(data && isSuccess && !isLoading) {
      setList(data?.result)
    }
  },[getListRes])

  const getStatChatAvgTimeFunc = () => {
    if(token) {
      getStatChatAvgTime({token}).then(res => {
        if(res?.data) {
          setData(s => ({
            ...s,
            avgAnswerTime: res?.data?.result[0]?.time_first_message
          }))
        }
      })
    }
  }

  const getStatChatAvgTimeListFunc = () => {
    if(token) {
      getStatChatAvgTimeList({token}).then(res => {
        console.log(res)
      })
    }
  }

  const getStatMessageCountFunc = () => {
    if(token) {
      getStatMessageCount({token}).then(res => {
        console.log(res)
      })
    }
  }


  // const getStatMessageCountOperatorAnketFunc = () => {
  //   if(token) {
  //     getStatMessageCountOperatorAnket({token}).then(res => {
  //       console.log(res)
  //     })
  //   }
  // }


  

  const getStatAnketCountFunc = () => {
    if(token) {
      getStatAnketCount({token}).then((res:any) => {
        if(res?.data) {
          setData(s => ({
            ...s,
            totalAncet: res?.data?.result[0]?.count_ancet
          }))
        }
      })
    }
  }

  const getStatAnketCountWorkFunc = () => {
    if(token) {
      getStatAnketWorkCount({token}).then((res:any) => {
        if(res?.data) {
          setData(s => ({
            ...s,
            ancetInWork: res?.data?.result[0]?.count_ancet
          }))
        }
      })
    }
  }

  const getStatAnketMessagesCountFunc = () => {
    if(token) {
      getStatAnketMessagesCount({token}).then((res:any) => {
        if(res?.data) {
          console.log(res?.data)
          setData(s => ({
            ...s,
            totalSendMessages: res?.data?.result[0]?.count_message
          }))
        }
      })
    }
  }

  useEffect(() => {
    // getStatChatAvgTimeFunc()
    // getStatChatAvgTimeListFunc()
    // getStatMessageCountFunc()
    // getStatMessageCountOperatorAnketFunc()
    getStatChatAvgTimeFunc()
    getStatAnketMessagesCountFunc()
    getStatAnketCountWorkFunc()
    getStatAnketCountFunc()
    
    if(wrapperRef?.current) wrapperRef.current.scrollTo(0,0)
  }, [token, page, wrapperRef])

  

  
  return (
    <div ref={wrapperRef} className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      <Row gutter={[12,12]}>
        <Col span={24}>
          <div className={styles.cards}>
            <Row gutter={[12,12]}>
              <Col span={6}>
                <CardAnkets
                  totalAncet={data?.totalAncet}
                  ancetInWork={data?.ancetInWork}
                  />
              </Col>
              <Col span={6}>
                <CardReps
                  totalSendLetters={data?.totalSendLetters}
                  totalSendMessages={data?.totalSendMessages}
                  />
              </Col>
              <Col span={6}>
                <CardBalance
                  
                  />
              </Col>
              <Col span={6}>
                <CardAvg
                  avgAnswerTime={data?.avgAnswerTime}
                  avgIdleTime={data?.avgIdleTime}
                  />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <RangePicker
            value={[date.from, date.to]}
            onChange={(e) => {
              if(e?.length === 2) {
                
                setDate({from: e[0], to: e[1]})
              }
            }}
            />
        </Col>
        <Col span={24}>
          <div className={styles.body}>
            {loading && <div className={styles.loader}><Loader/></div>}
            <table className={getClassNames(['table'])}>
              <tr className={getClassNames(['table-row', 'table-headow'])}>
                {
                  tableHead?.map((i,index) => (
                    <th className={getClassNames(['table-item', 'table-head'])}>
                      {i?.value}
                    </th>
                  ))
                }
              </tr>
              {
                list?.map((i, index) => (
                  <tr className='table-row'>
                    <td className='table-item'></td>
                    {/* id */}
                    <td className='table-item'>
                      {i?.id}
                    </td>
                    {/*  */}
                    <td className='table-item'></td>
                    {/* Имя */}
                    <td className='table-item'>
                      {i?.name}
                    </td>
                    {/* Профили */}
                    <td className='table-item'>
                      {i?.count_ancet}
                    </td>
                    {/* Скорость ответов */}
                    <td className='table-item'>
                      {i?.avg_time}
                    </td>
                    {/* Рабочих смен */}
                    <td className='table-item'>
                      {i?.day_work}
                    </td>
                    {/* Средняя смена */}
                    <td className='table-item'>
                      {i?.time_work}
                    </td>
                    {/* Дата найма */}
                    <td className='table-item' style={{whiteSpace: 'nowrap'}}>
                      {
                        i?.created_at && (
                          moment(i?.created_at).format('YYYY-MM-DD HH:mm')
                        )
                      }
                    </td>
                    {/* Сообщения (сегодня) */}
                    <td className='table-item'>
                      {i?.count_message}
                    </td>
                    {/* Сообщения без ответов */}
                    <td className='table-item'>
                      {i?.ancet_with_message}
                    </td>
                    {/* Просроченных таймеров */}
                    <td className='table-item'>
                      {i?.count_inactive}
                    </td>
                    {/* Мужчин с лимитами */}
                    <td className='table-item'>
                      {i?.man_whith_limit}
                    </td>
                  </tr>
                ))
              }
            </table>
          </div>
        </Col>
        {/* <Col span={24}>
          <div className={styles.pag}>
            <Pagination
              current={page}
              onChange={setPage}
              pageSize={1}
              total={total}
              />
          </div>
        </Col> */}
      </Row>
      <div className={styles.top}>
        
      </div>
      
    </div>
  )
}

export default StatTable;