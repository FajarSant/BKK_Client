import React from 'react'
import NavigasiBar from './Components/NavigasiBar'
import SearchBar from './Components/SearchBar'
import CardPost from './Components/CardPost'
import Header from './Components/Header'

const page = () => {
  return (
    <div>
      <NavigasiBar />
      <div className='mt-32'>
      <SearchBar />
      <Header/>
      <CardPost />
      </div>
    </div>
  )
}

export default page