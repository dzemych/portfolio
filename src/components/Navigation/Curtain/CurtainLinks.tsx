import {FC, useContext, useEffect, useState} from 'react'
import classes from './Curtain.module.sass'
import {useLocation} from "react-router-dom"
import PageContext from "../../../context/page.context"
import {FetchStatus} from "../../../types/api.types"
import CustomLink from "../../CustomLink"


interface ILink {
   to: string, text: string, newWin?: boolean
}

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

   const links: ILink[] = [
      { text: 'Home', to: '/' },
      { text: 'Projects', to: '/projects' },
      { text: 'About me', to: '/about' },
      { text: 'Contacts', to: '/contacts' },
      { text: 'Linkedin', to: 'https://www.linkedin.com/in/dzemych/', newWin: true },
      { text: 'Github', to: 'https://github.com/dzemych', newWin: true },
   ]

   const renderLink = (el: ILink, idx: number) => (
      <CustomLink to={el.to} newWin={el.newWin} key={el.to}>
         <li
            style={{
               animationDelay: `${300 + idx * 50}ms`,
               color: location.pathname === el.to ? 'white' : ''
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