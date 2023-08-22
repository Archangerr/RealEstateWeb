//To take map from google map api and get lon and lat and place marker and return the map

import React, { useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: 40.980863117998986,
    lng: 29.09535575960825
};

function Map({ latitude, longitude}) {
    

    

    const GOOGLE_MAPS_API_KEY = "AIzaSyB2YxqChL5fs18bOgcs07xMnPmyQpfWBic";
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const onLoad = useCallback(function callback(map) {
        if (latitude && longitude) {
            const pos = new window.google.maps.LatLng(latitude, longitude);
            map.setCenter(pos);
            map.setZoom(15);
        }
    }, [latitude, longitude]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
        >
            {latitude && longitude && (
                <Marker position={{ lat: latitude, lng: longitude }} />
            )}
        </GoogleMap>
    ) : <></>
}

export default Map;
