import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskDate, setTaskDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const currentTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      tasks.forEach((task) => {
        if (
          task.date === currentDate &&
          task.time === currentTime &&
          !task.reminded
        ) {
          task.reminded = true;
          setTasks([...tasks]); // Update state for reminder status
          playReminderVoice(`Reminder: ${task.text}`);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  const playReminderVoice = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const addTask = () => {
    if (newTask.trim() !== "" && taskTime.trim() !== "" && taskDate.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, time: taskTime, date: taskDate, completed: false, reminded: false },
      ]);
      setNewTask("");
      setTaskTime("");
      setTaskDate("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Roboto', sans-serif;
          background-color: #f5f7fa;
        }

        .app {
          max-width: 900px;
          margin: 50px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          color: #333;
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .input-container {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .input-container input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }

        .input-container button {
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .input-container button:hover {
          background-color: #0056b3;
        }

        .task-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .task-card {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .task-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .task-content {
          margin-bottom: 10px;
        }

        .task-text {
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
        }

        .task-date-time {
          font-size: 0.9rem;
          color: #666;
        }

        .task-actions {
          display: flex;
          gap: 10px;
        }

        .task-actions button {
          padding: 5px 10px;
          font-size: 0.9rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: white;
        }

        .edit-button {
          background-color: #ffc107;
        }

        .delete-button {
          background-color: #dc3545;
        }

        .edit-button:hover {
          background-color: #e0a800;
        }

        .delete-button:hover {
          background-color: #c82333;
        }
      `}</style>
      <div className="app">
        <h1>Real-Time To-Do List with Seconds</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task Description"
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <input
            type="time"
            step="1" // Allows input of seconds
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <div className="task-content">
                <div className="task-text">{task.text}</div>
                <div className="task-date-time">📅 {task.date} ⏰ {task.time}</div>
              </div>
              <div className="task-actions">
                <button className="delete-button" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
