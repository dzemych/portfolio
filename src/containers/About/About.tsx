import {FC, useContext, useEffect} from "react"
import classes from "./About.module.sass"
import PageLoader from "../../components/Navigation/PageLoader/PageLoader"
import {FetchStatus} from "../../types/api.types"
import OpacityYDiv from "../../components/UI/OpacityYDiv"
import OpacityDiv from "../../components/UI/OpacityDiv"
import NeedDev from "../../components/NeedDev/NeedDev"
import usePageState from "../../hooks/usePageState"
import PageContext from "../../context/page.context"


interface ISkill {
   title: string
   list: string[]
}

interface IPattern {
   title: string
   text: string
}

interface ILang {
   title: string
   text: string
}

const About:FC = () => {

   const { setIsFetchingData } = useContext(PageContext)
   const { state, status: stateStatus } = usePageState("about")

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
         <p className={classes.pattern_text} style={{ margin: "8px 0" }}>
            <span className={classes.pattern_subtitle}>{title}</span>

            &nbsp;— {text}
         </p>
      </OpacityYDiv>
   )

   useEffect(() => {
      if (stateStatus !== FetchStatus.INIT) {
         setIsFetchingData(false)
      }
   }, [stateStatus])

   return(
      <div className={classes.container}>
         <PageLoader text={"Read about me"} loading={stateStatus === FetchStatus.INIT}/>

         <OpacityYDiv>
            <h1 className={classes.title}>About me</h1>
         </OpacityYDiv>

         <OpacityYDiv>
            <p className={classes.text}>
               {state && state.title}
            </p>
         </OpacityYDiv>

         <div className={classes.skill_section}>
            { state && state.skills.map((el: ISkill) => renderSkillBlock(el.title, el.list)) }
         </div>

         <OpacityDiv>
            <hr className={classes.hr}/>
         </OpacityDiv>

         <OpacityYDiv>
            <h3 className={classes.pattern_title}>Principles I use</h3>
         </OpacityYDiv>

         <div className={classes.pattern_section}>
            {state && state.patterns.map((el: IPattern) => renderPattern(el.title, el.text))}
         </div>

         <OpacityDiv>
            <hr className={classes.hr}/>
         </OpacityDiv>

         <OpacityYDiv>
            <h3 className={classes.pattern_title + " " + classes.lang_title}>Language skills</h3>

            <div className={classes.lang_section}>
               {state && state.lang.map((el: ILang) => renderLang(el.title, el.text))}
            </div>
         </OpacityYDiv>

         <NeedDev/>
      </div>
   )
}


export default About