import {FC, useContext, useEffect, useState} from 'react'
import classes from './Home.module.sass'
import { motion } from 'framer-motion'
import {FetchStatus} from "../../types/api.types"
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import BackImg from "../../components/BackImg/BackImg"
import NeedDev from "../../components/NeedDev/NeedDev"
import MediaContext from "../../context/media.context"
import usePageState from "../../hooks/usePageState"
import useStorage from "../../hooks/useStorage"
import OpacityYDiv from "../../components/UI/OpacityYDiv"
import Arrow from "../../assets/imgs/Arrow"
import CustomLink from "../../components/Navigation/CustomLink"
import List from "../../components/List/List"
import PageContext from "../../context/page.context"


const Home:FC = () => {
   const { setIsFetchingData } = useContext(PageContext)

   const { state, status: stateStatus } = usePageState('projects')
   const { getOneUrl } = useStorage()

   const [mainImgStatus, setMainImgStatus] = useState(FetchStatus.INIT)
   const [mainImg, setMainImg] = useState('')

   const [loading, setLoading] = useState(false)

   const { vw, large } = useContext(MediaContext)

   const scrollClick = () => {
      window.scrollTo(0, window.innerHeight * .9)
   }

   const onProjectsClick = () => {
      document.getElementById('projects-list')?.scrollIntoView()
   }

   useEffect(() => {
      const fetchPhoto = async (path: string) => {
         const url = await getOneUrl(path)

         setMainImg(url)
      }

      if (state?.mainPhoto && !mainImg)
         fetchPhoto(state.mainPhotoPc)
   }, [state])

   useEffect(() => {
      if (mainImg) {
         const newImg = new Image()

         newImg.onload = () => { setMainImgStatus(FetchStatus.LOADED) }

         newImg.src = mainImg
      }
   }, [mainImg])

   useEffect(() => {
      if (stateStatus !== FetchStatus.INIT && mainImgStatus !== FetchStatus.INIT) {
         setLoading(false)
         setIsFetchingData(false)
      }
   }, [stateStatus, mainImgStatus])

   return(
      <>
         <PageLoader loading={loading}/>

            <BackImg photoSrc={mainImg}/>

            { large &&
               <motion.div
                  onClick={scrollClick}
                  className={classes.arrow_down}
                  initial={{ y: 0 }}
                  whileHover={{ scale: 1.2 }}
                  animate={{
                     y: 15,
                     transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeIn'
                     } }}
               >
                  <Arrow/>
               </motion.div>
            }

            <OpacityYDiv className={classes.intro}>
               <h4 className={classes.name}>Dzemych Ivan</h4>

               <h1 className={classes.position}>
                  { vw < 770 ? 'Web Developer' : 'Website and software developer' }
               </h1>

               <p className={classes.description}>
                  { state?.title && state.title }
               </p>

               <div className={classes.links}>
                  <a onClick={onProjectsClick}>View Projects</a> or <CustomLink to={'/about'}>Read About Me</CustomLink>
               </div>
            </OpacityYDiv>

            { state?.works &&
               <List id={'projects-list'} title={'Work places'} arr={state.works}/>
            }

            <hr className={classes.hr}/>

            { state?.projects &&
               <List id={'projects-list'} title={'Projects'} arr={state.projects}/>
            }

         <NeedDev/>
      </>
   )
}


export default Home