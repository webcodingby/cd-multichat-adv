import { FC } from 'react'
import styles from './Center.module.scss';
import DialogPart from '../parts/DialogPart/DialogPart';
import getClassNames from '../../../../utils/getClassNames';

const Center:FC<any> = () => {
  return (
    <div className={getClassNames(['panel', 'panel-with-padding'])}>
      <DialogPart/>
    </div>
  )
}

export default Center;