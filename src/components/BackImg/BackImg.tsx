import {FC, useEffect, useRef, useState} from 'react'
import classes from './BackImg.module.sass'
import {FetchStatus} from "../../types/api.types"
import {motion} from 'framer-motion'
import useAnimationStatus from "../../hooks/animation/useAnimationStatus"


interface IProps {
   photoSrc: string
}

const BackImg:FC<IProps> = ({ photoSrc }) => {
   const imgVar = {
      init: { opacity: 0, transition: { duration: 0 } },
      active: { opacity: 1, transition: { duration: .4 } }
   }

   const ref = useRef(null)
   const { allowAnim, played } = useAnimationStatus(ref, 1000)

   const [status, setStatus] = useState(FetchStatus.INIT)

   useEffect(() => {
      const newImg = new Image()

      newImg.onload = () => { setStatus(FetchStatus.LOADED) }

      newImg.src = photoSrc
   }, [photoSrc])

   return(
      <motion.div
         className={classes.back}
         ref={ref}
         variants={imgVar}
         initial='init'
         whileInView={(status === FetchStatus.LOADED && (allowAnim || played)) ? 'active' : 'init' }
         viewport={{ once: true }}
      >
         <img
            src={photoSrc}
            alt=""
         />
      </motion.div>
   )
}


export default BackImg