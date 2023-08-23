import React, { useEffect, useState } from 'react'
import { fetchbyEmlakciId, fetchEmlakci } from '../../services/AdminService';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ProfilePage from '../Profile/ProfilePage';

function AdminPage() {
    const [emlakci, setEmlakci] = useState([]);
    const [emlakciData, setEmlakciData] = useState([]);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';// assuming it's stored as a string
    console.log("isAdmin", isAdmin);

    const [selectedEmlakciId, setSelectedEmlakciId] = useState(null); // New state

    const fetchDataEmlakci = async () => {
        try {
            const data = await fetchEmlakci();
            setEmlakci(data);
            console.log("data", data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }
    const fetchEmlakciEmlak = async (emlakciId) => {
        try {
            const data = await fetchbyEmlakciId(emlakciId);
            setEmlakciData(data);
            console.log("data", data);
        } catch (error) {
            console.error("Error fetching Emlak data:", error);
        }
    }

    useEffect(() => {
        fetchDataEmlakci();
    }
        , []);


    return (
    <div>
        {isAdmin ? (
            // Your original rendering logic for admins
            emlakci.map((emlakci, index) => (
                <div key={emlakci.Id} class="card">
                    <h5 class="card-header">{emlakci.name}</h5>
                    <div class="card-body mb-1">
                        <Link to={`/ProfilePage/${emlakci.id}`}>
                            Open Profile Page
                        </Link>
                    </div>
                </div>
            ))
        ) : (
            // Redirect non-admin users to another page, for instance, the home page
            <Navigate to="/EmlakListing" />
        )}
    </div>  
);
}

export default AdminPage;