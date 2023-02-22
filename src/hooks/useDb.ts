import {onValue, ref, update} from "firebase/database"
import {db} from "../firebase"
import {useState} from "react"
import {FetchStatus} from "../types/api.types"

type HookUseDb = () => {
   getData: (path: string) => Promise<any>
   updateData: (path: string, data: any) => void
   status: FetchStatus
   loading: boolean
}

const useDb:HookUseDb = () => {

   const [status, setStatus] = useState(FetchStatus.INIT)
   const [loading, setLoading] = useState(false)

   const getData = async (path: string) => {
      const dbRef = ref(db, path)

      let res

      await onValue(dbRef, (snapshot) => {
         res = snapshot.val()
         console.log(res)
      }, {
         onlyOnce: true
      })

      return res
   }

   const updateData = (path: string, data: any) => {
      const dbRef = ref(db, path)

      update(dbRef, data)
   }

   return { status, loading, getData, updateData }
}

export default useDb