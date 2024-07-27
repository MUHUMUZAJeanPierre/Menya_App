import React from "react"
import Back from "../common/back/Back"
import "./team.css"
import '../About/about.css';
import Awrapper from "../About/Awrapper"
import TeamCard from "./TeamCard";

const Team = () => {
  return (
    <>
      <Back title='Team' />
      <section className='team padding'>
        <div className='container grid'>
          <TeamCard />
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default Team
