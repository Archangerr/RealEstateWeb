import axios from 'axios';


export async function loginUser(credentials) {
    try {
      const response = await axios.post('http://localhost:5218/api/Authenticate/login', credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while logging in:', error);
      throw error;
    }
}