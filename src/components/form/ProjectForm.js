import { newProject } from "../../managers/ProjectManager";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getProjects } from "../../managers/ProjectManager";


export const ProjectForm = () => {
    const [projects, setProjects] = useState([])
    const [newProject, setNewProject] = useState({
        name: "",
        patternURL: "", 
        hidden: false, 
        description: "",
        inspiration: []
    })


    useEffect(() => {
        getProjects().then(data => setProjects(data))
    }, [])

    return <article>
        <form>
            <h2>Start a New Project</h2>
            <fieldset>
            <label htmlFor="name">Project Name</label>
            <input
            required autoFocus
            type="text"
            className="form-control input"
            placeholder="Project Name"
            value={newProject.name}/>
            </fieldset>
        </form>
    </article>
}