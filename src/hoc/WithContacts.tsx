import {FC, ReactNode} from 'react'
import usePageState from "../hooks/usePageState"
import ContactsContext from "../context/contacts.context"


interface IProps {
   children: ReactNode
}

const initial = {
   tel: 48515285228,
   telText: '+48 515 285 228',
   email: 'dzemichivan@gmail.com'
}

const WithContacts:FC<IProps> = ({ children }) => {
   const { state: fetchedState } = usePageState('contacts')

   const val = fetchedState ? fetchedState : initial

   return(
       <ContactsContext.Provider value={{
          tel: val.tel,
          telText: val.telText,
          email: val.email
       }}>
          {children}
       </ContactsContext.Provider>
   )
}


export default WithContacts