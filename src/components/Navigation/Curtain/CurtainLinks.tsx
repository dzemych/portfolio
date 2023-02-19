import {FC, useContext, useEffect, useState} from 'react'
import classes from './Curtain.module.sass'
import {useLocation} from "react-router-dom"
import PageContext from "../../../context/page.context"
import {FetchStatus} from "../../../types/api.types"
import CustomLink from "../CustomLink"
import {ILink, links} from "../links"


const CurtainLinks:FC = () => {

   const location = useLocation()

   const {isCurtain, isCurtainAnimation, pageLoader} = useContext(PageContext)
   const [state, setState] = useState(FetchStatus.INIT)

   const linksCls = [classes.links_container]

   if (state !== FetchStatus.INIT)
      if (isCurtain)
         linksCls.push(classes.open_links)
      else
         if (pageLoader)
            linksCls.push(classes.close_links_opacity)
         else
            linksCls.push(classes.close_links)

   if (!isCurtain && !isCurtainAnimation)
      linksCls.push(classes.hide_links)

   const renderLink = (el: ILink, idx: number) => (
      <CustomLink to={el.to} newWin={el.newWin} key={el.to}>
         <li
            className={location.pathname === el.to ? classes.active : ''}
            style={{
               animationDelay: `${300 + idx * 50}ms`
            }}
         >
            {el.text}
         </li>
      </CustomLink>
   )

   useEffect(() => {
      if (isCurtain)
         setState(FetchStatus.LOADED)
   }, [isCurtain])

   return(
      <div className={linksCls.join(' ')}>
         <div className={classes.title}>
            menu
         </div>

         <ul className={classes.links_list}>
            { links.map((el, i) => renderLink(el, i)) }
         </ul>
      </div>
   )
}


export default CurtainLinks