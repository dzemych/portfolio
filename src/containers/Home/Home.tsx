import {FC, useContext, useEffect, useState} from 'react'
import classes from './Home.module.sass'
import {FetchStatus} from "../../types/api.types"
import PageLoader from "../../components/PageLoader/PageLoader"
import test from '../../assets/imgs/bg_home.png'
import BackImg from "../../components/BackImg/BackImg"
import CustomLink from "../../components/Navigation/CustomLink"
import List from "../../components/List/List"
import OpacityYDiv from "../../components/Animations/OpacityYDiv"
import NeedDev from "../../components/NeedDev/NeedDev"
import MediaContext from "../../context/media.context"
import Arrow from "../../assets/imgs/Arrow"
import {motion} from "framer-motion"


const Home:FC = () => {
   const [status, setStatus] = useState(FetchStatus.INIT)

   const { vw, large } = useContext(MediaContext)

   const scrollClick = () => {
      window.scrollTo(0, window.innerHeight * .9)
   }

   useEffect(() => {
      setStatus(FetchStatus.LOADED)
   }, [])

   const onProjectsClick = () => {
      document.getElementById('projects-list')?.scrollIntoView()
   }

   return(
      <>
         <PageLoader status={status}/>

         <BackImg photoSrc={test}/>

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
               Fullstack web developer.&nbsp;
               I've build projects from scratch, from figma templates to server administration.&nbsp;
               Worked in team as a full-time front-end developer.&nbsp;
            </p>

            <div className={classes.links}>
               <a onClick={onProjectsClick}>View Projects</a> or <CustomLink to={'/about'}>Read About Me</CustomLink>
            </div>
         </OpacityYDiv>

         <List id={'projects-list'} title={'Projects'}/>

         <hr className={classes.hr}/>

         <List id={'projects-list'} title={'Work places'}/>

         <NeedDev/>
      </>
   )
}


export default Home