import { FC, PropsWithChildren } from 'react';
import styles from './CopyableText.module.scss';
import getClassNames from '@utils/getClassNames';
import copyText from './copyText';
import {Tooltip} from 'antd';

const CopyableText: FC<PropsWithChildren> = ({children}) => {
  
  const onClick = () => {
    const value = children ? children?.toString() : ''
    if(value) {
      copyText(value)
    }
  }

  return (
    <span onClick={onClick} className={getClassNames([styles.wrapper, 'copy-text'])}>
      <Tooltip placement={'bottom'} title={'Скопировать'} style={{fontSize: 10}}>{children}</Tooltip>
    </span>
  )
}

export default CopyableText;