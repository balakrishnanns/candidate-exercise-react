import logo from './logo.svg';
import './App.css';
import "bootstrap/scss/bootstrap.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from './Layout/Dashboard';
import { useState } from 'react';
import { User } from './components/Screens/User';
import { AddUser } from './components/Screens/User/AddUser';
import { EditUser } from './components/Screens/User/EditUser';
import { TaskManagement } from './components/Screens/Task';
import { AddTask } from './components/Screens/Task/AddTask';

import Login from './components/Auth/Login';
import { EditTask } from './components/Screens/Task/EditTask';

function App() {
  const [store, setStore] = useState({ allMail: [], recentMail: [] });
  const routes = [
    {
      path: '/',
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Task-Management",
      element: (
        <Dashboard
        >
          <TaskManagement />
        </Dashboard>
      ),
    },
    {
      path: "/Task-Management/addTask",
      element: (
        <Dashboard
        >
          <AddTask />
        </Dashboard>
      ),
    },
    {
      path: "/Task-Management/editTask/:id",
      element: (
        <Dashboard
        >
          <EditTask />
        </Dashboard>
      ),
    },
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
