import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';

function App() {

  return (
    <div className="App">
      <Board columns={15} rows={10} />
    </div>
  );
}

export default App;
