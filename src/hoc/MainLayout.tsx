import {FC, ReactNode} from 'react'
import classes from './MainLayout.module.sass'
import Header from "../components/Navigation/Header/Header"
import Footer from "../components/Navigation/Footer/Footer"
import PagePreLoader from "../components/PagePreLoader/PagePreLoader"
import Curtain from "../components/Navigation/Curtain/Curtain"


interface IProps {
   children: ReactNode
}

const MainLayout:FC<IProps> = ({ children }) => {
   return(
      <div className={classes.container}>
         <PagePreLoader/>

         <Curtain/>

         <Header/>

         <div className={classes.header_back_drop}/>

         <main className={classes.wrapper}>
            { children }
         </main>

         <Footer/>
      </div>
   )
}


export default MainLayout