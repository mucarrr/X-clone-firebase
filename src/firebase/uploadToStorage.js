import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "./index";
import { v4 } from "uuid";

const uploadToStorage = async (file)=> {
    if(!file || !file.type.startsWith("image")) return null;

    if(file.size > 2097152){
        toast.error("Your video file is too large. Please upload a file that is under 2GB in size")
        throw new Error('Your video file is too large. ')
    }
    const imageRef = ref(storage, v4() + file.name) //storageda dosyanin yerini belirledi
    await uploadBytes(imageRef, file)
    const url = await getDownloadURL(imageRef)
    return url;


    
}
export default uploadToStorage