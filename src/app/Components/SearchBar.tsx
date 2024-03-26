import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex col-span-2 bg-slate-500 mx-3 p-2 justify-center'>
      <header className='flex bg-slate-300 mx-3'>
        <h1>Sortir</h1>
        <input className='bg-slate-200'></input>
      </header>
      <header className='flex'>
        <input className='bg-slate-200 '></input>
        <h2>Cari</h2>
      </header>
    </div>
  )
}

export default SearchBar