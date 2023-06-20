import { newProject } from "../../managers/ProjectManager";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { getProjects } from "../../managers/ProjectManager";
import { FormLabel, RadioGroup } from "@mui/material";


export const NewProjectForm = () => {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [newProjectInfo, setNewProject] = useState({
        name: "",
        patternURL: "",
        hidden: false,
        description: "",
        inspirations: []
    })


    useEffect(() => {
        getProjects().then(data => setProjects(data))
    }, [])

    const hidden = (evt) => {
        const copy = { ...newProjectInfo }
        if (evt.target.value === "true") {
            copy.hidden = true
        } else {
            copy.hidden = false
        }
        setNewProject(copy)
    }

    const submit = (evt) => {
        evt.preventDefault()

        if (!newProjectInfo.name || !newProjectInfo.description || newProjectInfo.inspirations.length === 0) {
            setErrorMessage("Please Complete All Required Fields")
        } else {
            newProject(newProjectInfo).then((data) => (navigate(`/projectDetails/${data.id}`)))
        }
    }

    return <Container maxWidth="sm">
        <Box sx={{ minWidth: 120 }} className="text-center">
            <form>
                <Stack spacing={2} sx={{ width: 552 }}>
                    <h2>Start a New Project</h2>
                    <p className="alert">{errorMessage}</p>
                    <FormControl fullWidth>
                        <TextField
                            required autoFocus
                            type="text"
                            className="form-control input"
                            placeholder="Project Name: What are you making?"
                            value={newProjectInfo.name}
                            onChange={(evt) => {
                                const copy = { ...newProjectInfo }
                                copy.name = evt.target.value
                                setNewProject(copy)
                            }} />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            required autoFocus
                            type="text"
                            className="form-control input"
                            placeholder="Project Description: Add anything you want other users to know about this project"
                            value={newProjectInfo.description}
                            onChange={(evt) => {
                                const copy = { ...newProjectInfo }
                                copy.description = evt.target.value
                                setNewProject(copy)
                            }} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Would you like to hide this project from other users? Remember that notes on public projects are always private.</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} type="radio" name="hidden" value="true" onChange={hidden} label="yes, I would like to keep this project to myself"/>
                            <FormControlLabel control={<Radio />} type="radio" name="hidden" value="false" onChange={hidden} label="no, I would like to share my work with others." />

                        </RadioGroup>

                    </FormControl>
                    <FormControl>
                        <div className="form-group field">
                            <label className="label" htmlFor="projectURL">Pattern URL:</label>
                            <div className="control">
                                <input
                                    name="patternURL"
                                    autoFocus
                                    type="text"
                                    className="form-control input"
                                    placeholder="optional"
                                    value={newProjectInfo.patternURL}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...newProjectInfo }
                                            copy.patternURL = evt.target.value
                                            setNewProject(copy)
                                        }
                                    } />
                            </div>
                        </div>
                    </FormControl>
                    <FormControl>
                        <div className="form-group field">
                            <label className="label" htmlFor="inspirations">Did you take inspiration from any other projects?:* </label>
                            <div className="control">
                                <div className="select">
                                    <select value={newProjectInfo.inspirations} multiple={true} onChange={
                                        (evt) => {
                                            let newInspiration = parseInt(evt.target.value)
                                            if (newProjectInfo.inspirations.includes(newInspiration)) {
                                                let index = newProjectInfo.inspirations.indexOf(newInspiration)
                                                projects.inspirations.splice(index, 1)
                                            } else
                                                newProjectInfo.inspirations.push(newInspiration)
                                        }
                                    }>
                                        {
                                            projects.map((project) => {
                                                return <option value={project.id} key={project.id} > {project.name} by {project.creator_name} </option>
                                            })

                                        }

                                    </select>

                                </div>

                            </div>
                        </div>
                    </FormControl>
                    <Button type="submit" className="post-list-header" onClick={(clickEvt) => submit(clickEvt)}> Submit</Button>
                </Stack>
            </form>
        </Box>
    </Container>
}