import React from "react";
import "../styles/Task.css";

function Task({task, onDelete}) {
    const formattedDate = new Date(task.created_at).toLocaleDateString("en-US");
    const formattedDue = task.due_date ? new Date(task.due_date).toLocaleDateString() : null;
    const today = new Date();
    today.setHours(0,0,0,0);
    let isOverdue = false;
    if (task.due_date && !task.completed) {
        const due = new Date(task.due_date);
        due.setHours(0,0,0,0);
        isOverdue = due < today;
    }

    const handleCheckbox = async (e) => {
        const completedValue = e.target.checked;
        try {
            const res = await api.patch(`/api/tasks/${task.id}/`, { completed: completedValue });
            if (onToggleCompleted) onToggleCompleted(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const assignedName = task.assigned_to
        ? (typeof task.assigned_to === "object" ? task.assigned_to.username : String(task.assigned_to))
        : "Sin asignar";

    const containerClass = task.completed
        ? "task-container task-completed"
        : (isOverdue ? "task-container task-overdue" : "task-container");

    return (
        <div className={containerClass}>
            <div className="task-header">
                <input
                  type="checkbox"
                  checked={Boolean(task.completed)}
                  onChange={handleCheckbox}
                  aria-label="Marcar completada"
                />
                <p className="task-title">{task.title}</p>
                {task.urgent && <span className="urgent-badge">Urgente</span>}
            </div>

            <p className="task-content">{task.content}</p>

            <div className="task-meta">
                <span className="task-created">Creada: {formattedCreated}</span>
                {formattedDue && <span className="task-due"> | Fecha límite: {formattedDue}</span>}
                <span className="task-assigned"> | Asignada a: {assignedName}</span>
            </div>

            <div className="task-actions">
                {onDelete && <button className="delete-button" onClick={() => onDelete(task.id)}>Eliminar</button>}
            </div>
        </div>
    );
}

export default Task
