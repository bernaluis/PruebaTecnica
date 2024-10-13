// src/components/IpUploader.js
import React, { useState } from 'react';
import api from '../api'; // Instancia de Axios

const IpUploader = () => {
  const [file, setFile] = useState(null);  // Estado para el archivo CSV seleccionado
  const [message, setMessage] = useState('');  // Estado para el mensaje de respuesta
  const [blacklistedIps, setBlacklistedIps] = useState([]);  // Estado para almacenar las IPs en lista negra

  // Función para manejar el cambio en el input de archivo
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Función para manejar la subida del archivo CSV
  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor selecciona un archivo primero.');
      return;
    }

    const formData = new FormData();
    formData.append('csv_file', file);  
    try {
      const response = await api.post('/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Establecer el mensaje de respuesta del servidor
      setMessage(response.data.message || 'Archivo subido exitosamente');
      
      // Si no hay IPs en lista negra, limpiar la lista
      setBlacklistedIps([]);

    } catch (error) {
      if (error.response && error.response.data.blacklisted_ips) {
        // Si la respuesta incluye IPs en lista negra, mostrarlas
        setBlacklistedIps(error.response.data.blacklisted_ips);
        setMessage('Se encontraron IPs en lista negra');
      } else {
        setMessage('Ocurrió un error durante la subida del archivo.');
      }
    }
  };

  return (
    <div className="container mt-4">
    <h3>Subir CSV</h3>
    <div className="mb-3">
      <input type="file" className="form-control" onChange={handleFileChange} />
    </div>
    <button className="btn btn-primary" onClick={handleUpload}>Subir</button>

    {message && <p className="mt-2">{message}</p>}
    {blacklistedIps.length > 0 && (
      <div className="mt-3">
        <h4>Blacklisted IPs</h4>
        <ul className="list-group">
          {blacklistedIps.map((ip, index) => (
            <li className="list-group-item" key={index}>{ip}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
  );
};

export default IpUploader;
