import moment from "moment";
import React from "react";
import { MdEdit } from "react-icons/md";

const UserInfo = ({ tweet }) => {
let date =tweet.createdAt?.toDate ? tweet.createdAt.toDate() : null
date = date ? moment(date).fromNow(true) : "unknown"

    
  return (
    <div className="flex gap-2 items-center whitespace-nowrap text-gray-400">
      <p className="text-white font-semibold">{tweet.user.name}</p>
      <p className="text-sm">@{tweet.user.name.toLowerCase().replaceAll(" ", "_")}</p>
      <p className="text-sm">{date}</p>
      {tweet.isEdited && (
        <p>
          <MdEdit className="md:hidden"/>
          <span className="max-md:hidden">Edited</span>
        </p>
      )}
      <p></p>
    </div>
  );
};

export default UserInfo;
