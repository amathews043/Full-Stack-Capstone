import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom"
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { getMyProfile, updateProfile } from "../../managers/ProfileManager";
import { getUserPosts } from "../../managers/PostManager";
import { ProfilePictureUploadWidget } from "./ProfilePictureUploadWidget";

export const UserProfile = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const userId = parseInt(localStorage.getItem('user_id'))
    const [formShown, setForm] = useState(false)
    const [newProfilePic, setNewProfilePic] = useState("")
    const [newUserBio, setNewUserBio] = useState("")

    useEffect(() => {
        getMyProfile().then(data => setUserProfile(data))
    }, [])

    useEffect(() => {
        getUserPosts().then(data => setUserPosts(data.reverse()))
    }, [])

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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <article className="center">
        <Box sx={{ minWidth: 120 }} className="text-center">
            <h2>My Profile </h2>
            <div className="margin-bottom-and-top-20px">
                <Button variant="contained" onClick={() => setForm(!formShown)}> Edit Profile</Button>
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
                        <div className="margin-bottom-and-top-20px">
                            <ProfilePictureUploadWidget setImageURL={setImageURL} />
                        </div>
                        <div className="margin-bottom-and-top-20px">
                            <Button variant="contained" type="submit">Submit Changes</Button>
                        </div>
                    </form>

                    : ""
            }
        </Box>

        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={6}>

                        {
                            userProfile.profile_pic ?
                                <Card sx={{ maxWidth: 500 }}>
                                    <CardContent>
                                        <CardMedia
                                            sx={{ height: 700 }}
                                            image={userProfile.profile_pic}
                                            title={userProfile.username}
                                        />


                                        <div className="margin-bottom-and-top-20px">
                                            <Button variant="contained" onClick={handleClickOpen}>
                                                Delete Profile Picture
                                            </Button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description">
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Delete Profile Picture?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Are you sure you want to delete your profile picture? This cannot be undone but you can update your profile picture by clicking edit profile above.
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button variant="contained" onClick={() => {
                                                        const copy = { ...userProfile }
                                                        copy.profile_pic = ""
                                                        updateProfile(copy).then(() => getMyProfile(userId).then(data => setUserProfile(data)))
                                                    }}>Delete Profile Picture</Button>
                                                    <Button variant="contained" onClick={handleClose} autoFocus>
                                                        Cancel
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </CardContent>
                                </Card>

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
                                    <Button variant="contained" onClick={() => navigate(`projectDetails/${post.project}`)}>
                                        {post.project_name} by {post.creator_name}
                                    </Button>
                                </Typography>
                                <div className="margin-bottom-and-top-20px">
                                    <Typography variant="body2" color="text.secondary">
                                        {post.post}
                                    </Typography>
                                </div>
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