import {FC, useEffect, useState} from 'react'
import classes from './About.module.sass'
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import {FetchStatus} from "../../types/api.types"
import OpacityYDiv from "../../components/UI/OpacityYDiv"
import OpacityDiv from "../../components/UI/OpacityDiv"
import NeedDev from "../../components/NeedDev/NeedDev"


const skills = [
   {
      title: 'Front end Skills',
      list: [
         'JavaScript',
         'HTML',
         'CSS',
         'SASS/SCSS',
         'ReactJS',
         'TypeScript',
         'NextJs',
         'Redux',
         'ReduxSaga',
         'Webpack'
      ],
   },
   {
     title: 'Back end skills',
     list: [
        'Linux',
        'Nginx',
        'Apache',
        'Backups with rsync',
        'Postfix',
        'Dovecot',
        'Roundcube'
     ]
   },
   {
      title: 'Server skills',
      list: [
         'NodeJs',
         'Express',
         'NestJs',
         'MongoDB',
         'Mongoose',
         'MySQL',
         'MariaDB'
      ]
   }
]

const patterns = [
   { title: 'OOP', text: 'Object-oriented programming (OOP) is a computer programming model that organizes' },
   { title: 'KISS', text: 'Object-oriented programming (OOP) is a computer programming model that organizes' },
   { title: 'BEM', text: 'Object-oriented programming (OOP) is a computer programming model that organizes' }
]

const lang = [
   { title: 'English', text: 'fluent (B2)' },
   { title: 'Polish', text: 'A1' },
   { title: 'Ukrainian', text: 'native' },
   { title: 'Russian', text: 'native' }
]

const About:FC = () => {
   const [status, setStatus] = useState(FetchStatus.INIT)

   const renderSkill = (text: string, idx: number, arr: string[]) => (
      <div key={idx}>
         <span className={classes.skill_text}>{ text }</span>
         { idx !== arr.length - 1 &&
            <span className={classes.text_divider}>/</span>
         }
      </div>
   )

   const renderSkillBlock = (title: string, arr: string[]) => (
      <OpacityYDiv className={classes.skill_block} key={title}>
         <h5 className={classes.skill_title}>{title}</h5>

         <div className={classes.skill_list}>
            { arr.map((el, i, arr) => renderSkill(el, i, arr)) }
         </div>
      </OpacityYDiv>
   )

   const renderPattern = (title: string, text: string) => (
      <OpacityYDiv className={classes.pattern_item} key={title}>
         <p className={classes.pattern_text}>
            <span className={classes.pattern_subtitle}>{title}</span>

            &nbsp;— {text}
         </p>
      </OpacityYDiv>
   )

   const renderLang = (title: string, text: string) => (
      <OpacityYDiv className={classes.pattern_item} key={title}>
         <p className={classes.pattern_text} style={{ margin: '8px 0' }}>
            <span className={classes.pattern_subtitle}>{title}</span>

            &nbsp;— {text}
         </p>
      </OpacityYDiv>
   )

   useEffect(() => {
      setStatus(FetchStatus.LOADED)
   }, [])

   return(
      <div className={classes.container}>
         <PageLoader status={status} text={'Read about me'}/>

         <OpacityYDiv>
            <h1 className={classes.title}>About me</h1>
         </OpacityYDiv>

         <OpacityYDiv>
            <p className={classes.text}>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque iste nisi officiis voluptas. Alias aperiam, corporis dicta dolorem inventore libero magni maxime minus officiis possimus quas qui quis similique temporibus?
            </p>
         </OpacityYDiv>

         <div className={classes.skill_section}>
            { skills.map((el) => renderSkillBlock(el.title, el.list)) }
         </div>

         <OpacityDiv>
            <hr className={classes.hr}/>
         </OpacityDiv>

         <OpacityYDiv>
            <h3 className={classes.pattern_title}>Patterns I use</h3>
         </OpacityYDiv>

         <div className={classes.pattern_section}>
            {patterns.map(el => renderPattern(el.title, el.text))}
         </div>

         <OpacityDiv>
            <hr className={classes.hr}/>
         </OpacityDiv>

         <OpacityYDiv>
            <h3 className={classes.pattern_title + ' ' + classes.lang_title}>Language skills</h3>

            <div className={classes.lang_section}>
               {lang.map(el => renderLang(el.title, el.text))}
            </div>
         </OpacityYDiv>

         <NeedDev/>
      </div>
   )
}


export default About