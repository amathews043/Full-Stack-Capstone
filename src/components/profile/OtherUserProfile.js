import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
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

import { getOtherUserProfile } from "../../managers/ProfileManager"
import { getOtherUserPostsForProfile } from "../../managers/PostManager";

export const OtherUserProfile = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        getOtherUserProfile(userId).then(data => setUserProfile(data))
    }, [])

    useEffect(() => {
        getOtherUserPostsForProfile(userId).then(data => setUserPosts(data))
    }, [])

    return <article className="center">
        <Box sx={{ minWidth: 120 }} className="text-center">
            <h2>{userProfile.first_name} {userProfile.last_name}</h2>
        </Box>
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>

                {
                    userProfile.profile_pic ?
                        <Box>
                            <Grid container spacing={2}>
                                <Grid xs={6}>
                                    <Card sx={{ maxWidth: 500 }}>
                                        <CardContent>
                                            <CardMedia
                                                sx={{ height: 700 }}
                                                image={userProfile.profile_pic}
                                                title={userProfile.username}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid xs={6}>
                                    <h5>My Bio:</h5>{userProfile.bio}
                                </Grid>
                            </Grid>
                        </Box>
                
                : <Box><h5>User Bio:</h5>{userProfile.bio}</Box>
                }
            </Box>
        </Container>
        <h3>All {userProfile.first_name}'s Posts</h3>
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
                                    <Button variant="contained" onClick={() => navigate(`/projectDetails/${post.project}`)}>
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