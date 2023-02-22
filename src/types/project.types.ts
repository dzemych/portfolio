import {ChangeEvent} from "react"


export type InputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export interface IProjectDetail {
   title: string
   text: string
   list: string[]
}

export interface IProjectState {
   title: string
   subtitle: string
   text: string
   details: IProjectDetail[]
   photos: string[]
   type: string
}