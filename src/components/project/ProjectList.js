import React, { useEffect, useState } from "react"
import { getMyProjects } from "../../managers/ProjectManager.js"
import { useNavigate, Link } from "react-router-dom"

export const ProjectList = () => {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMyProjects().then(data => setProjects(data))
    },
    [])

    return (
        <article> 
            <button>Start a New Project</button>
            {
                projects.map((project) => {
                    if(projects.project_posts?.image)
                    return <div class="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded ">
                        <div class="card text-center " key={project.id}>
                            <div class="card-body">
                                <h5 class="card-title">{project.name}</h5>
                                <p class="card-text">{project.description}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </article>
    )

}
