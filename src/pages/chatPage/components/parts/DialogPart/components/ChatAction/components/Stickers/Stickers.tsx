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
  onSend?: (...args:any[]) => any,
  isOpen?: boolean
}

const Stickers:FC<I> = ({
  onClose,
  onSend,
  isOpen
}) => {
  const {token} = useAppSelector(s => s.mainSlice)
  const [getStickers] = apiSlice.endpoints.getStickers.useLazyQuery()
  const [list, setList] = useState<any[]>([])
  const [load, setLoad] = useState(false)

  const onSelect = (id: number | string) => {
    onSend && onSend(id)
    onClose && onClose()
  }

  const getStickersFunc = () => {
    if(token && isOpen) {
      setLoad(true)
      getStickers({token}).then(res => {
        if(res?.data) setList(res?.data)
        console.log(res?.data[0])
      }).finally(() => setLoad(false))
    }
  }

  useEffect(() => {
    getStickersFunc()
  }, [token, isOpen])

  

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
                  <img src={i?.picture_url || placeholder} alt="" />
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