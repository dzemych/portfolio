import {FC, useContext, useEffect, useState} from 'react'
import classes from './Contacts.module.sass'
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import {FetchStatus} from "../../types/api.types"
import {faTelegram, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import OpacityYDiv from "../../components/UI/OpacityYDiv"
import OpacityDiv from "../../components/UI/OpacityDiv"
import WorkAnim from "./WorkAnim"
import MediaContext from "../../context/media.context"


const list = [
   { icon: faTelegram, text: '@dzemych', url: 'https://t.me/dzemych' },
   { icon: faLinkedin, text: 'dzemych', url: 'https://www.linkedin.com/in/dzemych/' },
   { icon: faGithub, text: 'dzemych', url: 'https://github.com/dzemych' },
]

const Contacts:FC = () => {
   const { large } = useContext(MediaContext)

   const [status, setStatus] = useState(FetchStatus.INIT)

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
      setStatus(FetchStatus.LOADED)
   }, [])

   return(
      <div className={classes.container}>
         <PageLoader status={status} text={'Get in touch'}/>

         <OpacityYDiv duration={.39}>
            <h1 className={classes.title}>Fell free to reach me any time</h1>
         </OpacityYDiv>

         <OpacityYDiv>
            <h3 className={classes.subtitle}>
               I prefer to talk over telegram or linkedIn, cause email message I might miss, or you can call me.
               I can easily move to another city in Poland or to another country there is nothing that keeps here.
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
                     <a href="mailto:dzemichivan@gmail.com" className={classes.link_container}>
                        <FontAwesomeIcon icon={faEnvelope} className={classes.link_icon}/>

                        <span className={classes.link_link}>
                        dzemichivan@gmail.com
                     </span>
                     </a>
                  </OpacityYDiv>

                  <OpacityDiv>
                     <hr className={classes.contacts_hr}/>
                  </OpacityDiv>

                  <OpacityYDiv>
                     <a href="tel:+48515285228" className={classes.link_container}>
                        <FontAwesomeIcon icon={faPhone} className={classes.link_icon}/>

                        <span className={classes.link_link}>
                        +48 515 285 228
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
                  <span className={classes.address}>Lodz, Poland</span>
               </OpacityYDiv>
            </div>
         </div>

         { large &&
            <OpacityDiv className={classes.anim_wrapper}>
               <WorkAnim/>
            </OpacityDiv>
         }
      </div>
   )
}


export default Contacts