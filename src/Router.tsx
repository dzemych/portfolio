import {FC, useContext} from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "./containers/Home/Home"
import Contacts from "./containers/Contacts/Contacts"
import About from "./containers/About/About"
import Project from "./containers/Project/Project"
import Admin from "./containers/Admin/Admin"
import AuthContext from "./context/auth.context"
import Auth from "./containers/Auth/Auth"
import EditProject from "./containers/EditProject/EditProject"


const Router:FC = () => {
   const { isAuth } = useContext(AuthContext)

   return(
      <Routes>
         <Route path={'/'} element={ <Home/> } />
         <Route path={'/contacts'} element={ <Contacts/> }/>
         <Route path={'/about'} element={ <About/> }/>
         <Route path={'/projects'} element={ <Home/> }/>
         <Route path={'/projects/:slug'} element={ <Project/> }/>
         <Route path={'/:slug'} element={ <Project/> }/>
         { true
            ? <>
               <Route path={'/admin'} element={ <Admin/> }/>
               <Route path={'/admin/:slug'} element={ <EditProject/> }/>
            </>
            : <Route path={'/admin'} element={ <Admin/> }/>
         }
      </Routes>
   )
}


export default Router