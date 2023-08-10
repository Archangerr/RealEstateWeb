import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TokenContext from '../Token/TokenContext'; // Import the context

export default function Authors() {
  const token = localStorage.getItem('userToken'); // Access the token
  const [authors, setAuthors] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

 

  const fetchAuthors = async () => {
    console.log('Token:', token);
    try {
      const response = await axios.get('http://localhost:5025/Author/list',config
      // {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }
      );
      console.log(response.data)
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  return (
    <div>
      <h2>Authors</h2>
      <br />
      <button onClick={fetchAuthors}>Fetch Authors</button>
      {authors.map(author => (
        <div key={author.id}>
          <p>{author.name}</p>
        </div>
      ))}
    </div>
  );
}
