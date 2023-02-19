import {FC, useContext} from 'react'
import PageContext from "../../context/page.context"
import classes from './PagePreLoader.module.sass'
import ReactDOM from "react-dom"


const PagePreLoader:FC = () => {
   const { pagePreLoader } = useContext(PageContext)

   const cls = [classes.container]

   if (pagePreLoader)
      cls.push(classes.open)

   const header = document.querySelector('header')

   if (!header)
      return null

   return(
      ReactDOM.createPortal(
         <div className={cls.join(' ')}/>,
         header
      )
   )
}


export default PagePreLoader