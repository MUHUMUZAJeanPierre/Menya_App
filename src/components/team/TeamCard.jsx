import React, { useEffect, useState } from "react"
// import { team } from "../../dummydata"
import axios from "axios";

const TeamCard = () => {
  const [team, setTeam] = useState([]);

  const handleFetch = async()=>{
    await axios({
      method:"GET",
      url:"http://localhost:4000/getTeams",
      headers:{
        // Authorization:'Bearer '
      }
    }).then((response)=>{
      setTeam(response.data.data);
      console.log(response.data.data);
    }).catch((err)=>{
      console.log(err);
    });    
  }

  useEffect(()=>{
    handleFetch();
  },[]);
  return (
    <>
      {team.map((val, index) => (
        <div key={index} className='items shadow'>
          <div className='img'>
            <img src={val.cover} alt='' />
            <div className='overlay'>
              <i className='fab fa-facebook-f icon'></i>
              <i className='fab fa-twitter icon'></i>
              <i className='fab fa-instagram icon'></i>
              <i className='fab fa-tiktok icon'></i>
            </div>
          </div>
          <div className='details'>
            <h2>{val.name}</h2>
            <p>{val.work}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default TeamCard
