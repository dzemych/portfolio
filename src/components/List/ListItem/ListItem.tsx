import {FC, useContext} from 'react'
import classes from './ListItem.module.sass'
import OpacityYDiv from "../../Animations/OpacityYDiv"
import PageContext from "../../../context/page.context"


interface IProps {
   photoSrc: string
   title: string
   slug: string
   beforeTitle?: string
}

const ListItem:FC<IProps> = ({ title, beforeTitle, photoSrc, slug }) => {
   const { changePage } = useContext(PageContext)

   const onClick = () => {
      changePage('/' + slug)
   }

   return(
      <OpacityYDiv
         className={classes.container}
         whileInViewport
         onClick={onClick}
      >
         <div className={classes.wrapper}>
            <div className={classes.img_container}>
               <div className={classes.back}/>

               <img src={photoSrc} alt=""/>
            </div>

            <div className={classes.content}>
               { beforeTitle &&
                  <div className={classes.before_title}>{ beforeTitle }</div>
               }

               <h1 className={classes.title}>{title}</h1>
            </div>
         </div>
      </OpacityYDiv>
   )
}


export default ListItem