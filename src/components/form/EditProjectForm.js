import { editProject, getCurrentProject } from "../../managers/ProjectManager";
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { FormLabel, RadioGroup } from "@mui/material";


import { getProjects } from "../../managers/ProjectManager";


export const EditProjectForm = () => {
    const {project_id} = useParams()
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [projectInfo, setProject] = useState({
        id: "",
        name: "",
        pattern_url: "", 
        hidden: false, 
        description: "",
        inspirations: []
    })

    useEffect(() => {
        getCurrentProject(project_id).then((data) => {
            setProject({
                id: data.id,
                name: data.name,
                inspirations: data.inspirations.map(inspiration => inspiration.id),
                description: data.description, 
                hidden: data.hidden,
                pattern_url: data.pattern_url
            })
        })
    }, [project_id])


    useEffect(() => {
        getProjects().then(data => setProjects(data.filter(project => project.id !== parseInt(project_id))))
    }, [])

    const hidden = (evt) => {
        const copy = {...projectInfo}
        if(evt.target.value === "true"){
            copy.hidden = true
        }else {
            copy.hidden = false
        }
        setProject(copy)
    }

    const submit = (evt) => {
        evt.preventDefault()

        if(!projectInfo.name || !projectInfo.description){
            setErrorMessage("Please Complete All Required Fields")
        } else{
            editProject(projectInfo).then(() => (navigate(`/projectDetails/${projectInfo.id}`)))
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
                            value={projectInfo.name}
                            onChange={(evt) => {
                                const copy = { ...projectInfo }
                                copy.name = evt.target.value
                                setProject(copy)
                            }} />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            required autoFocus
                            type="text"
                            className="form-control input"
                            placeholder="Project Description: Add anything you want other users to know about this project"
                            value={projectInfo.description}
                            onChange={(evt) => {
                                const copy = { ...projectInfo }
                                copy.description = evt.target.value
                                setProject(copy)
                            }} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Would you like to hide this project from other users? Remember that notes on public projects are always private.</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} type="radio" name="hidden" value="true" onChange={hidden} label="yes, I would like to keep this project to myself"/>
                            <FormControlLabel control={<Radio />} type="radio" name="hidden" value="false" onChange={hidden} label="no, I would like to share my work with others." />

                        </RadioGroup>

                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            required autoFocus
                            type="text"
                            className="form-control input"
                            placeholder="Pattern URL: Where did you find this project?"
                            value={projectInfo.patternURL}
                            onChange={(evt) => {
                                const copy = { ...projectInfo }
                                copy.patternURL = evt.target.value
                                setProject(copy)
                            }} />
                    </FormControl>
                    <FormControl>
                                <Autocomplete
                                    multiple
                                    options={projects}
                                    getOptionLabel={(project) => project.name}
                                    renderInput={(params) => <TextField {...params} label="Project Inspiration" />}
                                    onChange={
                                        (evt, value) => {
                                            const value_list = value.map(value => value.id)
                                            const copy = {...projectInfo}
                                            copy.inspirations=value_list
                                            setProject(copy)
                                        }
                                    }
                                />
                            </FormControl>
                    <Button type="submit" className="post-list-header" onClick={(clickEvt) => submit(clickEvt)}> Submit</Button>
                </Stack>
            </form>
        </Box>
    </Container>
}