import React, { useRef, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { auth, db } from "../../firebase"
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import EditModal from '../../components/editModal'

const Dropdown = ({tweet}) => {
  const [isOpen, setIsOpen] = useState(false)
  const checkRef = useRef()

  const isOwn = tweet.user.id === auth.currentUser.uid;
  const handleDelete = () => {
    if(!confirm('Are you sure you want to delete?')) return;
    const docRef = doc(db, "tweets", tweet.id)
    deleteDoc(docRef).then(()=> toast.info("Tweet deleted successfully."))
  }

  return (
   isOwn && ( <div>
<label className="popup">
  <input type="checkbox" ref={checkRef} />
  <div className="burger" tabIndex="0">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <nav className="popup-window">
    <legend>Actions</legend>
    <ul>
      <li>
        <button onClick={()=>{ setIsOpen(true), checkRef.current.checked=false}}>
          <MdEdit className='text-blue-500 text-base'/>
          <span>Edit</span>
        </button>
      </li>
      <hr/>
      <li >
        <button onClick={handleDelete}>
         <MdDelete className='text-red-500 text-base'/>
          <span>Delete</span>
        </button>
      </li>
    </ul>
  </nav>
</label>
<EditModal isOpen={isOpen} tweet={tweet} close={()=> setIsOpen(false)}/>
    </div>)
  )
}

export default Dropdown