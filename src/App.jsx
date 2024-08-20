import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Cart from './components/cart/Cart'
import FinalData from './components/finaldata/FinalData'



function App() {
  

  return (
    <>
       <BrowserRouter>
       <Header></Header>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='cart/:id' element={<Cart/>} />
          <Route path='finaldata' element={<FinalData/>} />
        </Routes>
        <Footer></Footer>
       </BrowserRouter>
    </>
  )
}

export default App
