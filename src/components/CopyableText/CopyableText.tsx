import { FC, PropsWithChildren } from 'react';
import styles from './CopyableText.module.scss';
import notify from '@utils/notify';
import getClassNames from '@utils/getClassNames';
import copyText from './copyText';

const CopyableText: FC<PropsWithChildren> = ({children}) => {
  
  const onClick = () => {
    if(children && typeof children === 'string') {
      copyText(children)
    }
  }

  return (
    <span onClick={onClick} className={getClassNames([styles.wrapper, 'copy-text'])}>{children}</span>
  )
}

export default CopyableText;