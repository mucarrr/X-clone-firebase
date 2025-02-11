import React from 'react'
import UserAvatar from '../UserAvatar'
import UserInfo from './UserInfo';
import Dropdown from './Dropdown';
import Content from './Content';
import Buttons from './Buttons';

const Post = ({tweet}) => {
    console.log(tweet);
    
  return (
    <div className='border-b border-tw-gray flex p-4 gap-2'>
        <UserAvatar photo={tweet.user.photo} name={tweet.user.name} />
        <div className='w-full'>
            <div className='flex justify-between'>
                <UserInfo tweet={tweet}/>
                <Dropdown tweet={tweet}/>
            </div>
            <Content data={tweet.content}/>
            <Buttons tweet={tweet}/>
        </div>
    </div>
  )
}

export default Post