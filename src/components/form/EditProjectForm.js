import { editProject, getCurrentProject } from "../../managers/ProjectManager";
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

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
        getProjects().then(data => setProjects(data))
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

    return <article>
        <form>
            <h2>Edit Project Details</h2>
            <p className="alert">{errorMessage}</p>
            <fieldset>
            <label htmlFor="name">Project Name</label>
            <input
            required autoFocus
            name="name"
            type="text"
            className="form-control input"
            placeholder="What are you making?"
            value={projectInfo.name}
            onChange={(evt) => {
                const copy = {...projectInfo}
                copy.name = evt.target.value 
                setProject(copy)
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
                value={projectInfo.description}
                onChange={(evt) => {
                    const copy = {...projectInfo}
                    copy.description = evt.target.value 
                    setProject(copy)
            }}/> 
            </fieldset>
            <fieldset>
                <label>Would you like to hide this project from other users? Remember that notes on public projects are always private</label>
                <div>
                <input type="radio" checked={projectInfo.hidden} name="hidden" value="true" onChange={hidden}/> 
                <label>yes, I would like to keep this project to myself</label>
                </div>
                <div>
                <input type="radio" checked={!projectInfo.hidden} name="hidden" value="false" onChange={hidden}/> 
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
                value={projectInfo.patternURL}
                onChange={
                    (evt) => {
                        const copy = {...projectInfo}
                        copy.patternURL = evt.target.value 
                        setProject(copy)
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
                    <select value={projectInfo.inspirations} multiple={true} onChange={
                        (evt) => {
                            let newInspiration = parseInt(evt.target.value)
                            if(projectInfo.inspirations.includes(newInspiration)){
                                let index = projectInfo.inspirations.indexOf(newInspiration)
                                projects.inspirations.splice(index, 1)
                            }else
                            projectInfo.inspirations.push(newInspiration)
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