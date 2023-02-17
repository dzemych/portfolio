import { FC } from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "./containers/Home/Home"


const Router:FC = () => {
   return(
      <Routes>
         <Route path={'/'} element={ <Home/> }/>
      </Routes>
   )
}


export default Router