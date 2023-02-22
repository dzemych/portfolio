import {FC, useRef} from "react"
import {motion} from 'framer-motion'
import { IAnimatedElProps } from '../../types/IAnimatedElProps'
import useAnimationStatus from "../../hooks/animation/useAnimationStatus"


const OpacityDiv: FC<IAnimatedElProps> =
   ({
       children,
       className,
       whileInViewport= true,
       onClick,
       delay = 0,
       exit = false,
       id,
       duration = .45
   }) => {
   const ref = useRef(null)
   const { allowAnim, played } = useAnimationStatus(ref, 1200)

   const variants = {
      initial: {
         opacity: 0
      },
      active: {
         opacity: 1,
         transition: {
            duration,
            delay: delay
         }
      },
      exit: {
         opacity: 0,
         transition: { duration }
      }
   }

   return (
      <motion.div
         className={className}
         onClick={onClick}
         variants={variants}
         initial='initial'
         animate={!whileInViewport ? 'active' : ''}
         exit={exit ? 'exit' : ''}
         whileInView={((whileInViewport && allowAnim) || played) ? 'active' : ''}
         viewport={{ once: true }}
         id={id}
      >
         {children}
      </motion.div>
   )
}

export default OpacityDiv