import React from 'react'
import FormFeed from '../components/formFeed'
import List from './List'

const Main = ({user}) => {
  return (
    <main className='border border-tw-gray overflow-y-auto scroll-thin'>
      <header className='border-b border-tw-gray p-4 font-bold'>Home</header>
      <FormFeed user={user}/>
      <List/>

    </main>
  )
}

export default Main