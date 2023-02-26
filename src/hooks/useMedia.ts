import {useEffect, useMemo, useState} from "react"
import {IMediaBreakPoints} from "../context/media.context"


const initialBreakPoints: IMediaBreakPoints = {
   extSmall: false,
   small: false,
   medium: false,
   large: false,
   extLarge: false,
   vw: 0,
   ios: false
}

const useMedia = (): IMediaBreakPoints => {
   const xs = 0
   const sm = 600
   const md = 900
   const lg = 1200
   const xl = 1536

   const [ios, setIos] = useState(false)

   const [vw, setVw] = useState(0)
   const handleResize = () => setVw(window.innerWidth)

   const [breakpoints, setBreakpoints] = useState<IMediaBreakPoints>(initialBreakPoints)

   const extSmall = useMemo(() => breakpoints.extSmall, [breakpoints.extSmall])
   const small = useMemo(() => breakpoints.small, [breakpoints.small])
   const medium = useMemo(() => breakpoints.medium, [breakpoints.medium])
   const large = useMemo(() => breakpoints.large, [breakpoints.large])
   const extLarge = useMemo(() => breakpoints.extLarge, [breakpoints.extLarge])

   // * Handle window resize
   useEffect(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   useEffect(() => {
      setBreakpoints(() => {
         const newBreakpoints = {...initialBreakPoints}

         if (vw >= xs)
            newBreakpoints.extSmall = true

         if (vw >= sm)
            newBreakpoints.small = true

         if (vw >= md)
            newBreakpoints.medium = true

         if (vw >= lg)
            newBreakpoints.large = true

         if (vw >= xl)
            newBreakpoints.extLarge = true

         return newBreakpoints
      })
   }, [vw])

   useEffect(() => {
      const isIos = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
         ].includes(navigator.platform)
         // iPad on iOS 13 detection
         || (navigator.userAgent.includes("Mac") && "ontouchend" in document)

      setIos(isIos)
   }, [navigator])

   return { extSmall, small, medium, large, extLarge, vw, ios }
}

export default useMedia