import React from "react";
import { navSections } from "../utils/Constants";
import { FaDoorOpen } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between items-end px-2 py-4">
      <div>
        <img src="/logoo.webp" alt="" className="w-14 mb-4" />
        {navSections.map((item, key) => (
          <div
            key={key}
            className="flex items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer rounded-lg transition hover:bg-tw-gray max-md:justify-center"
          >
            {item.icon}
            <span className="whitespace-nowrap max-md:hidden">
              {item.title}
            </span>
          </div>
        ))}
      </div>
      <div>
        <div className="flex max-md:flex-col max-md:items-center gap-2 justify-between">
          <div className="flex gap-4 items-center">
            <img
              src={user?.photoURL}
              alt={user.displayName}
              className="rounded-full max-w-[45px]"
            />
            <div>
              <p className="max-md:hidden text-sm">{user.displayName}</p>
              <p className="max-md:hidden text-sm text-zinc-400">
                @{user.displayName.toLowerCase().replaceAll(" ", "_")}
              </p>
            </div>
          </div>
          <button className="text-2xl cursor-pointer" title="Sign out" onClick={()=> signOut(auth)}><FaDoorOpen /></button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
