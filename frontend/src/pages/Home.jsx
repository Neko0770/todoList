import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task";
import "../styles/Home.css";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const [dueDate, setDueDate] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getTasks();
        getUsers();
    }, []);

    const getTasks = () => {
        api.get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => setTasks(data))
            .catch((error) => alert(error));
    };

    const getUsers = () => {
        api.get("/api/users/")
            .then((res) => res.data)
            .then((data) => setUsers(data))
            .catch((error) => alert(error));
    };

    const deleteTask = (id) => {
        api.delete(`/api/tasks/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                getTasks();
            })
            .catch((error) => alert(error));
    };

    const toggleCompleted = (id, currentStatus) => {
        api.patch(`/api/tasks/${id}/`, { completed: !currentStatus })
            .then((res) => {
                if (res.status === 200) getTasks();
            })
            .catch((error) => alert(error));
    };

    const createTask = (e) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            due_date: dueDate || null,
            assigned_to: assignedTo ? parseInt(assignedTo) : null,
            urgent
        };

        api.post("/api/tasks/", payload)
            .then((res) => {
                if (res.status === 201) {
                    alert("Task created!");
                    setTitle("");
                    setContent("");
                    setDueDate("");
                    setAssignedTo("");
                    setUrgent(false);
                    getTasks();
                }
            })
            .catch((error) => alert(error));
    };

    const todayStr = new Date().toISOString().split("T")[0];

    return (
        <div>
            <div>
                <h2>Tasks</h2>
                {tasks.map((task) => (
                    <Task
                        task={task}
                        onDelete={deleteTask}
                        onToggleComplete={toggleCompleted}
                        key={task.id}
                    />
                ))}
            </div>
            <h2>Create a Task</h2>
            <form onSubmit={createTask}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />

                <div id="extra-cointainer" >
                    <div className="parts">
                        <label htmlFor="assigned-to" className="extra-label">Assigned to:</label>
                        <br />
                        <select
                            id="assigned-to"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                        >
                            <option value="">-- Select --</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="parts">
                        <label htmlFor="urgent" className="extra-label">Urgent:</label>
                        <input
                            type="checkbox"
                            id="urgent"
                            checked={urgent}
                            onChange={(e) => setUrgent(e.target.checked)}
                        />
                    </div>
                    <div className="parts" >
                        <label htmlFor="date-limit" className="extra-label">Date Limit:</label>
                        <input
                            type="date"
                            id="date-limit"
                            value={dueDate}
                            min={todayStr}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;