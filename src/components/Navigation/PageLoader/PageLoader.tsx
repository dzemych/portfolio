import {FC, useContext, useEffect, useState} from 'react'
import classes from './PageLoader.module.sass'
import PageContext from "../../../context/page.context"
import ReactDOM from 'react-dom'
import {motion} from 'framer-motion'
import Loading from "../../Loading/Loading"


interface IProps {
   loading?: boolean
   text?: string
}

const PageLoader:FC<IProps> = ({ loading = true, text = 'Wait a little' }) => {
   const { isCurtainAnimation, globalLoaderAnimation } = useContext(PageContext)

   const h1Var = {
      init: { opacity: 0, y: 20, transition: { duration: 0 } },
      active: {
         opacity: 1,
         y: 0,
         transition: { duration: .3, delay: isCurtainAnimation ? .28 : 0 }
      },
      hidden: {
         opacity: 0,
         y: -20,
         transition: { duration: .1 }
      }
   }

   const { setPageLoader, setPageLoaderAnimation } = useContext(PageContext)
   const [allowClose, setAllowClose] = useState(false)
   const [open, setOpen] = useState(true)

   const cls = [classes.container]

   if (!open)
      cls.push(classes.close)

   useEffect(() => {
      setPageLoaderAnimation(true)

      if (!globalLoaderAnimation) {
         setTimeout(() => {
            setAllowClose(true)
         }, globalLoaderAnimation ? 1050 : 450)
      }
   }, [globalLoaderAnimation])

   useEffect(() => {
      if (!loading && allowClose) {
         setOpen(false)
         setPageLoader(false)
      }
   }, [allowClose, loading])

   useEffect(() => {
      if (!open)
         setTimeout(() => {
            setPageLoaderAnimation(false)
         }, 500)
   }, [open])

   const main = document.querySelector('main')

   if (!main)
      return null

   return (
      ReactDOM.createPortal(
         <div className={cls.join(' ')}>
            <div className={classes.loading}>
               <Loading/>
            </div>

            <motion.h1
               className={classes.title}
               variants={h1Var}
               initial='init'
               animate={ (!open) ? 'hidden' : 'active' }
            >
               { text }
            </motion.h1>
         </div>,
         main
      )
   )
}


export default PageLoader