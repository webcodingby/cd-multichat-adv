


import { FC } from 'react'

const AppProvider:FC<{ children?: React.ReactNode }> = ({
    children
}) => {

  return (
    <>{ children }</>
  )
}

export default AppProvider;