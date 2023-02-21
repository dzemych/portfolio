import {FC, useContext} from 'react'
import classes from './NeedDev.module.sass'
import OpacityYDiv from "../Animations/OpacityYDiv"
import { motion } from 'framer-motion'
import PageContext from "../../context/page.context"


interface IProps {
   style?: React.CSSProperties
}

const NeedDev:FC<IProps> = ({ style }) => {
   const { changePage } = useContext(PageContext)

   const arrowVar = {
      init: {
        y: '-8%'
      },
      active: {
         x: 10,
         transition: {
            duration: .4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeIn'
         }
      }
   }

   return(
      <OpacityYDiv className={classes.container} style={style}>
         <h4 className={classes.subtitle}>
            Need a developer ?
         </h4>

         <h1 className={classes.title} onClick={() => {changePage('/contacts')}}>
            Let's work together&nbsp;
            <motion.div
               className={classes.arrow}
               // @ts-ignore
               variants={arrowVar}
               initial={'init'}
               animate={'active'}
            >➜</motion.div>
         </h1>
      </OpacityYDiv>
   )
}


export default NeedDev