import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { fetchEmlak } from '../../services/EmlakListingService';
import EmlakAdd from './EmlakAdd';
import { Link } from "react-router-dom";

export default function EmlakListing() 
{
    const token = localStorage.getItem('userToken'); // Access the token
    const [emlakList, setEmlakList] = useState([]);
    const [newEmlak, setnewEmlak] = useState("");
    const [title, setTitle] = useState('');
    const [fiyat, setFiyat] = useState('');
    const [doviz, setDoviz] = useState('Euro');
    const [refreshKey, setRefreshKey] = useState(0);

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    };

    const fetchData = async () => 
    {
        try {
            const data = await fetchEmlak(config);
            setEmlakList(data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }
    
    useEffect(() => {
        fetchData(); // Call fetchData when component mounts
    }, [refreshKey]);
    
    return (
        <div>
            <h2>Emlak Listings</h2>
            {/* <button onClick={fetchData}>Fetch Listings</button> */}
            {emlakList.map(emlak => (
                <div key={emlak.id}>
                    <h3>{emlak.title}</h3>
                    <p>Type: {emlak.type}</p>
                    <p>Durumu: {emlak.durumu}</p>
                    <p>Price: {emlak.fiyat} {emlak.doviz}</p>
                    <p>Status: {emlak.durumu === 1 ? "Active" : "Inactive"}</p>
                    <p>Listing Date: {emlak.ilanTarihi}</p>
                    <p>Expiry Date: {emlak.ilanBitis}</p>
                    
                    {/* Optionally, you can display the image if it's a URL */}
                    {/* <img src={emlak.imageBase} alt={emlak.title} /> */}
                </div>
            ))}
            <br />
            <h2>Add Emlak</h2>
            <EmlakAdd refreshEmlakList={() => setRefreshKey(prevKey => prevKey + 1)} />
            {/* Add Emlak logic here */}
        </div>
    );


}  