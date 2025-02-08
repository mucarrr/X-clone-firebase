import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Nav from './Nav.jsx';
import Main from './Main.jsx';
import Aside from './Aside.jsx';

const Feed = () => {
  const user = useOutletContext()

  
  return (
    <div className='h-screen bg-primary overflow-hidden text-secondary grid grid-cols-[1fr_minmax(300px,600px)_1fr]'>
      <Nav user={user}/>
      <Main user={user}/>
      <Aside/>
    </div>
  )
}

export default Feed