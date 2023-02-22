import {FC, useRef} from "react"
import {motion} from 'framer-motion'
import {IAnimatedElProps} from "../../types/IAnimatedElProps"
import useAnimationStatus from "../../hooks/animation/useAnimationStatus"


const OpacityYDiv: FC<IAnimatedElProps> =
   ({
       children,
       className,
       whileInViewport= true,
       onClick,
       delay = 0,
       showAnimation = true,
       style,
       duration = .45
   }) => {

   const ref = useRef(null)
   const { allowAnim, played } = useAnimationStatus(ref, 1200)

   const variants = {
      initial: {
         y: 30,
         opacity: 0,
         transition: { duration: 0 }
      },
      active: {
         y: 0,
         opacity: 1,
         transition: {
            duration,
            delay
         }
      }
   }

   return (
      <motion.div
         className={className}
         style={style}
         onClick={onClick}
         ref={ref}
         variants={variants}
         initial='initial'
         animate={(!whileInViewport && showAnimation) ? 'active' : ''}
         whileInView={((whileInViewport && allowAnim) || played) ? 'active' : 'initial'}
         viewport={{ once: true }}
      >
         {children}
      </motion.div>
   )
}

export default OpacityYDiv