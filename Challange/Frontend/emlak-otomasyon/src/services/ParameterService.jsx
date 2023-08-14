import axios from 'axios';

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