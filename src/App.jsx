import React from 'react'
import PizzaApp from './Apps/PizzaApp'
import NavMenu from './components/NavMenu'
import { Route, Routes } from 'react-router-dom'
import Steps from './Apps/Steps'

const App = () => {
  return (
    <Routes>
      <Route path="" element={<NavMenu />}>
        <Route path='/' index element={<PizzaApp />} />
        <Route path='/steps-app' element={<Steps />} />
      </Route>
    </Routes>
  )
}

export default App