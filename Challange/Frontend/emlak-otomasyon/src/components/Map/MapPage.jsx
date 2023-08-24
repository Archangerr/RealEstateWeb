import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker,InfoWindow  } from '@react-google-maps/api';
import axios from 'axios';
import { fetchEmlak } from '../../services/EmlakListingService';
import './MapPage.css'

const containerStyle = {
    width: '98vw',
    height: '80vh'
};

const center = {
    lat: 40.980863117998986,
    lng: 29.09535575960825
};

function MapPage() {
    
    const [emlakObjects, setEmlakObjects] = useState([]);
    const GOOGLE_MAPS_API_KEY = "AIzaSyB2YxqChL5fs18bOgcs07xMnPmyQpfWBic";
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    };

    const fetchData = async () => 
    {
        try {
            const data = await fetchEmlak(config);
            setEmlakObjects(data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        emlakObjects.forEach((emlak) => {
            bounds.extend({ lat: emlak.latitude, lng: emlak.longitude });
        });
       // map.fitBounds(bounds);
    }, [emlakObjects]);

     const [activeEmlak, setActiveEmlak] = useState(null);

    const handleMouseOver = (emlak) => {
        setActiveEmlak(emlak);
    };

    const handleMouseOut = () => {
        setActiveEmlak(null);
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
        >
            {emlakObjects.map((emlak, index) => (
                <Marker
                    key={index}
                    position={{ lat: emlak.latitude, lng: emlak.longitude }}
                    onMouseOver={() => handleMouseOver(emlak)}
                    onMouseOut={handleMouseOut}
                >
                    {activeEmlak === emlak && (
                        <InfoWindow
                            position={{ lat: emlak.latitude, lng: emlak.longitude }}
                        >
                            <div>
                                <h4>{emlak.title}</h4>
                                <p>{emlak.description}</p>
                                {/* ... other details ... */}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>
    ) : <></>
}

export default MapPage;