import {PiChatCircleDotsBold} from 'react-icons/pi';
import {FiMail} from 'react-icons/fi';
import { CSSProperties } from 'react';

const setChatIcon = (chatType: 'CHAT' | 'MAIL', style?: CSSProperties) => {
  switch(chatType) {
    case 'CHAT':
      return <PiChatCircleDotsBold style={style}/>
    case 'MAIL':
      return <FiMail style={style}/>
  }
}

export default setChatIcon;