import React from 'react'
import PizzaApp from './Apps/PizzaApp'
import NavMenu from './components/NavMenu'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="" element={<NavMenu />}>
        <Route index element={<PizzaApp />} />
      </Route>
    </Routes>
  )
}

export default App