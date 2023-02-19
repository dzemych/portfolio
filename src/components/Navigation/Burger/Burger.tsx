import {FC, useContext, useEffect, useState} from 'react'
import classes from './Burger.module.sass'
import {FetchStatus} from "../../../types/api.types"
import PageContext from "../../../context/page.context"


interface IProps {
   open: boolean
}

const Burger:FC<IProps> = ({ open = false }) => {
   // const { pageLoader } = useContext(PageContext)
   const [state, setState] = useState<FetchStatus>(FetchStatus.INIT)

   const cls = [classes.container]

   if (state !== FetchStatus.INIT) {
      if (open)
         cls.push(classes.open_to_close)
      else
         cls.push(classes.close_to_open)
      // else if (pageLoader)
      //    cls.push(classes.close_opacity)
      // else
      //    cls.push(classes.closed)
   }

   useEffect(() => {
      if (open)
         setState(FetchStatus.LOADED)
   }, [open])

   return(
      <div className={cls.join(' ')}>
         <div className={classes.first_row}/>

         <div className={classes.second_row}/>

         <div className={classes.third_row}/>
      </div>
   )
}


export default Burger