import {ChangeEvent, FC, useEffect, useRef, useState} from 'react'
import classes from './Admin.module.sass'
import useFormState from "../../hooks/useFormState"
import {Button, TextField} from "@mui/material"
import useDb from "../../hooks/useDb"
import contacts from "../Contacts/Contacts"
import {useNavigate} from "react-router-dom"
import useProjectsList from "../../hooks/useProjectsList"
import useStorage from "../../hooks/useStorage"
import {onValue, ref} from "firebase/database"
import {db} from "../../firebase"
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import {FetchStatus} from "../../types/api.types"


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
   const imgRef = useRef<HTMLInputElement>(null)

   const { updateData } = useDb()
   const { uploadFile, getOneUrl } = useStorage()
   const { state: titlesState, onChange: titlesChangeHandler } = useFormState(titlesInit, 'titles')
   const { state: contactsState, onChange: contactsChangeHandler } = useFormState(contactsInit, 'contacts')
   const [mainImg, setMainImg] = useState('')

   const { works, projects } = useProjectsList()

   const titlesSubmit = () => {
      updateData('titles', titlesState)
   }

   const contactsSubmit = () => {
      updateData('contacts', contactsState)
   }

   const imgClick = () => {
      if (imgRef.current)
         imgRef.current.click()
   }

   const changeImg = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         const imgPath = await uploadFile('mainPhoto', e.target.files[0])
         updateData('mainPhoto', { imgPath })
      }
   }

   useEffect(() => {
      const fetchMainImg = async () => {
         await onValue(ref(db, 'mainPhoto/imgPath'), async (snapshot) => {
            const url = await getOneUrl(snapshot.val())

            setMainImg(url)
         }, {
            onlyOnce: true
         })
      }

      fetchMainImg()
   }, [])

   return(
       <div className={classes.container}>
          <PageLoader loading={false}/>

          <h1>Admin</h1>

          <section className={classes.section}>
             <h2>Main img</h2>

             <div className={classes.img_input} onClick={imgClick}>
                <b>Main img</b>

                <input
                   style={{ display: 'none' }}
                   type="file"
                   accept={'image/*'}
                   ref={imgRef}
                   onChange={changeImg}
                />
             </div>

             <div className={classes.main_img_container} onClick={imgClick}>
                <img src={mainImg} alt=""/>
             </div>
          </section>

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