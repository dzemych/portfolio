import {FormEvent, useEffect, useState} from "react"
import {onValue, ref} from "firebase/database"
import {db} from "../firebase"
import slugify from 'slugify'


interface ObjWithStr {[key: string]: any}

type HookUseFormState = (initial: ObjWithStr, dbPath?: string) => {
   state: ObjWithStr,
   onChange: (key: string) => (val: any) => void
}

const useFormState: HookUseFormState = (initial, dbPath) => {
   const [state, setState] = useState(initial)

   const onChange = (key: string) => (e: FormEvent<HTMLInputElement>) => {
      // @ts-ignore
      setState(prev => ({ ...prev, [key]: e.target.value }))
   }

   useEffect(() => {
      if (dbPath) {
         onValue(ref(db, dbPath), (snapshot) => {
            const val = snapshot.val()

            if (val)
               setState(val)
         }, {
            onlyOnce: true
         })
      }
   }, [dbPath])

   return { state, onChange }
}

export default useFormState