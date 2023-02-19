import {FC, useContext, useEffect, useState} from 'react'
import classes from './PageLoader.module.sass'
import {FetchStatus} from "../../types/api.types"
import PageContext from "../../context/page.context"
import ReactDOM from 'react-dom'
import {motion} from 'framer-motion'


interface IProps {
   status: FetchStatus
}

const PageLoader:FC<IProps> = ({ status }) => {

   const h1Var = {
      init: { opacity: 0, y: 20 },
      active: {
         opacity: 1,
         y: 0,
         transition: { duration: .3, delay: .28 }
      },
      hidden: { opacity: 0, transition: { duration: .1 } }
   }

   const { setPageLoader, setPageLoaderAnimation } = useContext(PageContext)
   const [allowClose, setAllowClose] = useState(false)
   const [open, setOpen] = useState(true)

   const cls = [classes.container]

   if (!open)
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

   const header = document.querySelector('header')

   if (!header)
      return null

   return(
      ReactDOM.createPortal(
         <div className={cls.join(' ')}>

            <motion.h1
               className={classes.title}
               variants={h1Var}
               initial='init'
               animate={ (!open) ? 'hidden' : 'active' }
            >
               Wait a bit
            </motion.h1>
         </div>,
         header
      )
   )
}


export default PageLoader