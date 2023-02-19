import { FC } from 'react'
import classes from './ListItem.module.sass'
import AnimatedImg from "../../Animations/AnimatedImg"


interface IProps {
   photoSrc: string
   beforeTitle?: string
   title: string
}

const ListItem:FC<IProps> = ({ title, beforeTitle, photoSrc }) => {
   return(
      <div className={classes.container}>
         { beforeTitle &&
            <div className={classes.before_title}>{ beforeTitle }</div>
         }

         <h1 className={classes.title}>title</h1>

         <AnimatedImg photoSrc={photoSrc}/>
      </div>
   )
}


export default ListItem