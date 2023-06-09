export const getMyProjects = () => {
    return fetch("http://localhost:8000/projects?my_projects", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}