import {FC, useContext} from 'react'
import classes from './NavBar.module.sass'
import OpacityDiv from "../../UI/OpacityDiv"
import {useLocation} from "react-router-dom"
import PageContext from "../../../context/page.context"
import {ILink, links} from "../links"


const Navbar:FC = () => {
   const { changePage } = useContext(PageContext)

   const location = useLocation()

   const goTo = (to: string, newWin?: boolean) => () => {
      if (newWin) {
         window.open(to)
      } else {
         changePage(to)
      }
   }

   const renderLink = (el: ILink, idx: number) => {
      const cls = [classes.link_container]

      if (location.pathname === el.to)
         cls.push(classes.active_link)

      return (
         <div
            // whileInViewport
            // delay={.5}
            className={cls.join(' ')}
            key={el.to + idx}
            onClick={goTo(el.to, el.newWin)}
         >
            <a> {el.text} </a>

            <div className={classes.left_curtain}/>
            <div className={classes.right_curtain}/>
         </div>
      )
   }
   return (
      <div className={classes.container}>
         <nav className={classes.wrapper}>
            { links.map((el, i) => renderLink(el, i)) }
         </nav>
      </div>
   )
}


export default Navbar