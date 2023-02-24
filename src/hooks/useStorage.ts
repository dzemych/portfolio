import {deleteObject, getDownloadURL, ref as stRef, uploadBytes} from "firebase/storage"
import {storage} from "../firebase"


type HookUseStorage = () => {
   getUrls: (arr: string[]) => Promise<string[]>
   getOneUrl: (path: string) => Promise<string>
   uploadProjectImg: (slug: string, img: File) => Promise<string>
   uploadFile: (path: string, img: File) => Promise<string>
   deleteFile: (path: string) => void
}

const useStorage: HookUseStorage = () => {
   const getUid = () => {
      return `${Math.ceil(Math.random() * 10000)}-${new Date().getTime()}`
   }

   const getUrls = async (pathArr: string[]) => {
      const urlPromises = pathArr.map(el => getDownloadURL(stRef(storage, el)))

      return await Promise.all(urlPromises)
   }

   const getOneUrl = async (path: string) => {
      return await getDownloadURL(stRef(storage, path))
   }

   const uploadProjectImg = async (slug: string, img: File) => {
      const newPath = `projects/${slug}/${getUid()}`
      const storageRef = stRef(storage, newPath)

      await uploadBytes(storageRef, img)

      return newPath
   }

   const uploadFile = async (path: string, file: File) => {
      const storageRef = stRef(storage, path)

      await uploadBytes(storageRef, file)

      return path
   }

   const deleteFile = async (path: string) => {
      await deleteObject(stRef(storage, path))
   }

   return { getOneUrl, getUrls, uploadProjectImg, deleteFile, uploadFile }
}


export default useStorage