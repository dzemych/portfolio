import {createContext} from "react"


interface ICurtainContext {
   isCurtain: boolean
   toggleCurtain: () => void
   isCurtainAnimation: boolean
   changePage: (to: string) => void
   pageLoader: boolean
   setPageLoader: (val: boolean) => void
   pageLoaderAnimation: boolean
   setPageLoaderAnimation: (val: boolean) => void
   pagePreLoader: boolean
}

const voidFunc = () => undefined

const PageContext = createContext<ICurtainContext>({
   isCurtain: false,
   toggleCurtain: voidFunc,
   changePage: voidFunc,
   isCurtainAnimation: false,
   pageLoader: false,
   setPageLoader: voidFunc,
   pageLoaderAnimation: false,
   setPageLoaderAnimation: voidFunc,
   pagePreLoader: false
})

export default PageContext