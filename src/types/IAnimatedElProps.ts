import React, {CSSProperties, ReactNode, RefObject} from "react"
import {MotionStyle, Variants, MotionProps} from "framer-motion"


export interface IElProps {
   className?: string
   style?: CSSProperties
   onClick?: (e?: any) => void
   children?: ReactNode
}

// export interface IAnimateProps {
//    whileInViewport?: boolean
//    delay?: number
//    exit?: boolean
//    id?: string
//    showAnimation?: boolean
//    duration?: number
//    hoverAnimation?: boolean
// }

interface ViewportOptions {
   root?: RefObject<Element>
   once?: boolean
   margin?: string
   amount?: "some" | "all" | number
   fallback?: boolean
}

export interface IAnimationParams {
   variants: Variants
   initial?: string
   animate?: string
   exit?: string
   whileInView?: string
   viewport: ViewportOptions
}

export type HookUseAnimationParams = (
   // whileInViewport?: boolean,
   // delay?: number,
   // exit?: boolean,
   // id?: string,
   // showAnimation?: boolean,
   // duration?: number,
   // hoverAnimation?: boolean
   ref: RefObject<HTMLElement>
) => IAnimationParams

export interface IAnimatedElProps extends IElProps{
   children?: React.ReactNode,
   whileInViewport?: boolean
   delay?: number
   colorSchema?: 'black' | 'white'
   exit?: boolean
   id?: string
   showAnimation?: boolean
   duration?: number
   hoverAnimation?: boolean
}