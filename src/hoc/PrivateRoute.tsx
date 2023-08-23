import { useAppSelector } from '@hooks/useReduxTypedHook';
import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute:FC<{children?:ReactNode}> = ({children}) => {
  const {token} = useAppSelector(s => s.mainSlice)
  if(!token) {
    return <Navigate to={'/auth'}/>
  }
  return <>{children}</>
}

export default PrivateRoute;