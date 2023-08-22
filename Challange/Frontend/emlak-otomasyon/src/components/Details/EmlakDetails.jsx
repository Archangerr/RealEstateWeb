import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EmlakDetails.css';

function EmlakDetails() {
  const { emlakId } = useParams();
  const [emlak, setEmlak] = useState({});
  const token = localStorage.getItem('userToken');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);


  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  function imgSize(e, preview) {
    setSelectedImage(preview);
    setIsZoomed(true);
  }

  // function imgSize(e) {
  //   if (e.target.style.width === "150px") {
  //     e.target.style.width = "550px";
  //     e.target.style.height = "auto";
  //     e.target.style.transition = "width 0.5s ease";
  //     console.log(e.target.style.width);
  //   }
  //   else {
  //     e.target.style.width = "150px";
  //     e.target.style.height = "auto";
  //     e.target.style.transition = "width 0.5s ease";
  //     console.log(e.target.style.width);
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5218/Emlak/byId?id=${emlakId}`, config);
        setEmlak(response.data[0]);
        console.log("details ici", response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [emlakId]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1>{emlak.title}</h1>
        </div>
        <div className="card-body">
          <p><strong>Type:</strong> {emlak.type}</p>
          <p><strong>Durumu:</strong> {emlak.durumu}</p>
          <p><strong>Price:</strong> {emlak.fiyat} {emlak.doviz}</p>
          <p><strong>Available:</strong> {emlak.isAvailable ? "Yes" : "No"}</p>
          <p><strong>Date of Advertisement:</strong> {emlak.ilanTarihi}</p>
          <p><strong>Advertisement End Date:</strong> {emlak.ilanBitis}</p>
          <div className="row">
            {Array.isArray(emlak.imageBases) && emlak.imageBases.map((preview, index) => (
              <div key={index} className="col-2">
                <img src={preview} alt="preview"
                  onClick={e => imgSize(e, preview)}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "5px",
                    height: "100px",
                    width: "150px"
                  }}
                />
              </div>
            ))}
            {isZoomed && (
              <div className="overlay" onClick={() => setIsZoomed(false)}>
                <img src={selectedImage} alt="Zoomed preview" className="zoomed-img" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmlakDetails;

