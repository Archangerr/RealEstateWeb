import axios from 'axios';


const token = localStorage.getItem('userToken');
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export async function fetchProfile(emlakciId) {
    try {
      // Replace this URL with the endpoint that fetches the Emlakci details
      const response = await axios.get(`http://localhost:5218/Emlakci?id=${emlakciId}`,config);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }