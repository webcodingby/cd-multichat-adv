import styles from './Gifts.module.scss';
import { FC, useEffect, useState } from 'react'
import {Row, Col} from 'antd';
import placeholder from '@assets/avatars/avatar-1.png';
import getClassNames from '@utils/getClassNames';
import apiSlice from '@store/slices/apiSlice/apiSlice';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import Empty from '@components/Empty/Empty';

interface I {
  onClose?: (...args:any[]) => any,
  // list: any[],
  // setList: (...args:any[]) => any,
  onSend?: (...args:any[]) => any
}

const Gifts:FC<I> = ({
  onSend,
  onClose
}) => {
  const {token} = useAppSelector(s => s.mainSlice)
  const [getGifts, giftsRes] = apiSlice.endpoints.getGifts.useLazyQuery()
  const [list, setList] = useState<any[]>([])
  const [load, setLoad] = useState(false)


  const onSelect = (id: string | number) => {
    onSend && onSend(id)
    onClose && onClose()
  }

  useEffect(() => {
    if(token) {
      getGifts({token})
    }
  }, [token])

  useEffect(() => {
    const {data, isLoading, isSuccess} = giftsRes
    setLoad(isLoading)
    if(data && !isLoading && isSuccess) {
      //
    }
  }, [giftsRes])

  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      <Row gutter={[10,10]}>
        {
          list?.map((i,index) => (
            <Col span={8} key={index}>
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

export default Gifts;