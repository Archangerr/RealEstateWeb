import React, { useEffect, useState } from 'react';
import { addNewEmlak, fetchById,editEmlak } from '../../services/EmlakListingService';
import { fetchDoviz, fetchEmlakDurumu, fetchEmlakType } from '../../services/ParameterService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditEmlak() {
    const { emlakId } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState({});
    

    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const [title, setTitle] = useState('');
    const [typeList, setTypeList] = useState([]);
    const [type, setType] = useState(1);
    const [durumulist, setDurumulist] = useState([]);
    const [durumu, setDurumu] = useState(1);
    const [dovizList, setDovizList] = useState([]);
    const [doviz, setDoviz] = useState(1);
    const [fiyat, setFiyat] = useState(1);
    const [ilanTarihi, setIlanTarihi] = useState(new Date());
    const [ilanBitis, setIlanBitis] = useState(new Date());
    const [img64, setImg4] = useState('');

    

    useEffect(() => {

        const fetchInitialData = async () => {
            const response = await fetchById(emlakId, config);
            const data = response[0];
            console.log("data", data);
            
            setTitle(data.title);
            setType(data.typeId); 
            setDurumu(data.durumuId);
            
            setDoviz(data.dovizId);
            setFiyat(data.fiyat);
            console.log("data fiyat", data.fiyat);
            console.log("fiyat", fiyat);
            setIlanTarihi(data.ilanTarihi);
            setIlanBitis(data.ilanBitis);
            setImg4(data.imageBase);
            console.log("type", type);
            
        }

        fetchInitialData();

       
    }, []);

    const updateEmlak = async () => {
        const updatedEmlakData = {
            
            id: parseInt(emlakId, 10),
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
            await editEmlak(updatedEmlakData, config);
            navigate('/EmlakListingPagination')
            
        } catch (error) {
            console.error("Failed to update Emlak:", error);
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
        getDoviz(); 
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

        {/* <label>
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
        </label> */}

        <br />
        <button onClick={updateEmlak}>update Emlak</button>
        
    </div>
    )
}

export default EditEmlak;