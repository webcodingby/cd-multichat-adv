import styles from './Letter.module.scss';
import Avatar from '@components/Avatar/Avatar';
import { FC } from 'react'
import moment from 'moment';
import UserTitle from '@components/UserTitle/UserTitle';
import { MS_LETTER_TYPES, letterType } from '@data/messageTypes';
import I from './types';
import img from '@assets/avatar-placeholder.png';
import FancyboxWrapper from "@components/FancyboxWrapper/FancyboxWrapper";

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
              name={name || 'Username'}
              age={age || 20}
              />
          </div>
          <div className={styles.ex}>
            <div className={styles.status}></div>
            <div className={styles.time}>{moment(Date.now()).format('DD-MM-YYYY hh:mm')}</div>
          </div>
        </div>
        <div className={styles.body}>
          {/*{letterDepType(type)}*/}
          <div className={styles.text}>
            <div className={styles.images}>
              <div className={styles.image}>
                <img src={img} alt="" />
              </div>
              <div className={styles.image}>
                <img src={img} alt="" />
              </div>
              <div className={styles.image}>
                <img src={img} alt="" />
              </div>
              <div className={styles.image}>
                <img src={img} alt="" />
              </div>
              <div className={styles.image}>
                <img src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Letter;