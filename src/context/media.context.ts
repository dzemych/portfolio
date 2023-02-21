import {createContext} from "react"
import {IMediaBreakPoints} from "../types/media.types"


const MediaContext = createContext<IMediaBreakPoints>({
   extSmall: false,
   small: false,
   medium: false,
   large: false,
   extLarge: false,
   vw: 0
})

export default MediaContext