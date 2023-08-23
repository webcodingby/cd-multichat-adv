import { FC, ReactNode } from 'react'
import styles from './ChatItem.module.scss';
import {Row, Col} from 'antd';
import getClassNames from '@utils/getClassNames';
import Avatar from '@components/Avatar/Avatar';
import UserTitle from '@components/UserTitle/UserTitle';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface I {
  children?: ReactNode,
  isActive?: boolean
  id?: any,
  selfUser?:any,
  otherUser?:any,
  limits?: {avialable_limit: any, max_limit:any} | null,
  created_at?:any,
  updated_at?:any,
}

const ChatItem:FC<I> = ({
  isActive,
  id,
  selfUser,
  otherUser,
  limits,
  created_at,
  updated_at
}) => {
  const nav = useNavigate()
  const [params, setParams] = useSearchParams()

  return (
    <div
      onClick={() => nav(`/chat?chatType=${params?.get('chatType')}&chatId=${id}`)} 
      className={getClassNames([styles.wrapper, isActive && styles.active])}>
      {/* {children} */}
      <Row gutter={[5,5]}>
        <Col span={12}>
          <div className={getClassNames([styles.part, styles.left])}>
            <div className={styles.avatar}>
              <Avatar
                image={selfUser?.user_thumbnail_url}
                size={60}
                />
            </div>
            <div className={styles.main}>
              <Row gutter={[5,5]}>
                <Col span={24}>
                  <UserTitle
                    name={selfUser?.name}
                    age={20}
                    />
                </Col>
                <Col span={24} style={{color: 'var(--gray_1)'}}>
                  id{selfUser?.id}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={getClassNames([styles.part, styles.right])}>
            <div className={styles.main}>
              <Row gutter={[5,5]}>
                {
                  limits && (
                    <Col span={24}>
                      <div className={styles.limits}>
                        {limits?.avialable_limit || 0}/{limits?.max_limit || 0}        
                      </div>
                    </Col>
                  )
                }
                <Col span={24}>
                  <UserTitle
                    // style={{mainStyle: {textAlign: 'right'}}}
                    style={{wrapperStyle: {textAlign: 'right'}}}
                    name={otherUser?.name}
                    age={20}
                    />
                </Col>
              </Row>
            </div>
            <div className={styles.avatar}>
              <Avatar
                image={otherUser?.user_thumbnail_url}
                size={60}
                />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ChatItem;