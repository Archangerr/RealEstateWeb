import axios from 'axios';
// import fetchEmlakDurumu from './EmlakListingService';

export async function editType(typeData, config){
    try {
        const response = await axios.put(`http://localhost:5218/EmlakType`, typeData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
  }

    export async function deleteType(typeId, config){
        try {
            const response = await axios.delete(`http://localhost:5218/EmlakType?id=${typeId}`, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }



    export async function editDurumu(data, config){
        try {
            const response = await axios.put(`http://localhost:5218/EmlakDurumu`, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
      }
      export async function deleteDurumu(data, config){
        try {
            const response = await axios.delete(`http://localhost:5218/EmlakDurumu?id=${data}`,config);
            return response.data;
        } catch (error) {
            throw error;
        }
      }
    
      export async function editDoviz(data, config){
        try {
            const response = await axios.put(`http://localhost:5218/Doviz`, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
      }

      export async function deleteDoviz(data, config){
        try {
            const response = await axios.delete(`http://localhost:5218/Doviz?id=${data}`, config);
            return response.data;
        } catch (error) {
            throw error;
        }
      }

      export async function getDurumu(config)
      {
          try {
              const data = await fetchEmlakDurumu(config);
              return data;
          } catch (error) {
              console.error("Error fetching Emlak data:", error);
          }
      }
      export async function fetchEmlakDurumu(config) {
        try {
          const response = await axios.get('http://localhost:5218/EmlakDurumu/list', config);
          console.log("fetch emlak ici response data" ,response.data);
          return response.data;
        } catch (error) {
          console.error('Error while fetching EmlakDurumu in:', error);
          throw error;
        }
      }

      export async function getType(config)
      {
          try {
              const data = await fetchEmlakType(config);
              return data;
          } catch (error) {
              console.error("Error fetching Emlak data:", error);
          }
      }

      export async function fetchEmlakType(config) {
        try {
          const response = await axios.get('http://localhost:5218/EmlakType/list', config);
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error while fetching EmlakType in:', error);
          throw error;
        }
      }
      
      export async function getDoviz(config)
      {
          try {
              const data = await fetchDoviz(config);
              return data;
          } catch (error) {
              console.error("Error fetching Emlak data:", error);
          }
      }
      
      export async function fetchDoviz(config) {
        try {
          const response = await axios.get('http://localhost:5218/Doviz/list', config);
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error while fetching Doviz in:', error);
          throw error;
        }
      }