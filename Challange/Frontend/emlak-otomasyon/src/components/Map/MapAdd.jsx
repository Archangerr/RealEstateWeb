import React, { useCallback, useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '600px',
    height: '400px'
};

const center = {
    lat: 40.980863117998986,
    lng: 29.09535575960825
};

function MyComponent({ latitude, longitude, setLatitude, setLongitude }) {

    const GOOGLE_MAPS_API_KEY = "AIzaSyB2YxqChL5fs18bOgcs07xMnPmyQpfWBic";
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    })

    const [map, setMap] = useState(null)
    const markerRef = useRef(null);  // Store a reference to the current marker

    const onLoad = useCallback(function callback(map) {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(center);
            map.fitBounds(bounds);
            map.setCenter(center);
            map.setZoom(15);
            setMap(map)

            map.addListener('click', (e) => {
                placeMarkerAndPanTo(e.latLng, map);
            });
        }
    }, [latitude, longitude]);

    const placeMarkerAndPanTo = (latLng, map) => {
        if (markerRef.current) {
            // Move the existing marker to the new position
            markerRef.current.setPosition(latLng);
        } else {
            // Create a new marker and save its reference for later
            markerRef.current = new window.google.maps.Marker({
                position: latLng,
                map: map,
            });

        }
        
        setLatitude(latLng.lat());
        setLongitude(latLng.lng());
        
        map.panTo(latLng);
    }
    useEffect(() => {
        console.log("Updated lat:", latitude);
        console.log("Updated long:", longitude);
    }, [latitude, longitude]);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={9}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >

            <></>
        </GoogleMap>
    ) : <></>
}

// export default React.memo(MyComponent);
export default MyComponent;

