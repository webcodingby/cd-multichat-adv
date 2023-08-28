import styles from './WorkPanel.module.scss';
import { FC, useEffect, useState } from 'react'
import Button from '../../../Button/Button';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import apiSlice, { useWorkStartMutation, useWorkStopMutation } from '@store/slices/apiSlice/apiSlice';
import moment from 'moment';

const WorkPanel:FC<any> = () => {
  const {token} = useAppSelector(s => s.mainSlice)
  const [getWorkCurrent, currentWorkRes] = apiSlice.endpoints.getWorkCurrentStatus.useLazyQuery()
  const [workStart, workStartRes] = useWorkStartMutation()
  const [workStop, workStopRes] = useWorkStopMutation()
  const [workTime, setWorkTime] = useState<any>('')
  const [profit, setProfit] = useState<any>(0)
  const [disableStart, setDisableStart] = useState(false)
  const [disableStop, setDisableStop] = useState(false)

  const [currentStatus, setCurrentStatus] = useState<'start' | 'diner' | 'stop'>('stop')

  useEffect(() => {
    if(token) getWorkCurrent(token)
  }, [token])



  useEffect(() => {
    const {data, isSuccess, isLoading} = currentWorkRes
    if(isSuccess && !isLoading) {
      if(data === null || Object.keys(data)?.length === 0) {
        setWorkTime('00:00')
        setDisableStart(false)
        setDisableStop(true)
        setCurrentStatus('start')
    } else {
        const dateFrom = moment(data?.date_from).valueOf()
        const t = Date.now() - dateFrom
        setWorkTime(moment(t).format('HH:MM'))
        setDisableStart(true)
        setDisableStop(false)
        setCurrentStatus('stop')
    }
    }
  }, [currentWorkRes])


  const onStart = () => {
    if(token) {
      workStart(token)
    }
  }

  const onStop = () => {
    workStop(token)
  }

  useEffect(() => {
    const {data, isLoading, isSuccess} = workStopRes
    if(!isLoading && isSuccess) {
      if(token) getWorkCurrent(token)
    }

  }, [workStopRes])

  useEffect(() => {
    const {data, isLoading, isSuccess} = workStartRes
    if(!isLoading && isSuccess) {
      if(token) getWorkCurrent(token)
    }
  }, [workStartRes])


  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.item}><span>В работе: </span><span>05:35</span></div>
        <div className={styles.item}><span>Заработок: </span><span>$15</span></div>
      </div>
      <div className={styles.action}>
        <div className={styles.btn}>
          <Button
            variant={'danger'}
            style={{fontWeight: 700}}
            >СТОП</Button>
        </div>
        <div className={styles.btn}>
          <Button
            variant={'green'}
            style={{fontWeight: 700}}
            >
            СТАРТ</Button>
        </div>
      </div>
    </div>
  )
}

export default WorkPanel;