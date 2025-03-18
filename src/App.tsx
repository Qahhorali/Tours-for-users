import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home';
import Tours from './Pages/Tours';
import TourDetail from './Pages/TourDetail';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/tours' element={<Tours/>}></Route>
        <Route path='/tour/:id' element={<TourDetail/>}></Route>
      </Routes>
    </>
  )
}

export default App
