import {FC} from 'react'
import classes from './Admin.module.sass'
import useFormState from "../../hooks/useFormState"
import {Button, TextField} from "@mui/material"
import useDb from "../../hooks/useDb"
import contacts from "../Contacts/Contacts"
import {useNavigate} from "react-router-dom"
import useProjectsList from "../../hooks/useProjectsList"


const titlesInit = {
   projects: '',
   about: '',
   contacts: ''
}

const contactsInit = {
   telText: '',
   tel: 48515285228,
   email: '',
   address: ''
}

const Admin:FC = () => {
   const navigate = useNavigate()

   const { updateData } = useDb()
   const { state: titlesState, onChange: titlesChangeHandler } = useFormState(titlesInit, 'titles')
   const { state: contactsState, onChange: contactsChangeHandler } = useFormState(contactsInit, 'contacts')

   const { works, projects } = useProjectsList()

   const titlesSubmit = () => {
      updateData('titles', titlesState)
   }

   const contactsSubmit = () => {
      updateData('contacts', contactsState)
   }

   return(
       <div className={classes.container}>
          <h1>Admin</h1>

          <section className={classes.section}>
             <h2>Titles</h2>

             <div className={classes.list}>
                {Object.keys(titlesState).map((key) => (
                   <TextField
                      multiline={true}
                      key={key}
                      label={key}
                      value={titlesState[key]}
                      onChange={titlesChangeHandler(key)}
                   />
                ))}

                <Button onClick={titlesSubmit}>
                   Update
                </Button>
             </div>
          </section>

          <section className={classes.section}>
             <h2>Contacts</h2>

             <div className={classes.list}>
                <div className={classes.list}>
                   {Object.keys(contactsState).map((key) => (
                      <TextField
                         multiline={true}
                         key={key}
                         label={key}
                         value={contactsState[key]}
                         onChange={contactsChangeHandler(key)}
                      />
                   ))}
                </div>

                <Button onClick={contactsSubmit}>
                   Update
                </Button>
             </div>
          </section>

          <section className={classes.section}>
             <h2>Project</h2>

             <div className={classes.projects_list}>
                <div
                   className={classes.project_item}
                   onClick={() => navigate('/admin/new')}
                >
                   <p>Add</p>
                </div>

                { works.map(el => (
                   <div
                      key={el.slug}
                      className={classes.project_item}
                      onClick={() => navigate(`/admin/${el.slug}`)}
                   >
                      <p>{ el.title }</p>
                   </div>
                )) }

                { projects.map(el => (
                   <div
                      key={el.slug}
                      className={classes.project_item}
                      onClick={() => navigate(`/admin/${el.slug}`)}
                   >
                      <p>{ el.title }</p>
                   </div>
                )) }
             </div>
          </section>
       </div>
   )
}


export default Admin