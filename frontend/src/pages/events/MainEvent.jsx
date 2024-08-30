import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeEvent from './HomeEvent'
import BasicInfoEvents from './BasicInfoEvents'
import Tickets from './Tickets'
import Descriptionevent from './Descriptionevent'
import Revviewevent from './Revviewevent'

const MainEvent = () => {
  return (
   <div className='flex'>
    <div className='w-2/12 fixed bg-black h-screen'>q</div>
    <div className='w-10/12 ms-auto'>
      <Routes>
        <Route path='/' element={<HomeEvent/>}/>
        <Route path='/basicinfo' element={<BasicInfoEvents/>}/>
        <Route path='/ticket' element={<Tickets/>}/>
        <Route path='/description' element={<Descriptionevent/>}/>
        <Route path='/review' element={<Revviewevent/>}/>
      </Routes>
    </div>
   </div>
  )
}

export default MainEvent
