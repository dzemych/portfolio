import { FC } from 'react'
import classes from './Loading.module.sass'


const Loading:FC = () => {
   return(
      <div className={classes.loading}>
         <div className={classes.dot}/>
         <div className={classes.dot}/>
         <div className={classes.dot}/>
         <div className={classes.dot}/>
         <div className={classes.dot}/>
      </div>
   )
}


export default Loading