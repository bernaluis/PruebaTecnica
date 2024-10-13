// src/components/WhitelistManager.js
import React, { useState, useEffect } from 'react';
import api from '../api'; // Axios instance

const WhitelistManager = () => {
  const [whitelist, setWhitelist] = useState([]);  // Holds whitelisted IPs

  // Fetch whitelist from the server
  const fetchWhitelist = async () => {
    try {
      const response = await api.get('/whitelist');  
      setWhitelist(response.data);
    } catch (error) {
      console.error('Failed to fetch whitelist', error);
    }
  };

  useEffect(() => {
    fetchWhitelist();
  }, []);

  return (
    
    <div className="container mt-4">
        <h3>Whitelist</h3>
        <ul className="list-group">
        {whitelist.map((ip) => (
            <li className="list-group-item" key={ip.id}>
             {ip.ip_address}{' , '}{ip.country}
            </li>
        ))}
        </ul>
    </div>
  );
};

export default WhitelistManager;
