import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import FoodMenu from './components/FoodMenu';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
import DesignPage from './components/DesignPage ';

import './App.css';
import My_File from './components/My_File';
import MainEvent from './pages/events/MainEvent';

const App = () => {
  
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
    <Toaster />
      <div className="App">
        {/* <FoodMenu /> */}
        {/* <h1>Time Management System</h1> */}
        <div className="main-content">
          {/* <TaskForm addTask={addTask} /> */}
          {/* <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} /> */}
        </div>
        
      </div>
      <BrowserRouter>
          <Routes>
            <Route path="/design" element={<DesignPage />} />
            <Route path="/events/*" element={<MainEvent />} />
            
            <Route path="/file" element={<My_File />} />
          </Routes>
        </BrowserRouter>
    </>
  );
};

export default App;
