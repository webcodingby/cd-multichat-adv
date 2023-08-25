import styles from './InboxPart.module.scss';
import { FC } from 'react'
import getClassNames from '@utils/getClassNames';
import InboxItem from './components/InboxItem/InboxItem';

interface I {
  isActive?: boolean,
  list:any[]
}

const InboxPart:FC<I> = ({
  isActive,
  list = []
}) => {
  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll', isActive && styles.active])}>
      {
        list.map((i, index) => (
          <InboxItem
            {...i}
            key={index}
            />
        ))
      }
    </div>
  )
}

export default InboxPart;