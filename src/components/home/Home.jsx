import React from "react"
// import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
// import Hprice from "./Hprice"
import Testimonal from "./testimonal/Testimonal"
import AboutCard from "../About/AboutCard"
import Hblog from "./Hblog"
import Hprice from "./Hprice"

const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Hblog />
      <Hprice />
    </>
  )
}

export default Home
