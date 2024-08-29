import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeEvent from './HomeEvent'
import BasicInfoEvents from './BasicInfoEvents'
import Tickets from './Tickets'

const MainEvent = () => {
  return (
   <div className='flex'>
    <div className='w-2/12 bg-black h-screen'>q</div>
    <div className='w-10/12'>
      <Routes>
        <Route path='/' element={<HomeEvent/>}/>
        <Route path='/basicinfo' element={<BasicInfoEvents/>}/>
        <Route path='/ticket' element={<Tickets/>}/>
            
      </Routes>
    </div>
   </div>
  )
}

export default MainEvent
