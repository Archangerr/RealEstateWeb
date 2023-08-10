import React, { useEffect, useState, useContext } from 'react';
import { addNewEmlak, fetchDoviz, fetchEmlakDurumu, fetchEmlakType } from '../../services/EmlakListingService';
import getConfig  from '../../components/Config/apiConfig';
import setRefreshKey from './EmlakListing';

function EmlakAdd({refreshEmlakList }) {

    // var config = getConfig();

    const [title, setTitle] = useState('');
    const [typeList, setTypeList] = useState([]);
    const [type, setType] = useState(1);
    const [durumulist, setDurumulist] = useState([]);
    const [durumu, setDurumu] = useState(1);
    const [dovizList, setDovizList] = useState([]);
    const [doviz, setDoviz] = useState(1);
    const [fiyat, setFiyat] = useState(1);
    const [ilanTarihi, setIlanTarihi] = useState(new Date().toISOString());
    const [ilanBitis, setIlanBitis] = useState(new Date().toISOString());
    const [img64, setImg4] = useState('');

    
        const token = localStorage.getItem('userToken');
        const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
       };

    const addEmlak = async () => {
        // console.log("addEmlak ici", (await config).headers.Authorization);
        const newEmlakData = {
            id: 0,
            title: title,
            typeId: type,
            durumuId: durumu,
            dovizId: doviz,
            fiyat: fiyat,
            ilanTarihi: ilanTarihi,
            ilanBitis: ilanBitis,
            imageBase: img64
        };

        try {

            await addNewEmlak(newEmlakData, config);
            refreshEmlakList();
        } catch (error) {
            console.error("Failed to add new Emlak:", error);
        }


    }

    const getDoviz = async () => 
    {
        try {
            const data = await fetchDoviz(config);
            setDovizList(data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }
    const getType = async () => 
    {
        try {
            const data = await fetchEmlakType(config);
            setTypeList(data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }
    const getDurumu = async () => 
    {
        try {
            const data = await fetchEmlakDurumu(config);
            setDurumulist(data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }

    const formatDateTimeForInput = (dateStr) => {
        let date = new Date(dateStr);
        let formattedDate = date.toISOString().slice(0, 16); // "yyyy-MM-ddThh:mm"
        return formattedDate;
    };

    useEffect(() => {
        getDoviz(); // Call fetchData when component mounts
        getType();
        getDurumu();
    }, []);

    return (
        <div>
            <label>
                Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <br />
            <label>
                Type:
                <select value={type} onChange={e => setType(parseInt(e.target.value, 10))}>
                    {typeList.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
            Durumu:
                <select value={durumu} onChange={e => setDurumu(parseInt(e.target.value, 10))}>
                 {durumulist.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
                </select>
             </label>

            <label>
                Doviz:
                  <select value={doviz} onChange={e => setDoviz(parseInt(e.target.value, 10))}>
                    {dovizList.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>   
                    ))} 
                </select>
            </label>

            <label>
                Price:
                <input type="number" value={fiyat} onChange={e => setFiyat(parseInt(e.target.value, 10))} />
            </label>
            <br />

            <label>
                Start Date and Time:
                <input
                    type="datetime-local"
                    value={formatDateTimeForInput(ilanTarihi)}
                    onChange={e => setIlanTarihi(e.target.value)}
                />
            </label>
            <br />
            <label>
                End Date and Time:
                <input
                    type="datetime-local"
                    value={formatDateTimeForInput(ilanBitis)}
                    onChange={e => setIlanBitis(e.target.value)}
                />
            </label>

            <br />
            {/* Add more input fields as necessary... */}
            <button onClick={addEmlak}>Add New Emlak</button>
        </div>
    )
}

export default EmlakAdd