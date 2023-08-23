import axios from 'axios';

const token = localStorage.getItem('userToken');
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const fetchbyEmlakciId = async (emlakciId) => {
    try {
        const response = await axios.get(`http://localhost:5218/Emlak/byEmlakciId?emlakciId=${emlakciId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
  }

export const fetchEmlakci = async () => {
    try {
        const response = await axios.get(`http://localhost:5218/Emlakci/list`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
 }
