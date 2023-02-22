import {FC, ReactNode} from 'react'
import useAuth from "../hooks/useAuth"
import AuthContext from "../context/auth.context"


interface IProps {
   children: ReactNode
}

const WithAuth:FC<IProps> = ({ children }) => {
   const { isAuth, logout, login } = useAuth()

   return (
      <AuthContext.Provider value={{ isAuth, login, logout }}>
         {children}
      </AuthContext.Provider>
   )
}


export default WithAuth