import styles from './StatPage.module.scss';
import { FC, useEffect, useState } from 'react'
import StatTable from './components/StateTable/StatTable';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import StatChart from './components/StatChart/StatChart';

const StatPage:FC<any> = () => {
  const {adminData} = useAppSelector(s => s.mainSlice)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOperator, setIsOperator] = useState(false)

  useEffect(() => {
    if(adminData) {
      setIsAdmin(adminData?.role === 'admin')
      setIsOperator(adminData?.role === 'operator')
    }
  }, [adminData])

  return (
    <>
      {isAdmin && <StatTable/>}
      {isOperator && <StatChart/>}
    </>
  )
}

export default StatPage;