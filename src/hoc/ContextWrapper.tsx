import {FC, ReactNode} from 'react'
import WithPageLayout from "./WithPageLayout"
import WithMedia from "./WithMedia"
import WithCurtainBackImg from "./WithCurtainBackImg"


interface IProps {
   children: ReactNode
}

const ContextWrapper:FC<IProps> = ({ children }) => {
   return(
      <WithMedia>
         {/*<WithCurtainBackImg>*/}
            <WithPageLayout>
               {children}
            </WithPageLayout>
         {/*</WithCurtainBackImg>*/}
      </WithMedia>
   )
}


export default ContextWrapper