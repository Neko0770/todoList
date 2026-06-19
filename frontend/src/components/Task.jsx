import React from "react";
import "../styles/Task.css";

function Task({ task, onDelete, onToggleComplete }) {
    // Calcular si la tarea está vencida (fecha límite menor a hoy y no completada)
    const today = new Date().toISOString().split("T")[0];
    const isOverdue = task.due_date && task.due_date < today && !task.completed;

    // Asignación de clases CSS dinámicas según el estado de la tarea
    let taskClass = "note-container";
    if (task.completed) {
        taskClass += " task-completed";
    } else if (isOverdue) {
        taskClass += " task-overdue";
    }

    return (
        <div className={taskClass}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="note-title">
                    {task.title}
                    {task.urgent && <span className="urgent-badge">Urgente</span>}
                </p>
                {/* Checkbox para cambiar el estado 'completed' mediante PATCH */}
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id, task.completed)}
                    style={{ width: "20px", height: "20px", cursor: "pointer", accentColor: "#10b981" }}
                />
            </div>

            <p className="note-content">{task.content}</p>

            <div className="task-metadata">
                {task.due_date && <p><strong>Fecha límite:</strong> {task.due_date}</p>}
                {/* El uso de ?. evita que la app se rompa si assigned_to viene como null */}
                {task.assigned_to && <p><strong>Asignada a:</strong> {task.assigned_to.username}</p>}
            </div>

            <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
}

export default Task;