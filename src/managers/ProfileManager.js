export const getMyProfile = (user_id) => {
    return fetch(`http://localhost:8000/profile/${user_id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}
export const updateProfile = (user) => {
    return fetch(`http://localhost:8000/serviceTickets/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(user)
        })
    }