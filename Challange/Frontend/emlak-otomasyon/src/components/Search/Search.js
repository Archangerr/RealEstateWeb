import React, { useState } from 'react';
import { fetchSearch, searchService } from '../../services/SearchService';

function Search() {
    const token = localStorage.getItem('userToken'); // Access the token
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    };

    const [searchModel, setSearchModel] = useState({});
    const [emlakList, setEmlakList] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchModel(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSearch = async () => 
    {
        try {
            const data = await fetchSearch(searchModel,config);
            setEmlakList(data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }

    return (
        <div>
            <input name="Title" onChange={handleInputChange} placeholder="Search by Title" />
            <input type="number" name="MinPrice" onChange={handleInputChange} placeholder="Minimum Price" />
            <input type="number" name="MaxPrice" onChange={handleInputChange} placeholder="Maximum Price" />
            <input type="number" name="TypeId" onChange={handleInputChange} placeholder="Type ID" />
            <input type="number" name="DurumuId" onChange={handleInputChange} placeholder="Durumu ID" />
            <input type="number" name="DovizId" onChange={handleInputChange} placeholder="Doviz ID" />
            <button onClick={handleSearch}>Search</button>
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
        </div>
    );
}

export default Search;
