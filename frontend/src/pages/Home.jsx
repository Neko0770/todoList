import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task.jsx"
import "../styles/Home.css"

function Home() {
    const [task, setTask] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getTask();
    }, []);

    const getTask = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => {
                setTask(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteTask = (id) => {
        api
            .delete(`/api/tasks/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                else alert("Failed to delete note.");
                getTask();
            })
            .catch((error) => alert(error));
    };

    const createTask = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Task created!");
                setTitle("");
                setContent("");
                setShowForm(false);
                getTask();
            })
            .catch((err) => alert(err));
    };

    return <div>
        <div>
            <h2>Note</h2>
            {task.map((note) => (
                <Task note={note} onDelete={deleteTask} key={note.id}/>
            ))}
        </div>
        <h2>Create a Nore</h2>

        <button className="toogle-button" onClick={() => setShowForm(!showForm)}>New task</button>
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
            <input type="submit" value="Submit" />
        </form>
    </div>
}

export default Home