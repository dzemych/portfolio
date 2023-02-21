import {FC} from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "./containers/Home/Home"
import Contacts from "./containers/Contacts/Contacts"
import About from "./containers/About/About"
import Project from "./containers/Project/Project"


const Router:FC = () => {
   return(
      <Routes>
         <Route path={'/'} element={ <Home/> } />
         <Route path={'/contacts'} element={ <Contacts/> }/>
         <Route path={'/about'} element={ <About/> }/>
         <Route path={'/projects'} element={ <Home/> }/>
         <Route path={'/projects/:slug'} element={ <Project/> }/>
         <Route path={'/:slug'} element={ <Project/> }/>
      </Routes>
   )
}


export default Router