import {FC, useEffect, useRef, useState, ChangeEvent} from 'react'
import classes from './EditProject.module.sass'
import {useParams} from "react-router-dom"
import {onValue, ref} from "firebase/database"
import {db} from "../../firebase"
import Loading from "../../components/Loading/Loading"
import {Button, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import {InputEvent, IProjectDetail, IProjectState} from "../../types/project.types"
import useDb from "../../hooks/useDb"
import slugify from "slugify"
import useStorage from "../../hooks/useStorage"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import {FetchStatus} from "../../types/api.types"


const detailInit: IProjectDetail = {
   title: '',
   text: '',
   list: []
}

const initial: IProjectState = {
   title: '',
   subtitle: '',
   text: '',
   details: [detailInit, detailInit],
   photos: [],
   type: '',
   mainPhoto: ''
}

const EditProject:FC = () => {
   const { slug } = useParams()

   const { updateData } = useDb()
   const { getUrls, uploadProjectImg, deleteFile, uploadFile, getOneUrl } = useStorage()

   const inputRef = useRef<HTMLInputElement>(null)

   const [mainImg, setMainImg] = useState('')
   const [imgUrls, setImgUrls] = useState<string[]>([])

   const [state, setState] = useState<IProjectState>(initial)
   const [exists, setExists] = useState(false)

   const handleTypeChange = (e: SelectChangeEvent) => {
      setState(prev => ({ ...prev, type: e.target.value }))
   }

   const changeHandler = (key: string) => (e: InputEvent) => {
      setState(prev => ({ ...prev, [key]: e.target.value }))
   }

   const addDetail = () => {
      setState(prev => {
         const newState = {...prev}

         newState.details.push(detailInit)

         return newState
      })
   }

   const deleteDetail = (idx: number) => () => {
      setState(prev => {
         const newState = {...prev}

         newState.details = newState.details.filter((el, i) =>  idx !== i)

         return newState
      })
   }

   const changeDetailTitle = (idx: number, e: InputEvent) => {
      setState(prev => {
         const newState = {...prev}

         // @ts-ignore
         newState.details = newState.details.map((el, i) => {
            if (i === idx)
               return { ...el, title: e.target.value }

            return el
         })

         return newState
      })
   }

   const changeDetailText = (idx: number, e: InputEvent) => {
      setState(prev => {
         const newState = {...prev}

         // @ts-ignore
         newState.details = newState.details.map((el, i) => {
            if (i === idx)
               return { ...el, text: e.target.value }

            return el
         })

         return newState
      })
   }

   const submitHandler = () => {
      const slug = slugify(state.title, { lower: true })
      updateData(`projects/${slug}`, { ...state, slug})
   }

   const renderDetail = (el: IProjectDetail, idx: number) => {
      return (
         <div className={classes.detail_item} key={idx}>
            { idx === 0
               ? <Button variant={'contained'} onClick={addDetail}>
                  Add
               </Button>
               : <Button variant={'contained'} color={'warning'} onClick={deleteDetail(idx)}>
                  Delete
               </Button>
            }

            <TextField
               value={el.title}
               label={'Detail title - ' + idx}
               onChange={(e) => { changeDetailTitle(idx, e) } }
            />

            <TextField
               value={el.text}
               label={'Detail text - ' + idx}
               onChange={(e) => { changeDetailText(idx, e) } }
            />
         </div>
      )
   }

   const addImgClick = () => {
      if (inputRef.current)
         inputRef.current.click()
   }

   const changeMainImg = async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files

      if (files?.length) {
         const path = await uploadFile(`projects/${slug}/mainPhoto`, files[0])

         setState(prev => ({ ...prev, mainPhoto: path }))

         const url = await getOneUrl(path)
         setMainImg(url)
      }
   }

   const deleteOneImg = (url: string) => {
      deleteFile(url)
      setState(prev => ({ ...prev, photos: prev.photos.filter(el => el !== url) }))
   }

   const imgChange = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length && slug) {
         const url = await uploadProjectImg(slug, e.target.files[0])
         setState(prev => {
            if (!prev.photos)
               return { ...prev, photos: [url] }

            return { ...prev, photos: [...prev.photos, url] }
         })
      }
   }

   // Load state
   useEffect(() => {
      if (slug && slug !== 'new') {
         onValue(ref(db, '/projects/' + slug), async (snapshot) => {
            const val = snapshot.val()

            if (val) {
               if (val.mainPhoto) {
                  const url = await getOneUrl(val.mainPhoto)
                  setMainImg(url)
               }

               setState(val)
               setExists(true)
            }
         }, {
            onlyOnce: true
         })
      }
   }, [slug])

   useEffect(() => {
      (async () => {
         if (state.photos?.length) {
            const urls = await getUrls(state.photos)
            setImgUrls(urls)
         } else {
            setImgUrls([])
         }
      })()
   }, [state.photos])

   if (!state)
      return <Loading/>

   return(
       <div className={classes.container}>
          <PageLoader loading={false}/>

          <div className={classes.list}>
             <div className={classes.main_img}>
                <h2>Main img</h2>

                <input
                   type="file"
                   accept={'image/*'}
                   onChange={changeMainImg}
                />

                <div className={classes.main_img_container}>
                   <img src={mainImg} alt=""/>
                </div>
             </div>

             <Select
                value={state.type}
                label="Type"
                onChange={handleTypeChange}
             >
                <MenuItem value={'work'}>Work</MenuItem>
                <MenuItem value={'project'}>Project</MenuItem>
             </Select>

             <TextField
                value={state.title}
                label={'Title'}
                onChange={changeHandler('title')}
             />

             <TextField
                value={state.subtitle}
                label={'Subtitle'}
                onChange={changeHandler('subtitle')}
             />

             <TextField
                value={state.text}
                label={'Main text'}
                onChange={changeHandler('text')}
                multiline
             />

             <div className={classes.details_list}>
                <h3>Details list</h3>

                {state.details.map((el, i) => renderDetail(el, i))}
             </div>

             { exists &&
                <div>
                   <h3>Photos list</h3>

                   <div className={classes.photos_list}>
                      <div className={classes.photo_item} onClick={addImgClick}>
                         Add
                         <input
                            type="file"
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={imgChange}
                            ref={inputRef}
                         />
                      </div>

                      { imgUrls.map((url, i) => (
                         <div className={classes.photo_item} key={url}>
                            <img src={url} alt=""/>
                            
                            <div className={classes.photo_nav}>
                               <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() => deleteOneImg(state.photos[i])}
                               />
                            </div>
                         </div>
                      )) }
                   </div>
                </div>
             }
          </div>

          <Button onClick={submitHandler} style={{ margin: '20px 50px', fontSize: '2rem' }}>
             Update
          </Button>
       </div>
   )
}


export default EditProject