import React from 'react'
import MainLayout from "./layout/MainLayout"
import Router from "./Router"
import {BrowserRouter} from "react-router-dom"
import './assets/styles/global.sass'
import './assets/styles/media.sass'
import './assets/styles/colors.sass'
import './assets/styles/fonts.sass'
import WithAuth from "./hoc/WithAuth"
import WithPageLayout from "./hoc/WithPageLayout"
import WithMedia from "./hoc/WithMedia"
import WithContacts from "./hoc/WithContacts"


function App() {
   return (
      <WithAuth>
         <BrowserRouter>
            <WithContacts>
               <WithMedia>
                  <WithPageLayout>
                     <MainLayout>
                        <Router/>
                     </MainLayout>
                  </WithPageLayout>
               </WithMedia>
            </WithContacts>
         </BrowserRouter>
      </WithAuth>
   )
}

export default App
