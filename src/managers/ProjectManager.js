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