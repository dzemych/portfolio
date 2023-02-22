import {useEffect, useState} from "react"
import {onValue, ref} from "firebase/database"
import {db} from "../firebase"


type HookUseListState = (initial: any, dbPath?: string) => {
   state: any[]
   onChange: (idx: number, key: string) => (val: any) => void
   addItem: () => void
   removeItem: (idx: number) => void
}

const useListState: HookUseListState = (initial, dbPath) => {

   const [state, setState] = useState([initial])

   const onChange = (idx: number, key: string) => (val: any) => {
      setState(prev => {
         const newState = [...prev]

         newState[idx][key] = val
         return newState
      })
   }

   const addItem = () => {
      setState(prev => [...prev, initial])
   }

   const removeItem = (idx: number) => {
      setState(prev => prev.filter((el, i) => i !== idx))
   }

   useEffect(() => {
      (async () => {
         if (dbPath) {
            onValue(ref(db, dbPath), (snapshot) => {
               const val = snapshot.val()

               if (val)
                  setState(val)
            }, {
               onlyOnce: true
            })
         }
      })()
   }, [dbPath])

   return { state, onChange, addItem, removeItem }
}


export default useListState