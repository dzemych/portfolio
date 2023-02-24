import {FC, useContext, useEffect, useState} from 'react'
import classes from './Contacts.module.sass'
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import {FetchStatus} from "../../types/api.types"
import {faGithub, faLinkedin, faTelegram} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import OpacityYDiv from "../../components/UI/OpacityYDiv"
import OpacityDiv from "../../components/UI/OpacityDiv"
import WorkAnim from "./WorkAnim"
import MediaContext from "../../context/media.context"
import usePageState from "../../hooks/usePageState"
import PageContext from "../../context/page.context"


const list = [
   { icon: faTelegram, text: '@dzemych', url: 'https://t.me/dzemych' },
   { icon: faLinkedin, text: 'dzemych', url: 'https://www.linkedin.com/in/dzemych/' },
   { icon: faGithub, text: 'dzemych', url: 'https://github.com/dzemych' },
]

const Contacts:FC = () => {
   const { setIsFetchingData } = useContext(PageContext)

   const { large } = useContext(MediaContext)
   const { state, status: stateStatus } = usePageState('contacts')

   const renderContact = (icon: typeof faTelegram, text: string, url: string) => (
      <OpacityYDiv key={`${text}-${url}`}>
         <a href={url} target="_blank" className={classes.link_container}>
            <FontAwesomeIcon icon={icon} className={classes.link_icon}/>

            <span className={classes.link_link}>
               {text}
            </span>
         </a>

         <OpacityDiv>
            <hr className={classes.contacts_hr}/>
         </OpacityDiv>
      </OpacityYDiv>
   )

   useEffect(() => {
      if (stateStatus !== FetchStatus.INIT) {
         setIsFetchingData(false)
      }
   }, [stateStatus])

   return(
      <div className={classes.container}>
         <PageLoader loading={stateStatus === FetchStatus.INIT} text={'Get in touch'}/>

         <OpacityYDiv duration={.39}>
            <h1 className={classes.title}>Fell free to reach me any time</h1>
         </OpacityYDiv>

         <OpacityYDiv>
            <h3 className={classes.subtitle}>
               { state && state.title }
            </h3>
         </OpacityYDiv>

         <OpacityDiv>
            <hr className={classes.hr}/>
         </OpacityDiv>

         <div className={classes.content}>
            <div className={classes.contacts_block}>
               <OpacityYDiv>
                  <h5 className={classes.light_title} style={{ marginBottom: 15 }}>Contact information</h5>
               </OpacityYDiv>

               <ul>
                  { list.map(el => renderContact(el.icon, el.text, el.url)) }

                  <OpacityYDiv>
                     <a href={`mailto:${state && state.email}`} className={classes.link_container}>
                        <FontAwesomeIcon icon={faEnvelope} className={classes.link_icon}/>

                        <span className={classes.link_link}>
                           {state && state.email}
                        </span>
                     </a>
                  </OpacityYDiv>

                  <OpacityDiv>
                     <hr className={classes.contacts_hr}/>
                  </OpacityDiv>

                  <OpacityYDiv>
                     <a href={`tel:${state && state.tel}`} className={classes.link_container}>
                        <FontAwesomeIcon icon={faPhone} className={classes.link_icon}/>

                        <span className={classes.link_link}>
                           { state && state.telText }
                        </span>
                     </a>
                  </OpacityYDiv>
               </ul>
            </div>

            <div className={classes.address_container}>
               <OpacityYDiv>
                  <h5 className={classes.light_title}>Currently located in</h5>
               </OpacityYDiv>

               <OpacityYDiv>
                  <span className={classes.address}>{ state && state.address }</span>
               </OpacityYDiv>
            </div>
         </div>

         { large &&
            <OpacityDiv className={classes.anim_wrapper} duration={.39}>
               <WorkAnim/>
            </OpacityDiv>
         }
      </div>
   )
}


export default Contacts