import { FC } from 'react'
import getClassNames from '../../../../utils/getClassNames';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ChatsPart from '../parts/ChatsPart/ChatsPart';


interface I {
  messageChatsList: any[],
  letterChatsList:any[],
  messageChatListLoadMore: (...args:any[]) => any,
  letterChatsListLoadMore: (...args:any[]) => any
}

const RightSide:FC<I> = ({
  messageChatsList, 
  letterChatsList,
  messageChatListLoadMore,
  letterChatsListLoadMore
}) => {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  return (
    <div className={getClassNames(['panel', 'panel-with-padding'])}>
      <Row gutter={[10,10]}>
        <Col span={24}>
          <Row gutter={[10,10]}>
            <Col span={12}>
              <Button 
                onClick={() => navigate('/chat?chatType=CHAT')}
                variant={params?.get('chatType') === 'CHAT' ? 'default' : 'dark'}
                isFill>Чат</Button>
            </Col>
            <Col span={12}>
              <Button 
                onClick={() => navigate('/chat?chatType=MAIL')}
                variant={params?.get('chatType') === 'MAIL' ? 'default' : 'dark'}
                isFill>Письма</Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {
            params?.get('chatType') === 'MAIL' && (
              <ChatsPart
                loadMore={letterChatsListLoadMore} list={letterChatsList}/>
            )
          }
          {
            params?.get('chatType') === 'CHAT' && (
              <ChatsPart
                loadMore={messageChatListLoadMore} list={messageChatsList}/>
            )
          }
          
        </Col>
      </Row>
    </div>
  )
}

export default RightSide;