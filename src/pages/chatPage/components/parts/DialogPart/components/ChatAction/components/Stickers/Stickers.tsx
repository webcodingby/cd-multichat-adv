import styles from './Stickers.module.scss';
import { FC, useEffect, useState } from 'react'
import {Row, Col} from 'antd';
import placeholder from '@assets/avatars/avatar-1.png';
import getClassNames from '@utils/getClassNames';
import apiSlice from '@store/slices/apiSlice/apiSlice';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import Empty from '@components/Empty/Empty';

interface I {
  onClose?: (...args:any[]) => any,
  onSend?: (...args:any[]) => any
}

const Stickers:FC<I> = ({
  onClose,
  onSend
}) => {
  const {token} = useAppSelector(s => s.mainSlice)
  const [getStickers, stickersRes] = apiSlice.endpoints.getStickers.useLazyQuery()
  const [list, setList] = useState<any[]>([])
  const [load, setLoad] = useState(false)

  const onSelect = (id: number | string) => {
    onSend && onSend(id)
    onClose && onClose()
  }

  useEffect(() => {
    if(token) {
      getStickers({token})
    }
  }, [token])

  useEffect(() => {
    const {data, isLoading, isSuccess} = stickersRes
    setLoad(isLoading)
    if(data && !isLoading && isSuccess) {
      //
    }
  }, [stickersRes])

  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      <Row gutter={[10,10]}>
        {
          list?.map((i,index) => (
            <Col key={index} span={8}>
              <div 
                onClick={() => onSelect(i?.id)}
                className={styles.item}>
                <div className={styles.prev}>
                  <img src={placeholder} alt="" />
                </div>
              </div>
            </Col>
          ))
        }
        {
          !load && list?.length === 0 && (
            <Col span={24}>
              <Empty/>
            </Col>
          )
        }
      </Row>
    </div>
  )
}

export default Stickers;