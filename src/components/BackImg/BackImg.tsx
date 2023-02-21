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
      init: { opacity: 0 },
      active: { opacity: 1, transition: { duration: .4 } }
   }

   const ref = useRef(null)
   const { allowAnim, played } = useAnimationStatus(ref, 400)

   const [status, setStatus] = useState(FetchStatus.INIT)

   useEffect(() => {
      const newImg = new Image()

      newImg.onload = () => { setStatus(FetchStatus.LOADED) }

      newImg.src = photoSrc
   }, [photoSrc])

   return(
      <div className={classes.back}>
         <motion.img
            ref={ref}
            src={photoSrc}
            alt=""
            variants={imgVar}
            initial='init'
            whileInView={ ((status === FetchStatus.LOADED && allowAnim) || played) ? 'active' : '' }
            viewport={{ once: true }}
         />
      </div>
   )
}


export default BackImg