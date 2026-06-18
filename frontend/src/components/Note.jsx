import React from "react";
import "../styles/Note.css";

function Note({note, onDelete}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className="note-container">
            Si hi ha hagut cap problema, podràs presentar-te a finestreta de secretaria per resoldre'l. Igualment, si es detecta cap incidència, se t'avisarà per correu electrònic fent servir l'adreça que has indicat.
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    )
}

export default Note