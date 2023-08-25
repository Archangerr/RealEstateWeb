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

  export const deleteEmlak = async (emlakId) => {
    try {
        const response = await axios.delete(`http://localhost:5218/Emlak/?id=${emlakId}`,config);
        if (response.status === 204) {
            alert('Emlak marked as unavailable successfully!');
        } else {
            alert('Failed to delete emlak.');
        }
    } catch (error) {
        console.error("Error deleting emlak:", error);
        alert('Failed to delete emlak. Please try again.');
    }
  };

  export const addEmlak = async (emlakId) => {
    try {

        console.log("emlakId",emlakId);
        console.log("config",config);
        const response = await axios.put(`http://localhost:5218/Emlak/byAvaible?id=${emlakId}`,config);
        if (response.status === 204) {
            alert('Emlak added successfully!');
        } else {
            alert('Failed to add emlak.');
        }
    } catch (error) {
        console.error("Error adding emlak:", error);
        alert('Failed to add emlak. Please try again.');
    }
  }