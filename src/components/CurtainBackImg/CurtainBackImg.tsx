import {FC, useContext} from 'react'
import classes from './CurtainBackImg.module.sass'
import CurtainBackImgContext from "../../context/curtainBackImg.context"


const CurtainBackImg:FC = () => {
   const { pageImg } = useContext(CurtainBackImgContext)

   console.log(pageImg)

   const getPageImg = () => {

   }

   return(
      <div className={classes.container}>

      </div>
   )
}


export default CurtainBackImg