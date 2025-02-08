import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { IoEyeOutline as Open } from "react-icons/io5";
import { IoEyeOffOutline as Closed } from "react-icons/io5";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Form = () => {
    const navigate = useNavigate()
  const [isShow, setIsShow] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    // sign up modunda ise hesap olustur
    try{
        if (isSignUp) {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
           // dogrulama epostasi gonder
           await sendEmailVerification(res.user)
           //bildirim gonder
           toast.info("Please check your email for verification.")
            setIsSignUp(false);
          } else {
            const res = await signInWithEmailAndPassword(auth, email, password);
            if(!res.user.emailVerified){
              return toast.info("Please verify your email")
            }else{
              navigate("/feed")
              toast.success("Sign-in completed successfully.")
            }
          }
          e.target.reset();
          // sign in modunda ise oturum ac
          //anasayfa yonlendir
    }catch(e){
        toast.error("Error" + e.message)
    }
  };
  return (
    <form className="flex flex-col " onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" name="email" className="input" />

      <label className="mt-5">Password</label>
      <div className="relative w-full">
        <input
          type={isShow ? "text" : "password"}
          name="password"
          className="input"
        />
        <span
          className="absolute end-2 top-[50%] -translate-y-[40%] text-zinc-700 text-xl cursor-pointer"
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? <Open /> : <Closed />}
        </span>
      </div>
      {!isSignUp ? <ForgotPassword /> : <div className="h-[28px]"></div>}

      <button
        type="submit"
        className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300 cursor-pointer"
      >
        {!isSignUp ? "Sign in" : "Sign up"}
      </button>

      <p className="mt-5">
        <span className="text-gray-500 text-sm">
          {!isSignUp ? "Don't have an account?" : "Do you have an account?"}
        </span>
        <span
          className="cursor-pointer ms-2 text-blue-500  text-sm hover:underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {!isSignUp ? "Sign up" : "Sign in"}
        </span>
      </p>
    </form>
  );
};

export default Form;
