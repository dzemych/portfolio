import {createContext} from "react"


export interface IMediaBreakPoints {
   extSmall: boolean
   small: boolean
   medium: boolean
   large: boolean
   extLarge: boolean
   vw: number
   ios: boolean
}

const MediaContext = createContext<IMediaBreakPoints>({
   extSmall: false,
   small: false,
   medium: false,
   large: false,
   extLarge: false,
   vw: 0,
   ios: false
})

export default MediaContext