import React from 'react'
import FormFeed from '../components/formFeed'

const Main = ({user}) => {
  return (
    <main className='border border-tw-gray overflow-y-auto'>
      <header className='border-b border-tw-gray p-4 font-bold'>Home</header>
      <FormFeed user={user}/>
    </main>
  )
}

export default Main