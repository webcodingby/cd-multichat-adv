import styles from './Letter.module.scss';
import Avatar from '@components/Avatar/Avatar';
import { FC } from 'react'
import moment from 'moment';
import UserTitle from '@components/UserTitle/UserTitle';
import { MS_LETTER_TYPES, letterType } from '@data/messageTypes';
import I from './types';

const Letter:FC<I> = ({
  id,
  type,
  name,
  age,
  body
}) => {

  const letterDepType = (type: letterType) => {
    switch(type) {
      case MS_LETTER_TYPES.letterText:
        return (
          <div className={styles.text}>{body?.text}</div>
        )
      case MS_LETTER_TYPES.letterImage:
        return (
          <>
            {body?.text && <div className={styles.text}>{body?.text}</div>}
            <div className={styles.images}>
              <div className={styles.image}>
                <img src="" alt="" />
              </div>
            </div>
          </>
        )
      default:
        return null;
    }
  }


  const onPay = () => {}


  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Avatar
          isRound
          />
      </div>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.user}>
            <UserTitle
              name={name}
              age={age}
              />
          </div>
          <div className={styles.time}>{moment(Date.now()).format('DD-MM-YYYY hh:mm')}</div>
        </div>
        <div className={styles.main}>
          {letterDepType(type)}
        </div>
      </div>
    </div>
  )
}

export default Letter;