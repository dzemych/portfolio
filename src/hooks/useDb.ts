import {onValue, ref, update} from "firebase/database"
import {db} from "../firebase"
import {useState} from "react"
import {FetchStatus} from "../types/api.types"

type HookUseDb = () => {
   getData: (path: string) => Promise<any>
   updateData: (path: string, data: any) => void
   status: FetchStatus
}

const useDb:HookUseDb = () => {

   const [status, setStatus] = useState(FetchStatus.INIT)

   const getData = async (path: string) => {
      const dbRef = ref(db, path)

      let res

      await onValue(dbRef, (snapshot) => {
         res = snapshot.val()
      }, {
         onlyOnce: true
      })

      return res
   }

   const updateData = (path: string, data: any) => {
      const dbRef = ref(db, path)

      update(dbRef, data)
   }

   return { status, getData, updateData }
}

export default useDb