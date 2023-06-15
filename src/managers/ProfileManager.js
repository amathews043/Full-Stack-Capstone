export const getMyProfile = (user_id) => {
    return fetch(`http://localhost:8000/profiles/${user_id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}
export const updateProfile = (user) => {
    return fetch(`http://localhost:8000/profiles/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(user)
        })
    }