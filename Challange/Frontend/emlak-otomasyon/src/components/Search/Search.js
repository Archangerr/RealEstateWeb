
import { fetchSearch, searchService } from '../../services/SearchService';
import React, { useEffect, useState, useContext } from 'react';
import { getDurumu, getDoviz, getType } from '../../services/ParameterService';
import EmlakListComponent from '../EmlakListing/EmlakListComponent';
import './Search.css';

function Search() {
    const token = localStorage.getItem('userToken'); // Access the token
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // const [searchModel, setSearchModel] = useState({    });
    const [title, setTitle] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [emlakList, setEmlakList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [type, setType] = useState();
    const [durumulist, setDurumulist] = useState([]);
    const [durumu, setDurumu] = useState();
    const [dovizList, setDovizList] = useState([]);
    const [doviz, setDoviz] = useState();

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setSearchModel(prevState => ({ ...prevState, [name]: value }));
    // };

    const handleSearch = async () => {
        const searchModel = {
            Title: title,
            MinPrice: minPrice,
            MaxPrice: maxPrice,
            DateTime: null,
            TypeId: type,
            DurumuId: durumu,
            DovizId: doviz
        };
        const filteredSearchModel = Object.fromEntries(
            Object.entries(searchModel)
                .filter(([key, value]) => value != null && value !== '')
        );
        console.log(filteredSearchModel)
        const params = new URLSearchParams(filteredSearchModel);
        const queryString = params.toString();
        console.log("quer string", queryString);
        try {
            const data = await fetchSearch(queryString, config);
            setEmlakList(data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }

    useEffect(() => {
        getDoviz(config).then(data => {
            setDovizList(data);
            //  setDoviz(data[0].id);
        })
        getType(config).then(data => {
            setTypeList(data);
            //  setType(data[0].id);
        })
        getDurumu(config).then(data => {
            setDurumulist(data);
            //setDurumu(data[0].id);
        });
    }, []);

    return (
        <div>
            {/* <div class="filter">
                <form>
                    <div>
                        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Minimum Price" />
                        <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Maximum Price" />
                    </div>
                    <select value={type} onChange={e => setType(parseInt(e.target.value, 10))}>
                        {typeList.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <select value={durumu} onChange={e => setDurumu(parseInt(e.target.value, 10))}>
                        {durumulist.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <select value={doviz} onChange={e => setDoviz(parseInt(e.target.value, 10))}>
                        {dovizList.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </form>
            </div> */}


            <input type="text" className="form-control" id="titleInput" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /> <br />

            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Minimum Price" />
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Maximum Price" />
            <div className="mb-3">
                <label htmlFor="typeSelect" className="form-label">Type:</label>
                <select className="form-select" id="typeSelect" value={type} onChange={e => setType(parseInt(e.target.value, 10))}>
                    {typeList.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="durumuSelect" className="form-label">Durumu:</label>
                <select className="form-select" id="durumuSelect" value={durumu} onChange={e => setDurumu(parseInt(e.target.value, 10))}>
                    {durumulist.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="dovizSelect" className="form-label">Doviz:</label>
                <select className="form-select" id="dovizSelect" value={doviz} onChange={e => setDoviz(parseInt(e.target.value, 10))}>
                    {dovizList.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleSearch}>Search</button>
            <h2>Emlak Listings</h2>
            {/* <button onClick={fetchData}>Fetch Listings</button> */}
            {emlakList.map(emlak => (
                <div key={emlak.id}>
                    {/* <h3>{emlak.title}</h3>
                    <p>Type: {emlak.type}</p>
                    <p>Durumu: {emlak.durumu}</p>
                    <p>Price: {emlak.fiyat} {emlak.doviz}</p>
                    <p>Status: {emlak.durumu === 1 ? "Active" : "Inactive"}</p>
                    <p>Listing Date: {emlak.ilanTarihi}</p>
                    <p>Expiry Date: {emlak.ilanBitis}</p> */}
                    <EmlakListComponent emlakId={emlak.id} />

                    {/* Optionally, you can display the image if it's a URL */}
                    {/* <img src={emlak.imageBase} alt={emlak.title} /> */}
                </div>
            ))}
        </div>
    );
}

export default Search;
