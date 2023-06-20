import { useState } from "react";
import "../project/project.css"
import { newProjectNote } from "../../managers/ProjectManager";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";

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
    return<Container maxWidth="sm">
        <Box sx={{ minWidth: 120 }} className="text-center">
        <Button onClick={() => {setShowForm(!showForm)}} className="newNoteHeader">Add a New Note</Button>
        <p className="alert">{errorMessage}</p>
        {
            showForm ? <form onSubmit={submitButton}>
                <FormControl fullWidth>
                    <TextField multiline rows="10" cols ="40" type="text" onChange={(evt) => {
                        const copy = {...newNote}
                        copy.note = evt.target.value
                        setNewNote(copy)
                    }}/> 
                </FormControl>
                <Button type="submit" >Submit </Button>
            </form> : ""
        }
        </Box>
    </Container>
}

