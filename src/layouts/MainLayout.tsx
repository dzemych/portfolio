import {FC, ReactNode} from 'react'
import Header from "../components/Navigation/Header"
import Footer from "../components/Navigation/Footer"


interface IProps {
   children: ReactNode
}

const MainLayout:FC<IProps> = ({ children }) => {
   return(
      <div>
         <Header/>

         <main>
            { children }
         </main>

         <Footer/>
      </div>
   )
}


export default MainLayout