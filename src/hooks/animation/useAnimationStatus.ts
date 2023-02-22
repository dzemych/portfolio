import {RefObject, useContext, useEffect, useRef, useState} from "react"
import {useInView} from "framer-motion"
import PageContext from "../../context/page.context"


type IHook = (ref: RefObject<HTMLElement>, duration: number) => {
   played: boolean,
   allowAnim: boolean
}

const useAnimationStatus: IHook = (ref, duration) => {

   const { isCurtainAnimation, pageLoaderAnimation, pagePreLoader, globalLoaderAnimation } = useContext(PageContext)
   const isCurtain = isCurtainAnimation || pageLoaderAnimation || pagePreLoader || globalLoaderAnimation

   const [allowAnim, setAllowAnim] = useState(false)
   const [played, setPlayed] = useState(false)

   const isInView = useInView(ref)

   useEffect(() => {
      if (!isCurtain)
         setTimeout(() => {
            setAllowAnim(true)
         }, 100)
      else
         setTimeout(() => {
            setAllowAnim(false)
         }, 500)

   }, [isCurtain])

   useEffect(() => {
      if (allowAnim && isInView)
         setTimeout(() => {
            setPlayed(true)
         }, duration)
   }, [allowAnim, isInView])

   return { allowAnim, played }
}

export default useAnimationStatus