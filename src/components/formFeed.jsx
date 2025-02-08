import React, { useRef, useState } from "react";
import { CiImageOn as Image } from "react-icons/ci";
import { MdOutlineGifBox as Gif } from "react-icons/md";
import { FaRegSmile as Smile } from "react-icons/fa";
import ImagePreview from "./ImagePreview";
import { toast } from "react-toastify";
import uploadToStorage from "../firebase/uploadToStorage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const FormFeed = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const removeImage = () => {
          setImage(null);
          if(fileInputRef.current){
              fileInputRef.current.value = "";
          }
      }
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const file = e.target.image.files[0];
    if (!text && !file) return toast.warning("Please select a content");
    try {setIsLoading(true);
      const url = await uploadToStorage(file)
      console.log(url);
      const collectionRef = collection(db,"tweets")
      addDoc(collectionRef,{
        content:{
          text,
          image: url,
        },
        isEdited: false,
        likes:[],
        createdAt:serverTimestamp(),
        user:{
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        }
      });
      e.target.reset()
      removeImage()
    } catch {
      (err) => console.error(err);
    }
    setIsLoading(false)
  };
  return (
    <div className="border-b border-tw-gray p-4 gap-3">
      <img
        src={user.photoURL}
        alt={user.displayName}
        className="size-[35px] md:size-[45px] rounded-full"
      />
      <form className="w-full pt-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          className="w-full bg-transparent mb-2 md:text-lg text-zinc-300 outline-none resize-y min-h-[40px] max-h-[300px]"
          placeholder="What's happening?"
        ></textarea>
        <ImagePreview
          image={image}
          setImage={setImage}
          fileInputRef={fileInputRef}
          removeImage={removeImage}
        />
        <div className="flex justify-between">
          <div className="text-tw-blue text-xl flex gap-4">
            <label htmlFor="image" type="button" className="form-icon">
              <Image />
              <input
                id="image"
                type="file"
                name="image"
                className="text-xs hidden"
                onChange={onImageChange}
                ref={fileInputRef}
              />
            </label>
            <button type="button" className="form-icon">
              <Gif />
            </button>
            <button type="button" className="form-icon">
              <Smile />
            </button>
          </div>
          <button
            type="submit"
            className="mt-10 bg-secondary text-primary tracking-wide rounded-full px-5 py-[6px] font-bold transition hover:bg-zinc-300 hover:brightness-70 min-w-[100px] cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormFeed;
