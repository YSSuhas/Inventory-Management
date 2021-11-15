import React from 'react';
import './App.css';
import Nbar from './components/nbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import Viewstore from './screens/viewstore';
import Additem from './screens/additem';
import Searchitems from './screens/searchitems';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/store/:id"} element={<Viewstore />} />
          <Route path={"/add-item/:id"} element={<Additem />} />
          <Route path={"/search-items/:id/:min/:max/:text"} element={<Searchitems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;