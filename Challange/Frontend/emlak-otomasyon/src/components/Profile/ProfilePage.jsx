import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { fetchProfile } from '../../services/ProfileService';
function ProfilePage() {
    const emlakciId = localStorage.getItem('emlakciId');
    const [emlakci, setEmlakci] = useState(null);
    const [name, setName] = useState('');

    const fetchData = async () => {
        try {
            const data = await fetchProfile(emlakciId);
            // setName(emlakci.name);
            console.log("data icinde", data);
            setEmlakci(data);

            console.log("emlakci icinde", emlakci);
            //  console.log("emlakci icinde",emlakci);
            //  console.log("emlakci icinde name",emlakci.name);
            //  console.log("emlakci icinde email",emlakci.email);
            //  console.log("emlakci icinde emlaklar",emlakci.emlakDetails);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            {emlakci === null ? (
                <p>Loading profile...</p>
            ) : (
                <div>
                    <div className="profile-container">
                        <h2>{emlakci.name}</h2>
                        <p><strong>Email:</strong> {emlakci.email}</p>
                    </div>
                    <h3>Emlak List</h3>

                    {emlakci.emlakDetails.map((emlak, index) => (

                        <div class="card">
                            <h5 class="card-header">{emlak.title}</h5>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src={emlak.imageBases[0]} alt={emlak.title} />
                                    </div>
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            )}
        </div>
    );

}

export default ProfilePage;
