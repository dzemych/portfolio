import React from 'react'
import MainLayout from "./layout/MainLayout"
import Router from "./Router"
import {BrowserRouter} from "react-router-dom"
import './assets/styles/global.sass'
import './assets/styles/media.sass'
import './assets/styles/colors.sass'
import './assets/styles/fonts.sass'
import ContextWrapper from "./hoc/ContextWrapper"


function App() {
   return (
      <BrowserRouter>
         <ContextWrapper>
            <MainLayout>
               <Router/>
            </MainLayout>
         </ContextWrapper>
      </BrowserRouter>
   )
}

export default App
