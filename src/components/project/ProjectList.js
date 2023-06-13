import React, { useEffect, useState } from "react"
import { getMyProjects } from "../../managers/ProjectManager.js"
import { useNavigate, Link } from "react-router-dom"
import "./project.css"

export const ProjectList = () => {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMyProjects().then(data => setProjects(data))
    },
    [])

    return (
        <article className="text-center project-list-header"> 
            <button onClick={() => navigate("/ProjectForm")}>Start a New Project</button>
            {
                projects.map((project) => {
                        if (project.preview_image){
                            return <div className="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded " key={project.id}>
                            <img src={project.preview_image} className="card-img-top" alt={project.name}/>
                            <div className="card text-center " key={project.id}> 
                                <div className="card-body">
                                <h5 className="card-title"><Link to={`/projectDetails/${project.id}`}>{project.name}</Link></h5>
                                    <p className="card-text">{project.description}</p>
                                </div>
                            </div>
                            </div> 
                        }else {
                            return <div className="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded " key={project.id}>
                            <div className="card text-center " key={project.id}> 
                                <div className="card-body">
                                <h5 className="card-title"><Link to={`/projectDetails/${project.id}`}>{project.name}</Link></h5>
                                    <p className="card-text">{project.description}</p>
                                </div>
                            </div>
                        </div> 
                        }
                
                })
            }
        </article>
    )

}
