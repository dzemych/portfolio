import {FC, useEffect, useState} from 'react'
import classes from './Project.module.sass'
import {FetchStatus} from "../../types/api.types"
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import NeedDev from "../../components/NeedDev/NeedDev"
import one from '../../assets/imgs/1.jpg'
import two from '../../assets/imgs/2.jpg'
import three from '../../assets/imgs/3.jpg'
import four from '../../assets/imgs/4.jpg'
import Title from "../../components/UI/Title/Title"
import OpacityYDiv from "../../components/UI/OpacityYDiv";
import ImgPreview from "./ImgPreview/ImgPreview";
import {useParams} from "react-router-dom";
import AnimatedImg from "../../components/UI/Img/AnimatedImg"


interface IInfoItem {
   title: string
   link?: boolean
   text: string
}

const photos: string[] = [one, two, three, four, one, two, three, four, one, two, three, four, one, two, three, four, one, two, three, four, one, two, three, four]

const infos: IInfoItem[] = [
   { title: 'my role', link: false, text: 'Front end and backend developer' },
   { title: 'client', link: false, text: 'jasmin' },
   { title: 'date', link: false, text: '05/2022 - 11/2022' }
]

const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aliquid aut commodi corporis deserunt dignissimos doloribus eius hic illum magnam molestiae non praesentium, quam quo repellat rerum, sunt !!!!.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aliquid aut commodi corporis deserunt dignissimos doloribus eius hic illum magnam molestiae non praesentium, quam quo repellat rerum, sunt !!!!!!!.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aliquid aut commodi corporis deserunt dignissimos doloribus eius hic illum magnam molestiae non praesentium, quam quo repellat rerum, sunt tempore.\n'

const techs = [
   'JavaScript', 'HTML', 'CSS', 'SASS/SCSS', 'React', 'TypeScript', 'NextJs'
]

const Project:FC = () => {

   const { slug } = useParams()

   const [status, setStatus] = useState(FetchStatus.INIT)
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

   const renderInfoBlock = (title: string, text: string, link: boolean | undefined) => {
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
         key={`${src}-${idx}`}
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
      setStatus(FetchStatus.LOADED)
   }, [])

   return(
      <div className={classes.container}>
         <PageLoader status={status} text={'Loading project'}/>

         <section className={classes.content}>
            <div className={classes.details_container}>
               <Title type='light' className={classes.subtitle}>Case study</Title>

               <Title className={classes.title}>
                  Clothes store on React with Redux
               </Title>

               <div className={classes.info_blocks_list}>
                  {infos.map(el => renderInfoBlock(el.title, el.text, el.link))}

                  <div className={classes.info_block}>
                     <Title type='light' className={classes.info_title}>Technologies I used</Title>

                     <OpacityYDiv className={classes.skill_list}>
                        { techs.map((el, i, arr) => renderSkill(el, i, arr)) }
                     </OpacityYDiv>
                  </div>
               </div>
            </div>

            <OpacityYDiv className={classes.main_text}>
               <span dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<p></p>') }}/>
            </OpacityYDiv>
         </section>

         <section className={classes.photos_container}>
            <ImgPreview
               srcArr={photos}
               open={imgPreview}
               close={toggleImgPreview}
               startAt={page}
            />

            <div className={classes.list}>
               { photos.map((el, i) => renderPhoto(el, i)) }
            </div>
         </section>

         <NeedDev/>
      </div>
   )
}


export default Project