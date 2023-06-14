import { useState } from "react";
import "../project/project.css"
import { newProjectNote } from "../../managers/ProjectManager";

export const Note = ({projectId, updateProjectNotes}) => {
    const [showForm, setShowForm] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [newNote, setNewNote] = useState({
        note: "",
        project: projectId
    })

    const submitButton = (evt) => {
        evt.preventDefault()

        if(!newNote.note){
            setErrorMessage("Please Complete All Required Fields")
        } else{
            newProjectNote(newNote).then(() => {
            setShowForm(!showForm)
            updateProjectNotes()})
        }
    }
    return<div>
        <button onClick={() => {setShowForm(!showForm)}} className="newNoteHeader">Add a New Note</button>
        <p className="alert">{errorMessage}</p>
        {
            showForm ? <form onSubmit={submitButton}>
                <fieldset >
                    <textarea rows="10" cols ="40" type="text" onChange={(evt) => {
                        const copy = {...newNote}
                        copy.note = evt.target.value
                        setNewNote(copy)
                    }}> </textarea>
                </fieldset>
                <button type="submit" >Submit </button>
            </form> : ""
        }
    </div>
}

