import {createContext} from "react"


export enum CurtainPageImg {
   ABOUT = 'about',
   CONTACTS =  'contacts',
   PROJECTS = 'projects',
   DEFAULT = 'default'
}

interface ICurtainBackImg {
   pageImg: CurtainPageImg
   setPageImg: (val: CurtainPageImg) => void
}

const CurtainBackImgContext = createContext<ICurtainBackImg>({
   pageImg: CurtainPageImg.DEFAULT,
   setPageImg: () => undefined
})

export default CurtainBackImgContext