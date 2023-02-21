import {FC, useEffect, useState} from 'react'
import classes from './Project.module.sass'
import {useParams} from "react-router-dom"
import {FetchStatus} from "../../types/api.types"
import PageLoader from "../../components/PageLoader/PageLoader"
import NeedDev from "../../components/NeedDev/NeedDev"
import one from '../../assets/imgs/1.jpg'
import two from '../../assets/imgs/2.jpg'
import three from '../../assets/imgs/3.jpg'
import four from '../../assets/imgs/4.jpg'
import Title from "../../components/ui/Title/Title"


interface IInfoItem {
   title: string
   link?: boolean
   text: string
}

const photos: string[] = [one, two, three, four]

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

   const [status, setStatus] = useState(FetchStatus.INIT)

   const { slug } = useParams()

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

            <span className={[classes.info_text, link && classes.info_text_link].join(' ')}>
               {text}
            </span>
         </div>
      )
   }

   const renderPhoto = (src: string) => (
      <div className={classes.photos_item} key={src}>
         <img src={src} alt=""/>
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

                     <div className={classes.skill_list}>
                        { techs.map((el, i, arr) => renderSkill(el, i, arr)) }
                     </div>
                  </div>
               </div>
            </div>

            <div className={classes.main_text}>
               <span dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<p></p>') }}/>
            </div>
         </section>

         <section className={classes.photos_container}>
            <div className={classes.photos_list}>
               { photos.map(renderPhoto) }
            </div>
         </section>

         <NeedDev/>
      </div>
   )
}


export default Project