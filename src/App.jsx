import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Auth from './components/authorization/authorization';
import Main from './components/main/mainPage';
import Search from './components/search/searchPage';
import SearchResult from './components/search_result/searchResult';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/search-result' element={< SearchResult />} />
        <Route path='/search' element={< Search />} />
        <Route path='/auth' element={< Auth />} />
        <Route path='/' element={< Main />} />
      </Routes>
    </div>
  );
}

export default App;
