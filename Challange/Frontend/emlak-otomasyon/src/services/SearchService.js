import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';

export async function fetchSearch(searchModel,config) {
    try {
        const response = await axios.get('http://localhost:5218/Emlak/Filtered', {
            params: searchModel
        });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching Search in:', error);
      throw error;
    }
  }