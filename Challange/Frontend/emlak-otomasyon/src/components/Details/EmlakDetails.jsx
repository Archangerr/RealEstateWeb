import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmlakDetails() {
  const { emlakId } = useParams();
  const [emlak, setEmlak] = useState({});
  const token = localStorage.getItem('userToken');
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5218/Emlak/byId?id=${emlakId}`, config);
        setEmlak(response.data[0]);
        console.log("response.data", response.data[0]);
        console.log("emlak", emlak);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [emlakId]);

  return (
    <div>
      <h1>{emlak.title}</h1>
      <p>Type: {emlak.type}</p>
      <p>Durumu: {emlak.durumu}</p>
      <p>Price: {emlak.fiyat} {emlak.doviz}</p>
      {/* other information */}
    </div>
  );
}

export default EmlakDetails;
