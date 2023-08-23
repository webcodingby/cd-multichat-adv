import { FC } from 'react'
import styles from './LimitsPart.module.scss';
import LimitItem from './components/LimitItem/LimitItem';
import {Row, Col} from 'antd';
import getClassNames from '../../../../../utils/getClassNames';

const LimitsPart:FC<any> = () => {
  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      <LimitItem/>
      <LimitItem/>
      <LimitItem/>
      <LimitItem/>
      <LimitItem/>
      <LimitItem/>
      <LimitItem/>
      <LimitItem/>
      <LimitItem/>
      <LimitItem/>
    </div>
  )
}

export default LimitsPart;