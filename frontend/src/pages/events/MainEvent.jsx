import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeEvent from './HomeEvent'
import BasicInfoEvents from './BasicInfoEvents'

const MainEvent = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeEvent/>}/>
        <Route path='/basicinfo' element={<BasicInfoEvents/>}/>
            
      </Routes>
    </div>
  )
}

export default MainEvent
