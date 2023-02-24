import {FC, useEffect, useState} from 'react'
import classes from './List.module.sass'
import ListItem from "./ListItem/ListItem"
import im from '../../assets/imgs/1.jpg'
import OpacityYDiv from "../UI/OpacityYDiv"
import {FetchStatus} from "../../types/api.types"


interface IProps {
   id: string
   title: string
   arr: any[]
}

const List:FC<IProps> = ({ id, title, arr= [] }) => {
   return(
      <div className={classes.container} id={id}>
         <OpacityYDiv>
            <h1 className={classes.title}>
               {title}
            </h1>
         </OpacityYDiv>

         <div className={classes.list}>
            { arr.map(el => (
               <ListItem
                  key={el.slug}
                  title={el.title}
                  dbPhotoSrc={el.mainPhoto}
                  beforeTitle={'05/2018 - 11/2020'}
                  slug={el.slug}
               />
            )) }
         </div>
      </div>
   )
}


export default List