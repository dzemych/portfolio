import {useEffect, useState} from "react"
import {FetchStatus} from "../types/api.types"
import {onValue, ref} from "firebase/database"
import {db} from "../firebase"
import {ObjWithStrKeys} from "../types/global.types"


type HookUseDbState = (page: string) => {
   status: FetchStatus
   state: ObjWithStrKeys | null
}

const usePageState: HookUseDbState = (page) => {
   const [state, setState] = useState<null | ObjWithStrKeys>(null)
   const [status, setStatus] = useState(FetchStatus.INIT)

   const fetchProjects = (val: any) => {
      let newState: ObjWithStrKeys = {
         title: val.titles[page],
         mainPhoto: val.mainPhoto.imgPath
      }

      const list = val.projects

      const projects = Object.keys(list).reduce((acc, key) => {
         if (list[key].type === 'project') {// @ts-ignore
            acc.push(list[key])
         }

         return acc
      }, [])

      const works = Object.keys(list).reduce((acc, key) => {
         if (list[key].type === 'work') {// @ts-ignore
            acc.push(list[key])
         }

         return acc
      }, [])

      newState.projects = projects
      newState.works = works

      return newState
   }

   const fetchPage = (val: any) => {
      let newState: ObjWithStrKeys = {
         title: val.titles[page],
      }

      return { ...newState, ...val[page] }
   }

   const fetchProject = (val: any) => {
      const slug = page.split('/')[1]

      let newState: ObjWithStrKeys = {
         ...val.projects[slug]
      }

      return newState
   }

   useEffect(() => {
      const el = ref(db)

      onValue(el, (snap) => {
         const val = snap.val()

         if (!val) {
            setStatus(FetchStatus.NOT_FOUND)
            return
         }

         let newState

         if (page === 'projects')
            newState = fetchProjects(val)
         else if (/projects\/.*/i.test(page))
            newState = fetchProject(val)
         else
            newState = fetchPage(val)

         setState(newState)
         setStatus(FetchStatus.LOADED)
      })
   }, [page])

   return { state, status }
}

export default usePageState