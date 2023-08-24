
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import CountKiralik from '../widget/CountKiralik';
import { deleteEmlak } from '../../services/EmlakListingService';

function EmlakListingPagination() {
    const [data, setData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const token = localStorage.getItem('userToken');
    const config1 = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5218/Emlak/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`, config1);
                setData(response.data.items);
                setTotalPages(response.data.totalPages);
                console.log(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [pageIndex, pageSize]);

    return (
        <div>

            <CountKiralik />
            {data.map(emlak => (
                <div key={emlak.id}>
                    <Link to={`/EmlakDetails/${emlak.id}`}>
                        <h3>{emlak.title}</h3>
                    </Link>
                    <p>Type: {emlak.type}</p>
                    <p>Durumu: {emlak.durumu}</p>
                    <p>Price: {emlak.fiyat} {emlak.doviz}</p>
                    <p>Listing Date: {emlak.ilanTarihi}</p>
                    <p>Expiry Date: {emlak.ilanBitis}</p>
                    {/* <Link to={`/EmlakEdit/${emlak.id}`}>
                        Edit
                    </Link> */}

                    {/* <button onClick={() => deleteEmlak(emlak.id, config1)}>
                        Delete
                    </button> */}
                    {/* Optionally, you can display the image if it's a URL */}
                    {/* <img src={emlak.imageBase} alt={emlak.title} /> */}
                </div>
            ))}

            <div>
                <button onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))} disabled={pageIndex <= 0}>
                    Previous
                </button>
                <button onClick={() => { if (pageIndex < totalPages - 1) { setPageIndex(prev => prev + 1); } }} disabled={pageIndex >= totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default EmlakListingPagination