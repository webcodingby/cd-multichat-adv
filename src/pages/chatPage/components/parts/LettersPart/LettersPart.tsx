import getClassNames from '../../../../../utils/getClassNames';
import styles from './LettersPart.module.scss';

import { FC } from 'react'

const LettersPart:FC<any> = () => {
  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      
    </div>
  )
}

export default LettersPart;