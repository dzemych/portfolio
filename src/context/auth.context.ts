import {createContext} from "react"


interface IAuthContext {
   isAuth: boolean
   login: (email: string, pwd: string) => void
   logout: () => void
}

const AuthContext = createContext<IAuthContext>({
   isAuth: false,
   login: (email: string, pwd: string) => undefined,
   logout: () => undefined
})

export default AuthContext