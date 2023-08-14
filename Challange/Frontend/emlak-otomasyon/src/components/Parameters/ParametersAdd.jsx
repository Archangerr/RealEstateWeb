import React, { useEffect, useState, useContext } from 'react';
import { addDurumu, addDoviz, addType, fetchDoviz, fetchEmlakDurumu, fetchEmlakType } from '../../services/EmlakListingService';
import { editType, deleteType, editDoviz, deleteDoviz, editDurumu, deleteDurumu } from '../../services/ParameterService';
import 'bootstrap/dist/css/bootstrap.min.css';

function ParametersAdd() {
  const [typeList, setTypeList] = useState([]);
  const [type, setType] = useState('');
  const [durumulist, setDurumulist] = useState([]);
  const [durumu, setDurumu] = useState('');
  const [dovizList, setDovizList] = useState([]);
  const [doviz, setDoviz] = useState('');
  const [refreshData, setRefreshData] = useState(1);
  const token = localStorage.getItem('userToken'); // Access the token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const getDoviz = async () => {
    try {
      const data = await fetchDoviz(config);
      setDovizList(data);
    } catch (error) {
      console.error("Error fetching Emlak data:", error);
    }
  }
  const getType = async () => {
    try {
      const data = await fetchEmlakType(config);
      setTypeList(data);
    } catch (error) {
      console.error("Error fetching Emlak data:", error);
    }
  }
  const getDurumu = async () => {
    try {
      const data = await fetchEmlakDurumu(config);
      setDurumulist(data);
    } catch (error) {
      console.error("Error fetching Emlak data:", error);
    }
  }

  const handleAddType = async () => {
    const newType = {
      id: 0,
      name: type
    };

    try {
      await addType(newType, config);
      setRefreshData(refreshData + 1);
    } catch (error) {
      console.error("Failed to add new Emlak:", error);
    }
  }

  const handleAddDoviz = async () => {
    const data = {
      id: 0,
      name: doviz
    };

    try {
      await addDoviz(data, config);
      setRefreshData(refreshData + 1);
    } catch (error) {
      console.error("Failed to add new Emlak:", error);
    }
  }

  const handleAddDurumu = async () => {
    const data = {
      id: 0,
      name: durumu
    };

    try {
      await addDurumu(data, config);
      setRefreshData(refreshData + 1);
    } catch (error) {
      console.error("Failed to add new Emlak:", error);
    }
  }
  const [editMode, setEditMode] = useState(null);

  const handleEditType = (id, name) => {
    setEditMode(id);
    setType(name);
  };

  const handleSaveEdit = async (id) => {
    const editTypee = {
      id: id,
      name: type
    };

    try {
      await editType(editTypee, config);
      setRefreshData(refreshData + 1);
    } catch (error) {
      console.error("Failed to add new Emlak:", error);
    }
    setRefreshData(refreshData + 1);
    setEditMode(null);
  };

  const handleDeleteType = async (id) => {
    try {
      await deleteType(id, config);
    }
    catch (error) {
      console.error("Failed to delete Emlak:", error);
    }
    setRefreshData(refreshData + 1);
  };

  const handleEditDoviz = (id, name) => {
    setEditMode(id);
    setDoviz(name);
  };

  const handleSaveEditDoviz = async (id) => {
    const data = {
      id: id,
      name: doviz
    };

    try {
      await editDoviz(data, config);
      setRefreshData(refreshData + 1);
    } catch (error) {
      console.error("Failed to add new Emlak:", error);
    }
    setRefreshData(refreshData + 1);
    setEditMode(null);
  };

  const handleDeleteDoviz = async (id) => {
    try {
      await deleteDoviz(id, config);
    }
    catch (error) {
      console.error("Failed to delete Emlak:", error);
    }
    setRefreshData(refreshData + 1);
  };

  // Handlers for Durumu
  const handleEditDurumu = (id, name) => {
    setEditMode(id);
    setDurumu(name);
  };

  const handleSaveEditDurumu = async (id) => {
    const data = {
      id: id,
      name: durumu
    };

    try {
      await editDurumu(data, config);
      setRefreshData(refreshData + 1);
    } catch (error) {
      console.error("Failed to add new Emlak:", error);
    }
    setRefreshData(refreshData + 1);
    setEditMode(null);
  };

  const handleDeleteDurumu = async (id) => {
    try {
      await deleteDurumu(id, config);
    }
    catch (error) {
      console.error("Failed to delete Emlak:", error);
    }
    setRefreshData(refreshData + 1);
  };


  useEffect(() => {
    getDoviz();
    getType();
    getDurumu();
  }, [refreshData]);



  return (
    <div className="container mt-5">
      <div className="row">

        {/* Type List */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Type List</div>
            <ul className="list-group list-group-flush">
              {typeList.map(item => (
                <li className="list-group-item" key={item.id}>
                  {editMode === item.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={type}
                      onChange={e => setType(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}

                  <div className="mt-2">
                    {editMode === item.id ? (
                      <button className="btn btn-primary" onClick={() => handleSaveEdit(item.id)}>Save</button>
                    ) : (
                      <>
                        <button className="btn btn-warning" onClick={() => handleEditType(item.id, item.name)}>Edit</button>
                        <button className="btn btn-danger ms-2" onClick={() => handleDeleteType(item.id)}>Delete</button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Type</label>
                <input type="text" className="form-control" value={type} onChange={e => setType(e.target.value)} />
              </div>
              <button className="btn btn-success" onClick={handleAddType}>Add Type</button>
            </div>
          </div>
        </div>
        <div>
          <h3>Durumu List</h3>
          {durumulist.map(item => (
            <div key={item.id}>
              {editMode === item.id ? (
                <input
                  type="text"
                  value={durumu}
                  onChange={e => setDurumu(e.target.value)}
                />
              ) : (
                <p>{item.name}</p>
              )}

              {editMode === item.id ? (
                <button onClick={() => handleSaveEditDurumu(item.id)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleEditDurumu(item.id, item.name)}>Edit</button>
                  <button onClick={() => handleDeleteDurumu(item.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
          <label>
            Durumu:
            <input type="text" value={durumu} onChange={e => setDurumu(e.target.value)} />
          </label>
          <button onClick={handleAddDurumu}>Add Durumu</button>

        </div>

        <div>
          <h3>Doviz List</h3>
          {dovizList.map(item => (
            <div key={item.id}>
              {editMode === item.id ? (
                <input
                  type="text"
                  value={doviz}
                  onChange={e => setDoviz(e.target.value)}
                />
              ) : (
                <p>{item.name}</p>
              )}

              {editMode === item.id ? (
                <button onClick={() => handleSaveEditDoviz(item.id)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleEditDoviz(item.id, item.name)}>Edit</button>
                  <button onClick={() => handleDeleteDoviz(item.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
          <label>
            Doviz:
            <input type="text" value={doviz} onChange={e => setDoviz(e.target.value)} />
          </label>
          <button onClick={handleAddDoviz}>Add Type</button>
        </div>
      </div>
      </div>
      )
}

      export default ParametersAdd