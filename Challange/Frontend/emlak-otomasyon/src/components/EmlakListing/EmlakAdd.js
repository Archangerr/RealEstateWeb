import React, { useEffect, useState, useContext } from 'react';
import { addNewEmlak, fetchDoviz, fetchEmlakDurumu, fetchEmlakType } from '../../services/EmlakListingService';
import { getDurumu,getDoviz,getType } from '../../services/ParameterService';
import getConfig  from '../../components/Config/apiConfig';
import setRefreshKey from './EmlakListing';

function EmlakAdd() {

    // var config = getConfig();

    const [title, setTitle] = useState('');
    const [typeList, setTypeList] = useState([]);
    const [type, setType] = useState();
    const [durumulist, setDurumulist] = useState([]);
    const [durumu, setDurumu] = useState();
    const [dovizList, setDovizList] = useState([]);
    const [doviz, setDoviz] = useState();
    const [fiyat, setFiyat] = useState(1);
    const [ilanTarihi, setIlanTarihi] = useState(new Date().toISOString());
    const [ilanBitis, setIlanBitis] = useState(new Date().toISOString());
    const [img64, setImg4] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
  
    
        const token = localStorage.getItem('userToken');
        const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
       };
    const emlakciId = localStorage.getItem('emlakciId');

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
            imageBase: img64,
            emlakciId: parseInt(emlakciId,10)
        };

        try {

            await addNewEmlak(newEmlakData, config);
        } catch (error) {
            console.error("Failed to add new Emlak:", error);
        }


    }

    // const getDoviz = async () => 
    // {
    //     try {
    //         const data = await fetchDoviz(config);
    //         setDovizList(data);
    //         setDoviz(data[0].id);
    //     } catch (error) {
    //         console.error("Error fetching Emlak data:", error);
    //     }
    // }
    // const getType = async () => 
    // {
    //     try {
    //         const data = await fetchEmlakType(config);
    //         setTypeList(data);
    //         setType(data[0].id);
    //     } catch (error) {
    //         console.error("Error fetching Emlak data:", error);
    //     }
    // }
    // const getDurumu = async () => 
    // {
    //     try {
    //         const data = await fetchEmlakDurumu(config);
    //         setDurumulist(data);
    //         setDurumu(data[0].id);
    //     } catch (error) {
    //         console.error("Error fetching Emlak data:", error);
    //     }
    // }
    // getDurumu(config).then(data => {
    //     setDurumulist(data);
    //     setDurumu(data[0].id);
    // });
    console.log("durumulist", durumulist);
    console.log("durumu", durumu);
    const formatDateTimeForInput = (dateStr) => {
        let date = new Date(dateStr);
        let formattedDate = date.toISOString().slice(0, 16); // "yyyy-MM-ddThh:mm"
        return formattedDate;
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage(file);
          setImagePreview(reader.result);
        }; 
    }

    useEffect(() => {
        getDoviz(config).then(data =>{
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

    return (
        <div className="container mt-5">
            <form>
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="titleInput" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                
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
    
                <div className="mb-3">
                    <label htmlFor="priceInput" className="form-label">Price:</label>
                    <input type="number" className="form-control" id="priceInput" value={fiyat} onChange={e => setFiyat(parseInt(e.target.value, 10))} />
                </div>
    
                <div className="mb-3">
                    <label htmlFor="startDateInput" className="form-label">Start Date and Time:</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="startDateInput"
                        value={formatDateTimeForInput(ilanTarihi)}
                        onChange={e => setIlanTarihi(e.target.value)}
                    />
                </div>
    
                <div className="mb-3">
                    <label htmlFor="endDateInput" className="form-label">End Date and Time:</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="endDateInput"
                        value={formatDateTimeForInput(ilanBitis)}
                        onChange={e => setIlanBitis(e.target.value)}
                    />
                </div>
    
                {/* Add more input fields as necessary... */}
                
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary" onClick={addEmlak}>Add New Emlak</button>
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="preview" />}
                </div>
            </form>
        </div>
    )
}

export default EmlakAdd