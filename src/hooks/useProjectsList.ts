import {useEffect, useState} from "react"
import {onValue, ref} from "firebase/database"
import {db} from "../firebase"
import {FetchStatus} from "../types/api.types"


type HookUseProjectsList = () => {
   works: any[]
   projects: any[]
   status: FetchStatus
}

const useProjectsList: HookUseProjectsList = () => {
   const [status, setStatus] = useState(FetchStatus.INIT)

   const [works, setWorks] = useState([])
   const [projects, setProjects] = useState([])

   useEffect(() => {
      (async () => {
         onValue(ref(db, 'projects'), (snapshot) => {
            const list = snapshot.val()

            if (!list) {
               setStatus(FetchStatus.NOT_FOUND)
               return
            }

            setProjects(Object.keys(list).reduce((acc, key) => {
               if (list[key].type === 'project') {// @ts-ignore
                  acc.push(list[key])
               }

               return acc
            }, []))

            setWorks(Object.keys(list).reduce((acc, key) => {
               if (list[key].type === 'work') {// @ts-ignore
                  acc.push(list[key])
               }

               return acc
            }, []))

            setStatus(FetchStatus.LOADED)
         }, {
            onlyOnce: true
         })
      })()
   }, [])

   return { works, projects, status }
}

export default useProjectsList