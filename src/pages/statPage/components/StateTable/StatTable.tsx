import getClassNames from '@utils/getClassNames';
import styles from './StatTable.module.scss';
import { FC, useEffect, useState, useRef } from 'react'
import tableHead from './data/tableHead';
import {Row, Col} from 'antd';
import CardAnkets from '../cards/CardAnkets/CardAnkets';
import CardReps from '../cards/CardReps/CardReps';
import CardBalance from '../cards/CardBalance/CardBalance';
import CardAvg from '../cards/CardAvg/CardAvg';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import apiSlice from '@store/slices/apiSlice/apiSlice';
import {Pagination} from 'antd';
import Loader from '@components/Loader/Loader';
import moment from 'moment';



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

const StatTable:FC<any> = () => {
  const {token} = useAppSelector(s => s.mainSlice)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const [getStatChatAvgTime] = apiSlice.endpoints.getStatChatAvgTime.useLazyQuery()
  const [getStatChatAvgTimeList] = apiSlice.endpoints.getStatChatAvgTimeList.useLazyQuery()
  const [getStatMessageCount] = apiSlice.endpoints.getStatMessageCount.useLazyQuery()
  const [getStatMessageCountOperatorAnket] = apiSlice.endpoints.getStatMessageCountOperatorAnket.useLazyQuery()
  const [getStatAnketCount] = apiSlice.endpoints.getStatAnketCount.useLazyQuery()
  const [getList, getListRes] = apiSlice.endpoints.getAdminStat.useLazyQuery();

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<IStatItem[]>([])

  const getAnkets = () => {
    if(token) {
      getList({token})
    }
  }

  useEffect(() => {
    getAnkets()
  }, [token])

  useEffect(() => {
    const {isLoading, data, isSuccess} = getListRes
    setLoading(isLoading)
    if(data && isSuccess && !isLoading) {
      console.log(data?.result[0])
      setList(data?.result)
    }
  },[getListRes])

  const getStatChatAvgTimeFunc = () => {
    if(token) {
      getStatChatAvgTime({token}).then(res => {
        console.log(res)
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
      getStatAnketCount({token}).then(res => {
        console.log(res)
      })
    }
  }

  useEffect(() => {
    // getStatChatAvgTimeFunc()
    // getStatChatAvgTimeListFunc()
    // getStatMessageCountFunc()
    // getStatMessageCountOperatorAnketFunc()
    // getStatAnketCountFunc()
    if(wrapperRef?.current) wrapperRef.current.scrollTo(0,0)
  }, [token, page, wrapperRef])

  

  
  return (
    <div ref={wrapperRef} className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      <Row gutter={[12,12]}>
        <Col span={24}>
          <div className={styles.cards}>
            <Row gutter={[12,12]}>
              <Col span={6}>
                <CardAnkets/>
              </Col>
              <Col span={6}>
                <CardReps/>
              </Col>
              <Col span={6}>
                <CardBalance/>
              </Col>
              <Col span={6}>
                <CardAvg/>
              </Col>
            </Row>
          </div>
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