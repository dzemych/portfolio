import {FC, useContext, useState} from 'react'
import classes from './ContactBtn.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import PageContext from "../../../context/page.context"
import MediaContext from "../../../context/media.context"


const ContactBtn:FC = () => {

   const { medium } = useContext(MediaContext)
   const { changePage } = useContext(PageContext)
   const [showText, setShowText] = useState(false)

   const vars = {
      init: { background: 'rgba(55, 54, 54, 0.3)', width: 45 },
      active: { background: 'rgba(55, 54, 54, 1)', width: 130 }
   }

   const txtVars = {
      init: { opacity: 0, color: 'white' },
      active: { opacity: 1, transition: { delay: .1 } },
      hidden: { opacity: 0, transition: { duration: .1 } }
   }

   return(
      <div className={classes.container}>
          <motion.div
             onClick={() => changePage('/contacts')}
             className={classes.back}
             variants={vars}
             initial={'init'}
             whileHover={medium ? 'active' : ''}
             onHoverStart={() => { setShowText(true) }}
             onHoverEnd={() => { setShowText(false) }}
          >
             <FontAwesomeIcon icon={faEnvelope}/>
          </motion.div>

         <motion.div
            className={classes.text}
            variants={txtVars}
            initial={'init'}
            animate={ medium && (showText ? 'active' : 'hidden') }
         >
            Contact me
         </motion.div>
      </div>
   )
}


export default ContactBtn