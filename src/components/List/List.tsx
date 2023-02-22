import {FC} from 'react'
import classes from './List.module.sass'
import ListItem from "./ListItem/ListItem"
import im from '../../assets/imgs/1.jpg'
import OpacityYDiv from "../UI/OpacityYDiv"


interface IProps {
   id: string
   title: string
}

const List:FC<IProps> = ({ id, title }) => {
   return(
      <div className={classes.container} id={id}>
         <OpacityYDiv>
            <h1 className={classes.title}>
               {title}
            </h1>
         </OpacityYDiv>

         <div className={classes.list}>
            <ListItem
               title={'SOME crazy super puuper title'}
               photoSrc={im}
               beforeTitle={'05/2018 - 11/2020'}
               slug={'clothes'}
            />
            <ListItem
               title={'SOME crazy super puuper title'}
               photoSrc={im}
               beforeTitle={'05/2018 - 11/2020'}
               slug={'judo'}
            />
         </div>
      </div>
   )
}


export default List