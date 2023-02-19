import {FC, useEffect, useState} from 'react'
import PageLoader from "../../components/PageLoader/PageLoader"
import {FetchStatus} from "../../types/api.types"


const Projects:FC = () => {
   const [status, setStatus] = useState(FetchStatus.INIT)

   useEffect(() => {
      setStatus(FetchStatus.LOADED)
   }, [])

   return(
      <div>
         <PageLoader status={status}/>

         <h1>Projects</h1>
      </div>
   )
}


export default Projects