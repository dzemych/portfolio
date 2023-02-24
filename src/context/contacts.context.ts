import {createContext} from "react"


interface IContactsContext {
   email: string
   tel: number
   telText: string
   resumeUrl: string
}

const ContactsContext = createContext<IContactsContext>({
   email: 'dzemichivan@gmail.com',
   tel: 48515285228,
   telText: '+48 515 285 228',
   resumeUrl: ''
})

export default ContactsContext