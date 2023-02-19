import {FC, ReactNode, useContext} from 'react'
import PageContext from "../../context/page.context"


interface IProps {
   children: ReactNode
   to: string
   newWin?: boolean
}

const CustomLink:FC<IProps> = ({ children, to, newWin= false }) => {

   const { changePage, toggleCurtain } = useContext(PageContext)

   const onClick = async () => {
      if (newWin) {
         window.open(to)
         toggleCurtain()
      } else {
         await changePage(to)
      }
   }

   return(
      <a onClick={onClick}>
         {children}
      </a>
   )
}


export default CustomLink