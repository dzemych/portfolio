import {FC, useContext, useEffect, useState} from 'react'
import classes from './PageLoader.module.sass'
import {FetchStatus} from "../../types/api.types"
import PageContext from "../../context/page.context"
import ReactDOM from 'react-dom'
import {motion} from 'framer-motion'
import Loading from "../Loading/Loading"


interface IProps {
   status: FetchStatus
   text?: string
}

const PageLoader:FC<IProps> = ({ status, text = 'Wait a little' }) => {
   const { isCurtainAnimation, globalLoaderAnimation } = useContext(PageContext)

   const h1Var = {
      init: { opacity: 0, y: 20 },
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
   const [showAnimation, setShowAnimation] = useState(true)

   const cls = [classes.container]

   if (globalLoaderAnimation || !showAnimation)
      cls.push(classes.closed)

   if (!open && showAnimation)
      cls.push(classes.close)

   useEffect(() => {
      setPageLoaderAnimation(true)

      setTimeout(() => {
         setAllowClose(true)
      }, 350)
   }, [])

   useEffect(() => {
      if (status !== FetchStatus.INIT && allowClose)
         setTimeout(() => {
            setOpen(false)
            // Simulating fetch loading
            setPageLoader(false)
         }, 800)
   }, [allowClose, status])

   useEffect(() => {
      if (!open)
         setTimeout(() => {
            setPageLoaderAnimation(false)
         }, 500)
   }, [open])

   useEffect(() => {
      if (globalLoaderAnimation) {
         setPageLoader(false)
         setPageLoaderAnimation(false)
         setShowAnimation(false)
      }
   }, [globalLoaderAnimation])

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