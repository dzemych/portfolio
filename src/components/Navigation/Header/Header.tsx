import {FC, useContext, useEffect, useState} from "react"
import classes from './Header.module.sass'
import {ReactComponent as Logo} from '../../../assets/imgs/logo.svg'
import {ReactComponent as Title} from "../../../assets/imgs/title.svg"
import Burger from "../Burger/Burger"
import PageContext from "../../../context/page.context"
import {FetchStatus} from "../../../types/api.types"
import Navbar from "../Navbar/Navbar"
import MediaContext from "../../../context/media.context"


const Header: FC = () => {
   const { large } = useContext(MediaContext)

   const {
      isCurtain,
      toggleCurtain,
      pageLoader,
      pageLoaderAnimation,
      changePage,
      pagePreLoader
   } = useContext(PageContext)
   const [status, setStatus] = useState(FetchStatus.INIT)
   const [state, setState] = useState<'open' | 'close'>('close')

   const onClick = async () => {
      await changePage('/')
   }

   const cls = [classes.container]
   const menuCls = [classes.menu_wrapper]

   if (pageLoaderAnimation && status !== FetchStatus.INIT)
      menuCls.push(classes.close_menu_opacity)

   if (pagePreLoader && status !== FetchStatus.INIT)
      menuCls.push(classes.close_menu_opacity_delay)

   if (state === 'open')
      cls.push(classes.curtain)
   else
      cls.push(classes.no_curtain)

   useEffect(() => {
      if (isCurtain)
         setStatus(FetchStatus.LOADED)
   }, [isCurtain])

   useEffect(() => {
      if (status !== FetchStatus.INIT) {
         if (isCurtain || pageLoader || pagePreLoader)
            setTimeout(() => {
               setState('open')
            }, 350)
         else
            setTimeout(() => {
               setState('close')
            }, 300)
      }
   }, [isCurtain, status, pageLoader, pagePreLoader])

   return (
      <header className={cls.join(' ')}>
         <div className={classes.wrapper}>
            <div className={classes.logo_wrapper} onClick={onClick}>
               <div className={classes.logo_icon}>
                  <Logo/>
               </div>

               <div className={classes.logo_title}>
                  <Title/>
               </div>
            </div>

            { large
               ? <Navbar/>
               : <div className={menuCls.join(' ')} onClick={toggleCurtain}>
                  <div className={classes.menu_text}>{ state === 'open' ? 'close' : 'menu' }</div>

                  <Burger open={state === 'open'}/>
               </div>
            }
         </div>
      </header>
   )
}

export default Header