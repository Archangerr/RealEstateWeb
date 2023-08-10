import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you are using axios for HTTP requests

function KiralikCount() {
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchKiralikCount = async () => {
            try {
                // Adjust the URL based on your API endpoint
                const response = await axios.get('http://localhost:5218/Emlak/count/kiralik',config);
                console.log("widget ici",response.data);

                if (response.status === 200) {
                    setCount(response.data);
                } else {
                    setError('Failed to fetch data.');
                }
            } catch (err) { 
                setError('Failed to fetch data. ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchKiralikCount();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            Number of Kiralik Emlak: {count}
        </div>
    );
}

export default KiralikCount;