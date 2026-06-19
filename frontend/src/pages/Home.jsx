import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task";
import "../styles/Home.css";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    // Estados para los nuevos parámetros
    const [dueDate, setDueDate] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [users, setUsers] = useState([]);

    // Estado para controlar el "IF" de visualización del formulario
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getTasks();
        getUsers();
    }, []);

    const getTasks = () => {
        api.get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => setTasks(data))
            .catch((err) => alert(err));
    };

    const getUsers = () => {
        api.get("/api/users/")
            .then((res) => res.data)
            .then((data) => setUsers(data))
            .catch((err) => alert(err));
    };

    const deleteTask = (id) => {
        api.delete(`/api/tasks/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                getTasks();
            })
            .catch((err) => alert(err));
    };

    const toggleCompleted = (id, currentStatus) => {
        api.patch(`/api/tasks/${id}/`, { completed: !currentStatus })
            .then((res) => {
                if (res.status === 200) getTasks();
            })
            .catch((err) => alert(err));
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
                    // Corrección: Reseteo absoluto de campos e interfaz
                    setTitle("");
                    setContent("");
                    setDueDate("");
                    setAssignedTo("");
                    setUrgent(false);
                    setShowForm(false); // Cierra el formulario automáticamente al guardar
                    getTasks();
                }
            })
            .catch((err) => alert(err));
    };

    const todayStr = new Date().toISOString().split("T")[0];

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
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

            {/* Botón dinámico para mostrar/ocultar el formulario */}
            <button
                onClick={() => setShowForm(!showForm)}
                style={{
                    backgroundColor: showForm ? "#6b7280" : "#2563eb",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginBottom: "20px"
                }}
            >
                {showForm ? "Cancel" : "Create a Task"}
            </button>

            {/* Renderizado condicional del formulario (El "IF" de React) */}
            {showForm && (
                <form onSubmit={createTask}>
                    <h2>Create a Task</h2>
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
                            <label htmlFor="assigned-to">Assigned to:</label>
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
                            <label htmlFor="urgent">Urgent:</label>
                            <input
                                type="checkbox"
                                id="urgent"
                                checked={urgent}
                                onChange={(e) => setUrgent(e.target.checked)}
                            />
                        </div>
                        <div className="parts">
                            <label htmlFor="date-limit">Date Limit:</label>
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
            )}
        </div>
    );
}

export default Home;