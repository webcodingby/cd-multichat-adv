import styles from './Loader.module.scss';
import {FC} from 'react';
import {PulseLoader} from "react-spinners";
import I from './types';

const Loader:FC<I> = (props) => {

  return (
    <div className={styles.wrapper} {...props}>
      <PulseLoader color={'var(--violet_1)'}/>
    </div>
  )
}

export default Loader;