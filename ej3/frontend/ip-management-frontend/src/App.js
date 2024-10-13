// src/App.js
import React from 'react';
import IpUploader from './components/IpUploader';
import BlacklistManager from './components/BlacklistManager';
import WhitelistManager from './components/WhitelistManager';

function App() {
  return (
    <div className="App">
      <h1>Manejo de IPs</h1>
      <IpUploader />
      <hr/>
      <WhitelistManager></WhitelistManager>
      <hr />
      <BlacklistManager />
    </div>
  );
}

export default App;
