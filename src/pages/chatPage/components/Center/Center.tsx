import { FC } from 'react'
import styles from './Center.module.scss';
import DialogPart from '../parts/DialogPart/DialogPart';
import getClassNames from '../../../../utils/getClassNames';

interface I {
  list?:any[],
  loadMore?: (...args:any[]) => any,
  updateMessages?: (...args:any[]) => any,
  updateChats?: (...args:any[]) => any 
}

const Center:FC<I> = ({
  list = [],
  loadMore,
  updateChats,
  updateMessages
}) => {
  return (
    <div className={getClassNames(['panel', 'panel-with-padding'])}>
      <DialogPart
        loadMore={loadMore}
        list={list}

        updateMessages={updateMessages}
        updateChats={updateChats}
        />
    </div>
  )
}

export default Center;