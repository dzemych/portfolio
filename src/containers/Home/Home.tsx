import {FC, useEffect, useState} from 'react'
import classes from './Home.module.sass'
import {FetchStatus} from "../../types/api.types"
import PageLoader from "../../components/PageLoader/PageLoader"
import test from '../../assets/imgs/bg_home.png'
import BackImg from "../../components/HomeBack/BackImg"
import CustomLink from "../../components/Navigation/CustomLink"
import List from "../../components/List/List"


const Home:FC = () => {
   const [status, setStatus] = useState(FetchStatus.INIT)

   useEffect(() => {
      setStatus(FetchStatus.LOADED)
   }, [])

   return(
      <div>
         <PageLoader status={status}/>

         <BackImg photoSrc={test}/>

         <div className={classes.intro}>
            <h4 className={classes.name}>Dzemych Ivan</h4>

            <h1 className={classes.position}>Web developer</h1>

            <p className={classes.description}>
               Fullstack web developer.&nbsp;
               I've build projects from scratch, from figma templates to server administration.&nbsp;
               Worked in team as a full-time front-end developer.&nbsp;
               {/*More information about me - <a href="">About me</a>*/}
            </p>

            <div className={classes.description}>
               <CustomLink to={'/'}>View Projects</CustomLink> or <CustomLink to={'/about'}>Read About Me</CustomLink>
            </div>
         </div>

         <List/>
      </div>
   )
}


export default Home