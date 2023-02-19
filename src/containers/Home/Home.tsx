import {FC, useEffect, useState} from 'react'
import {FetchStatus} from "../../types/api.types"
import PageLoader from "../../components/PageLoader/PageLoader"


const Home:FC = () => {
   const [status, setStatus] = useState(FetchStatus.INIT)

   useEffect(() => {
      setStatus(FetchStatus.LOADED)
   }, [])

   return(
      <div>
         <PageLoader status={status}/>

         <h1>Home</h1>
      </div>
   )
}


export default Home