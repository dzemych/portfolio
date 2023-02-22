import {FC, useContext} from 'react'
import classes from './Admin.module.sass'
import AuthContext from "../../context/auth.context"


const Admin:FC = () => {
   return(
       <div className={classes.container}>
          <h1>Admin</h1>
       </div>
   )
}


export default Admin