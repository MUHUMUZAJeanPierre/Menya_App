import React, { useEffect, useState } from "react"
import { price } from "../../dummydata"
import axios from "axios";

const PriceCard = () => {
  const [price, setPrice] = useState([]);
  const handleFetch = async()=>{
    await axios({
      method: 'GET',
      url: 'http://localhost:4000/listPrice',
      headers: {
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      }
    }).then((response)=>{
      setPrice(response.data.data);
      console.log(response.data.data);
    }).catch((error)=>{
      console.error(error);

    });
  }

  useEffect(()=>{
     handleFetch();
  }, []);
  return (
    <>
      {price.map((val, index) => (
        <div key={index} className='items shadow'>
          <h4>{val.name}</h4>
          <h1>
            <span>$</span>
            {val.price}
          </h1>
          <p>{val.desc}</p>
          <button className='outline-btn'>GET STARTED</button>
        </div>
      ))}
    </>
  )
}

export default PriceCard
