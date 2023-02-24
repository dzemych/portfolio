import {FC, useContext, useEffect, useState} from 'react'
import classes from './Project.module.sass'
import {FetchStatus} from "../../types/api.types"
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import NeedDev from "../../components/NeedDev/NeedDev"
import Title from "../../components/UI/Title/Title"
import OpacityYDiv from "../../components/UI/OpacityYDiv"
import ImgPreview from "./ImgPreview/ImgPreview"
import {useParams} from "react-router-dom"
import AnimatedImg from "../../components/UI/Img/AnimatedImg"
import usePageState from "../../hooks/usePageState"
import PageContext from "../../context/page.context"
import useStorage from "../../hooks/useStorage"


interface IInfoItem {
   title: string
   link?: boolean
   text?: string
   list?: string[]
}

const Project:FC = () => {

   const { setIsFetchingData } = useContext(PageContext)
   const { getUrls } = useStorage()

   const { slug } = useParams()

   const { state, status } = usePageState(`projects/${slug}`)
   const [photosUrls, setPhotosUrls] = useState<string[]>([])

   const [imgPreview, setImgPreview] = useState(false)
   const [page, setPage] = useState(0)

   const toggleImgPreview = () => {
      setImgPreview(prev => !prev)
   }

   const openImg = (i: number) => () => {
      setPage(i)
      setImgPreview(true)
   }

   const renderSkill = (text: string, idx: number, arr: string[]) => (
      <div key={idx}>
         <span className={classes.skill_text}>{ text }</span>
         { idx !== arr.length - 1 &&
            <span className={classes.text_divider}>/</span>
         }
      </div>
   )

   const renderInfoBlock = (title: string, text?: string, list?: string[], link?: boolean) => {
      if (list && list.length)
         return (
            <div className={classes.info_block} key={title}>
               <Title type='light' className={classes.info_title}>{title}</Title>

               <OpacityYDiv className={classes.skill_list}>
                  { list.map((el, i, arr) => renderSkill(el, i, arr)) }
               </OpacityYDiv>
            </div>
         )

      return (
         <div className={classes.info_block} key={title}>
            <Title type='light' className={classes.info_title}>{title}</Title>

            <OpacityYDiv className={[classes.info_text, link && classes.info_text_link].join(' ')}>
               {text}
            </OpacityYDiv>
         </div>
      )
   }

   const renderPhoto = (src: string, idx: number) => (
      <div
         className={classes.photos_item}
         key={src}
         onClick={openImg(idx)}
      >
         <AnimatedImg
            photoSrc={src}
            shadow={false}
            colorSchema={'white'}
            animationType={'curtain'}
         />
      </div>
   )

   useEffect(() => {
      if (status !== FetchStatus.INIT) {
         setIsFetchingData(false)
      }
   }, [status])

   useEffect(() => {
      const fetchUrls = async (arr: string[]) => {
         const urls = await getUrls(arr)

         setPhotosUrls(urls)
      }

      if (state?.photos?.length)
         fetchUrls(state.photos)
   }, [state])

   return(
      <div className={classes.container}>
         <PageLoader text={'Loading project'} loading={status === FetchStatus.INIT}/>

         <section className={classes.content}>
            <div className={classes.details_container}>
               <Title type='light' className={classes.subtitle}>{ state && state.subtitle }</Title>

               <Title className={classes.title}>
                  { state && state.title }
               </Title>

               <div className={classes.info_blocks_list}>
                  {state &&
                     state.details.map((el: IInfoItem) =>
                        renderInfoBlock(el.title, el.text, el.list)
                     )
                  }
               </div>
            </div>

            <OpacityYDiv className={classes.main_text}>
               { state && <span dangerouslySetInnerHTML={{ __html: state.text.replace(/\n/g, '<p></p>') }}/> }
            </OpacityYDiv>
         </section>

         <section className={classes.photos_container}>
            { photosUrls.length &&
               <ImgPreview
                  srcArr={photosUrls}
                  open={imgPreview}
                  close={toggleImgPreview}
                  startAt={page}
               />
            }

            <div className={classes.list}>
               { photosUrls?.length && photosUrls.map((el, i) => renderPhoto(el, i)) }
            </div>
         </section>

         <NeedDev/>
      </div>
   )
}


export default Project