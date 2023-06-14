import { useState, useEffect } from "react";
import "../project/project.css"
import { editNote, getSingleNote } from "../../managers/ProjectManager";
import { useParams, useNavigate } from "react-router-dom"

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

    return<div>
    <p className="alert">{errorMessage}</p>
    <form onSubmit={submitButton}>
            <fieldset >
                <textarea rows="10" cols ="40" type="text" value={`${note.note}`} onChange={(evt) => {
                    const copy = {...note}
                    copy.note = evt.target.value
                    setNote(copy)
                }}> </textarea>
            </fieldset>
            <button type="submit" >Submit </button>
        </form> 
    </div>
}