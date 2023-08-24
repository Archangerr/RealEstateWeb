import React, { useEffect, useState } from 'react'
import { fetchById } from '../../services/EmlakListingService'
import { Link } from "react-router-dom";


function EmlakListComponent({ emlakId }) {
    const [emlak, setEmlak] = useState([]);

    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };


    const fetchData = async () => {
        try {
            const data = await fetchById(emlakId, config);
            setEmlak(data[0]);
            console.log("data emlakListComponent ici v1", data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }

    useEffect(() => {
        fetchData(); // Call fetchData when component mounts
    }, []);


    return (
        <div>EmlakListComponent
            <Link to={`/EmlakDetails/${emlak.id}`}>
                <h3>{emlak.title}</h3>
            </Link>
            <p>Type: {emlak.type}</p>
            <p>Durumu: {emlak.durumu}</p>
            <p>Price: {emlak.fiyat} {emlak.doviz}</p>
            <p>Listing Date: {emlak.ilanTarihi}</p>
            <p>Expiry Date: {emlak.ilanBitis}</p>
            <Link to={`/EmlakEdit/${emlak.id}`}>
                Edit
            </Link>

        </div>
    )
}

export default EmlakListComponent