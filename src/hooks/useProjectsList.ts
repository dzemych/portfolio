import {useEffect, useState} from "react"
import useDb from "./useDb"
import {onValue, ref} from "firebase/database"
import {db} from "../firebase"


type HookUseProjectsList = () => {
   works: any[]
   projects: any[]
}

const useProjectsList: HookUseProjectsList = () => {
   const [works, setWorks] = useState([])
   const [projects, setProjects] = useState([])

   useEffect(() => {
      (async () => {
         onValue(ref(db, 'projects'), (snapshot) => {
            const list = snapshot.val()

            if (!list)
               return

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
         }, {
            onlyOnce: true
         })
      })()
   }, [])

   return { works, projects }
}

export default useProjectsList