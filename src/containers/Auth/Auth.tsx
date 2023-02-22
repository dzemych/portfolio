import {FC, FormEvent, useContext, useState} from 'react'
import classes from './Auth.module.sass'
import AuthContext from "../../context/auth.context"


const Auth:FC = () => {
   const { login } = useContext(AuthContext)

   const [email, setEmail] = useState('')
   const [pwd, setPwd] = useState('')

   const onSubmit = (e: FormEvent) => {
      e.preventDefault()

      login(email, pwd)
   }

   return(
       <div className={classes.container}>
          <form action="" onSubmit={onSubmit}>

             <label htmlFor="email">Email</label>
             <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name='email'
             />

             <label htmlFor="text">Pwd</label>
             <input
                type="text"
                name='text'
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
             />

             <button onClick={onSubmit}>
                Login
             </button>
          </form>
       </div>
   )
}


export default Auth