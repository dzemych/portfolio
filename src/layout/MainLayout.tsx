import {FC, ReactNode, useContext, useEffect, useState} from 'react'
import classes from './MainLayout.module.sass'
import Header from "../components/Navigation/Header/Header"
import Footer from "../components/Navigation/Footer/Footer"
import PagePreLoader from "../components/Navigation/PagePreLoader/PagePreLoader"
import Curtain from "../components/Navigation/Curtain/Curtain"
import MediaContext from "../context/media.context"
import PageContext from "../context/page.context"
import ContactBtn from "../components/Navigation/ContactBtn/ContactBtn"
import ScrollBtn from "../components/Navigation/ScrollBtn/ScrollBtn"


interface IProps {
   children: ReactNode
}

const MainLayout:FC<IProps> = ({ children }) => {

   const { vw, medium } = useContext(MediaContext)
   const { setGlobalLoaderAnimation } = useContext(PageContext)

   const [showHeaderBack, setShowHeaderBack] = useState(false)

   const scrollHandler = () => {
      const offset = Math.ceil(window.scrollY)
      const vh = window.innerHeight

      if (offset / vh > .4)
         setShowHeaderBack(true)

      if (offset / vh < .4)
         setShowHeaderBack(false)
   }

   const headerCls = [classes.header_back_drop]
   if (vw > 770 && showHeaderBack)
      headerCls.push(classes.header_open)

   useEffect(() => {
      const el = document.getElementById('global-page-loader')

      if (el)
         setTimeout(() => {
            el.classList.add('hide_global_page_loader')
            setTimeout(() => {
               setGlobalLoaderAnimation(false)
            }, 500)
         }, 900)
   }, [])

   useEffect(() => {
      document.addEventListener('scroll', scrollHandler)

      return () => window.removeEventListener('scroll', scrollHandler)
   }, [])

   return(
      <div className={classes.container}>
         <PagePreLoader/>

         <Curtain/>

         <ContactBtn/>

         { medium &&
            <ScrollBtn/>
         }

         <div className={headerCls.join(' ')}/>

         <Header/>

         <main className={classes.wrapper}>
            { children }
         </main>

         <Footer/>
      </div>
   )
}


export default MainLayout