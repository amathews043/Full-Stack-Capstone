import { useState, useEffect } from "react";
import "../project/project.css"
import { editNote, getSingleNote } from "../../managers/ProjectManager";
import { useParams, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";
import Container from '@mui/material/Container';

export const EditNote = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const {note_id} = useParams()
    const [note, setNote] = useState({
        note: "",
        project: null
    })

    useEffect(() => {
        getSingleNote(note_id).then(data => setNote(data))
    }, [note_id])

    const submitButton = (evt) => {
        evt.preventDefault()

        if(!note.note){
            setErrorMessage("Please Complete All Required Fields")
        } else{
            editNote(note).then(() => {
                navigate(`/projectDetails/${note.project}`)
            })
        }
    }

    return<Container maxWidth="sm">
        <Box sx={{ minWidth: 120 }} className="text-center">
    <p className="alert">{errorMessage}</p>
    <form onSubmit={submitButton}>
            <FormControl fullWidth>
                <TextField rows="10" cols ="40" type="text" value={`${note.note}`} onChange={(evt) => {
                    const copy = {...note}
                    copy.note = evt.target.value
                    setNote(copy)
                }}> </TextField>
            </FormControl>
            <Button type="submit" >Submit </Button>
        </form> 
        </Box>
    </Container>
}