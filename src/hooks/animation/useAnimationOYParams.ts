import {HookUseAnimationParams} from "../../types/IAnimatedElProps"
import useAnimationStatus from "./useAnimationStatus"


const useAnimationOYParams: HookUseAnimationParams = (ref) => {
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
            duration: .45,
            delay: 0
         }
      }
   }

   const whileInView = (allowAnim || played) ? 'active' : 'initial'

   return {
      variants,
      initial: 'init',
      exit: 'exit',
      viewport: { once: true },
      whileInView
   }
}

export default useAnimationOYParams