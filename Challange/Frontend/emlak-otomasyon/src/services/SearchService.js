import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';

export async function fetchSearch(data,config) {
  console.log("searchModel inside fetchSearch : ",data);
    try {
      const response = await axios.get(`http://localhost:5218/Emlak/Filtered?${data}`,config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching Search in:', error);
      throw error;
    }
  }
