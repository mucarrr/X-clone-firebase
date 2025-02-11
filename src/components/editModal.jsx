import React, { useState } from "react";
import Modal from "../components/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import uploadToStorage from "../firebase/uploadToStorage"
import Loader from "../components/Loader"

const editModal = ({ isOpen, close, tweet }) => {
  const [isImgDeleting, setIsImgDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value.trim();
    const file = e.target[1].files && e.target[1].files[0];

    if (!text && !file && !tweet.content.image) {
        return toast.info("Please choose a content");
      }

    try{
        setIsLoading(true);
        const docRef = doc(db, "tweets", tweet.id);
        let updatedData = {
          "content.text": text,
          isEdited: true,
        };
        if(isImgDeleting){
            updatedData["content.image"] = null;
        };
        if(file){
            const imageUrl = await uploadToStorage(file);
            updatedData["content.image"] = imageUrl;
        };
        await updateDoc(docRef, updatedData);
        close();
    }catch(e){
        console.log(e);     
    }
    setIsLoading(false)
    setIsImgDeleting(false)
  };
  return (
    isOpen && (
      <Modal isOpen={isOpen} close={close}>
        <h1 className="text-2xl">Edit tweet</h1>
        <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
          <label className="text-sm mb-3">Change the text content</label>
          <textarea
            className="resize-y min-h-20 max-h-[250px] bg-black text-secondary border border-zinc-700 rounded-md p-3"
            defaultValue={tweet.content.text}
          ></textarea>
          <label className="text-sm mt-8 mb-3">Change the image</label>
          {!isImgDeleting && tweet.content.image ? (
            <button
              className="border border-zinc-700 p-2 rounded-md hover:bg-zinc-700/30 cursor-pointer transition"
              type="button"
              onClick={() => setIsImgDeleting(true)}
            >
              Remove image
            </button>
          ) : (
            <input
              type="file"
              className="border border-zinc-700 p-2 rounded-md hover:bg-zinc-700/30 cursor-pointer transition"
            />
          )}
          <div className="flex justify-end gap-5 mt-10">
            <button type="button" className="cursor-pointer" onClick={close}>
              Cancel
            </button>
            <button
              className="bg-secondary text-black px-3 py-1 rounded cursor-pointer hover:bg-secondary/70 transition min-w-[80px]"
              type="submit"
              disabled={isLoading}
            >
                {isLoading ? <Loader /> : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default editModal;
