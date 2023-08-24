import axios from 'axios';
const token = localStorage.getItem('userToken');
const config1 = {
    headers: {
      Authorization: `Bearer ${token}`
    }
   };

export async function fetchEmlak(config) {
    try {
      const response = await axios.get('http://localhost:5218/Emlak/list', config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching EmlakListAll in:', error);
      throw error;
    }
}

// export async function fetchDoviz(config) {
//   try {
//     const response = await axios.get('http://localhost:5218/Doviz/list', config);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error while fetching Doviz in:', error);
//     throw error;
//   }
// }
// export async function fetchEmlakDurumu(config) {
//   try {
//     const response = await axios.get('http://localhost:5218/EmlakDurumu/list', config);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error while fetching EmlakDurumu in:', error);
//     throw error;
//   }
// }
// export async function fetchEmlakType(config) {
//   try {
//     const response = await axios.get('http://localhost:5218/EmlakType/list', config);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error while fetching EmlakType in:', error);
//     throw error;
//   }
// }


export async function addNewEmlak(emlakData, config) {
    try {
        const response = await axios.post('http://localhost:5218/Emlak', emlakData, config);
        console.log('Emlak added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error while adding Emlak:', error);
        throw error;
    }
}

export const editEmlak = async (emlakData, config) => {
  try {
      const response = await axios.put(`http://localhost:5218/Emlak`, emlakData, config);
      return response.data;
  } catch (error) {
      throw error;
  }
}

export const fetchById = async (emlakId, config) => {
  try {
      const response = await axios.get(`http://localhost:5218/Emlak/byId?id=${emlakId}`, config);
      return response.data;
  } catch (error) {
      throw error;
  }
}


export async function addDoviz(dovizData, config) {
  try {
      const response = await axios.post('http://localhost:5218/Doviz', dovizData, config);
      console.log('Doviz Added successfully:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error while adding Emlak:', error);
      throw error;
  }
}

export async function addType(typeData, config) {
  try {
      const response = await axios.post('http://localhost:5218/EmlakType', typeData, config);
      console.log('Type Added successfully:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error while adding Emlak:', error);
      throw error;
  }
}

export async function addDurumu(data, config) {
  try {
      const response = await axios.post('http://localhost:5218/EmlakDurumu', data, config);
      console.log('Type Added successfully:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error while adding Emlak:', error);
      throw error;
  }
}