import { newProject } from "../../managers/ProjectManager";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getProjects } from "../../managers/ProjectManager";


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
        const copy = {...newProjectInfo}
        if(evt.target.value === "true"){
            copy.hidden = true
        }else {
            copy.hidden = false
        }
        setNewProject(copy)
    }

    const submit = (evt) => {
        evt.preventDefault()

        if(!newProjectInfo.name || !newProjectInfo.description){
            setErrorMessage("Please Complete All Required Fields")
        } else{
            newProject(newProjectInfo).then((data) => (navigate(`/projectDetails/${data.id}`)))
        }
    }

    return <article>
        <form>
            <h2>Start a New Project</h2>
            <p className="alert">{errorMessage}</p>
            <fieldset>
            <label htmlFor="name">Project Name</label>
            <input
            required autoFocus
            name="name"
            type="text"
            className="form-control input"
            placeholder="What are you making?"
            value={newProjectInfo.name}
            onChange={(evt) => {
                const copy = {...newProjectInfo}
                copy.name = evt.target.value 
                setNewProject(copy)
            }}/>
            </fieldset>
            <fieldset>
                <label>Project Description</label>
                <textarea
                required autoFocus
                name="name"
                type="text"
                className="form-control input"
                placeholder="Add anything you want other users to know about this project"
                value={newProjectInfo.description}
                onChange={(evt) => {
                    const copy = {...newProjectInfo}
                    copy.description = evt.target.value 
                    setNewProject(copy)
            }}/> 
            </fieldset>
            <fieldset>
                <label>Would you like to hide this project from other users? Remember that notes on public projects are always private.</label>
                <div>
                <input type="radio" name="hidden" value="true" onChange={hidden}/> 
                <label>yes, I would like to keep this project to myself</label>
                </div>
                <div>
                <input type="radio" name="hidden" value="false" onChange={hidden}/> 
                <label>no, I would like to share my work with others. </label>
                </div>
            </fieldset>
            <fieldset>
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
                        const copy = {...newProjectInfo}
                        copy.patternURL = evt.target.value 
                        setNewProject(copy)
                    }
                } />
                </div>
            </div>
        </fieldset>
        <fieldset>
                <div className="form-group field"> 
                <label className="label"htmlFor="inspirations">Did you take inspiration from any other projects?:* </label>
                <div className="control">
                    <div className="select">
                    <select value={newProjectInfo.inspirations} multiple={true} onChange={
                        (evt) => {
                            let newInspiration = parseInt(evt.target.value)
                            if(newProjectInfo.inspirations.includes(newInspiration)){
                                let index = newProjectInfo.inspirations.indexOf(newInspiration)
                                projects.inspirations.splice(index, 1)
                            }else
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
            </fieldset>
            <button type="submit" className="post-list-header" onClick={(clickEvt) => submit(clickEvt)}> Submit</button>
        </form>
    </article>
}