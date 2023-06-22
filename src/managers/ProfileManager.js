export const getMyProfile = () => {
    return fetch(`http://localhost:8000/profiles/current_user_profile`, {
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

export const getOtherUserProfile = (userId) => {
    return fetch (`http://localhost:8000/profiles/${userId}/user_profile`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}
