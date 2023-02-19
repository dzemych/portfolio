import { FC } from 'react'
import classes from './Footer.module.sass'


const Footer:FC = () => {
   return(
      <footer className={classes.container}>
         <div className={classes.wrapper}>
            <h1>Footer</h1>
         </div>
      </footer>
   )
}


export default Footer