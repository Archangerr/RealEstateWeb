import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from "react-router-dom";
import './ProfilePage.css';
import { fetchProfile } from '../../services/ProfileService';
import Map from '../Map/Map';
import { Link } from "react-router-dom";
function ProfilePage() {
    const { emlakciId } = useParams();
    const [emlakci, setEmlakci] = useState(null);

    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // assuming `isAdmin` is stored as a string
    const storedEmlakciId = localStorage.getItem('emlakciId'); // get the emlakciId from local storage

    const hasAccess = isAdmin || storedEmlakciId === emlakciId;


    console.log("emlakciId", emlakciId);
    const fetchData = async () => {
        try {
            const data = await fetchProfile(emlakciId);
            setEmlakci(data);
            console.log("data", data);

        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }
    const handleRemainingTime = (emlak) => {
        const simdikiZaman = new Date();
        const ilanBitis = new Date(emlak.ilanBitis);

        const differece = ilanBitis - simdikiZaman;
        return Math.floor(differece / 1000 / 60 / 60);
    }


    useEffect(() => {
        fetchData();
    }, [emlakciId]);

    // useEffect(() => {
    //     if (props.emlakciId && props.emlakciId !== emlakciId) {
    //         setEmlakciId(props.emlakciId);
    //     }
    // }, [props.emlakciId]);


    return (
        <div>
            {hasAccess ? (
                emlakci === null ? (
                    <p>Loading profile...</p>
                ) : (
                    <div>
                        <div className="profile-container">
                            <h2>{emlakci.name}</h2>
                            <p><strong>Email:</strong> {emlakci.email}</p>
                        </div>
                        <h3>Emlak List</h3>
                        <div>
                            <h3>Available Emlak List</h3>
                            {emlakci.emlakDetails.filter(e => e.isAvailable).map((emlak, index) => (
                                <div className="card">
                                    <h5 className="card-header">{emlak.title}</h5>
                                    <div className="card-body  mb-1">
                                        <div className="row">
                                            <div className="col-md-4">
                                                {emlak.imageBases.map((imgSrc, imgIndex) => (
                                                    <img
                                                        key={imgIndex}
                                                        src={imgSrc}
                                                        alt='Img'
                                                        className={` ${imgIndex === 0 ? 'img-thumbnail' : 'second-img'}`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="col-md-2" >
                                                <p> <strong>Durumu :</strong> {emlak.durumu}</p>
                                                <p> <strong>Type :</strong> {emlak.type}</p>
                                                <p> <strong>Fiyati :</strong> {emlak.fiyat} {emlak.doviz}</p>
                                                <p> <strong>Kalan Sure :</strong> {handleRemainingTime(emlak)} saat</p>
                                            </div>
                                            <div className="col-md-5">
                                                <Map
                                                    latitude={emlak.latitude}
                                                    longitude={emlak.longitude}
                                                    width='100%'
                                                    height='300px'
                                                />
                                            </div>
                                            <div className="col-md-1">
                                                <Link to={`/EmlakEdit/${emlak.id}`}>
                                                    Edit
                                                </Link>
                                                <button>

                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3>Unavailable Emlak List</h3>
                            {emlakci.emlakDetails.filter(e => !e.isAvailable).map((emlak, index) => (

                                <div className="card">
                                    <h5 className="card-header">{emlak.title}</h5>
                                    <div className="card-body  mb-1">
                                        <div className="row">
                                            <div className="col-md-4">
                                                {emlak.imageBases.map((imgSrc, imgIndex) => (
                                                    <img
                                                        key={imgIndex}
                                                        src={imgSrc}
                                                        alt='Img'
                                                        className={` ${imgIndex === 0 ? 'img-thumbnail' : 'second-img'}`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="col-md-2" >
                                                <p> <strong>Durumu :</strong> {emlak.durumu}</p>
                                                <p> <strong>Type :</strong> {emlak.type}</p>
                                                <p> <strong>Fiyati :</strong> {emlak.fiyat} {emlak.doviz}</p>
                                                <p> <strong>Kalan Sure :</strong> {handleRemainingTime(emlak)} saat</p>
                                            </div>
                                            <div className="col-md-5">
                                                <Map
                                                    latitude={emlak.latitude}
                                                    longitude={emlak.longitude}
                                                    width='100%'
                                                    height='300px'
                                                />
                                            </div>
                                            <div className="col-md-1">
                                                <Link to={`/EmlakEdit/${emlak.id}`}>
                                                    Edit
                                                </Link>
                                                <button>

                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )
            ) : (
                <Navigate to="/EmlakListing" />
            )}


        </div>
    );

}


export default ProfilePage;
