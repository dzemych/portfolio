import {FC, ReactNode, useEffect, useState} from 'react'
import classes from './BackImg.module.sass'
import {FetchStatus} from "../../types/api.types"
import { motion } from 'framer-motion'


interface IProps {
   photoSrc: string
}

const BackImg:FC<IProps> = ({ photoSrc }) => {
   const [status, setStatus] = useState(FetchStatus.INIT)

   const imgVar = {
      init: { opacity: 0 },
      active: { opacity: 1, transition: { duration: .35 } }
   }

   useEffect(() => {
      const newImg = new Image()

      newImg.onload = () => { setStatus(FetchStatus.LOADED) }

      newImg.src = photoSrc
   }, [photoSrc])

   return(
      <div className={classes.back}>
         <motion.img
            src={photoSrc}
            alt=""
            variants={imgVar}
            initial='init'
            animate={ status === FetchStatus.LOADED ? 'active' : '' }
         />
      </div>
   )
}


export default BackImg