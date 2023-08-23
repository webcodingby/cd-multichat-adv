import styles from './Input.module.scss';
import { ChangeEvent, FC } from 'react'
import getClassNames from '../../utils/getClassNames';
import I from './types';



const Input:FC<I> = ({
  inputProps,
  wrapperProps
}) => {
  const {isError, errorMessage} = wrapperProps || {}

  return (
    <div
      {...wrapperProps}
      className={getClassNames([styles.wrapper, isError && styles.error, wrapperProps?.className])}
      >
      <input 
        {...inputProps}
        className={getClassNames([styles.input, inputProps?.className])}
        />
    </div>
  )
}

export default Input;