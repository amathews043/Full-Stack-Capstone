import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";

import { getMyProfile, updateProfile } from "../../managers/ProfileManager";
import { getUserPosts } from "../../managers/PostManager";
import { ProfilePictureUploadWidget } from "./ProfilePictureUploadWidget";

export const UserProfile = () => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const userId = parseInt(localStorage.getItem('user_id'))
    const [formShown, setForm] = useState(false)
    const [newProfilePic, setNewProfilePic] = useState("")
    const [newUserBio, setNewUserBio] = useState("")

    useEffect(() => {
        getMyProfile(userId).then(data => setUserProfile(data))
    }, [userId])

    useEffect(() => {
        getUserPosts(userId).then(data => setUserPosts(data.reverse()))
    }, [userId])

    const setImageURL = (url) => {
        setNewProfilePic(url)
    }

    const submit = () => {

        const updatedProfile = {
            id: userProfile.id,
            bio: newUserBio,
            profile_pic: newProfilePic,
            username: userProfile.username,
            first_name: userProfile.first_name,
            is_staff: userProfile.is_staff
        }

        updateProfile(updatedProfile)
    }

    return <article className="center">
        <Box sx={{ minWidth: 120 }} className="text-center">
            <h2>My Profile </h2>
            <div>
                <Button onClick={() => setForm(!formShown)}> Edit Profile</Button>
            </div>
            {
                formShown ?
                    <form onSubmit={submit}>
                        <FormControl fullWidth>
                            <label>Bio:</label>
                            <div>
                                <TextField required autoFocus
                                    multiline
                                    type="text"
                                    className="form-control textarea"
                                    value={newUserBio}
                                    onChange={(evt) => {
                                        setNewUserBio(evt.target.value)
                                    }}
                                />
                            </div>
                        </FormControl>
                        <ProfilePictureUploadWidget setImageURL={setImageURL} />
                        <Button type="submit">Submit Changes</Button>
                    </form>

                    : ""
            }
        </Box>

        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={6}>

                        {
                            userProfile.profile_pic ? <div className=" p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded "> <img src={userProfile.profile_pic} alt={userProfile.username} />

                                <div className="card-body">

                                    <Popup trigger={<Button>Delete Profile Picture</Button>} position={"right center"}>
                                        <div>Are you sure you want to delete your profile picture?
                                            <div>
                                                <Button onClick={() => {
                                                    const copy = { ...userProfile }
                                                    copy.profile_pic = ""
                                                    updateProfile(copy).then(() => getMyProfile(userId).then(data => setUserProfile(data)))
                                                }}>Delete</Button>
                                            </div>
                                        </div>
                                    </Popup>
                                </div>
                            </div>

                                : ""
                        }
                    </Grid>
                    <Grid xs={6}>
                        <h5>My Bio:</h5>{userProfile.bio}
                    </Grid>
                </Grid>
            </Box>
        </Container>

        <h3>All My Posts</h3>
        <Container maxWidth="sm">
            <Stack spacing={4}>
                {
                    userPosts.map((post) => {
                        return <Card key={post.id} sx={{ maxWidth: 800 }}>
                            <CardContent>
                                {
                                    post.image ?
                                        <CardMedia
                                            sx={{ height: 300 }}
                                            image={post.image}
                                            title={post.project_name}
                                        />
                                        :
                                        <></>
                                }
                                <Typography gutterBottom variant="h5" component="div">
                                    <Button onClick={() => navigate(`projectDetails/${post.project}`)}>
                                        {post.project_name} by {post.creator_name}
                                    </Button>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.post}
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    {
                                        post.tags.map((tag) => {
                                            return <Chip label={tag.tag} size="small" />
                                        })
                                    }
                                </Stack>
                            </CardContent>
                        </Card>

                    })
                }
            </Stack>
        </Container>
    </article>
}