export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const newPost = (post) => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, 
        body: JSON.stringify(post)
    })
}

export const getProjectPosts = (project_id) => {
    return fetch(`http://localhost:8000/posts?project_id=${project_id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, 
    })
    .then(response => response.json())
}

export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}
