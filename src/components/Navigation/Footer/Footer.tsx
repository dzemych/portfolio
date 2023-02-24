import {FC, useContext} from 'react'
import classes from './Footer.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import CustomLink from "../CustomLink"
import {ReactComponent as Logo} from '../../../assets/imgs/logo.svg'
import MediaContext from "../../../context/media.context"
import ContactsContext from "../../../context/contacts.context"


const Footer:FC = () => {
   const { telText, tel, email } = useContext(ContactsContext)

   const { large } = useContext(MediaContext)

   return(
      <footer className={classes.container}>
         <div className={classes.wrapper}>

            <div className={classes.section}>
               <div className={classes.block}>
                  <h4 className={classes.title}>
                     Contacts information —
                  </h4>

                  <p className={classes.text}>
                     Feel free to reach my any time. More contacts at <CustomLink to={'/contacts'}>contacts page</CustomLink>
                  </p>

                  <div className={classes.contacts_container}>
                     <div className={classes.row}>
                        <div className={classes.left}>
                           <FontAwesomeIcon icon={faEnvelope} className={classes.icon}/>
                        </div>

                        <div className={classes.right}>
                           <a href={`mailto:${email}`}>{email}</a>
                        </div>
                     </div>

                     <div className={classes.row}>
                        <div className={classes.left}>
                           <FontAwesomeIcon icon={faPhone} className={classes.icon}/>
                        </div>

                        <div className={classes.right}>
                           <a href={`tel:${tel}`}>{ telText }</a>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={classes.block} style={{ flexDirection: large ? 'row' : 'column' }}>
                  <h4 className={classes.title}>
                     Follow me on —
                  </h4>

                  <div className={classes.social_container}>
                     <a href="https://github.com/dzemych" target="_blank">Github</a>
                     <a href="https://www.linkedin.com/in/dzemych/" target="_blank">LinkedIn</a>
                  </div>

               </div>
            </div>

            <div className={classes.author_container}>
               <div className={classes.logo_container}>
                  <Logo/>
               </div>

               <div className={classes.logo_text}>
                  Copyright {new Date().getFullYear()} © <br/>
                  Powered by Dzemych Ivan
               </div>
            </div>
         </div>
      </footer>
   )
}


export default Footer