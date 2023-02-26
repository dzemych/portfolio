import React, {FC, ReactNode} from 'react'
import useMedia from "../hooks/useMedia"
import MediaContext from "../context/media.context"


interface IProps {
   children: ReactNode
}

const WithMedia:FC<IProps> = ({ children }) => {
   const { extSmall, small, large, medium, extLarge, vw, ios } = useMedia()

   return(
      <MediaContext.Provider value={{ small, extSmall, medium, large, extLarge, vw, ios }}>
         {children}
      </MediaContext.Provider>
   )
}


export default WithMedia