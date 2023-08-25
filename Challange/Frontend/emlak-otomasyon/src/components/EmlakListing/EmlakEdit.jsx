import React, { useEffect, useState } from 'react';
import { addNewEmlak, fetchById, editEmlak } from '../../services/EmlakListingService';
import { fetchDoviz, fetchEmlakDurumu, fetchEmlakType } from '../../services/ParameterService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getDurumu, getDoviz, getType } from '../../services/ParameterService';

function EditEmlak() {
    const { emlakId } = useParams();
    console.log("emlakId", emlakId);
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
    const [img64, setImg4] = useState([]);
    const [emlakciId, setEmlakciId] = useState([]);
    const fetchInitialData = async () => {
        const response = await fetchById(emlakId, config);
        const data = response[0];
        console.log("data emlak edit", data);
        setEmlakciId(data.emlakciId);
        setTitle(data.title);
        setFiyat(data.fiyat);
        setIlanTarihi(data.ilanTarihi);
        setIlanBitis(data.ilanBitis);
        setImg4(data.imageBases);
    }
    useEffect(() => {
        getDoviz(config).then(data => {
            setDovizList(data);
            setDoviz(data[0].id);
        })
        getType(config).then(data => {
            setTypeList(data);
            setType(data[0].id);
        })
        getDurumu(config).then(data => {
            setDurumulist(data);
            setDurumu(data[0].id);
        });
    }, []);

    useEffect(() => {

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
            imageBases: []
            // id: 0,
            // title: title,
            // typeId: type,
            // durumuId: durumu,
            // dovizId: doviz,
            // fiyat: fiyat,
            // ilanTarihi: ilanTarihi,
            // ilanBitis: ilanBitis,
            // imageBases: imagePreviews,
            // emlakciId: parseInt(emlakciId, 10),
            // latitude: latitude,
            // longitude: longitude
        };

        try {
            await editEmlak(updatedEmlakData, config);
            navigate('/EmlakListingPagination')

        } catch (error) {
            console.error("Failed to update Emlak:", error);
        }
    }

    // const getDoviz = async () => 
    // {
    //     try {
    //         const data = await fetchDoviz(config);
    //         setDovizList(data);
    //     } catch (error) {
    //         console.error("Error fetching Emlak data:", error);
    //     }
    // }
    // const getType = async () => 
    // {
    //     try {
    //         const data = await fetchEmlakType(config);
    //         setTypeList(data);
    //     } catch (error) {
    //         console.error("Error fetching Emlak data:", error);
    //     }
    // }
    // const getDurumu = async () => 
    // {
    //     try {
    //         const data = await fetchEmlakDurumu(config);
    //         setDurumulist(data);
    //     } catch (error) {
    //         console.error("Error fetching Emlak data:", error);
    //     }
    // }

    const formatDateTimeForInput = (dateStr) => {
        let date = new Date(dateStr);
        let formattedDate = date.toISOString().slice(0, 16); // "yyyy-MM-ddThh:mm"
        return formattedDate;
    };

    const deleteImage = (index) => {
        const newImages = img64.filter((_, imgIndex) => imgIndex !== index);
        setImg4(newImages);
    };
    const handleImageUpload = (e) => {
        const files = e.target.files;
        const updatedImages = [...img64];
    
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatedImages.push(reader.result.split(',')[1]); // store only the base64 representation
                setImg4(updatedImages);
            };
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        getDoviz();
        getType();
        getDurumu();
    }, []);


    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // assuming `isAdmin` is stored as a string
    const storedEmlakciId = localStorage.getItem('emlakciId'); // get the emlakciId from local storage
    console.log("storedEmlakciId", storedEmlakciId);
    console.log("emlakciId", emlakciId);
    const hasAccess = isAdmin || (String(storedEmlakciId) === String(emlakciId));
    console.log("hasAccess", hasAccess);
    console.log("imgae is here", img64);


    return (
        <div>
            {hasAccess === false ? (<h1>You don't have access to this page</h1>) : (<>
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
                
                            
                <div>
                    {img64.map((imageBase, index) => (
                        <div key={index}>
                            <img src={`data:image/png;base64,${imageBase}`} alt={`emlak-image-${index}`} width={100} />
                            <button onClick={() => deleteImage(index)}>Delete</button>
                        </div>
                    ))}
                </div>

                <input type="file" multiple onChange={handleImageUpload} />

                <br />
                <button onClick={updateEmlak}>update Emlak</button>

            </>)}
        </div>
    )
}

export default EditEmlak;