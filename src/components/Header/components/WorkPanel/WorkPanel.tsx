import styles from './WorkPanel.module.scss';
import { FC, useEffect, useState } from 'react'
import Button from '../../../Button/Button';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import apiSlice, { useWorkPausedStartMutation, useWorkPausedStopMutation, useWorkStartMutation, useWorkStopMutation } from '@store/slices/apiSlice/apiSlice';
import moment from 'moment';
import { useTimer } from 'react-timer-hook';
import getClassNames from '@utils/getClassNames';

const WorkPanel:FC<any> = () => {
  const {token} = useAppSelector(s => s.mainSlice)
  

  const [getCurrentStatus, {isLoading}] = apiSlice.endpoints.getWorkCurrentStatus.useLazyQuery()
  const [getStatusList] = apiSlice.endpoints.getWorkStatusList.useLazyQuery()
  const [workStart, workStartRes] = useWorkStartMutation()
  const [workStop, workStopRes] = useWorkStopMutation()
  const [workPausedStart, workPausedStartRes] = useWorkPausedStartMutation()
  const [workPausedStop, workPausedStopRes] = useWorkPausedStopMutation()

  const [time, setTime] = useState<any>()
  const [date, setDate] = useState<any>()
  const [statuses, setStatuses] = useState<string[]>([])
  const [currentStatus, setCurrentStatus] = useState<string | null>(null)

  const [timerStatus, setTimerStatus] = useState<'stop' | 'run'>('stop')
  const [timerValue, setTimerValue] = useState<any>('')


  useEffect(() => {
    let start = time;
    let tm:any;
    if(time && (currentStatus === 'ACTIVE' || currentStatus === 'PAUSE_BACK')) {
      if(timerStatus === 'run') {
        tm = setInterval(() => {
          start = start + 1000
          setTimerValue(moment.utc(start).format('HH:mm:ss'))
        }, 1000)
      } else {
        clearInterval(tm)
      }
    }
    if(currentStatus === 'CLOSED') {
      setTimerValue('00:00:00')
    }
    if(currentStatus === 'PAUSE') {
      setTimerValue('На перерыве')
    }
    if(currentStatus === 'PAUSE_BACK') {
      setTimerValue(moment.utc(start).format('HH:mm:ss'))
    }

    return () => {
      clearInterval(tm)
    }
  }, [time, currentStatus, timerStatus])

  useEffect(() => {
    if(token) {
      getCurrentStatus(token).then(res => {
        if(res?.data?.data === null) {
          setTime('00:00:00')
          setTimerStatus('stop')
          setCurrentStatus('CLOSED')
        } else {
          const status = res?.data?.data?.status
          const dateFrom = res?.data?.data?.date_from
          const dateFromUTC = moment.utc(dateFrom);
          const currentDate = moment.utc()

          if(status === 'ACTIVE') {
            const diff = currentDate.diff(dateFromUTC)
            const TIMER_START = moment.utc(diff).valueOf()
            setTimerStatus('run')
            setTime(TIMER_START)
          }
          if(status === 'CLOSED') {
            const diff = currentDate.diff(dateFromUTC)
            const TIMER_START = moment.utc(diff).valueOf()
            setTime('00:00:00')
            setTimerStatus('stop')
          }
          if(status === 'PAUSE') {
            setTimerStatus('stop')
          }
          if(status === 'PAUSE_BACK') {
            const diff = currentDate.diff(dateFromUTC)
            const TIMER_START = moment.utc(diff).valueOf()
            setTimerStatus('stop')
            setTime(TIMER_START)
          }
          setCurrentStatus(status)
        }
      })
      getStatusList(token).then(res => {
        if(res?.data?.data?.length > 0) {
          setStatuses(res?.data?.data)
        }
      })
    }
  }, [token])

  const onStart = () => {
    if(token) {
      workStart(token)
    }
  }

  const onStop = () => {
    if(token) {
      workStop(token)
    }
  }

  const onDiner = () => {
    if(token) {
      workPausedStart(token)
    }
  }

  const onContinue = () => {
    if(token) {
      workPausedStop(token)
    }
  }

  useEffect(() => {
    const {isLoading, data, isSuccess} = workPausedStartRes
    if(data && !isLoading && isSuccess) {
      const status = data?.data?.status
      const dateFrom = data?.data?.date_from
      const dateFromUTC = moment.utc(dateFrom);
      const currentDate = moment.utc()
      const diff = currentDate.diff(dateFromUTC)
      const TIMER_START = moment.utc(diff).valueOf()
      setTime(TIMER_START)
      setTimerStatus('stop')
      setCurrentStatus(status)
    }
  }, [workPausedStartRes])

  useEffect(() => {
    const {isLoading, data, isSuccess} = workPausedStopRes
    if(data && !isLoading && isSuccess) {
      if(data?.data?.id) {
        const status = data?.data?.status
        const dateFrom = data?.data?.date_from
        const dateFromUTC = moment.utc(dateFrom);
        const currentDate = moment.utc()
        const diff = currentDate.diff(dateFromUTC)
        const TIMER_START = moment.utc(diff).valueOf()
        setTime(TIMER_START)
        setTimerStatus('run')
        setCurrentStatus(status)
      }
    }
  }, [workPausedStopRes])

  useEffect(() => {
    const {isLoading, isSuccess, data} = workStartRes
    if(isSuccess && !isLoading && data) {
      if(data?.data?.id) {
        const status = data?.data?.status
        const dateFrom = data?.data?.date_from
        const dateFromUTC = moment.utc(dateFrom);
        const currentDate = moment.utc()

        const diff = currentDate.diff(dateFromUTC)
        const TIMER_START = moment.utc(diff).valueOf()
        setTime(TIMER_START)
        setTimerStatus('run')
        setCurrentStatus(status)
      }
    }
  }, [workStartRes])

  useEffect(() => {
    const {data, isLoading, isSuccess} = workStopRes
    if(data && !isLoading && isSuccess) {
      if(data?.data?.id) {
        const status = data?.data?.status
        const dateFrom = data?.data?.date_from
        const dateFromUTC = moment.utc(dateFrom);
        const currentDate = moment.utc()

        const diff = currentDate.diff(dateFromUTC)
        const TIMER_START = moment.utc(diff).valueOf()
        setTime('00:00:00')
        setTimerStatus('stop')
        setCurrentStatus(status)
      }
    }
  }, [workStopRes])


  // useEffect(() => {
  //   const {data, isSuccess, isLoading} = currentWorkRes
  //   if(isSuccess && !isLoading) {
  //     if(data === null || Object.keys(data)?.length === 0) {
  //       setWorkTime('00:00')
  //       setDisableStart(false)
  //       setDisableStop(true)
  //       setCurrentStatus('start')
  //   } else {
  //       const dateFrom = moment(data?.date_from).valueOf()
  //       const t = Date.now() - dateFrom
  //       setWorkTime(moment(t).format('HH:MM'))
  //       setDisableStart(true)
  //       setDisableStop(false)
  //       setCurrentStatus('stop')
  //   }
  //   }
  // }, [currentWorkRes])


  useEffect(() => console.log(statuses), [statuses])


  return (
    <div className={getClassNames([styles.wrapper, isLoading && styles.loading])}>
      <div className={styles.main}>
        <div className={styles.item}>
          <span>В работе: </span>
          <span className={styles.time}>{timerValue}</span>
        </div>
      </div>
      <div className={styles.action}>
        <div className={styles.btn}>
          <Button
            variant={'green'}
            style={{fontWeight: 700}}
            onClick={onStart}
            disabled={currentStatus === 'ACTIVE' || currentStatus === 'PAUSE' || currentStatus === 'PAUSE_BACK'}
            isLoading={workStartRes?.isLoading}
            >
            СТАРТ</Button>
        </div>
        <div className={styles.btn}>
          <Button
            variant={'yellow'}
            style={{fontWeight: 700}}
            onClick={onDiner}
            disabled={currentStatus === 'PAUSE' || currentStatus === 'PAUSE_BACK' || currentStatus === 'CLOSED'}
            isLoading={workPausedStartRes?.isLoading}
            >
            НА ОБЕД</Button>
        </div>
        <div className={styles.btn}>
          <Button
            variant={'default'}
            style={{fontWeight: 700}}
            disabled={currentStatus === 'PAUSE' ? false : true}
            onClick={onContinue}
            isLoading={workPausedStopRes?.isLoading}
            >
            ПРОДОЛЖИТЬ
          </Button>
        </div>
        <div className={styles.btn}>
          <Button
            variant={'danger'}
            disabled={currentStatus === 'CLOSED' || currentStatus === 'PAUSE'}
            isLoading={workStopRes?.isLoading}
            style={{fontWeight: 700}}
            onClick={onStop}
            >СТОП</Button>
        </div>
      </div>
    </div>
  )
}

export default WorkPanel;