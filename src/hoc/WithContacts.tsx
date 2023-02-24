import {FC, ReactNode, useEffect, useState} from 'react'
import usePageState from "../hooks/usePageState"
import ContactsContext from "../context/contacts.context"
import useStorage from "../hooks/useStorage"


interface IProps {
   children: ReactNode
}

const initial = {
   tel: 48515285228,
   telText: '+48 515 285 228',
   email: 'dzemichivan@gmail.com',
   resumeUrl: ''
}

const WithContacts:FC<IProps> = ({ children }) => {
   const { getOneUrl } = useStorage()

   const { state: fetchedState } = usePageState('contacts')
   const [resumeUrl, setResumeUrl] = useState('')

   const val = fetchedState ? fetchedState : initial

   useEffect(() => {
      getOneUrl('Dzemych Ivan - Web Developer').then(res => {
         setResumeUrl(res)
      })
   }, [])

   return(
       <ContactsContext.Provider value={{
          tel: val.tel,
          telText: val.telText,
          email: val.email,
          resumeUrl
       }}>
          {children}
       </ContactsContext.Provider>
   )
}


export default WithContacts