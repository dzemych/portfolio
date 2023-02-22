import {FC} from 'react'
import classes from './ScrollBtn.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"


const ScrollBtn:FC = () => {

   const onClick = () => {
      window.scrollTo(0, 0)
   }

   return(
       <div className={classes.container} onClick={onClick}>
          <FontAwesomeIcon icon={faArrowUp}/>
       </div>
   )
}


export default ScrollBtn