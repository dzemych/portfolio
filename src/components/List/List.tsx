import { FC } from 'react'
import classes from './List.module.sass'
import ListItem from "./ListItem/ListItem"
import im from '../../assets/imgs/1.jpg'


const List:FC = () => {
   return(
      <div className={classes.container}>
         <h1 className={classes.title}>
            Projects
         </h1>

         <div className={classes.list}>
            <ListItem title={'some crazy super puuper title'} photoSrc={im}/>
         </div>
      </div>
   )
}


export default List