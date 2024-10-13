// src/components/BlacklistManager.js
import React, { useState, useEffect } from 'react';
import api from '../api'; // Axios instance

const BlacklistManager = () => {
  const [blacklist, setBlacklist] = useState([]);  // Holds blacklisted IPs
  const [newIp, setNewIp] = useState('');  // Holds new IP to be added

  // Fetch blacklist from the server
  const fetchBlacklist = async () => {
    const response = await api.get('/blacklist');
    setBlacklist(response.data);
  };

  // Add a new IP to the blacklist
  const addBlacklistIp = async () => {
    if (newIp === '') return;
    try {
      const response = await api.post('/blacklist', { ip_address: newIp });
      setBlacklist([...blacklist, response.data.blacklist_ip]);
      setNewIp('');  // Reset input field
    } catch (error) {
      console.error('Failed to add IP', error);
    }
  };

  // Delete an IP from the blacklist
  const deleteBlacklistIp = async (id) => {
    try {
      await api.delete(`/blacklist/${id}`);
      setBlacklist(blacklist.filter((ip) => ip.id !== id));
    } catch (error) {
      console.error('Failed to delete IP', error);
    }
  };

  useEffect(() => {
    fetchBlacklist();
  }, []);

  return (
    <div className="container mt-4">
    <h3>Blacklist</h3>
    {/* Input for adding a new IP */}
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={newIp}
        onChange={(e) => setNewIp(e.target.value)}
        placeholder="Agregar nueva IP a la blacklist"
      />
      <button className="btn btn-primary" onClick={addBlacklistIp}>
        Agregar
      </button>
    </div>

    {/* Display the blacklist */}
    <ul className="list-group">
      {blacklist.map((ip) => (
        <li key={ip.id} className="list-group-item d-flex justify-content-between align-items-center">
          {ip.ip_address}{' , '}{ip.country}
          <button className="btn btn-danger btn-sm" onClick={() => deleteBlacklistIp(ip.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default BlacklistManager;
