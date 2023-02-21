import {FC, useRef} from 'react'
import classes from './Title.module.sass'
import {IElProps} from "../../../types/IAnimatedElProps"
import useAnimationOYParams from "../../../hooks/animation/useAnimationOYParams"
import { motion } from "framer-motion"


interface IProps extends IElProps{
   type?: 'h1' | 'light'
}

const Title:FC<IProps> = (
   {
      style,
      className,
      onClick,
      children,
      type = 'h1'
   }) => {
   const ref = useRef(null)
   const animationParams = useAnimationOYParams(ref)

   const params = {
      ref, style, onClick,
      className: [classes[type], className].join(' '),
      ...animationParams
   }

   if (type === 'light')
      return (
         <motion.h5 {...params}>
            {children}
         </motion.h5>
      )

   return(
      <motion.h1 {...params} >
         {children}
      </motion.h1>
   )
}


export default Title