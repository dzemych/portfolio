import React from 'react'
import MainLayout from "./hoc/MainLayout"
import Router from "./Router"
import {BrowserRouter} from "react-router-dom"
import './assets/styles/global.sass'
import './assets/styles/media.sass'
import './assets/styles/colors.sass'
import './assets/styles/fonts.sass'
import PageLayout from "./hoc/PageLayout"


function App() {
   return (
      <BrowserRouter>
         <PageLayout>
            <MainLayout>
               <Router/>
            </MainLayout>
         </PageLayout>
      </BrowserRouter>
   )
}

export default App
