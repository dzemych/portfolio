import {FC, ReactNode, useContext, useEffect, useRef, useState} from "react"
import PageContext from "../context/page.context"
import {useLocation, useNavigate} from "react-router-dom"
import MediaContext from "../context/media.context"


interface IProps {
   children: ReactNode
}

const WithPageLayout: FC<IProps> = ({ children }) => {
   const { ios } = useContext(MediaContext)

   const navigate = useNavigate()
   const location = useLocation()

   const prevPath = useRef<typeof location.pathname>()

   const [isCurtain, setIsCurtain] = useState(false)
   const [isCurtainAnimation, setIsCurtainAnimation] = useState(false)

   const [pageLoader, setPageLoader] = useState(true)
   const [pageLoaderAnimation, setPageLoaderAnimation] = useState(true)

   const [pagePreLoader, setPagePreLoader] = useState(false)
   const [isFetchingData, setIsFetchingData] = useState(true)

   const [globalLoaderAnimation, setGlobalLoaderAnimation] = useState(true)

   const changePage = async (to: string) => {
      if (!isCurtain && prevPath.current === to)
         window.scroll(0, 0)

      if (!isCurtain && prevPath.current !== to){
         await setPagePreLoader(true)

         if (ios)
            window.scroll(0, 0)

         setTimeout(async () => {
            window.scroll(0, 0)

            await setPageLoader(true)
            navigate(to)
            setPagePreLoader(false)
            prevPath.current = to
         }, 500)
      }

      if (isCurtain) {
         if (prevPath.current === to) {
            setIsCurtainAnimation(true)
            setIsCurtain(false)

            setTimeout(() => {
               setIsCurtainAnimation(false)
            }, 500)
         } else {
            window.scroll(0, 0)
            await setPageLoader(true)

            navigate(to)

            setIsCurtainAnimation(true)
            setIsCurtain(false)

            setTimeout(() => {
               setIsCurtainAnimation(false)
            }, 300)

            prevPath.current = to
         }
      }
   }

   const toggleCurtain = () => {
      if (!isCurtainAnimation) {
         setIsCurtainAnimation(true)
         setIsCurtain(prev => !prev)

         setTimeout(() => {
            setIsCurtainAnimation(false)
         }, 500)
      }
   }

   useEffect(() => {
      const html = document.querySelector('html')

      if (html)
         if (isCurtain || isCurtainAnimation || pageLoaderAnimation || globalLoaderAnimation)
            html.style.overflowY = 'hidden'
         else
            html.style.overflowY = 'scroll'
   }, [isCurtain, isCurtainAnimation, pageLoaderAnimation, globalLoaderAnimation])

   useEffect(() => {
      prevPath.current = location.pathname
   }, [])

   return (
      <PageContext.Provider value={{
         isCurtain,
         toggleCurtain,
         isCurtainAnimation,
         pageLoader,
         setPageLoader,
         changePage,
         pageLoaderAnimation,
         setPageLoaderAnimation,
         pagePreLoader,
         globalLoaderAnimation,
         setGlobalLoaderAnimation,
         isFetchingData,
         setIsFetchingData
      }}>
         { children }
      </PageContext.Provider>
   )
}

export default WithPageLayout