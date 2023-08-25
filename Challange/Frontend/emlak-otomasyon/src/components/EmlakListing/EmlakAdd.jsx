import React, { useEffect, useState, useContext, useMemo } from 'react';
import { addNewEmlak, fetchDoviz, fetchEmlakDurumu, fetchEmlakType } from '../../services/EmlakListingService';
import { getDurumu, getDoviz, getType } from '../../services/ParameterService';
import getConfig from '../Config/apiConfig';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap,  } from "react-google-maps"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import  MyComponent  from '../Map/MapAdd';
//import MyMapComponent from '../../components/EmlakListing/MyMapComponent';



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
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [latitude, setLatitude] = useState(41.015137);
    const [longitude, setLongitude] = useState(28.979530);


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
            imageBases: imagePreviews,
            emlakciId: parseInt(emlakciId, 10),
            latitude: latitude,
            longitude: longitude
        };

        try {

            await addNewEmlak(newEmlakData, config);
            setImages([]);
            setImagePreviews([]);
        } catch (error) {
            console.error("Failed to add new Emlak:", error);
        }


    }


    // console.log("durumulist", durumulist);
    // console.log("durumu", durumu);
    const formatDateTimeForInput = (dateStr) => {
        let date = new Date(dateStr);
        let formattedDate = date.toISOString().slice(0, 16); // "yyyy-MM-ddThh:mm"
        return formattedDate;
    };
    const handleImageChange = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
        // console.log("previews", imagePreviews);
    };
    const [fileLimit, setFileLimit] = useState(false)

    const handleUploadFiles = files => {
        const uploaded = [...images];
        const previews = [...imagePreviews];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                const reader = new FileReader();

                reader.onloadend = () => {
                    previews.push(reader.result);
                    setImagePreviews(previews);
                }
                reader.readAsDataURL(file);
            }
            if (uploaded.length === 5) setFileLimit(true);
            if (uploaded.length > 5) {
                alert('You can upload only 5 files');
                setFileLimit(false);
                limitExceeded = true;
                return true;
            }
        })
        if (!limitExceeded) setImages(uploaded);
    }
    const handleDeleteImage = (e, index) => {
        e.preventDefault();
        try {
            console.log('Before deletion:', token);
            const newImages = [...images];
            const newImagePreviews = [...imagePreviews];

            newImages.splice(index, 1);

            newImagePreviews.splice(index, 1);

            setImages(newImages);
            setImagePreviews(newImagePreviews);

            if (newImages.length < 5) {
                setFileLimit(false);
            }
            console.log('After deletion:', token);
        } catch (error) {
            console.error("Failed to delete image:", error);
        }
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
        
        console.log("latitude addEmlak ici", latitude);
        console.log("longitude addEmlak ici", longitude);
    }, [latitude, longitude]);
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

                <div>
                    <input id='fileupload'
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={fileLimit}
                    />
                    <label htmlFor='fileUpload'>
                        <a className={`btn btn-primary ${!fileLimit ? '' : 'disabled'}`}> Upload Files </a>
                    </label>
                    <div>
                        {Array.isArray(imagePreviews) && imagePreviews.map((preview, index) => (
                            <div key={index} className='image-preview-container'>
                                <span className='file-name'>{preview.name}</span>
                                <img src={preview} alt="preview" className="img-fluid img-thumbnail w-25" />
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={e => handleDeleteImage(e, index)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
                <MyComponent
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                 />
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary" onClick={addEmlak}>Add New Emlak</button>
                </div>

            </form>
        </div>
    )
}

export default EmlakAdd