import React from 'react'
import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from 'react-icons/fa'
import { FaShareNodes } from 'react-icons/fa6'
import { arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import { auth, db } from "../../firebase"

const Buttons = ({tweet}) => {
const isLiked = tweet.likes.includes(auth.currentUser.uid)

    const toggleLike = async () =>{
        const docRef = doc(db, "tweets", tweet.id)
        await updateDoc(docRef,{
            likes: isLiked ? arrayRemove(auth.currentUser.uid) : arrayUnion(tweet.user.id)
        })
    }
  return (
    <div className='flex justify-between items-center text-zinc-500'>
<button className='post-icons hover:text-blue-400 hover:bg-blue-400/20'>
    <FaRegComment/>
</button>
<button className='post-icons hover:bg-green-300/20'>
    <FaRetweet/>
</button>
<button onClick={toggleLike} className='flex items-center hover:text-pink-500 relative '>
   <span className='hover:bg-pink-500/20 post-icons'>
   {isLiked ? <FaHeart className='text-pink-500'/> : <FaRegHeart/>}
   </span>
    <span className={`absolute -end-1 ${isLiked ? 'text-pink-500': 'text-zinc-500'}`}>{tweet.likes.length}</span>
</button >
<button className='post-icons hover:bg-blue-400/20 hover:text-blue-400'>
    <FaShareNodes/>
</button>
    </div>
  )
}

export default Buttons