import React, { useRef } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef()

  const handleSubmit = (e) => {
    const email = inputRef.current.value
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Check your inbox for the link");
        setIsOpen(false);
      })
      .catch((e) => toast.error("Email could not be sent"));
  };
  return (
    <div>
      <p
        className="text-end text-sm text-gray-500 hover:text-gray-400 mt-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Forgot password?
      </p>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h1 className="text-3xl">Forgot password?</h1>
          <p className="text-gray-400">
            We'll email you a link to reset your password.
          </p>
          <input
          ref={inputRef}
            type="email"
            className="input pl-5 mt-10"
            placeholder="Email"
          />

          <button
          type="button"
          onClick={handleSubmit}
            className="bg-white hover:bg-gray-300 transition text-black mt-8 py-1 rounded-full cursor-pointer"
          >
            Send me a password reset link
          </button>
          <button
          type="button"
            className="bg-zinc-500 hover:bg-zinc-600 transition text-black mt-1 py-1 rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
