import styles from './InboxPart.module.scss';
import { FC, useEffect, useState } from 'react'
import getClassNames from '@utils/getClassNames';
import InboxItem from './components/InboxItem/InboxItem';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import { useInView } from 'react-intersection-observer';
import { main_incInboxPage } from '@store/slices/mainSlice/mainSlice';
import {Row, Col} from 'antd'

interface I {
  isActive?: boolean,
}

const InboxPart:FC<I> = ({
  isActive,
}) => {
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {inbox, isEndInbox} = chatData || {}
  const [loadMore, setLoadMore] = useState(false)
  const {ref, inView} = useInView()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(inView && loadMore && !isEndInbox) {
      dispatch(main_incInboxPage())
    }
  }, [loadMore, inView, isEndInbox])

  useEffect(() => {
    setLoadMore(true)
  }, [inbox])
  
  
  return (
    <div 
      className={getClassNames([styles.wrapper, 'custom-scroll', isActive && styles.active])}>
      <Row gutter={[15,15]}>
        {/* <Col span={24}>
          <div className={styles.action}>
            <Input
              inputProps={{
                placeholder: 'Поиск...',
                style: {backgroundColor: 'var(--blue_6)'}
              }}
              />
          </div>
        </Col> */}
        <Col span={24}>
          {
            inbox.map((i, index) => (
              <InboxItem
                {...i}
                key={index}
                />
            ))
          }
          {
            loadMore && <div className={styles.loader} ref={ref}></div>
          }
        </Col>
      </Row>
      
    </div>
  )
}

export default InboxPart;