import styles from './styles.module.scss';
import getClassNames from '@utils/getClassNames';
import { useSwiper } from 'swiper/react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

export const NavPrev = () => {
  const swiper = useSwiper()

  return (
    <button 
      onClick={() => swiper.slidePrev()}
      className={getClassNames([styles.wrapper, styles.prev])}>
      <FiChevronLeft/>
    </button>
  )
}

export const NavNext = () => {
  const swiper = useSwiper()

  return (
    <button
      onClick={() => swiper.slideNext()}
      className={getClassNames([styles.wrapper, styles.next])}
      >
      <FiChevronRight/>
    </button>
  )
}
