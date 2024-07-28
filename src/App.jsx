import React from 'react';
import Header from './components/common/header/Header';
import './App.css';
import { BrowserRouter, Route, Outlet, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Footer from './components/common/footer/Footer';
import About from './components/About/About';
import CourseHome from './components/allcourses/CourseHome';
import Team from './components/team/Team';
import Pricing from './components/pricing/Pricing';
import Blog from './components/blog/Blog';
import Contact from './components/contact/Contact';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import courseDetail from './components/CourseDetail/CourseDetail'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path='/about' element={<About />} /> 
          <Route path='/courseHome' element={<CourseHome />} /> 
          <Route path='/team' element={<Team />} /> 
          <Route path='/pricing' element={<Pricing />} /> 
          <Route path='/blog' element={<Blog />} /> 
          <Route path='/contact' element={<Contact />} /> 
          <Route path='/courseDetail/:id' element={<courseDetail />} /> 
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
