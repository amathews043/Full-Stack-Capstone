export const getProjects = () => {
    return fetch("http://localhost:8000/projects", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getMyProjects = () => {
    return fetch("http://localhost:8000/projects?my_projects", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getCurrentProject = (project_id) => {
    return fetch(`http://localhost:8000/projects/${project_id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const newProject = (project) => {
    return fetch("http://localhost:8000/projects", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, 
        body: JSON.stringify(project)
    })
}

export const getProjectNotes = (project_id) => {
    return fetch(`http://localhost:8000/notes?project_id=${project_id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, 
    })
    .then(response => response.json())
}

export const newProjectNote = (note) => {
    return fetch("http://localhost:8000/notes", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, 
        body: JSON.stringify(note)
    })
}