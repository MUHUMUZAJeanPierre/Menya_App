import React from 'react'
import Header from './components/common/header/Header'
import './App.css'
import { BrowserRouter, Route, Outlet, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Footer from './components/common/footer/Footer'
import About from './components/About/About'
import CourseHome from './components/allcourses/CourseHome'
import Team from './components/team/Team'
import Pricing from './components/pricing/Pricing'
import Blog from './components/blog/Blog'
import Contact from './components/contact/Contact'
import LoginPopup from './components/Login/LoginPopup'
import courseDetail from './components/courseDetail/courseDetail'
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route exact path='/abouti'  element={<About />} /> 
          <Route exact path='/courseHome'  element={<CourseHome />} /> 
          <Route exact path='/team'  element={<Team />} /> 
          <Route exact path='/price'  element={<Pricing />} /> 
          <Route exact path='/blog'  element={<Blog />} /> 
          <Route exact path='/contact'  element={<Contact />} /> 
          <Route path='/courseDetail' element={<courseDetail />} />
        </Route>
          <Route path='/register_login' element={<LoginPopup />} />
        <Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
