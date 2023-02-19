import {FC, useContext, useEffect, useState} from 'react'
import classes from './Curtain.module.sass'
import PageContext from "../../../context/page.context"
import {FetchStatus} from "../../../types/api.types"
import CurtainLinks from "./CurtainLinks"


const Curtain:FC = () => {

   const { isCurtain, pageLoader, isCurtainAnimation } = useContext(PageContext)
   const [status, setStatus] = useState(FetchStatus.INIT)

   const cls = [classes.container]

   if (status !== FetchStatus.INIT)
      if (isCurtain)
         cls.push(classes.open)
      else if (pageLoader)
         cls.push(classes.close_opacity)
      else if (isCurtainAnimation)
         cls.push(classes.close)
      else
         cls.push(classes.hidden_curtain)

   useEffect(() => {
      if (isCurtain)
         setStatus(FetchStatus.LOADED)
   }, [isCurtain])

   return (
      <div className={cls.join(' ')}>
         <div className={classes.wrapper}>
            <CurtainLinks/>

            <div className={classes.author_container}>
               © {new Date().getFullYear()} Dzemych Ivan
            </div>
         </div>
      </div>
   )
}


export default Curtain