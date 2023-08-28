import styles from './StatPage.module.scss';
import { FC, useEffect, useState } from 'react'
import StatTable from './components/StateTable/StatTable';
import { useAppSelector } from '@hooks/useReduxTypedHook';

const StatPage:FC<any> = () => {
  const {adminData} = useAppSelector(s => s.mainSlice)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOperator, setIsOperator] = useState(true)

  useEffect(() => {
    if(adminData) {
      const data = JSON.parse(adminData)
      setIsAdmin(data?.role === 'admin')
    }
  }, [adminData])

  return (
    <>
      {isAdmin && <StatTable/>}
      {/* {isOperator && <StatTable/>} */}
      {isOperator && (
        <div><h1>Вы авторизованы как оператор</h1><h4 style={{color: 'var(--green_1)'}}>(попробуйте авторизоваться заново)</h4></div>
      )}
    </>
  )
}

export default StatPage;