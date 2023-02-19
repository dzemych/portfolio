import {FC, ReactNode, useEffect, useRef, useState} from "react"
import PageContext from "../context/page.context"
import {useLocation, useNavigate} from "react-router-dom"


interface IProps {
   children: ReactNode
}

const PageLayout: FC<IProps> = ({ children }) => {
   const navigate = useNavigate()
   const location = useLocation()

   const prevPath = useRef<typeof location.pathname>()

   const [isCurtain, setIsCurtain] = useState(false)
   const [isCurtainAnimation, setIsCurtainAnimation] = useState(false)

   const [pageLoader, setPageLoader] = useState(false)
   const [pageLoaderAnimation, setPageLoaderAnimation] = useState(false)

   const [pagePreLoader, setPagePreLoader] = useState(false)

   const changePage = async (to: string) => {
      if (!isCurtain && prevPath.current === to)
         window.scrollTo(0, 0)

      if (!isCurtain && prevPath.current !== to){
         await setPagePreLoader(true)

         setTimeout(async () => {
            await setPageLoader(true)
            navigate(to)

            window.scrollTo(0, 0)
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
            window.scrollTo(0, 0)
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
         if (isCurtain || isCurtainAnimation || pageLoaderAnimation)
            html.style.overflowY = 'hidden'
         else
            html.style.overflowY = 'scroll'
   }, [isCurtain, isCurtainAnimation, pageLoaderAnimation])

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
         pagePreLoader
      }}>
         { children }
      </PageContext.Provider>
   )
}

export default PageLayout