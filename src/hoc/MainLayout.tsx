import {FC, ReactNode} from 'react'
import classes from './MainLayout.module.sass'
import Header from "../components/Navigation/Header/Header"
import Footer from "../components/Navigation/Footer/Footer"
import PagePreLoader from "../components/PagePreLoader/PagePreLoader"


interface IProps {
   children: ReactNode
}

const MainLayout:FC<IProps> = ({ children }) => {
   return(
      <div className={classes.container}>
         <PagePreLoader/>

         <Header/>

         <main className={classes.wrapper}>
            { children }
         </main>

         <Footer/>
      </div>
   )
}


export default MainLayout