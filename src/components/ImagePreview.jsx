import React from 'react'
import { IoMdClose } from 'react-icons/io'

const ImagePreview = ({image, removeImage}) => {
    

  return (
    image && <div className='relative mb-3'>
        <button type="button" className='absolute top-3 end-3 p-3 bg-primary/90 rounded-full transition hover:bg-zinc-800 cursor-pointer' onClick={removeImage}><IoMdClose/></button>
         <img src={image} alt="preview" className='rounde-md '/>
    </div>
  )
}

export default ImagePreview