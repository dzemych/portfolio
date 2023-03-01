import {FC, useContext, useEffect, useState} from 'react'
import classes from './ListItem.module.sass'
import OpacityYDiv from "../../UI/OpacityYDiv"
import PageContext from "../../../context/page.context"
import {FetchStatus} from "../../../types/api.types"
import useStorage from "../../../hooks/useStorage"
import Loading from "../../Loading/Loading"
import {motion} from 'framer-motion'


interface IProps {
   dbPhotoSrc: string
   title: string
   slug: string
   beforeTitle?: string
}

const ListItem:FC<IProps> = ({ title, beforeTitle, dbPhotoSrc, slug }) => {
   const imgVars = {
      init: { opacity: 0, transition: { duration: .4 } },
      active: { opacity: 1, transition: { duration: .4 } }
   }

   const { changePage } = useContext(PageContext)
   const { getOneUrl } = useStorage()

   const [status, setImgStatus] = useState(FetchStatus.INIT)
   const [imgUrl, setImgUrl] = useState('')

   const onClick = () => {
      changePage('/' + slug)
   }

   useEffect(() => {
      getOneUrl(dbPhotoSrc).then(res => {
         setImgUrl(res)

         const newImg = new Image()

         newImg.onload = () => { setImgStatus(FetchStatus.LOADED) }

         newImg.src = res
      })
   }, [dbPhotoSrc])

   return(
      <OpacityYDiv
         className={classes.container}
         whileInViewport
         onClick={onClick}
      >
         <div className={classes.wrapper}>
            <div className={classes.img_container}>
               <motion.div
                  variants={imgVars}
                  className={classes.img_loader}
                  initial={'init'}
                  animate={status === FetchStatus.INIT ? 'active' : 'init'}
               >
                  <Loading/>
               </motion.div>

               <div className={classes.back}/>

               <img src={imgUrl} alt=""/>
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