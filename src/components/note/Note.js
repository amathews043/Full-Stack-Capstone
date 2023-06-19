import { useState } from "react";
import "../project/project.css"
import { newProjectNote } from "../../managers/ProjectManager";
import Button from '@mui/material/Button';

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
        <Button onClick={() => {setShowForm(!showForm)}} className="newNoteHeader">Add a New Note</Button>
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
                <Button type="submit" >Submit </Button>
            </form> : ""
        }
    </div>
}

