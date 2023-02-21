import {FC, ReactNode, useState} from 'react'
import CurtainBackImgContext, {CurtainPageImg} from "../context/curtainBackImg.context"


interface IProps {
   children: ReactNode
}

const WithCurtainBackImg:FC<IProps> = ({ children }) => {
   const [pageImg, setPageImg] = useState<CurtainPageImg>(CurtainPageImg.DEFAULT)

   return(
       <CurtainBackImgContext.Provider value={{ pageImg, setPageImg }}>
          {children}
       </CurtainBackImgContext.Provider>
   )
}


export default WithCurtainBackImg