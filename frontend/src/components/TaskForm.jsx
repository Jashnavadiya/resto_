// import React, { useState } from 'react';
// // import './TaskForm.css';

// const TaskForm = ({ addTask }) => {
//   const [title, setTitle] = useState('');
//   const [deadline, setDeadline] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addTask({ title, deadline: new Date(deadline) });
//     setTitle('');
//     setDeadline('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="task-form">
//       <h2>Add New Task</h2>
//       <input
//         type="text"
//         placeholder="Task Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <input
//         type="date"
//         value={deadline}
//         onChange={(e) => setDeadline(e.target.value)}
//         required
//       />
//       <button type="submit" className="btn add-task-btn">
//         Add Task
//       </button>
//     </form>
//   );
// };

// export default TaskForm;
