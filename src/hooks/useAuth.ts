import { signInWithEmailAndPassword } from "firebase/auth"
import {useState} from "react"
import { auth } from '../firebase'


type HookUseAuth = () => {
   isAuth: boolean
   login: (email: string, pwd: string) => void
   logout: () => void
}

const useAuth: HookUseAuth = () => {
   const [isAuth, setIsAuth] = useState(false)

   const login = (email: string, pwd: string) => {
      console.log(email, pwd)
      signInWithEmailAndPassword(auth, email, pwd)
         .then(() => {
            setIsAuth(true)
         })
   }

   const logout = () => {

   }

   return { isAuth, login, logout }
}

export default useAuth