// import React from 'react';
// // import './TaskList.css';

// const TaskList = ({ tasks = [], toggleComplete, deleteTask }) => {
//   return (
//     <div className="task-list">
//       <h2>Your Tasks</h2>
//       {tasks.length === 0 ? (
//         <p>No tasks available. Start by adding some tasks!</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
//             <div className="task-info">
//               <h3>{task.title}</h3>
//               <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
//             </div>
//             <div className="task-actions">
//               <button onClick={() => toggleComplete(task.id)} className="btn complete-btn">
//                 {task.completed ? 'Undo' : 'Complete'}
//               </button>
//               <button onClick={() => deleteTask(task.id)} className="btn delete-btn">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default TaskList;